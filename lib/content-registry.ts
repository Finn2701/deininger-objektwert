export interface ContentField {
  key: string;
  label: string;
  group: string;
  defaultValue: string;
  multiline?: boolean;
}

export const contentRegistry: ContentField[] = [
  {
    key: "home.hero.eyebrow",
    label: "Kicker über der Überschrift",
    group: "Startseite",
    defaultValue:
      "Kostenlose Online-Immobilienbewertung für Heidenheim an der Brenz und Umgebung",
  },
  {
    key: "home.hero.title",
    label: "Überschrift (H1)",
    group: "Startseite",
    defaultValue: "Was ist Ihre Immobilie wirklich wert?",
  },
  {
    key: "home.hero.lede",
    label: "Einleitungstext",
    group: "Startseite",
    defaultValue:
      "Lage, Substanz, Technik und Markt entscheiden über den tatsächlichen Wert – nicht eine Zahl aus dem Internet. In wenigen Minuten zu einer ersten, unverbindlichen Ersteinschätzung.",
    multiline: true,
  },
  {
    key: "bewertung.hero.title",
    label: "Überschrift (H1)",
    group: "Immobilienbewertung",
    defaultValue: "Immobilienwert ermitteln – kostenlos und unverbindlich.",
  },
  {
    key: "bewertung.hero.lede",
    label: "Einleitungstext (Platzhalter {region} möglich)",
    group: "Immobilienbewertung",
    defaultValue:
      "Egal ob Haus, Wohnung, Mehrfamilienhaus oder unbebautes Grundstück in {region} und Umgebung: Beantworten Sie ein paar Fragen zu Lage, Baujahr, Fläche und Zustand – Sie erhalten sofort eine erste Wertspanne.",
    multiline: true,
  },
  {
    key: "verkaufen.hero.title",
    label: "Überschrift (H1)",
    group: "Immobilie verkaufen",
    defaultValue: "Eine Immobilie zu verkaufen ist mehr als ein Inserat.",
  },
  {
    key: "verkaufen.hero.lede",
    label: "Einleitungstext",
    group: "Immobilie verkaufen",
    defaultValue:
      "Vom ersten Werteindruck über die richtige Vermarktungsstrategie bis zum Notartermin: Ein strukturierter Ablauf hilft, einen realistischen Preis zu erzielen und den Verkaufsprozess planbar zu halten.",
    multiline: true,
  },
  {
    key: "ueber-uns.title",
    label: "Überschrift (H1)",
    group: "Über uns",
    defaultValue: "Persönlich statt anonym.",
  },
  {
    key: "ueber-uns.intro",
    label: "Einleitungstext (Platzhalter {operator} und {region} möglich, Satz beginnt mit „Deininger Objektwert …“)",
    group: "Über uns",
    defaultValue:
      "wird von {operator} in {region} betrieben. Die Idee dahinter: eine ruhige, sachliche Herangehensweise an Immobilienbewertung – ohne Verkaufsdruck, ohne Pauschalversprechen, dafür mit einer nachvollziehbaren, transparenten Methode.",
    multiline: true,
  },
];
