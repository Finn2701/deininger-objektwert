import type { CityPage } from "./types";

export const lauchheim: CityPage = {
  slug: "lauchheim",
  name: "Lauchheim",
  factorKey: "lauchheim",
  kreis: "Ostalbkreis",
  calculatorLocation: "Lauchheim",
  seoTitle: "Immobilienbewertung Lauchheim – kostenlos",
  metaDescription:
    "Was ist Ihre Immobilie in Lauchheim wert? Aktuelle Preise (Haus ca. 2.820 €/m², Wohnung ca. 2.930 €/m²), Stadtteile und kostenloser Online-Rechner.",
  h1: "Immobilienbewertung in Lauchheim",
  lead:
    "Lauchheim liegt an der Riesbahn zwischen Aalen und Bopfingen, unterhalb von Schloss Kapfenburg. Für Haus, Wohnung oder Grundstück in der Kernstadt und den Stadtteilen wie Hülen oder Röttingen bekommen Sie hier in wenigen Minuten eine erste, kostenlose Wertspanne mit örtlichem Preisniveau.",
  facts: [
    { label: "Einwohner", value: "rund 4.980 (31.12.2025)" },
    { label: "Stadtteile", value: "Lauchheim, Hülen, Röttingen und zwölf weitere Dörfer und Weiler" },
    { label: "Verkehr", value: "Riesbahn stündlich nach Aalen und Donauwörth, A7 rund 6 km" },
    { label: "Besonderheit", value: "Schloss Kapfenburg, Stadtrechte seit 1431" },
  ],
  prices: {
    wohnung: 2931,
    haus: 2824,
    wohnungRange: [2193, 5315],
    hausRange: [1130, 4615],
    asOf: "Juni 2026",
    sources: [
      {
        label: "immowelt Preisatlas Lauchheim (06/2026)",
        url: "https://www.immowelt.de/immobilienpreise/baden-wurttemberg/lauchheim-73466/ad08de5561",
      },
      {
        label: "Homeday Preisatlas Lauchheim",
        url: "https://www.homeday.de/de/preisatlas/lauchheim",
      },
    ],
    note: "Lauchheim ist klein, die Spannen im Angebot sind breit – vom sanierungsbedürftigen Altbau bis zum modernen Einfamilienhaus. Die genannten Durchschnitte sind Richtgrößen.",
  },
  market: [
    "Nach immowelt kosteten Häuser in Lauchheim im Juni 2026 im Schnitt rund 2.820 Euro pro Quadratmeter, Eigentumswohnungen rund 2.930 Euro. Im Angebot reichen Hauspreise von gut 1.100 bis über 4.600 Euro, Wohnungspreise von rund 2.200 bis über 5.300 Euro pro Quadratmeter. Im Vergleich zum Vorjahr sind die Durchschnittspreise über alle Objekte leicht gestiegen, von rund 2.820 auf rund 2.900 Euro.",
    "Die Mieten lagen im Mai 2026 bei rund 9,50 Euro pro Quadratmeter (Wohnungen rund 8,90 Euro, Häuser rund 10,20 Euro). Lauchheim liegt damit preislich ungefähr auf dem Niveau von Heidenheim. Anders als in vielen Orten der Umgebung sind Wohnungen hier im Schnitt teurer als Häuser; bei der geringen Zahl an Verkäufen können wenige Objekte den Schnitt anheben.",
  ],
  quarters: [
    {
      name: "Lauchheim (Kernstadt)",
      note: "Die Stadt mit dem Altstadtkern, Bahnhof und Schloss Kapfenburg oberhalb. Im Ortskern kann Denkmalschutz gelten; außerhalb überwiegen Einfamilienhäuser.",
    },
    {
      name: "Hülen und Röttingen",
      note: "Stadtteile mit eigener Dorfstruktur. Nachgefragt bei Familien, die Ruhe suchen und mit Bahn oder Auto nach Aalen pendeln.",
    },
    {
      name: "Weitere Dörfer und Weiler",
      note: "Zwölf kleinere Ortschaften und Weiler gehören zur Stadt. Der Markt ist dort sehr klein, Grundstück, Zustand und Erschließung bestimmen den Preis.",
    },
  ],
  economy: [
    "Lauchheim ist vor allem Wohnort für Pendler nach Aalen, Bopfingen und in die Region. Die Riesbahn hält stündlich in Richtung Aalen und Donauwörth, die Auffahrt zur A7 (Aalen/Westhausen) liegt rund 6 Kilometer entfernt.",
    "Schloss Kapfenburg, 130 Meter über der Stadt, beherbergt heute die Internationale Musikschulakademie. Die Gegend ist auch archäologisch bedeutend: In Lauchheim wurden ein römisches Kastell (entdeckt 1992) und ein frühmittelalterliches Gräberfeld gefunden. Für Käufer, die Geschichte und Landschaft schätzen, ist das ein Pluspunkt.",
  ],
  sellingNotes: [
    {
      title: "Bahnanschluss und A7 nennen",
      text: "Zwischen Aalen und Bopfingen ist der Bahnhof ein Argument. Geben Sie Gehminuten zum Bahnhof und die Fahrzeit nach Aalen an; die A7-Auffahrt rund 6 Kilometer entfernt ist für Autopendler wichtig.",
    },
    {
      title: "Altstadt: Denkmalschutz klären",
      text: "In der historischen Altstadt und im Umfeld des Schlosses können Denkmal- oder Ensembleschutz gelten. Das beeinflusst Umbauten, Sanierungen und den Käuferkreis und gehört in die Preisfindung.",
    },
    {
      title: "Steuern beim Verkauf",
      text: "Wer eine nicht selbst genutzte Immobilie innerhalb von zehn Jahren nach dem Kauf mit Gewinn verkauft, muss den Gewinn nach § 23 EStG versteuern. Für selbst bewohnte Häuser gibt es Ausnahmen; welche, erklärt der Ratgeber zur Spekulationssteuer.",
    },
  ],
  faq: [
    {
      question: "Was kostet eine Immobilie in Lauchheim?",
      answer:
        "Nach immowelt (Juni 2026) kosten Häuser in Lauchheim im Schnitt rund 2.820 €/m², Eigentumswohnungen rund 2.930 €/m². Im Angebot reichen die Preise für Häuser von gut 1.100 bis über 4.600 €/m². Entscheidend sind Zustand, Baujahr und Ortsteil.",
    },
    {
      question: "Bewerten Sie auch Immobilien in Hülen, Röttingen und den kleineren Ortschaften?",
      answer:
        "Ja. Der Rechner funktioniert für das gesamte Stadtgebiet einschließlich aller Stadtteile. Geben Sie einfach Ihre Adresse oder Postleitzahl an.",
    },
    {
      question: "Wie gut ist Lauchheim angebunden?",
      answer:
        "Der Bahnhof liegt an der Riesbahn; stündlich fahren Regionalzüge nach Aalen und Donauwörth. Die A7-Anschlussstelle Aalen/Westhausen ist rund 6 Kilometer entfernt.",
    },
    {
      question: "Ist die Ersteinschätzung verbindlich?",
      answer:
        "Nein. Sie ist kostenlos und unverbindlich. Für Bank, Gericht oder Finanzamt brauchen Sie in der Regel ein Verkehrswertgutachten eines Sachverständigen.",
    },
  ],
  neighbors: ["bopfingen", "aalen", "ellwangen"],
  relatedArticles: [
    "was-kostet-immobilienbewertung",
    "spekulationssteuer-beim-immobilienverkauf-wann-sie-anfaellt-und-wie-sie-sie-legal-vermeiden",
    "bodenrichtwert-erklaert",
  ],
};
