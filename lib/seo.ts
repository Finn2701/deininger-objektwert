/**
 * Snippet-taugliche Titel und Beschreibungen für Ratgeber-Artikel. Die Artikel-Überschrift (H1) darf lang
 * sein, der <title> sollte in den Suchergebnissen nicht abgeschnitten werden (rund 60 Zeichen).
 * Für bestehende Artikel gibt es handgeschriebene Fassungen; für neue Artikel kürzt `shortenTitle`
 * automatisch an einem Trennzeichen oder Wortende.
 */
const TITLE_MAX = 60;
const DESCRIPTION_MAX = 158;

const overrides: Record<string, { title: string; description: string }> = {
  "energieausweis-beim-hausverkauf-pflicht-fristen-und-was-sich": {
    title: "Energieausweis beim Hausverkauf: Pflicht und Fristen",
    description:
      "Energieausweis beim Immobilienverkauf: Pflicht, Bedarfs- vs. Verbrauchsausweis, Pflichtangaben im Inserat, Fristen und Bußgelder verständlich erklärt.",
  },
  "spekulationssteuer-beim-immobilienverkauf-wann-sie-anfaellt-und-wie-sie-sie-legal-vermeiden": {
    title: "Spekulationssteuer beim Immobilienverkauf vermeiden",
    description:
      "Spekulationssteuer beim Hausverkauf: 10-Jahres-Frist, Eigennutzung, Berechnung und Freigrenze nach § 23 EStG – mit Tipps, sie legal zu vermeiden.",
  },
  "erbengemeinschaft-immobilie-verkaufen": {
    title: "Immobilie in der Erbengemeinschaft verkaufen",
    description:
      "Warum die Erbengemeinschaft eine Immobilie nur einstimmig verkaufen kann (§§ 2038, 2040 BGB), was bei Uneinigkeit möglich ist und wann Teilungsversteigerung droht.",
  },
  "teilungsversteigerung-vermeiden": {
    title: "Teilungsversteigerung vermeiden: Was stattdessen hilft",
    description:
      "Was eine Teilungsversteigerung ist (§§ 180 ff. ZVG), warum sie meist Wert vernichtet, wie lange sie dauert und mit welchen Schritten Sie sie noch abwenden.",
  },
  "nachlassimmobilie-vermieten-oder-verkaufen": {
    title: "Geerbte Immobilie: vermieten oder verkaufen?",
    description:
      "Vermieten oder verkaufen nach dem Erbfall: Wie die Spekulationsfrist nach § 23 EStG läuft, wann ein Verkauf steuerfrei ist und was die Entscheidung noch bestimmt.",
  },
  "scheidungsimmobilie-haus-bei-scheidung": {
    title: "Haus bei Scheidung: Was passiert mit der Immobilie?",
    description:
      "Gemeinsame Immobilie bei Scheidung: Zugewinnausgleich (§ 1378 BGB), Sonderrolle geerbter Immobilien und die Optionen Verkauf, Auszahlung oder Vermietung.",
  },
  "bodenrichtwert-erklaert": {
    title: "Bodenrichtwert erklärt: Bedeutung und Einfluss",
    description:
      "Was der Bodenrichtwert ist, wer ihn festlegt, wo Sie ihn finden (in Baden-Württemberg über BORIS-BW) und warum er nicht dem tatsächlichen Grundstückspreis entspricht.",
  },
  "immobilie-geerbt-wert-ermitteln": {
    title: "Immobilie geerbt: So ermittelt das Finanzamt den Wert",
    description:
      "Wie das Finanzamt eine geerbte Immobilie bewertet, warum der Ansatz oft zu hoch ausfällt und wie Sie nach § 198 BewG einen niedrigeren Wert nachweisen.",
  },
  "was-kostet-immobilienbewertung": {
    title: "Was kostet eine Immobilienbewertung? Vergleich",
    description:
      "Online-Check, Kurzgutachten oder Verkehrswertgutachten nach § 194 BauGB: Unterschiede, typische Preise und wann welche Bewertungsstufe nötig ist.",
  },
};

function cutAtWord(text: string, max: number) {
  if (text.length <= max) return text;
  const slice = text.slice(0, max + 1);
  const cut = slice.lastIndexOf(" ");
  return slice.slice(0, cut > max * 0.6 ? cut : max).replace(/[\s,;:–-]+$/, "");
}

export function shortenTitle(title: string, max = TITLE_MAX) {
  if (title.length <= max) return title;
  // Bevorzugt an einem Trenner (":", " – ", "?") kürzen, der noch in die Grenze passt.
  const separators = [": ", " – ", "? ", " - "];
  let best = -1;
  for (const separator of separators) {
    const index = title.indexOf(separator);
    if (index > 20 && index <= max) best = Math.max(best, index + (separator === "? " ? 1 : 0));
  }
  return best > 0 ? title.slice(0, best).trim() : cutAtWord(title, max);
}

export function shortenDescription(description: string, max = DESCRIPTION_MAX) {
  if (description.length <= max) return description;
  return `${cutAtWord(description, max - 1)}…`;
}

export function articleSeo(article: { slug: string; title: string; meta_description: string }) {
  const manual = overrides[article.slug];
  return {
    title: manual?.title ?? shortenTitle(article.title),
    description: manual?.description ?? shortenDescription(article.meta_description),
  };
}
