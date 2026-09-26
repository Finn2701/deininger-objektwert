"use client";

import { useMemo, useState } from "react";
import { computeInheritance, getRelationship, relationships } from "@/lib/erbschaftsteuer";
import { formatEuroExact, formatPercent } from "@/lib/kaufnebenkosten";
import { parseDecimal } from "@/lib/parse-decimal";

const fieldClass =
  "mt-2 w-full rounded-xl border border-line bg-paper px-4 py-3 text-ink outline-none transition-colors focus:border-ink";

function MoneyField({
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
    <label className="block">
      <span className="text-sm text-ink-soft">{label}</span>
      <input
        type="text"
        inputMode="decimal"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className={fieldClass}
      />
      {hint ? <span className="mt-1 block text-xs text-ink-soft/70">{hint}</span> : null}
    </label>
  );
}

function Row({ label, value, hint, strong }: { label: string; value: string; hint?: string; strong?: boolean }) {
  return (
    <div className={`flex items-baseline justify-between gap-3 py-3 ${strong ? "" : "border-b border-line"}`}>
      <div className="min-w-0">
        <p className={strong ? "font-medium text-ink" : "text-ink-soft"}>{label}</p>
        {hint ? <p className="mt-0.5 text-xs text-ink-soft/70">{hint}</p> : null}
      </div>
      <p className={`shrink-0 whitespace-nowrap ${strong ? "font-display text-2xl font-medium text-ink" : "text-ink"}`}>
        {value}
      </p>
    </div>
  );
}

export function ErbschaftsteuerCalculator() {
  const [relationshipId, setRelationshipId] = useState("kind");
  const [total, setTotal] = useState("650.000");
  const [home, setHome] = useState("");
  const [area, setArea] = useState("");
  const [debts, setDebts] = useState("");
  const [support, setSupport] = useState("");
  const [prior, setPrior] = useState("");

  const relationship = getRelationship(relationshipId);
  const canHaveHome = relationship.familyHome !== "none";
  const canHaveSupport = relationship.id === "ehegatte" || relationship.id === "kind";

  const result = useMemo(
    () =>
      computeInheritance({
        relationshipId,
        totalValue: parseDecimal(total),
        familyHomeValue: canHaveHome ? parseDecimal(home) : 0,
        familyHomeArea: parseDecimal(area),
        debts: parseDecimal(debts),
        supportAllowance: canHaveSupport ? parseDecimal(support) : 0,
        priorAcquisitions: parseDecimal(prior),
      }),
    [relationshipId, total, home, area, debts, support, prior, canHaveHome, canHaveSupport]
  );

  const hasInput = parseDecimal(total) > 0;

  return (
    <div className="rounded-2xl border border-line bg-paper-dim p-6 md:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block sm:col-span-2">
          <span className="text-sm text-ink-soft">Ihr Verhältnis zum Verstorbenen</span>
          <select value={relationshipId} onChange={(event) => setRelationshipId(event.target.value)} className={fieldClass}>
            {relationships.map((r) => (
              <option key={r.id} value={r.id}>
                {r.label} (Klasse {r.taxClass})
              </option>
            ))}
          </select>
          {relationship.hint ? <span className="mt-1 block text-xs text-ink-soft/70">{relationship.hint}</span> : null}
        </label>

        <MoneyField
          label="Wert des gesamten Erwerbs (€)"
          value={total}
          onChange={setTotal}
          placeholder="z. B. 650.000"
          hint="Immobilie (Steuerwert) plus Geld, Wertpapiere und sonstiges Vermögen."
        />
        <MoneyField
          label="Nachlassverbindlichkeiten (€, optional)"
          value={debts}
          onChange={setDebts}
          placeholder="z. B. 12.000"
          hint="Schulden des Verstorbenen, Bestattungs- und Abwicklungskosten."
        />

        {canHaveHome ? (
          <>
            <MoneyField
              label="Davon selbst genutztes Familienheim (€, optional)"
              value={home}
              onChange={setHome}
              placeholder="z. B. 400.000"
              hint="Steuerfrei bei Selbstnutzung durch Sie für mindestens zehn Jahre."
            />
            {relationship.familyHome === "child" ? (
              <MoneyField
                label="Wohnfläche des Familienheims (m²)"
                value={area}
                onChange={setArea}
                placeholder="z. B. 140"
                hint="Für Kinder gilt die Befreiung nur bis 200 m² Wohnfläche."
              />
            ) : null}
          </>
        ) : null}

        {canHaveSupport ? (
          <MoneyField
            label="Besonderer Versorgungsfreibetrag (€, optional)"
            value={support}
            onChange={setSupport}
            placeholder="0"
            hint="Ehegatte bis 256.000 €, Kinder bis 27 Jahre bis 52.000 €; wird um steuerfreie Hinterbliebenenrenten gekürzt."
          />
        ) : null}

        <MoneyField
          label="Frühere Erwerbe derselben Person in den letzten 10 Jahren (€, optional)"
          value={prior}
          onChange={setPrior}
          placeholder="0"
          hint="Schenkungen und Erbschaften vom selben Verstorbenen werden zusammengerechnet."
        />
      </div>

      <div className="mt-8 rounded-xl border border-line bg-paper p-5" aria-live="polite">
        {hasInput ? (
          <>
            <Row label={`Persönlicher Freibetrag (Steuerklasse ${result.taxClass})`} value={formatEuroExact(result.allowance)} />
            {result.familyHomeExempt > 0 ? (
              <Row label="Steuerfreies Familienheim" value={formatEuroExact(result.familyHomeExempt)} />
            ) : null}
            <Row label="Steuerpflichtiger Erwerb" value={formatEuroExact(result.taxable)} />
            <Row
              label="Steuersatz"
              value={result.taxable > 0 ? formatPercent(result.rate) : "–"}
              hint="Bei Grenzfällen greift der Härteausgleich nach § 19 Abs. 3 ErbStG."
            />
            <Row
              label="Erbschaftsteuer"
              hint={result.tax > 0 ? `${formatPercent(Math.round(result.effectiveRate * 10) / 10)} vom gesamten Erwerb` : undefined}
              value={result.tax > 0 ? formatEuroExact(result.tax) : "keine Steuer"}
              strong
            />
            {result.tax > 0 ? (
              <p className="mt-2 border-t border-line pt-4 text-sm text-ink-soft">
                Nach Steuer bleiben Ihnen rund{" "}
                <strong className="font-medium text-ink">{formatEuroExact(result.netInheritance)}</strong>.
              </p>
            ) : (
              <p className="mt-2 border-t border-line pt-4 text-sm text-ink-soft">
                Ihr Erwerb liegt innerhalb der Freibeträge. Eine Anzeige beim Finanzamt ist trotzdem nötig.
              </p>
            )}
          </>
        ) : (
          <p className="text-sm text-ink-soft/80">Geben Sie den Wert des Erbes ein, um die Steuer zu sehen.</p>
        )}
      </div>

      <p className="mt-4 text-xs text-ink-soft/70">
        Vereinfachte Orientierung auf Basis der Sätze nach §§ 15, 16, 17 und 19 ErbStG. Maßgeblich ist der Bescheid des
        Finanzamts; im Einzelfall (Betriebsvermögen, Auslandsbezug, Vorerwerbe) sollten Sie Steuerberater oder
        Fachanwalt fragen. Keine Steuer- oder Rechtsberatung.
      </p>
    </div>
  );
}
