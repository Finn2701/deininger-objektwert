import { siteConfig } from "@/lib/site-config";
import { createPublicClient } from "@/lib/supabase/public";

export interface FaqItem {
  question: string;
  answer: string;
}

export const defaultFaqs: FaqItem[] = [
  {
    question: "Wie verkaufe ich meine Immobilie?",
    answer:
      "Der erste Schritt ist eine kostenlose, unverbindliche Online-Ersteinschätzung des Immobilienwerts – sie zeigt Ihnen in wenigen Minuten eine realistische Wertspanne. Danach helfen eine vollständige Unterlagenliste und ein klarer Ablauf, den eigenen Verkauf fundiert vorzubereiten. Details finden Sie auf der Seite „Immobilie verkaufen“.",
  },
  {
    question: "Was kostet die Immobilienbewertung?",
    answer:
      "Die automatische Ersteinschätzung über unseren Online-Rechner ist für Sie kostenlos und unverbindlich. Es entstehen keine Kosten und keine Verpflichtung.",
  },
  {
    question: "Wie genau ist die kostenlose Online-Bewertung?",
    answer:
      "Der Rechner liefert eine grobe, transparente Wertspanne auf Basis Ihrer Angaben und aktueller regionaler Marktdaten – keine punktgenaue Zahl. Für eine belastbare Wertermittlung, etwa gegenüber einer Bank oder einem Gericht, ist weiterhin ein qualifiziertes Gutachten vor Ort erforderlich.",
  },
  {
    question: "Wie lange dauert die Ersteinschätzung?",
    answer:
      "Die automatische Ersteinschätzung erhalten Sie direkt nach Ausfüllen des Rechners. Möchten Sie die Einschätzung vertiefen, melden wir uns in der Regel innerhalb weniger Werktage persönlich bei Ihnen.",
  },
  {
    question: "Welche Faktoren beeinflussen den Immobilienwert am meisten?",
    answer:
      "Vor allem Lage, baulicher Zustand, Baujahr, Wohnfläche, Grundstücksgröße sowie die technische Ausstattung (Heizung, Elektrik, Energieeffizienz). Die aktuelle Marktlage und Nachfrage in der Region wirken zusätzlich auf den erzielbaren Preis.",
  },
  {
    question: "Was ist der Unterschied zwischen Verkehrswert und Marktwert?",
    answer:
      "Verkehrswert (auch Marktwert) bezeichnet nach § 194 BauGB den Preis, der im gewöhnlichen Geschäftsverkehr zum Zeitpunkt der Ermittlung tatsächlich erzielt werden könnte. Im Alltag werden beide Begriffe meist synonym verwendet.",
  },
  {
    question: "Muss meine Immobilie öffentlich inseriert werden?",
    answer:
      "Nein. Ob und wie Sie Ihre Immobilie anbieten, entscheiden Sie selbst. Vorher helfen ein realistischer Preisrahmen und vollständige Unterlagen, damit Sie die nächsten Schritte bewusst planen können. Mehr dazu auf der Seite „Immobilie verkaufen“.",
  },
  {
    question: "Ist Deininger Objektwert ein Immobilienmakler?",
    answer:
      "Finn Deininger besitzt seit September 2026 die Erlaubnis nach § 34c Abs. 1 Satz 1 GewO (erteilt durch die IHK Ostwürttemberg, Details im Impressum). Der Schwerpunkt von Deininger Objektwert liegt auf der kostenlosen Online-Ersteinschätzung und verständlicher Vorbereitung rund um den Immobilienwert.",
  },
  {
    question: "Was kostet die Maklerleistung beim Verkauf?",
    answer:
      "Beim Verkauf einer Eigentumswohnung oder eines Einfamilienhauses an Privatpersonen gilt gesetzlich der Halbteilungsgrundsatz (§ 656c BGB): Käufer und Verkäufer tragen die Provision je zur Hälfte, marktüblich sind in Baden-Württemberg insgesamt 7,14 % des Kaufpreises inkl. MwSt., also je 3,57 %. Bei Mehrfamilienhäusern, Gewerbeimmobilien oder gewerblichen Käufern ist die Gestaltung frei verhandelbar. Die konkrete Höhe wird im Maklervertrag vor Beauftragung festgehalten.",
  },
  {
    question: "In welchen Regionen ist Deininger Objektwert tätig?",
    answer: `Der Fokus liegt auf ${siteConfig.region} und dem gesamten Ostalbkreis, einschließlich Aalen und den umliegenden Gemeinden. Der kostenlose Online-Rechner lässt sich darüber hinaus deutschlandweit nutzen. Sprechen Sie uns gerne zu Ihrer konkreten Lage an.`,
  },
  {
    question: "Was ist der Unterschied zwischen einer Online-Bewertung und einer Bewertung vor Ort?",
    answer:
      "Die Online-Ersteinschätzung basiert auf Ihren Angaben und regionalen Vergleichswerten – sie zeigt eine realistische Wertspanne, ersetzt aber keine Besichtigung. Erst ein Termin vor Ort erfasst Details wie tatsächlichen Renovierungszustand, individuelle Lagequalität oder besondere Ausstattungsmerkmale, die den Wert zusätzlich beeinflussen können.",
  },
];

export async function getFaqs(): Promise<FaqItem[]> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("faq_items")
      .select("question, answer")
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) return defaultFaqs;
    return data;
  } catch {
    return defaultFaqs;
  }
}
