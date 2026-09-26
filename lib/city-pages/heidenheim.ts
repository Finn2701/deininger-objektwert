import type { CityPage } from "./types";

export const heidenheim: CityPage = {
  slug: "heidenheim",
  name: "Heidenheim an der Brenz",
  factorKey: "heidenheim an der brenz",
  kreis: "Landkreis Heidenheim",
  calculatorLocation: "Heidenheim an der Brenz",
  seoTitle: "Immobilienbewertung Heidenheim – kostenlos",
  metaDescription:
    "Was ist Ihre Immobilie in Heidenheim wert? Aktuelle Preise (Wohnung ca. 2.800 €/m², Haus ca. 2.890 €/m²), Stadtteile und kostenloser Online-Rechner.",
  h1: "Immobilienbewertung in Heidenheim an der Brenz",
  lead:
    "Heidenheim ist mein Heimatmarkt: Hier sitzt Deininger Objektwert, und hier kenne ich Straßen, Stadtteile und Preisniveaus aus erster Hand. Der Rechner unten liefert Ihnen in wenigen Minuten eine erste Wertspanne für Haus, Wohnung oder Grundstück – auf Basis aktueller Marktdaten für Heidenheim, nicht eines Bundesdurchschnitts.",
  facts: [
    { label: "Einwohner", value: "rund 50.000" },
    { label: "Status", value: "Große Kreisstadt, Sitz des Landkreises Heidenheim" },
    { label: "Größte Arbeitgeber", value: "Voith, Hartmann, Schwenk Zement" },
    { label: "Hochschule", value: "DHBW Heidenheim" },
  ],
  prices: {
    wohnung: 2804,
    haus: 2892,
    wohnungRange: [1778, 4884],
    hausRange: [1440, 5353],
    asOf: "September 2026",
    sources: [
      {
        label: "immowelt Preisatlas Heidenheim an der Brenz (09/2026)",
        url: "https://www.immowelt.de/immobilienpreise/baden-wurttemberg/heidenheim-an-der-brenz-89518/ad08de5538",
      },
    ],
  },
  market: [
    "Nach der Auswertung von immowelt liegen Eigentumswohnungen in Heidenheim im September 2026 im Schnitt bei rund 2.800 Euro pro Quadratmeter, Häuser bei rund 2.890 Euro. Das ist im Vergleich zu Ulm (über 4.300 Euro) oder Aalen (über 3.300 Euro) ein moderates Niveau – und genau das macht Heidenheim für Familien aus der Region und für Pendler attraktiv. Die Wohnungspreise sind über die letzten zwölf Monate um etwa 2,7 Prozent gestiegen: kein Boom, sondern ein stetiger, kaufkräftig getragener Markt.",
    "Die Streuung ist allerdings groß: Von unter 1.800 Euro für sanierungsbedürftige Wohnungen bis knapp 4.900 Euro für hochwertige, moderne Objekte reicht die Spanne bei Wohnungen; bei Häusern von rund 1.440 bis über 5.300 Euro pro Quadratmeter. Der Durchschnittswert sagt deshalb wenig über Ihre konkrete Immobilie – entscheidend sind Zustand, Baujahr, Energieeffizienz und die Lage innerhalb der Stadt. Genau diese Faktoren fragt der Rechner ab.",
  ],
  quarters: [
    {
      name: "Innenstadt",
      note: "Laut immowelt der Stadtteil mit dem höchsten Durchschnittspreis (rund 2.930 €/m²). Kurze Wege, Einkaufsmöglichkeiten, Bahnhof – gefragt bei Wohnungskäufern und Kapitalanlegern.",
    },
    {
      name: "Schnaitheim",
      note: "Der größte Ortsteil im Norden am Beginn des Brenztals. Viele Einfamilienhäuser und Reihenhäuser, dörflicher Charakter mit guter Anbindung an die Kernstadt.",
    },
    {
      name: "Mergelstetten",
      note: "Im Süden entlang der Brenz gelegen, mit Industrie- und Wohngebieten (u. a. Zementwerk) und Nähe zu Herbrechtingen und der A7.",
    },
    {
      name: "Großkuchen",
      note: "Laut immowelt der günstigste Stadtteil (Durchschnitt rund 2.480 €/m²) – ruhig, ländlich geprägt, oft interessant für Käufer mit mehr Grundstücksbedarf.",
    },
    {
      name: "Oggenhausen und Aufhausen",
      note: "Kleinere, ländlich geprägte Ortsteile mit überwiegend Ein- und Zweifamilienhäusern. Hier entscheidet die Grundstücksgröße oft stärker über den Preis als in der Kernstadt.",
    },
  ],
  economy: [
    "Heidenheim ist Industriestandort: Der Voith-Konzern hat seinen Sitz in der Stadt und ist mit Abstand der prägende Arbeitgeber, dazu kommen der Medizinproduktehersteller Hartmann und Schwenk Zement. Diese stabile industrielle Basis trägt die Nachfrage nach Wohnraum – auch von Fachkräften, die aus der Region oder von außerhalb zuziehen.",
    "Ergänzt wird das durch die Duale Hochschule Baden-Württemberg (DHBW) mit ihrem Standort in Heidenheim, die Opernfestspiele auf Schloss Hellenstein und den 1. FC Heidenheim 1846, der die Stadt überregional bekannt gemacht hat. Diese weichen Standortfaktoren stärken Heidenheim als Wohnort und wirken langfristig auf die Nachfrage.",
  ],
  sellingNotes: [
    {
      title: "Preisfindung: Angebotspreis ist nicht Kaufpreis",
      text: "Die genannten Durchschnitte sind Angebotspreise aus Immobilienportalen. Was tatsächlich beim Notar beurkundet wird, kann niedriger liegen. Einen ersten Anhaltspunkt für den Bodenanteil liefern die amtlichen Bodenrichtwerte, die Sie über den Gutachterausschuss bzw. das Bodenrichtwertportal Baden-Württemberg einsehen können – wie das funktioniert, erkläre ich im Ratgeber zum Bodenrichtwert.",
    },
    {
      title: "Steuern und Nebenkosten in Baden-Württemberg",
      text: "Für Käufer fällt in Baden-Württemberg 5,0 % Grunderwerbsteuer an. Für Sie als Verkäufer ist vor allem die Zehn-Jahres-Frist nach § 23 EStG relevant: Wer eine nicht selbst genutzte Immobilie innerhalb von zehn Jahren nach dem Kauf mit Gewinn verkauft, muss den Gewinn versteuern. Die Grundsteuer richtet sich in Baden-Württemberg im Wesentlichen nach Bodenrichtwert und Grundstücksfläche, nicht nach dem Gebäude.",
    },
    {
      title: "Unterlagen früh zusammenstellen",
      text: "Bei einem Verkauf werden Grundbuchauszug, Flurkarte, Baupläne, Energieausweis und – bei Eigentumswohnungen – die WEG-Unterlagen verlangt. Gerade bei älteren Häusern in Schnaitheim oder Mergelstetten fehlen oft Baupläne; die lassen sich beim Bauamt der Stadt nachfordern, was einige Wochen dauern kann. Der Energieausweis ist beim Verkauf Pflicht (§ 80 GEG).",
    },
  ],
  faq: [
    {
      question: "Was ist eine Immobilie in Heidenheim aktuell wert?",
      answer:
        "Laut immowelt (September 2026) kosten Eigentumswohnungen in Heidenheim im Schnitt rund 2.800 €/m², Häuser rund 2.890 €/m². Der Wert Ihrer konkreten Immobilie kann deutlich davon abweichen – Zustand, Baujahr, Energieeffizienz und Lage im Stadtgebiet sind entscheidend. Der kostenlose Rechner auf dieser Seite gibt Ihnen in wenigen Minuten eine erste Spanne.",
    },
    {
      question: "Welcher Stadtteil in Heidenheim ist am teuersten?",
      answer:
        "Nach den Daten von immowelt ist die Innenstadt mit rund 2.930 €/m² am teuersten, Großkuchen mit rund 2.480 €/m² am günstigsten. Innerhalb eines Stadtteils schwanken die Preise aber stark je nach Objekt.",
    },
    {
      question: "Lohnt es sich, in Heidenheim jetzt zu verkaufen?",
      answer:
        "Die Wohnungspreise sind in den letzten zwölf Monaten um rund 2,7 % gestiegen, die Nachfrage wird durch die Industriearbeitsplätze und die Hochschule gestützt. Ob der Zeitpunkt für Sie passt, hängt aber vor allem von Ihrer persönlichen Situation und – bei einer nicht selbst genutzten Immobilie – von der steuerlichen Zehn-Jahres-Frist ab.",
    },
    {
      question: "Ist die Bewertung für Heidenheim wirklich kostenlos?",
      answer:
        "Ja. Die Online-Ersteinschätzung ist kostenlos und unverbindlich. Sie ersetzt kein Verkehrswertgutachten (etwa für Bank, Gericht oder Finanzamt), gibt Ihnen aber eine belastbare Orientierung, bevor Sie weitere Schritte planen.",
    },
  ],
  neighbors: ["herbrechtingen", "giengen", "oberkochen", "aalen"],
  relatedArticles: [
    "bodenrichtwert-erklaert",
    "was-kostet-immobilienbewertung",
    "spekulationssteuer-beim-immobilienverkauf-wann-sie-anfaellt-und-wie-sie-sie-legal-vermeiden",
  ],
};
