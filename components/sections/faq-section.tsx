import { siteConfig } from "@/lib/site-config";
import { createClient } from "@/lib/supabase/server";

export interface FaqItem {
  question: string;
  answer: string;
}

export const defaultFaqs: FaqItem[] = [
  {
    question: "Wie verkaufe ich meine Immobilie?",
    answer:
      "Der erste Schritt ist eine kostenlose, unverbindliche Online-Ersteinschätzung des Immobilienwerts – sie zeigt Ihnen in wenigen Minuten eine realistische Wertspanne. Darauf folgt bei Bedarf ein persönliches Gespräch, das Zusammenstellen der wichtigsten Unterlagen (Grundbuchauszug, Energieausweis, Baupläne) und – auf Wunsch – eine diskrete Vermarktung ohne öffentliches Inserat. Details zum genauen Ablauf finden Sie auf der Seite „Immobilie verkaufen“.",
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
      "Nein. Auf Wunsch kann eine Vermarktung zunächst diskret und ohne öffentliches Inserat erfolgen, mit gezielter statt breiter Ansprache. Mehr dazu auf der Seite „Immobilie verkaufen“.",
  },
  {
    question: "Ist Deininger Objektwert ein Immobilienmakler?",
    answer:
      "Aktuell bietet Deininger Objektwert ausschließlich die kostenlose Online-Ersteinschätzung an. Eine Zulassung als Immobilienmakler nach § 34c GewO wird derzeit beantragt.",
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
    const supabase = await createClient();
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
