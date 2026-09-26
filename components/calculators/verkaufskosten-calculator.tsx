"use client";

import { useMemo, useState } from "react";
import { formatEuroExact, formatPercent, getStateRates, stateRates } from "@/lib/kaufnebenkosten";
import { parseDecimal } from "@/lib/parse-decimal";
import { computeSale } from "@/lib/verkaufskosten";

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

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className={`flex items-baseline justify-between gap-3 py-3 ${strong ? "" : "border-b border-line"}`}>
      <p className={`min-w-0 ${strong ? "font-medium text-ink" : "text-ink-soft"}`}>{label}</p>
      <p className={`shrink-0 whitespace-nowrap ${strong ? "font-display text-2xl font-medium text-ink" : "text-ink"}`}>
        {value}
      </p>
    </div>
  );
}

export function VerkaufskostenCalculator({ defaultStateCode = "BW" }: { defaultStateCode?: string }) {
  const [price, setPrice] = useState("420.000");
  const [stateCode, setStateCode] = useState(defaultStateCode);
  const [withBroker, setWithBroker] = useState(true);
  const [loan, setLoan] = useState("");
  const [penalty, setPenalty] = useState("");
  const [certificate, setCertificate] = useState("250");
  const [deletion, setDeletion] = useState("");
  const [tax, setTax] = useState("");
  const [other, setOther] = useState("");

  const state = getStateRates(stateCode);

  const result = useMemo(
    () =>
      computeSale({
        price: parseDecimal(price),
        remainingLoan: parseDecimal(loan),
        brokerPercent: withBroker ? state.maklerBuyerShare : 0,
        prepaymentPenalty: parseDecimal(penalty),
        energyCertificate: parseDecimal(certificate),
        mortgageDeletion: parseDecimal(deletion),
        capitalGainsTax: parseDecimal(tax),
        other: parseDecimal(other),
      }),
    [price, loan, withBroker, state.maklerBuyerShare, penalty, certificate, deletion, tax, other]
  );

  return (
    <div className="rounded-2xl border border-line bg-paper-dim p-6 md:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <MoneyField label="Erwarteter Verkaufspreis (€)" value={price} onChange={setPrice} placeholder="z. B. 420.000" />
        <label className="block">
          <span className="text-sm text-ink-soft">Bundesland der Immobilie</span>
          <select value={stateCode} onChange={(event) => setStateCode(event.target.value)} className={fieldClass}>
            {stateRates.map((s) => (
              <option key={s.code} value={s.code}>
                {s.name}
              </option>
            ))}
          </select>
        </label>

        <fieldset className="block sm:col-span-2">
          <legend className="text-sm text-ink-soft">Verkauf mit Makler?</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {[
              { value: true, label: `Ja, Verkäuferanteil ${formatPercent(state.maklerBuyerShare)}` },
              { value: false, label: "Nein, privat" },
            ].map((option) => (
              <button
                key={String(option.value)}
                type="button"
                onClick={() => setWithBroker(option.value)}
                aria-pressed={withBroker === option.value}
                className={`rounded-xl border px-4 py-3 text-sm transition-colors ${
                  withBroker === option.value
                    ? "border-ink bg-ink text-paper"
                    : "border-line bg-paper text-ink-soft hover:border-ink"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
          <span className="mt-1 block text-xs text-ink-soft/70">
            Ortsüblicher Richtwert. Bei einem Kauf von Verbrauchern teilen sich Käufer und Verkäufer die Provision meist
            zu gleichen Teilen.
          </span>
        </fieldset>

        <MoneyField
          label="Offene Restschuld beim Darlehen (€, optional)"
          value={loan}
          onChange={setLoan}
          placeholder="z. B. 120.000"
          hint="Wird aus dem Verkaufserlös an die Bank abgelöst."
        />
        <MoneyField
          label="Vorfälligkeitsentschädigung (€, optional)"
          value={penalty}
          onChange={setPenalty}
          placeholder="Angebot der Bank einholen"
          hint="Fällt an, wenn die Bank das Darlehen vor Ablauf der Zinsbindung ablöst."
        />
        <MoneyField
          label="Energieausweis (€)"
          value={certificate}
          onChange={setCertificate}
          hint="Verbrauchsausweis oft ab rund 50 bis 150 €, Bedarfsausweis rund 300 bis 600 €."
        />
        <MoneyField
          label="Löschung der Grundschuld (€, optional)"
          value={deletion}
          onChange={setDeletion}
          placeholder="meist wenige hundert Euro"
          hint="Notarielle Beglaubigung und Grundbuchkosten für die Löschung."
        />
        <MoneyField
          label="Steuer auf den Verkaufsgewinn (€, optional)"
          value={tax}
          onChange={setTax}
          placeholder="0"
          hint="Nur bei Verkauf innerhalb von 10 Jahren ohne Selbstnutzung (§ 23 EStG)."
        />
        <MoneyField label="Sonstiges (€, optional)" value={other} onChange={setOther} placeholder="z. B. Fotos, Renovierung" />
      </div>

      <div className="mt-8 rounded-xl border border-line bg-paper p-5" aria-live="polite">
        {result.price > 0 ? (
          <>
            <Row label="Verkaufspreis" value={formatEuroExact(result.price)} />
            {result.broker > 0 ? (
              <Row label="Maklerprovision (Verkäuferanteil)" value={`– ${formatEuroExact(result.broker)}`} />
            ) : null}
            {result.prepaymentPenalty > 0 ? (
              <Row label="Vorfälligkeitsentschädigung" value={`– ${formatEuroExact(result.prepaymentPenalty)}`} />
            ) : null}
            {result.energyCertificate > 0 ? (
              <Row label="Energieausweis" value={`– ${formatEuroExact(result.energyCertificate)}`} />
            ) : null}
            {result.mortgageDeletion > 0 ? (
              <Row label="Grundschuldlöschung" value={`– ${formatEuroExact(result.mortgageDeletion)}`} />
            ) : null}
            {result.capitalGainsTax > 0 ? (
              <Row label="Steuer auf den Gewinn" value={`– ${formatEuroExact(result.capitalGainsTax)}`} />
            ) : null}
            {result.other > 0 ? <Row label="Sonstiges" value={`– ${formatEuroExact(result.other)}`} /> : null}
            <Row
              label={`Verkaufskosten gesamt (${formatPercent(result.costsPercent)})`}
              value={`– ${formatEuroExact(result.totalCosts)}`}
            />
            {result.loanRepayment > 0 ? (
              <Row label="Ablösung des Darlehens" value={`– ${formatEuroExact(result.loanRepayment)}`} />
            ) : null}
            <Row label="Was für Sie übrig bleibt" value={formatEuroExact(result.netProceeds)} strong />
            {result.netProceeds < 0 ? (
              <p className="mt-2 border-t border-line pt-4 text-sm text-ink-soft">
                Der Erlös deckt Kosten und Darlehen nicht. Sprechen Sie vor dem Verkauf mit Ihrer Bank.
              </p>
            ) : null}
          </>
        ) : (
          <p className="text-sm text-ink-soft/80">Geben Sie einen Verkaufspreis ein, um die Rechnung zu sehen.</p>
        )}
      </div>

      <p className="mt-4 text-xs text-ink-soft/70">
        Orientierung ohne Gewähr. Notar, Grundbuch und Grunderwerbsteuer trägt in der Regel der Käufer. Keine Steuer- oder
        Rechtsberatung.
      </p>
    </div>
  );
}
