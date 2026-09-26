/**
 * Amtliche Bodenrichtwert-Portale der 16 Bundesländer. Alle Links wurden am 26.09.2026 einzeln aufgerufen
 * (HTTP 200); Portale ändern gelegentlich ihre Adresse, daher ist der Stand mit angegeben.
 * Quelle der Zuordnung: Auskunftsseiten der Landesvermessungsverwaltungen bzw. Gutachterausschüsse.
 */
export const PORTALE_STAND = "September 2026";
export const PORTALE_STAND_ISO = "2026-09-26";

export interface BodenrichtwertPortal {
  code: string;
  state: string;
  portal: string;
  url: string;
  note?: string;
}

export const bodenrichtwertPortale: BodenrichtwertPortal[] = [
  {
    code: "BW",
    state: "Baden-Württemberg",
    portal: "BORIS-BW (Gutachterausschüsse Baden-Württemberg)",
    url: "https://www.gutachterausschuesse-bw.de/borisbw/",
  },
  { code: "BY", state: "Bayern", portal: "BORIS Bayern", url: "https://www.boris-bayern.de/" },
  {
    code: "BE",
    state: "Berlin",
    portal: "BORIS Berlin (Gutachterausschuss für Grundstückswerte)",
    url: "https://www.berlin.de/gutachterausschuss/marktinformationen/bodenrichtwerte/",
  },
  { code: "BB", state: "Brandenburg", portal: "BORIS Land Brandenburg", url: "https://boris.brandenburg.de/" },
  {
    code: "HB",
    state: "Bremen",
    portal: "Gutachterausschuss Bremen",
    url: "https://www.gutachterausschuss.bremen.de/bodenrichtwerte-1467",
    note: "Die Bremer Werte werden über das niedersächsische System Immobilienmarkt.NI abgerufen.",
  },
  { code: "HH", state: "Hamburg", portal: "BORIS.HH (Geoportal Hamburg)", url: "https://geoportal-hamburg.de/boris/" },
  {
    code: "HE",
    state: "Hessen",
    portal: "BORIS Hessen (Hessische Verwaltung für Bodenmanagement und Geoinformation)",
    url: "https://hvbg.hessen.de/immobilienwertermittlung/boris-hessen",
  },
  {
    code: "MV",
    state: "Mecklenburg-Vorpommern",
    portal: "BORIS.MV (Landesamt für innere Verwaltung, GeoPortal.MV)",
    url: "https://www.laiv-mv.de/Geoinformation/Wertermittlung/Bodenrichtwerte/",
  },
  {
    code: "NI",
    state: "Niedersachsen",
    portal: "Immobilienmarkt.NI / BORIS.NI (LGLN)",
    url: "https://immobilienmarkt.niedersachsen.de/bodenrichtwerte",
    note: "Werte werden in der Regel jährlich zum 1. Januar ermittelt.",
  },
  {
    code: "NW",
    state: "Nordrhein-Westfalen",
    portal: "BORIS.NRW",
    url: "https://www.boris.nrw.de/boris-nrw/",
  },
  {
    code: "RP",
    state: "Rheinland-Pfalz",
    portal: "BORIS-RLP (Bodenrichtwerte im Landesportal)",
    url: "https://maps.rlp.de/viewer/bodenrichtwerte/",
  },
  {
    code: "SL",
    state: "Saarland",
    portal: "Geoportal Saarland (Bodenrichtwerte)",
    url: "https://geoportal.saarland.de/",
    note: "Die Werte werden alle zwei Jahre festgestellt.",
  },
  { code: "SN", state: "Sachsen", portal: "BORIS Sachsen", url: "https://www.boris.sachsen.de/" },
  {
    code: "ST",
    state: "Sachsen-Anhalt",
    portal: "Geodatenportal Sachsen-Anhalt (Bodenrichtwerte)",
    url: "https://www.lvermgeo.sachsen-anhalt.de/de/gdp-bodenrichtwerte.html",
    note: "Werte werden alle zwei Jahre zum 1. Januar beschlossen, zuletzt zum 1. Januar 2026.",
  },
  {
    code: "SH",
    state: "Schleswig-Holstein",
    portal: "BORIS SH (Gutachterausschüsse, Digitaler Atlas Nord)",
    url: "https://www.schleswig-holstein.de/gaa/DE/Bodenrichtwerte",
    note: "15 Gutachterausschüsse, die Werte liegen zentral im Digitalen Atlas Nord.",
  },
  {
    code: "TH",
    state: "Thüringen",
    portal: "BORIS-TH (Landesamt für Bodenmanagement und Geoinformation)",
    url: "https://tlbg.thueringen.de/wertermittlung/bodenrichtwert-informationssystem-thueringen-boris-th",
    note: "Werte werden alle zwei Jahre beschlossen.",
  },
];

/** Länderübergreifendes Bundesportal (Gemeinschaftsprojekt mehrerer Länder). */
export const borisD = {
  name: "BORIS-D",
  url: "https://www.bodenrichtwerte-boris.de/boris-d/",
};
