import sharp from "sharp";
import { Document, Packer, Paragraph, HeadingLevel, ImageRun, TextRun, AlignmentType } from "docx";
import type { SupabaseClient } from "@supabase/supabase-js";
import { siteConfig } from "@/lib/site-config";
import { exposeCategories, exposeCategoryLabels } from "@/lib/expose-categories";
import type { ProAssessment } from "@/lib/pro-valuation";

// gemini-3.5-flash war im Test spürbar zuverlässiger erreichbar als die
// neueren 3.6/3.7/3.8-Modelle (die häufiger mit 503 "high demand" antworten).
// Bei anhaltender Überlastung versucht callGemini zusätzlich ein Fallback-Modell.
const GEMINI_MODELS = ["gemini-3.5-flash", "gemini-3.6-flash"] as const;
const geminiUrl = (model: string) => `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

// Gemini erlaubt ca. 20 MB Inline-Nutzlast pro Request — Original-Fotos aus
// Handykameras sprengen das bei mehreren Bildern schnell. Für die Analyse
// reicht eine kleine, komprimierte Kopie; die volle Auflösung landet trotzdem
// unverändert im fertigen Word-Dokument.
async function resizeForAnalysis(buffer: Buffer): Promise<Buffer> {
  return sharp(buffer).rotate().resize({ width: 768, withoutEnlargement: true }).jpeg({ quality: 72 }).toBuffer();
}

async function resizeForDocument(buffer: Buffer): Promise<{ buffer: Buffer; width: number; height: number }> {
  const resized = await sharp(buffer)
    .rotate()
    .resize({ width: 1400, withoutEnlargement: true })
    .jpeg({ quality: 85 })
    .toBuffer();
  const meta = await sharp(resized).metadata();
  return { buffer: resized, width: meta.width ?? 800, height: meta.height ?? 600 };
}

type ProjectImageRow = { id: string; category: string; storage_path: string };
type ProjectDocumentRow = { id: string; filename: string; storage_path: string };

type ExposeSection = { title: string; text: string; imageCategory?: string };
type ExposeContent = {
  headline: string;
  teaser: string;
  sections: ExposeSection[];
  closing: string;
};

const MAX_IMAGES_FOR_ANALYSIS = 24;
const MAX_DOCUMENTS_FOR_ANALYSIS = 5;

function mimeFromPath(path: string): string {
  const ext = path.split(".").pop()?.toLowerCase() ?? "";
  if (ext === "png") return "image/png";
  if (ext === "webp") return "image/webp";
  if (ext === "pdf") return "application/pdf";
  return "image/jpeg";
}

function fieldLabel(assessment: Partial<ProAssessment> | null, field: keyof ProAssessment, label: string) {
  const value = assessment?.[field];
  if (!value || (Array.isArray(value) && value.length === 0)) return null;
  return `${label}: ${Array.isArray(value) ? value.join(", ") : value}`;
}

function buildFactsText(project: {
  title: string;
  address: string | null;
  property_type: string | null;
  assessment: Partial<ProAssessment> | null;
}) {
  const a = project.assessment;
  const lines = [
    `Objekt: ${project.title}`,
    project.address ? `Adresse/Lage: ${project.address}` : null,
    project.property_type ? `Objektart: ${project.property_type}` : null,
    fieldLabel(a, "yearBuiltExact", "Baujahr"),
    fieldLabel(a, "livingArea", "Wohnfläche (m²)"),
    fieldLabel(a, "plotArea", "Grundstücksfläche (m²)"),
    fieldLabel(a, "rooms", "Zimmer"),
    fieldLabel(a, "bathrooms", "Badezimmer"),
    fieldLabel(a, "condition", "Allgemeiner Zustand"),
    fieldLabel(a, "heating", "Heizung"),
    fieldLabel(a, "energyClass", "Energieeffizienzklasse"),
    fieldLabel(a, "features", "Ausstattungsmerkmale"),
    fieldLabel(a, "marketNotes", "Zusätzliche Notizen des Maklers"),
  ].filter(Boolean);
  return lines.join("\n");
}

async function downloadAsBuffer(supabase: SupabaseClient, path: string): Promise<Buffer | null> {
  const { data, error } = await supabase.storage.from("project-media").download(path);
  if (error || !data) return null;
  return Buffer.from(await data.arrayBuffer());
}

const exposeJsonSchema = {
  type: "OBJECT",
  properties: {
    headline: { type: "STRING" },
    teaser: { type: "STRING" },
    sections: {
      type: "ARRAY",
      items: {
        type: "OBJECT",
        properties: {
          title: { type: "STRING" },
          text: { type: "STRING" },
          imageCategory: { type: "STRING" },
        },
        required: ["title", "text"],
      },
    },
    closing: { type: "STRING" },
  },
  required: ["headline", "teaser", "sections", "closing"],
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Gemini ist bei mehreren Bildern manchmal langsam (bis zu ~1-2 Minuten) und
// antwortet unter Last gelegentlich mit 429/503 — das ist transient, also mit
// Backoff wiederholen statt sofort aufzugeben ("soll zuverlässig laufen").
async function callGemini(parts: Array<Record<string, unknown>>): Promise<ExposeContent> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("Kein GEMINI_API_KEY gesetzt.");

  const body = JSON.stringify({
    contents: [{ parts }],
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: exposeJsonSchema,
    },
  });

  // Jeder Versuch geht reihum ein anderes Modell durch, sodass eine
  // Überlastung eines einzelnen Modells nicht gleich die ganze Generierung
  // scheitern lässt.
  const attempts = GEMINI_MODELS.length * 2;
  let lastError: Error = new Error("Unbekannter Fehler.");
  for (let attempt = 1; attempt <= attempts; attempt++) {
    const model = GEMINI_MODELS[(attempt - 1) % GEMINI_MODELS.length];
    const isLastAttempt = attempt === attempts;

    let response: Response;
    try {
      response = await fetch(`${geminiUrl(model)}?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        signal: AbortSignal.timeout(120000),
      });
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));
      if (isLastAttempt) throw lastError;
      await sleep(attempt * 3000);
      continue;
    }

    if (!response.ok) {
      const errBody = await response.text().catch(() => "");
      lastError = new Error(`Gemini API Fehler (${response.status}, ${model}): ${errBody.slice(0, 300)}`);
      const retryable = response.status === 429 || response.status === 503;
      if (retryable && !isLastAttempt) {
        await sleep(attempt * 3000);
        continue;
      }
      throw lastError;
    }

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) throw new Error("Gemini hat keinen Text zurückgegeben.");

    try {
      return JSON.parse(text) as ExposeContent;
    } catch {
      throw new Error("Gemini-Antwort war kein gültiges JSON.");
    }
  }
  throw lastError;
}

export async function generateExposeDocx(
  supabase: SupabaseClient,
  project: {
    id: string;
    title: string;
    address: string | null;
    property_type: string | null;
    assessment: Partial<ProAssessment> | null;
  },
  images: ProjectImageRow[],
  documents: ProjectDocumentRow[]
): Promise<Buffer> {
  const imagesByCategory = new Map<string, ProjectImageRow[]>();
  for (const image of images) {
    const list = imagesByCategory.get(image.category) ?? [];
    list.push(image);
    imagesByCategory.set(image.category, list);
  }

  // --- 1. Bilder + Dokumente laden und für die Analyse verkleinern ---
  const analysisParts: Array<Record<string, unknown>> = [];
  let analysisImageCount = 0;
  for (const category of exposeCategories) {
    const categoryImages = imagesByCategory.get(category.value) ?? [];
    if (categoryImages.length === 0) continue;
    analysisParts.push({ text: `Fotos — Kategorie "${category.label}" (Schlüssel: ${category.value}):` });
    for (const image of categoryImages) {
      if (analysisImageCount >= MAX_IMAGES_FOR_ANALYSIS) break;
      const original = await downloadAsBuffer(supabase, image.storage_path);
      if (!original) continue;
      const small = await resizeForAnalysis(original);
      analysisParts.push({
        inline_data: { mime_type: "image/jpeg", data: small.toString("base64") },
      });
      analysisImageCount += 1;
    }
  }

  for (const doc of documents.slice(0, MAX_DOCUMENTS_FOR_ANALYSIS)) {
    const buffer = await downloadAsBuffer(supabase, doc.storage_path);
    if (!buffer) continue;
    const mimeType = mimeFromPath(doc.storage_path);
    if (mimeType !== "application/pdf" && !mimeType.startsWith("image/")) continue;
    analysisParts.push({ text: `Zusätzliches Dokument: ${doc.filename}` });
    analysisParts.push({ inline_data: { mime_type: mimeType, data: buffer.toString("base64") } });
  }

  const availableCategories = exposeCategories
    .filter((c) => (imagesByCategory.get(c.value)?.length ?? 0) > 0)
    .map((c) => `${c.value} (${c.label})`)
    .join(", ");

  const instructions = `Du bist ein erfahrener Texter für hochwertige Immobilien-Exposés in Deutschland.
Schreibe auf Deutsch, sachlich-hochwertig und einladend, ohne Übertreibungen oder Floskeln-Overkill.
Stütze dich NUR auf die unten genannten Fakten und die gezeigten Fotos/Dokumente — erfinde keine
Zahlen (z. B. Wohnfläche, Baujahr), die nicht explizit genannt sind.

Objektfakten:
${buildFactsText(project)}

Verfügbare Foto-Kategorien mit Bildern: ${availableCategories || "keine"}.

Gib ein JSON-Objekt zurück mit:
- "headline": eine prägnante, ansprechende Überschrift für das Exposé
- "teaser": 2-3 einleitende Sätze, die Lust auf mehr machen (z. B. zur Lage/Charakter des Objekts)
- "sections": eine Liste von Abschnitten. Erstelle GENAU EINEN Abschnitt pro Kategorie mit Fotos
  (nutze exakt den Schlüssel der Kategorie als "imageCategory", z. B. "wohnzimmer"), der die dort
  gezeigten Fotos beschreibt (was ist zu sehen, welcher Eindruck entsteht). Ergänze zusätzlich einen
  Abschnitt "Lage & Umgebung" und einen Abschnitt "Ausstattung auf einen Blick" (ohne imageCategory),
  jeweils basierend auf den Objektfakten.
- "closing": ein kurzer, freundlicher Schlussabsatz mit Kontakt-Aufforderung (z. B. für eine
  Besichtigung), ohne die Kontaktdaten selbst zu nennen (die werden separat ergänzt).`;

  const parts = [{ text: instructions }, ...analysisParts];
  const content = await callGemini(parts);

  // --- 2. Bilder in voller(er) Auflösung für das Word-Dokument vorbereiten ---
  const docImagesByCategory = new Map<string, Array<{ buffer: Buffer; width: number; height: number }>>();
  for (const [category, categoryImages] of imagesByCategory) {
    const prepared: Array<{ buffer: Buffer; width: number; height: number }> = [];
    for (const image of categoryImages) {
      const original = await downloadAsBuffer(supabase, image.storage_path);
      if (!original) continue;
      try {
        prepared.push(await resizeForDocument(original));
      } catch {
        // Datei war kein gültiges Bild -> überspringen statt Dokument-Erstellung abzubrechen.
      }
    }
    docImagesByCategory.set(category, prepared);
  }

  const MAX_DOC_WIDTH = 500;
  function imageParagraphs(prepared: Array<{ buffer: Buffer; width: number; height: number }>) {
    return prepared.map((img) => {
      const width = Math.min(MAX_DOC_WIDTH, img.width);
      const height = Math.round((img.height / img.width) * width);
      return new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 200 },
        children: [new ImageRun({ type: "jpg", data: img.buffer, transformation: { width, height } })],
      });
    });
  }

  const titleImages = docImagesByCategory.get("frontansicht") ?? [...docImagesByCategory.values()][0] ?? [];

  const children: Paragraph[] = [
    new Paragraph({
      heading: HeadingLevel.TITLE,
      spacing: { after: 200 },
      children: [new TextRun({ text: content.headline, bold: true })],
    }),
    ...(project.address
      ? [new Paragraph({ spacing: { after: 200 }, children: [new TextRun({ text: project.address, italics: true })] })]
      : []),
    ...imageParagraphs(titleImages.slice(0, 1)),
    new Paragraph({ spacing: { after: 300 }, children: [new TextRun({ text: content.teaser })] }),
  ];

  for (const section of content.sections) {
    children.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 300, after: 150 },
        children: [new TextRun({ text: section.title, bold: true })],
      }),
      new Paragraph({ spacing: { after: 200 }, children: [new TextRun({ text: section.text })] })
    );
    if (section.imageCategory) {
      const categoryImages = docImagesByCategory.get(section.imageCategory) ?? [];
      const skipFirst = section.imageCategory === "frontansicht" ? 1 : 0;
      children.push(...imageParagraphs(categoryImages.slice(skipFirst)));
    }
  }

  // Restliche Kategorien, die die KI keinem Abschnitt zugeordnet hat, trotzdem anhängen
  // (z. B. "sonstige" oder "grundriss"), damit kein hochgeladenes Foto verloren geht.
  const usedCategories = new Set(content.sections.map((s) => s.imageCategory).filter(Boolean));
  for (const category of exposeCategories) {
    if (usedCategories.has(category.value) || category.value === "frontansicht") continue;
    const remaining = docImagesByCategory.get(category.value) ?? [];
    if (remaining.length === 0) continue;
    children.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 300, after: 150 },
        children: [new TextRun({ text: exposeCategoryLabels[category.value] ?? category.label, bold: true })],
      }),
      ...imageParagraphs(remaining)
    );
  }

  children.push(
    new Paragraph({
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 300, after: 150 },
      children: [new TextRun({ text: "Kontakt", bold: true })],
    }),
    new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: content.closing })] }),
    new Paragraph({
      spacing: { after: 0 },
      children: [
        new TextRun({ text: siteConfig.operator.name, bold: true, break: 1 }),
        new TextRun({ text: siteConfig.email, break: 1 }),
      ],
    })
  );

  const doc = new Document({ sections: [{ children }] });
  return Packer.toBuffer(doc);
}
