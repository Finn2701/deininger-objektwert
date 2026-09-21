// Autonomous content-growth engine for deininger-objektwert -- NOT part of
// the digital-twin project (that project is deliberately walled off from
// this one, see its own AGENTS.md project-separation rule). This is its own
// small, self-contained recurring process: periodically researches one new
// SEO-valuable Ratgeber topic not yet covered, writes a full article in the
// site's established format, and inserts it as a DRAFT (published: false) --
// Finn reviews and publishes it himself from /backend/ratgeber, on his own
// explicit request (2026-09-21): "setz sie ins backend auf entwurf und ich
// kann dann immer alleine auf freigeben klicken".
//
// Named .mjs (not relying on package.json's "type" field) so this runs as
// ESM unambiguously regardless of how the Next.js app itself is configured.
import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.join(__dirname, "..");

const CYCLE_INTERVAL_MS = 3 * 24 * 60 * 60 * 1000; // one new draft every ~3 days
const CLAUDE_TIMEOUT_MS = 10 * 60 * 1000; // research + writing a full article can take a while
const MAX_PENDING_DRAFTS = 3; // don't keep writing if Finn hasn't reviewed the last few yet

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .split("-")
    // Titles here often carry a colon-separated subtitle ("X: Y – Z") that
    // slugifies into something 90+ characters long -- cap at a sensible
    // length on a word boundary rather than truncating mid-word or keeping
    // the whole thing, matching normal SEO-slug practice (short, readable).
    .reduce((acc, word) => (acc === "" || (acc + "-" + word).length <= 60 ? (acc ? `${acc}-${word}` : word) : acc), "");
}

// On Windows, npm installs CLI tools like `claude` as a `.cmd` shim that
// simply forwards to the real executable next to it. Windows can only run a
// .cmd through cmd.exe, and Node refuses to spawn one without `shell: true`
// (CVE-2024-27980) -- rather than use shell:true (a real shell-injection
// surface if any argument ever came from untrusted input), resolve the shim
// once and spawn its real target directly, no shell involved.
function resolveWindowsShimTarget(shimName) {
  const pathDirs = (process.env.PATH || "").split(path.delimiter).filter(Boolean);
  for (const dir of pathDirs) {
    const shimPath = path.join(dir, shimName);
    if (!fs.existsSync(shimPath)) continue;
    let content;
    try {
      content = fs.readFileSync(shimPath, "utf8");
    } catch {
      return { command: shimPath, prefixArgs: [] };
    }
    const match = content.match(/"%~?dp0%?\\([^"]+)"/i);
    if (!match) return { command: shimPath, prefixArgs: [] };
    const target = path.join(dir, match[1]);
    if (/\.(js|cjs|mjs)$/i.test(target)) {
      return { command: process.execPath, prefixArgs: [target] };
    }
    return { command: target, prefixArgs: [] };
  }
  return { command: shimName, prefixArgs: [] };
}

function invokeClaude(prompt) {
  return new Promise((resolve) => {
    const resolved =
      process.platform === "win32" ? resolveWindowsShimTarget("claude.cmd") : { command: "claude", prefixArgs: [] };
    const args = [...resolved.prefixArgs, "-p", "--allowedTools", "WebSearch"];

    let child;
    try {
      child = spawn(resolved.command, args, { cwd: REPO_ROOT });
    } catch (err) {
      resolve({ stdout: "", stderr: String(err), timedOut: false, exitCode: -1 });
      return;
    }

    child.stdin.on("error", () => {});
    child.stdin.write(prompt);
    child.stdin.end();
    child.stdout.on("error", () => {});
    child.stderr.on("error", () => {});

    let stdout = "";
    let stderr = "";
    let timedOut = false;
    const timer = setTimeout(() => {
      timedOut = true;
      child.kill();
    }, CLAUDE_TIMEOUT_MS);

    child.stdout.on("data", (chunk) => (stdout += chunk.toString()));
    child.stderr.on("data", (chunk) => (stderr += chunk.toString()));
    child.on("close", (exitCode) => {
      clearTimeout(timer);
      resolve({ stdout, stderr, timedOut, exitCode });
    });
    child.on("error", (err) => {
      clearTimeout(timer);
      resolve({ stdout, stderr, timedOut, exitCode: -1, spawnError: String(err) });
    });
  });
}

// Claude's -p output is plain text; the article JSON is the payload we asked
// for, but the model may still wrap it in prose or a ```json code fence --
// extract the first balanced {...} block rather than assuming the whole
// stdout is clean JSON.
function extractJson(text) {
  const start = text.indexOf("{");
  if (start === -1) return null;
  let depth = 0;
  for (let i = start; i < text.length; i++) {
    if (text[i] === "{") depth++;
    if (text[i] === "}") {
      depth--;
      if (depth === 0) {
        try {
          return JSON.parse(text.slice(start, i + 1));
        } catch {
          return null;
        }
      }
    }
  }
  return null;
}

async function uniqueSlug(baseSlug) {
  let slug = baseSlug || "artikel";
  let suffix = 2;
  for (;;) {
    const { data } = await supabase.from("articles").select("id").eq("slug", slug).maybeSingle();
    if (!data) return slug;
    slug = `${baseSlug}-${suffix}`;
    suffix += 1;
  }
}

const REQUIRED_FIELDS = ["title", "excerpt", "meta_description", "content_html"];

async function runOneCycle({ skipCap = false } = {}) {
  const timestamp = new Date().toLocaleString("de-DE");

  const { data: pending, error: pendingError } = await supabase
    .from("articles")
    .select("id")
    .eq("published", false);
  if (pendingError) throw pendingError;
  if (!skipCap && pending.length >= MAX_PENDING_DRAFTS) {
    console.log(
      `[${timestamp}] ${pending.length} unreviewte Entwürfe warten bereits im Backend -- überspringe diesen Zyklus.`
    );
    return;
  }

  const { data: existing, error: existingError } = await supabase.from("articles").select("title, slug");
  if (existingError) throw existingError;
  const existingList = existing.map((a) => `- ${a.title} (${a.slug})`).join("\n");

  const prompt = `Du bist ein SEO-Content-Stratege für "Deininger Objektwert" (deininger-objektwert.de), eine kostenlose Online-Immobilienbewertung von Finn Deininger in Heidenheim an der Brenz / Ostalbkreis, Baden-Württemberg. Zielgruppe: deutsche Immobilieneigentümer, die eine Immobilie bewerten oder verkaufen wollen -- oft ausgelöst durch Erbschaft, Scheidung, Umzug oder allgemeines Interesse am aktuellen Wert.

Bereits vorhandene Ratgeber-Artikel (NICHT wiederholen, auch keine sehr ähnlichen Themen):
${existingList}

Aufgabe: Recherchiere (WebSearch) EIN neues, konkretes, für die Zielgruppe wertvolles Ratgeber-Thema, das noch nicht abgedeckt ist. Mögliche Kategorien (nicht nur juristisch/steuerlich denken, gerade wenn schon viele Artikel existieren): rechtliche/steuerliche Aspekte, praktischer Verkaufsprozess (Unterlagen, Notar, Energieausweis, Maklerprovision, Home Staging, Besichtigungen), Bewertungsmethodik (Vergleichswert- vs. Sachwert- vs. Ertragswertverfahren, was beeinflusst den Wert), besondere Objekt-/Lebenssituationen (Zwangsversteigerung, Baumängel/Sanierungsstau, Denkmalschutz, vermietete Immobilie verkaufen, Auswandern und Immobilie zurücklassen), oder regionale Aspekte (Immobilienmarkt Heidenheim/Ostalbkreis, Baden-Württemberg-spezifische Regeln). Bevorzuge Themen mit echtem Suchvolumen und klarem Bezug zu Deutschland/deutschem Recht.

Schreibe dann einen vollständigen Artikel im GENAU gleichen Format wie die bestehenden Artikel:
- Einleitender Absatz, der das Thema und die Relevanz für den Leser einführt
- 4-5 <h2>-Abschnitte, die das Thema fundiert erklären
- Ein abschließender Absatz "Der sinnvolle erste Schritt", der auf die kostenlose Online-Ersteinschätzung verweist (Link-Text/Kontext, kein <a>-Tag nötig -- das übernimmt die Seite)
- Ein <h3>Quellen</h3>-Abschnitt mit echten, per WebSearch verifizierten Links zu offiziellen Quellen (bevorzugt gesetze-im-internet.de für Gesetzestexte)
- Ton: persönlich, professionell, warm, siezt den Leser, ähnlich einem erfahrenen, vertrauenswürdigen Berater

WICHTIG: Erfinde keine Rechtsvorschriften oder Zahlen -- nur was du per WebSearch tatsächlich verifiziert hast. Wenn du dir bei einem Detail unsicher bist, formuliere vorsichtiger oder lass es weg.

Gib das Ergebnis NUR als valides JSON zurück (keine Erklärung davor/danach, kein Markdown-Codeblock), mit genau diesen Feldern:
{
  "title": "...",
  "excerpt": "1-2 Sätze, Hook + Versprechen, wie ein Aufmacher",
  "meta_description": "prägnant, keyword-reich, sagt was der Leser lernt",
  "content_html": "<p>...</p><h2>...</h2>..."
}`;

  console.log(`[${timestamp}] Starte Recherche + Artikel-Entwurf...`);
  const result = await invokeClaude(prompt);

  if (result.timedOut) {
    console.error(`[${timestamp}] Claude-Aufruf: Zeitüberschreitung.`);
    return;
  }
  if (result.exitCode !== 0) {
    console.error(`[${timestamp}] Claude-Aufruf fehlgeschlagen (exit ${result.exitCode}):`, result.stderr.slice(0, 500));
    return;
  }

  const article = extractJson(result.stdout);
  if (!article) {
    console.error(`[${timestamp}] Konnte kein gültiges JSON aus der Antwort extrahieren.`);
    return;
  }
  const missing = REQUIRED_FIELDS.filter((f) => !article[f] || typeof article[f] !== "string" || !article[f].trim());
  if (missing.length > 0) {
    console.error(`[${timestamp}] Artikel-JSON unvollständig, fehlende Felder: ${missing.join(", ")}`);
    return;
  }

  const slug = await uniqueSlug(slugify(article.title));

  const { error: insertError } = await supabase.from("articles").insert({
    slug,
    title: article.title,
    excerpt: article.excerpt,
    meta_description: article.meta_description,
    content_html: article.content_html,
    published: false,
  });
  if (insertError) throw insertError;

  console.log(`[${timestamp}] Neuer Entwurf angelegt: "${article.title}" (/backend/ratgeber, Slug: ${slug})`);
}

async function main() {
  process.on("unhandledRejection", (reason) => {
    console.error(`[${new Date().toLocaleString("de-DE")}] Unhandled rejection:`, reason);
    process.exit(1);
  });
  process.on("uncaughtException", (err) => {
    console.error(`[${new Date().toLocaleString("de-DE")}] Uncaught exception:`, err);
    process.exit(1);
  });

  const once = process.argv.includes("--once");
  const bulkIndex = process.argv.indexOf("--bulk");
  const bulkCount = bulkIndex !== -1 ? parseInt(process.argv[bulkIndex + 1], 10) : null;

  async function tick(opts) {
    try {
      await runOneCycle(opts);
    } catch (err) {
      console.error(`[${new Date().toLocaleString("de-DE")}] Fehler im Durchlauf:`, err.message);
    }
  }

  // --bulk N: an explicit, human-requested stockpiling run (Finn, 2026-09-21:
  // "schreib dann schon 40-50 artikel im voraus als entwurf, die ich die
  // nächsten monate immer auf veröffentlichen kann") -- deliberately ignores
  // MAX_PENDING_DRAFTS, since that cap exists only to stop the UNATTENDED
  // recurring loop from flooding the review queue, not to block an
  // intentional one-time batch Finn asked for himself.
  if (bulkCount) {
    console.log(`Bulk-Modus: erzeuge ${bulkCount} Entwürfe nacheinander...`);
    for (let i = 1; i <= bulkCount; i++) {
      console.log(`--- Entwurf ${i}/${bulkCount} ---`);
      await tick({ skipCap: true });
    }
    console.log("Bulk-Lauf abgeschlossen.");
    return;
  }

  await tick();
  if (!once) {
    console.log("Growth-Engine läuft, neuer Versuch alle 3 Tage. Fenster schließen zum Beenden.");
    setInterval(tick, CYCLE_INTERVAL_MS);
  }
}

main();
