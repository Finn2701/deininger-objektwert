import type { CityPage } from "./types";

export const ulm: CityPage = {
  slug: "ulm",
  name: "Ulm",
  factorKey: "ulm",
  kreis: "Stadtkreis Ulm",
  calculatorLocation: "Ulm",
  seoTitle: "Immobilienbewertung Ulm – kostenlos",
  metaDescription:
    "Was ist Ihre Immobilie in Ulm wert? Aktuelle Preise (Wohnung ca. 4.320 €/m², Haus ca. 4.535 €/m²), Stadtteile im Vergleich und kostenloser Online-Rechner.",
  h1: "Immobilienbewertung in Ulm",
  lead:
    "Ulm ist der teuerste und dynamischste Immobilienmarkt der Region – und einer der wenigen, in dem Wohnungs- und Hauspreise zuletzt unterschiedliche Wege gegangen sind. Für Haus, Wohnung oder Grundstück in Ulm bekommen Sie hier in wenigen Minuten eine erste Wertspanne mit Ulmer Preisniveau.",
  facts: [
    { label: "Einwohner", value: "rund 130.500 (Ulm/Neu-Ulm zusammen rund 195.000)" },
    { label: "Stadtteile", value: "17, u. a. Weststadt, Eselsberg, Wiblingen, Söflingen" },
    { label: "Wirtschaft", value: "Daimler Truck, IVECO, Teva, Science City" },
    { label: "Studierende", value: "über 14.000" },
  ],
  prices: {
    wohnung: 4320,
    haus: 4535,
    wohnungRange: [2771, 6715],
    hausRange: [2239, 9070],
    asOf: "August 2026",
    sources: [
      {
        label: "immowelt Preisatlas Ulm (08/2026)",
        url: "https://www.immowelt.de/immobilienpreise/baden-wurttemberg/ulm-89073/ad08de6156",
      },
    ],
  },
  market: [
    "Ulm liegt preislich klar über dem Rest der Region: Nach immowelt kosteten Eigentumswohnungen im August 2026 im Schnitt rund 4.320 Euro pro Quadratmeter, Häuser rund 4.535 Euro – etwa das 1,5-Fache des Heidenheimer Niveaus. Auffällig ist die Zweiteilung: Wohnungspreise sind im Jahresvergleich um rund 1,7 Prozent gestiegen, während Häuser zuletzt spürbar nachgegeben haben. Marktbeobachter sprechen von einem selektiven Markt, in dem gute Objekte weiter gefragt sind, überteuerte aber länger stehen.",
    "Die Spannweite ist in Ulm die größte der Region: Bei Häusern reicht sie von rund 2.200 bis über 9.000 Euro pro Quadratmeter, bei Wohnungen von etwa 2.800 bis über 6.700 Euro. Zwischen einem einfachen Reihenhaus am Stadtrand und einer Villa in bester Lage liegen Welten. Deshalb ist es gerade in Ulm wichtig, Zustand, Energieklasse und Ausstattung in die Einschätzung einzubeziehen, statt sich an einem Durchschnittswert zu orientieren.",
  ],
  quarters: [
    {
      name: "Weststadt",
      note: "Mit rund 24.500 Einwohnern der bevölkerungsreichste Stadtteil. Lebendig und zentrumsnah, ein beliebter Standort für Eigentumswohnungen und Kapitalanlagen.",
    },
    {
      name: "Eselsberg",
      note: "Rund 19.000 Einwohner. Hier liegen die Universität, die Hochschule und die Science City – entsprechend hoch ist die Nachfrage nach Wohnraum von Studierenden, Forschenden und Klinikpersonal.",
    },
    {
      name: "Wiblingen",
      note: "Rund 16.400 Einwohner im Süden der Stadt, mit dem historischen Kloster als Wahrzeichen. Ein eigenständiger Wohnstandort mit guter Infrastruktur und vielen Familien.",
    },
    {
      name: "Söflingen",
      note: "Rund 11.800 Einwohner im Westen, mit dörflichem Kern und gewachsenen Wohngebieten – gefragt bei Familien und Käufern von Einfamilienhäusern.",
    },
    {
      name: "Stadtmitte und Altstadt",
      note: "Rund um Münster und Fischerviertel. Historische Bausubstanz, teils unter Denkmalschutz – das wirkt sich auf Sanierungsmöglichkeiten und damit auf den Wert aus.",
    },
  ],
  economy: [
    "Ulm ist Wissenschafts- und Wirtschaftsstadt. Die Science City auf dem Eselsberg verbindet Universität, Hochschule, Kliniken und Forschungszentren mit Unternehmen wie Daimler Truck, IVECO und Teva; über 14.000 Studierende prägen die Stadt. Mehr als 10.000 Unternehmen profitieren nach Angaben der Stadt von dieser Konzentration an Entwicklungskompetenz. Das sorgt für stabile Nachfrage von Fachkräften und Zuziehenden.",
    "Für Verkäufer bedeutet das: Kleine, gut geschnittene Wohnungen mit guter Verkehrsanbindung sind besonders gefragt, bei Häusern zählt vor allem der Zustand. Interessenten kommen nicht nur aus Ulm, sondern auch aus der Region und aus dem angrenzenden Neu-Ulm auf der bayerischen Seite.",
  ],
  sellingNotes: [
    {
      title: "Ulm oder Neu-Ulm: unterschiedliche Grunderwerbsteuer",
      text: "Wer in Ulm eine Immobilie kauft, zahlt in Baden-Württemberg 5,0 % Grunderwerbsteuer. Liegt dieselbe Immobilie ein paar Hundert Meter weiter in Neu-Ulm (Bayern), sind es 3,5 %. Käufer vergleichen deshalb gern beide Seiten der Donau – ein Argument, das Sie bei der Preisverhandlung kennen sollten. Maßgeblich ist der Standort der Immobilie, nicht der Wohnort des Käufers.",
    },
    {
      title: "Denkmalschutz in der Altstadt",
      text: "In denkmalgeschützten Bereichen rund um Münster und Fischerviertel sind Umbauten und energetische Sanierungen genehmigungspflichtig. Das kann den Wert dämpfen, aber auch steuerliche Abschreibungsmöglichkeiten eröffnen. Bei Objekten in diesen Lagen lohnt sich eine persönliche Einschätzung zusätzlich zum Online-Ergebnis.",
    },
    {
      title: "Selektiver Markt: Preis von Anfang an realistisch ansetzen",
      text: "Wenn Objekte in einem selektiven Markt zu hoch angesetzt sind, bleiben sie oft lange im Angebot – und verlieren dann durch Preisnachlässe mehr, als eine realistische Ansetzung gekostet hätte. Eine belastbare Einschätzung vor dem Inserat spart hier Zeit und Geld.",
    },
  ],
  faq: [
    {
      question: "Was kostet eine Immobilie in Ulm pro Quadratmeter?",
      answer:
        "Laut immowelt (August 2026) liegen Eigentumswohnungen in Ulm im Schnitt bei rund 4.320 €/m², Häuser bei rund 4.535 €/m². Die Spanne ist sehr groß: Häuser reichen von rund 2.200 bis über 9.000 €/m², Wohnungen von etwa 2.800 bis über 6.700 €/m².",
    },
    {
      question: "Steigen oder fallen die Immobilienpreise in Ulm?",
      answer:
        "Zweigeteilt: Wohnungspreise sind im Jahresvergleich um rund 1,7 % gestiegen, Hauspreise haben zuletzt spürbar nachgegeben. Der Markt gilt als selektiv – gute, angemessen bepreiste Objekte finden weiter Käufer.",
    },
    {
      question: "Ist die Grunderwerbsteuer in Ulm höher als in Neu-Ulm?",
      answer:
        "Ja. In Baden-Württemberg (Ulm) beträgt sie 5,0 %, in Bayern (Neu-Ulm) 3,5 %. Maßgeblich ist, in welchem Bundesland die Immobilie liegt.",
    },
    {
      question: "Bewerten Sie auch Immobilien in den Ulmer Stadtteilen und Ortschaften?",
      answer:
        "Ja. Der Rechner funktioniert für das gesamte Ulmer Stadtgebiet – von der Weststadt über Wiblingen und Söflingen bis zu den Ortschaften wie Jungingen oder Lehr. Geben Sie einfach Ihre Adresse oder Postleitzahl an.",
    },
  ],
  neighbors: ["neu-ulm", "langenau", "blaustein", "giengen", "niederstotzingen"],
  relatedArticles: [
    "bodenrichtwert-erklaert",
    "was-kostet-immobilienbewertung",
    "nachlassimmobilie-vermieten-oder-verkaufen",
  ],
};
