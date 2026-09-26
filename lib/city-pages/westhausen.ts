import type { CityPage } from "./types";

export const westhausen: CityPage = {
  slug: "westhausen",
  name: "Westhausen",
  factorKey: "westhausen",
  kreis: "Ostalbkreis",
  calculatorLocation: "Westhausen",
  seoTitle: "Immobilienbewertung Westhausen – kostenlos",
  metaDescription:
    "Was ist Ihre Immobilie in Westhausen wert? Aktuelle Preise (Haus ca. 3.280 €/m², Wohnung ca. 2.860 €/m²), Ortsteile und kostenloser Rechner.",
  h1: "Immobilienbewertung in Westhausen (Ostalbkreis)",
  lead:
    "Westhausen liegt direkt an der A7-Anschlussstelle Aalen/Westhausen zwischen Aalen und Ellwangen, mit stündlichem Bahnhalt. Für Haus, Wohnung oder Grundstück in Westhausen und seinen 13 Ortsteilen bekommen Sie hier in wenigen Minuten eine erste, kostenlose Wertspanne.",
  facts: [
    { label: "Einwohner", value: "rund 6.130 (31.12.2025)" },
    { label: "Ortsteile", value: "13, u. a. Reichenbach, Westerhofen, Baiershofen, Immenhofen, Jagsthausen, Lippach" },
    { label: "Lage", value: "rund 474 m ü. NN, Aalen rund 6 km, Ellwangen rund 7 km" },
    { label: "Verkehr", value: "A7 (Anschlussstelle Aalen/Westhausen), Bahnhalt mit stündlichen Verbindungen" },
  ],
  prices: {
    wohnung: 2864,
    haus: 3282,
    hausRange: [2926, 4012],
    wohnungRange: [2478, 4267],
    asOf: "September 2026",
    sources: [
      {
        label: "immowelt Preisatlas Westhausen (09/2026)",
        url: "https://www.immowelt.de/immobilienpreise/baden-wurttemberg/westhausen-73463/ad08de5562",
      },
      {
        label: "ImmoScout24 Immobilienpreise Westhausen (Ostalbkreis)",
        url: "https://www.immobilienscout24.de/immobilienpreise/baden-wuerttemberg/ostalbkreis/westhausen",
      },
    ],
    note: "Andere Auswertungen nennen für Wohnungen rund 2.720 €/m² und für Häuser rund 3.240 €/m². Die genannten Werte (September 2026) sind Richtgrößen.",
  },
  market: [
    "Nach immowelt kosteten Häuser in Westhausen im September 2026 im Schnitt rund 3.280 Euro pro Quadratmeter (Spanne rund 2.930 bis 4.010 Euro), Eigentumswohnungen rund 2.860 Euro (Spanne rund 2.480 bis 4.270 Euro). Bei Häusern liegt Westhausen damit rund 13 Prozent über Heidenheim und ungefähr auf dem Niveau von Aalen, bei Wohnungen darunter.",
    "Die Mieten lagen im zweiten Quartal 2026 bei rund 9,30 Euro pro Quadratmeter; andere Auswertungen nennen rund 10,70 Euro. Der Markt gilt als stabil mit moderatem Wachstum. Käufer sind häufig Aalener Pendler, die A7 und Bahn nutzen und den Preisabstand zur Stadt schätzen.",
  ],
  quarters: [
    {
      name: "Westhausen (Kernort)",
      note: "Der Hauptort mit Rathaus, Bahnhalt und den meisten Wohngebieten. Einfamilienhäuser und einzelne Mehrfamilienhäuser; Bahn- und A7-Nähe sind gefragt.",
    },
    {
      name: "Reichenbach, Westerhofen und Lippach",
      note: "Ortsteile mit eigener Dorfstruktur und Einfamilienhäusern. Nachgefragt bei Familien, die etwas außerhalb wohnen möchten.",
    },
    {
      name: "Baiershofen, Immenhofen, Jagsthausen und weitere Ortsteile",
      note: "Kleinere, ländlich geprägte Ortsteile. Zustand, Grundstück und Erschließung bestimmen den Preis stärker als die Lage.",
    },
  ],
  economy: [
    "Westhausen ist Gewerbestandort: Zu den Arbeitgebern zählen die Apex Tool Group (Werkzeughersteller mit Europasitz), die GEO DATA GmbH und die OstalbPA (Großbühnen für Veranstaltungen). Viele Einwohner arbeiten außerdem in Aalen und Ellwangen.",
    "Verkehrlich profitiert Westhausen von der A7 mit der Anschlussstelle Aalen/Westhausen und einem Bahnhalt an der Strecke Stuttgart–Nördlingen mit stündlichen Verbindungen. Ungewöhnlich: Die Europäische Wasserscheide verläuft quer zur A7 durch die Gemeinde.",
  ],
  sellingNotes: [
    {
      title: "A7 und Bahnhalt konkret nennen",
      text: "Autobahnanschluss und stündlicher Bahnhalt sind starke Argumente für Pendler. Geben Sie die Fahrzeit nach Aalen (rund 6 Kilometer) und Ellwangen (rund 7 Kilometer) sowie die Gehminuten zum Bahnhalt an.",
    },
    {
      title: "Lärm der A7 ehrlich einordnen",
      text: "Bei Häusern nahe der Autobahn fragen Käufer nach Lärm. Wenn Ihr Haus abgeschirmt liegt, sagen Sie das; wenn nicht, hilft Offenheit, eine sachliche Preisverhandlung zu führen.",
    },
    {
      title: "Datenlage: Spanne beachten",
      text: "Wenn Häuser im Angebot von rund 2.900 bis 4.000 Euro pro Quadratmeter reichen, sagt der Durchschnitt wenig über Ihr Objekt. Eine Einschätzung, die Zustand und Ausstattung einbezieht, ist belastbarer.",
    },
  ],
  faq: [
    {
      question: "Was kostet eine Immobilie in Westhausen?",
      answer:
        "Nach immowelt (September 2026) liegen Häuser in Westhausen im Schnitt bei rund 3.280 €/m², Eigentumswohnungen bei rund 2.860 €/m². Entscheidend sind Zustand, Baujahr und Ortsteil.",
    },
    {
      question: "Bewerten Sie auch Immobilien in Reichenbach, Lippach oder Jagsthausen?",
      answer:
        "Ja. Der Rechner funktioniert für die gesamte Gemeinde einschließlich aller 13 Ortsteile. Geben Sie einfach Ihre Adresse oder Postleitzahl an.",
    },
    {
      question: "Wie gut ist Westhausen angebunden?",
      answer:
        "Die A7 ist über die Anschlussstelle Aalen/Westhausen erreichbar, der Bahnhalt liegt an der Strecke Stuttgart–Nördlingen mit stündlichen Verbindungen. Aalen ist rund 6 Kilometer entfernt.",
    },
    {
      question: "Ist die Ersteinschätzung verbindlich?",
      answer:
        "Nein. Sie ist kostenlos und unverbindlich. Für Bank, Gericht oder Finanzamt brauchen Sie in der Regel ein Verkehrswertgutachten eines Sachverständigen.",
    },
  ],
  neighbors: ["aalen", "ellwangen", "lauchheim"],
  relatedArticles: [
    "was-kostet-immobilienbewertung",
    "bodenrichtwert-erklaert",
    "energieausweis-beim-hausverkauf-pflicht-fristen-und-was-sich",
  ],
};
