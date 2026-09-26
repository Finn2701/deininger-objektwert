"use client";

import { useMemo, useState } from "react";
import {
  NOTAR_GRUNDBUCH_DEFAULT_PERCENT,
  computeKaufnebenkosten,
  formatEuroExact,
  formatPercent,
  getStateRates,
  stateRates,
} from "@/lib/kaufnebenkosten";
import { parseDecimal } from "@/lib/parse-decimal";

type Mode = "nebenkosten" | "grunderwerbsteuer";

const fieldClass =
  "mt-2 w-full rounded-xl border border-line bg-paper px-4 py-3 text-ink outline-none transition-colors focus:border-ink";

function ResultRow({ label, value, hint, strong }: { label: string; value: string; hint?: string; strong?: boolean }) {
  return (
    <div className={`flex items-baseline justify-between gap-4 py-3 ${strong ? "" : "border-b border-line"}`}>
      <div>
        <p className={strong ? "font-medium text-ink" : "text-ink-soft"}>{label}</p>
        {hint ? <p className="mt-0.5 text-xs text-ink-soft/70">{hint}</p> : null}
      </div>
      <p className={`whitespace-nowrap ${strong ? "font-display text-2xl font-medium text-ink" : "text-ink"}`}>{value}</p>
    </div>
  );
}

export function KaufnebenkostenCalculator({
  mode = "nebenkosten",
  defaultStateCode = "BW",
}: {
  mode?: Mode;
  defaultStateCode?: string;
}) {
  const [kaufpreis, setKaufpreis] = useState("350.000");
  const [stateCode, setStateCode] = useState(defaultStateCode);
  const [withMakler, setWithMakler] = useState(true);
  const [notarText, setNotarText] = useState(String(NOTAR_GRUNDBUCH_DEFAULT_PERCENT).replace(".", ","));
  const [inventar, setInventar] = useState("");

  const state = getStateRates(stateCode);
  const isNebenkosten = mode === "nebenkosten";

  const result = useMemo(
    () =>
      computeKaufnebenkosten({
        kaufpreis,
        stateCode,
        maklerPercent: isNebenkosten && withMakler ? state.maklerBuyerShare : 0,
        notarPercent: isNebenkosten ? parseDecimal(notarText) : 0,
        inventar,
      }),
    [kaufpreis, stateCode, withMakler, notarText, inventar, isNebenkosten, state.maklerBuyerShare]
  );

  const hasInput = result.kaufpreis > 0;

  return (
    <div className="rounded-2xl border border-line bg-paper-dim p-6 md:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm text-ink-soft">Kaufpreis (€)</span>
          <input
            type="text"
            inputMode="decimal"
            value={kaufpreis}
            onChange={(event) => setKaufpreis(event.target.value)}
            placeholder="z. B. 350.000"
            className={fieldClass}
          />
        </label>

        <label className="block">
          <span className="text-sm text-ink-soft">Bundesland der Immobilie</span>
          <select value={stateCode} onChange={(event) => setStateCode(event.target.value)} className={fieldClass}>
            {stateRates.map((s) => (
              <option key={s.code} value={s.code}>
                {s.name} ({formatPercent(s.grunderwerbsteuer)})
              </option>
            ))}
          </select>
        </label>

        {isNebenkosten ? (
          <>
            <label className="block">
              <span className="text-sm text-ink-soft">Notar und Grundbuch (% vom Kaufpreis)</span>
              <input
                type="text"
                inputMode="decimal"
                value={notarText}
                onChange={(event) => setNotarText(event.target.value)}
                className={fieldClass}
              />
              <span className="mt-1 block text-xs text-ink-soft/70">
                Faustwert 1,5 %; üblich sind 1,5 bis 2,0 % (höher, wenn eine Grundschuld eingetragen wird).
              </span>
            </label>

            <fieldset className="block">
              <legend className="text-sm text-ink-soft">Maklerprovision für den Käufer?</legend>
              <div className="mt-2 flex gap-2">
                {[
                  { value: true, label: `Ja (${formatPercent(state.maklerBuyerShare)})` },
                  { value: false, label: "Nein, ohne Makler" },
                ].map((option) => (
                  <button
                    key={String(option.value)}
                    type="button"
                    onClick={() => setWithMakler(option.value)}
                    aria-pressed={withMakler === option.value}
                    className={`rounded-xl border px-4 py-3 text-sm transition-colors ${
                      withMakler === option.value
                        ? "border-ink bg-ink text-paper"
                        : "border-line bg-paper text-ink-soft hover:border-ink"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
              {state.maklerNote ? <span className="mt-1 block text-xs text-ink-soft/70">{state.maklerNote}</span> : null}
            </fieldset>
          </>
        ) : null}

        <label className="block sm:col-span-2">
          <span className="text-sm text-ink-soft">Davon mitverkauftes Inventar, z. B. Einbauküche (€, optional)</span>
          <input
            type="text"
            inputMode="decimal"
            value={inventar}
            onChange={(event) => setInventar(event.target.value)}
            placeholder="z. B. 8.000"
            className={fieldClass}
          />
          <span className="mt-1 block text-xs text-ink-soft/70">
            Nur wenn es im Kaufvertrag getrennt und angemessen ausgewiesen ist – dieser Betrag zählt nicht zur
            Bemessungsgrundlage der Grunderwerbsteuer.
          </span>
        </label>
      </div>

      <div className="mt-8 rounded-xl border border-line bg-paper p-5" aria-live="polite">
        {hasInput ? (
          <>
            <ResultRow
              label={`Grunderwerbsteuer (${formatPercent(state.grunderwerbsteuer)})`}
              hint={
                result.grunderwerbsteuerBasis !== result.kaufpreis
                  ? `auf ${formatEuroExact(result.grunderwerbsteuerBasis)} (Kaufpreis ohne Inventar)`
                  : undefined
              }
              value={formatEuroExact(result.grunderwerbsteuer)}
            />
            {isNebenkosten ? (
              <>
                <ResultRow
                  label={`Notar und Grundbuch (${formatPercent(parseDecimal(notarText))})`}
                  value={formatEuroExact(result.notar)}
                />
                <ResultRow
                  label={withMakler ? `Maklerprovision Käuferanteil (${formatPercent(state.maklerBuyerShare)})` : "Maklerprovision"}
                  value={withMakler ? formatEuroExact(result.makler) : "entfällt"}
                />
                <ResultRow
                  label="Kaufnebenkosten gesamt"
                  hint={`${formatPercent(result.nebenkostenPercent)} vom Kaufpreis`}
                  value={formatEuroExact(result.nebenkosten)}
                  strong
                />
                <div className="mt-2 border-t border-line pt-4 text-sm text-ink-soft">
                  Kaufpreis plus Nebenkosten: <strong className="font-medium text-ink">{formatEuroExact(result.gesamtbedarf)}</strong>.
                  Die Nebenkosten finanzieren Banken meist nicht mit – planen Sie sie als Eigenkapital ein.
                </div>
              </>
            ) : (
              <p className="pt-4 text-sm text-ink-soft">
                Die Steuer zahlt üblicherweise der Käufer, sobald das Finanzamt den Bescheid verschickt hat (Zahlungsfrist
                in der Regel einen Monat).
              </p>
            )}
          </>
        ) : (
          <p className="text-sm text-ink-soft/80">Geben Sie einen Kaufpreis ein, um die Kosten zu sehen.</p>
        )}
      </div>

      <p className="mt-4 text-xs text-ink-soft/70">
        Richtwerte, keine Steuer- oder Rechtsberatung. Der Steuerbescheid des Finanzamts und die Rechnung des Notars
        sind maßgeblich.
      </p>
    </div>
  );
}
