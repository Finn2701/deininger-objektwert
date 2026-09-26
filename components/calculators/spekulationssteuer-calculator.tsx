"use client";

import { useMemo, useState } from "react";
import { formatEuroExact } from "@/lib/kaufnebenkosten";
import { parseDecimal } from "@/lib/parse-decimal";
import { computeSpeculation, usageOptions, type UsageKind } from "@/lib/spekulationssteuer";

const fieldClass =
  "mt-2 w-full rounded-xl border border-line bg-paper px-4 py-3 text-ink outline-none transition-colors focus:border-ink";

function Field({
  label,
  hint,
  children,
  className = "",
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="text-sm text-ink-soft">{label}</span>
      {children}
      {hint ? <span className="mt-1 block text-xs text-ink-soft/70">{hint}</span> : null}
    </label>
  );
}

function MoneyInput({
  label,
  value,
  onChange,
  placeholder,
  hint,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  hint?: string;
}) {
  return (
    <Field label={label} hint={hint}>
      <input
        type="text"
        inputMode="decimal"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className={fieldClass}
      />
    </Field>
  );
}

const dateDe = (iso: string) =>
  new Intl.DateTimeFormat("de-DE", { dateStyle: "long" }).format(new Date(`${iso}T12:00:00Z`));

export function SpekulationssteuerCalculator() {
  const [purchaseDate, setPurchaseDate] = useState("2019-06-01");
  const [saleDate, setSaleDate] = useState("2026-12-15");
  const [salePrice, setSalePrice] = useState("380.000");
  const [purchasePrice, setPurchasePrice] = useState("250.000");
  const [purchaseCosts, setPurchaseCosts] = useState("");
  const [improvements, setImprovements] = useState("");
  const [depreciation, setDepreciation] = useState("");
  const [saleCosts, setSaleCosts] = useState("");
  const [usage, setUsage] = useState<UsageKind>("nein");
  const [rate, setRate] = useState("35");

  const result = useMemo(
    () =>
      computeSpeculation({
        purchaseDate,
        saleDate,
        salePrice: parseDecimal(salePrice),
        purchasePrice: parseDecimal(purchasePrice),
        purchaseCosts: parseDecimal(purchaseCosts),
        improvements: parseDecimal(improvements),
        depreciationClaimed: parseDecimal(depreciation),
        saleCosts: parseDecimal(saleCosts),
        usage,
        marginalRatePercent: parseDecimal(rate),
      }),
    [purchaseDate, saleDate, salePrice, purchasePrice, purchaseCosts, improvements, depreciation, saleCosts, usage, rate]
  );

  const headline: Record<typeof result.status, { title: string; tone: string }> = {
    ungueltig: { title: "Bitte prüfen Sie die Daten", tone: "text-ink" },
    "steuerfrei-eigennutzung": { title: "Steuerfrei wegen Eigennutzung", tone: "text-ink" },
    "steuerfrei-frist": { title: "Steuerfrei: Die Zehn-Jahres-Frist ist abgelaufen", tone: "text-ink" },
    verlust: { title: "Kein Gewinn, keine Steuer", tone: "text-ink" },
    "unter-freigrenze": { title: "Steuerfrei: Gewinn unter der Freigrenze", tone: "text-ink" },
    steuerpflichtig: { title: "Steuerpflichtig", tone: "text-ink" },
  };

  return (
    <div className="rounded-2xl border border-line bg-paper-dim p-6 md:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Kaufdatum der Immobilie" hint="Datum des notariellen Kaufvertrags. Bei Erbe: Kaufdatum des Erblassers.">
          <input type="date" value={purchaseDate} onChange={(event) => setPurchaseDate(event.target.value)} className={fieldClass} />
        </Field>
        <Field label="Geplantes Verkaufsdatum" hint="Maßgeblich ist der Tag des Kaufvertrags, nicht die Übergabe.">
          <input type="date" value={saleDate} onChange={(event) => setSaleDate(event.target.value)} className={fieldClass} />
        </Field>

        <MoneyInput label="Verkaufspreis (€)" value={salePrice} onChange={setSalePrice} placeholder="z. B. 380.000" />
        <MoneyInput label="Kaufpreis damals (€)" value={purchasePrice} onChange={setPurchasePrice} placeholder="z. B. 250.000" hint="Bei Erbe: Kaufpreis des Erblassers, falls bekannt." />
        <MoneyInput label="Kaufnebenkosten damals (€, optional)" value={purchaseCosts} onChange={setPurchaseCosts} placeholder="Notar, Grunderwerbsteuer, Makler" />
        <MoneyInput label="Modernisierung und Anbauten (€, optional)" value={improvements} onChange={setImprovements} placeholder="z. B. 30.000" hint="Nur Herstellungskosten, keine reinen Reparaturen." />
        <MoneyInput
          label="Abgezogene Abschreibung (AfA, €, optional)"
          value={depreciation}
          onChange={setDepreciation}
          placeholder="0"
          hint="Nur bei Vermietung: Was Sie steuerlich abgeschrieben haben, mindert die Anschaffungskosten."
        />
        <MoneyInput label="Verkaufskosten (€, optional)" value={saleCosts} onChange={setSaleCosts} placeholder="Makler, Energieausweis, Vorfälligkeit" />

        <Field label="Wie wurde die Immobilie genutzt?" className="sm:col-span-2" hint={usageOptions.find((o) => o.value === usage)?.hint}>
          <select value={usage} onChange={(event) => setUsage(event.target.value as UsageKind)} className={fieldClass}>
            {usageOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Ihr persönlicher Steuersatz auf den Gewinn (%)" hint="Der Gewinn wird zu Ihrem Einkommen addiert. Üblich sind 25 bis 42 %; ohne Solidaritätszuschlag und Kirchensteuer.">
          <input
            type="text"
            inputMode="decimal"
            value={rate}
            onChange={(event) => setRate(event.target.value)}
            className={fieldClass}
          />
        </Field>
      </div>

      <div className="mt-8 rounded-xl border border-line bg-paper p-5" aria-live="polite">
        <p className={`font-display text-xl font-medium ${headline[result.status].tone}`}>{headline[result.status].title}</p>

        {result.status === "ungueltig" ? (
          <p className="mt-3 text-sm text-ink-soft">Das Verkaufsdatum darf nicht vor dem Kaufdatum liegen.</p>
        ) : (
          <div className="mt-4 space-y-3 text-sm text-ink-soft">
            <div className="flex items-baseline justify-between gap-3 border-b border-line pb-3">
              <span>Veräußerungsgewinn (Verkauf minus Kosten)</span>
              <span className="shrink-0 text-ink">{formatEuroExact(result.gain)}</span>
            </div>

            {result.status === "steuerpflichtig" ? (
              <>
                <div className="flex items-baseline justify-between gap-3 border-b border-line pb-3">
                  <span>Einkommensteuer auf den Gewinn (ca.)</span>
                  <span className="shrink-0 font-display text-2xl font-medium text-ink">{formatEuroExact(result.tax)}</span>
                </div>
                {result.taxFreeFrom ? (
                  <p>
                    Die Frist läuft noch {result.daysUntilTaxFree} Tag{result.daysUntilTaxFree === 1 ? "" : "e"} länger: Ein Kaufvertrag ab dem{" "}
                    <strong className="font-medium text-ink">{dateDe(result.taxFreeFrom)}</strong> wäre steuerfrei. Warten würde die Steuer von
                    rund {formatEuroExact(result.taxSavedByWaiting)} einsparen. Planen Sie einen Sicherheitsabstand von einigen Tagen ein.
                  </p>
                ) : null}
              </>
            ) : null}

            {result.status === "steuerfrei-frist" ? (
              <p>Zwischen Kauf und Verkauf liegen mehr als zehn Jahre. Der Gewinn bleibt steuerfrei.</p>
            ) : null}
            {result.status === "steuerfrei-eigennutzung" ? (
              <p>Wegen der Eigennutzung greift die Ausnahme in § 23 Abs. 1 Nr. 1 EStG. Prüfen Sie bei Zweifeln die genauen Zeiträume.</p>
            ) : null}
            {result.status === "unter-freigrenze" ? (
              <p>
                Der Gewinn liegt unter 1.000 Euro im Jahr. Erreicht der Gesamtgewinn aus allen privaten Veräußerungsgeschäften 1.000 Euro, ist
                der gesamte Betrag steuerpflichtig.
              </p>
            ) : null}
            {result.status === "verlust" ? (
              <p>Verluste aus privaten Veräußerungsgeschäften können nur mit Gewinnen aus privaten Veräußerungsgeschäften verrechnet werden.</p>
            ) : null}
          </div>
        )}
      </div>

      <p className="mt-4 text-xs text-ink-soft/70">
        Vereinfachte Orientierung nach § 23 EStG, ohne Solidaritätszuschlag und Kirchensteuer. Maßgeblich ist Ihr Steuerbescheid; bei Erbe,
        gemischter Nutzung oder mehreren Verkäufen im Jahr sollten Sie einen Steuerberater fragen. Keine Steuer- oder Rechtsberatung.
      </p>
    </div>
  );
}
