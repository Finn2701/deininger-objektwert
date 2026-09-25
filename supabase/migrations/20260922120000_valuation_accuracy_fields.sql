-- Neue optionale Angaben im Bewertungsrechner (Energieausweis-Klasse, Etage
-- + Aufzug bei Wohnungen, Feuchtigkeits-/Geruchsauffälligkeiten), die die
-- Schätzung genauer machen und deren Spanne verengen (siehe
-- lib/valuation-estimate.ts, precisionRatio). Jeweils nullable, da alle
-- diese Felder im Formular optional/überspringbar bleiben.
alter table leads add column if not exists energy_class text;
alter table leads add column if not exists floor_level text;
alter table leads add column if not exists has_elevator boolean;
alter table leads add column if not exists moisture_issues boolean;
alter table leads add column if not exists estimate_precision text;
