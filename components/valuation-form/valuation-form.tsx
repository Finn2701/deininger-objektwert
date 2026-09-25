"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { submitValuationRequest } from "@/lib/valuation-submit";
import { formatEuro, type ValuationEstimate } from "@/lib/valuation-estimate";
import {
  conditionOptions,
  contactDayOptions,
  contactTimeOptions,
  energyClassOptions,
  featureOptions,
  floorLevelOptions,
  formStepLabels,
  propertyTypeOptions,
  yearBuiltOptions,
} from "./steps-data";
import { initialValuationFormData, type ValuationFormData } from "./types";
import { TurnstileWidget } from "./turnstile-widget";

const TOTAL_STEPS = formStepLabels.length;

const PRECISION_BADGE: Record<ValuationEstimate["precision"], string> = {
  basis: "Basis-Schätzung",
  erweitert: "Erweiterte Schätzung",
  detailliert: "Detaillierte Schätzung",
};

function OptionGrid<T extends string>({
  options,
  value,
  onChange,
  columns = 2,
}: {
  options: { value: T; label: string; hint?: string }[];
  value: T | null;
  onChange: (value: T) => void;
  columns?: 1 | 2;
}) {
  return (
    <div className={`grid gap-3 ${columns === 2 ? "grid-cols-2" : "grid-cols-1"}`}>
      {options.map((option) => {
        const active = value === option.value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            aria-pressed={active}
            className={`rounded-xl border px-4 py-3.5 text-left text-sm transition-colors ${
              active
                ? "border-ink bg-ink text-paper"
                : "border-line text-ink-soft hover:border-ink-soft"
            }`}
          >
            <span>{option.label}</span>
            {option.hint ? (
              <span className={`mt-1 block text-xs ${active ? "text-paper/70" : "text-ink-soft/60"}`}>
                {option.hint}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}

function ChipGrid<T extends string>({
  options,
  values,
  onToggle,
  wrap = false,
}: {
  options: { value: T; label: string }[];
  values: T[];
  onToggle: (value: T) => void;
  wrap?: boolean;
}) {
  return (
    <div className={wrap ? "flex flex-wrap gap-2" : "grid grid-cols-2 gap-3"}>
      {options.map((option) => {
        const active = values.includes(option.value);
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onToggle(option.value)}
            aria-pressed={active}
            className={`rounded-xl border text-sm transition-colors ${
              wrap ? "px-4 py-2" : "px-4 py-3.5 text-left"
            } ${active ? "border-ink bg-ink text-paper" : "border-line text-ink-soft hover:border-ink-soft"}`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

function BoolToggle({
  value,
  onChange,
  yesLabel = "Ja",
  noLabel = "Nein",
}: {
  value: boolean | null;
  onChange: (value: boolean) => void;
  yesLabel?: string;
  noLabel?: string;
}) {
  const options = [
    { key: "yes", label: yesLabel, v: true },
    { key: "no", label: noLabel, v: false },
  ];
  return (
    <div className="grid grid-cols-2 gap-3">
      {options.map((option) => {
        const active = value === option.v;
        return (
          <button
            key={option.key}
            type="button"
            onClick={() => onChange(option.v)}
            aria-pressed={active}
            className={`rounded-xl border px-4 py-3.5 text-left text-sm transition-colors ${
              active ? "border-ink bg-ink text-paper" : "border-line text-ink-soft hover:border-ink-soft"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

function TextField({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm text-ink-soft">{label}</span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-xl border border-line bg-paper px-4 py-3 text-ink outline-none transition-colors focus:border-ink"
      />
    </label>
  );
}

const isLand = (data: ValuationFormData) => data.propertyType === "grundstueck";
const hasOwnPlot = (data: ValuationFormData) => data.propertyType !== "wohnung";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[0-9+()/\s-]{6,}$/;

function hasValidEmail(data: ValuationFormData) {
  return EMAIL_PATTERN.test(data.email.trim());
}
function hasValidPhone(data: ValuationFormData) {
  return PHONE_PATTERN.test(data.phone.trim());
}

function isStepValid(step: number, data: ValuationFormData) {
  switch (step) {
    case 0:
      return data.propertyType !== null;
    case 1:
      return data.location.trim().length > 1;
    case 2:
      return isLand(data) ? data.plotArea.trim().length > 0 : data.livingArea.trim().length > 0;
    case 3:
      return isLand(data) || (data.yearBuilt !== null && data.condition !== null);
    case 5:
      // Wants to be contacted -> at least one *valid* way to actually reach
      // them, not just any non-empty string typed into the email field.
      return !data.contactConsent || (data.name.trim().length > 1 && (hasValidEmail(data) || hasValidPhone(data)));
    default:
      return true;
  }
}

export function ValuationForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<ValuationFormData>(initialValuationFormData);
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");
  const [estimate, setEstimate] = useState<ValuationEstimate | null>(null);
  const [saveFailed, setSaveFailed] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [captchaBlocked, setCaptchaBlocked] = useState(false);
  const captchaRequired = Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);

  // The captcha is anti-spam, not a gate on the estimate itself -- an ad
  // blocker, a GPU/driver quirk, or a slow network can leave the widget
  // stuck forever with zero feedback, silently trapping a real visitor on
  // the last step (see valuation-submit.ts, which already treats a missing
  // token as "unverified" rather than fatal). So if it hasn't produced a
  // token within 8s, stop waiting on it.
  useEffect(() => {
    if (step !== 5 || !captchaRequired || turnstileToken) return;
    const timer = setTimeout(() => setCaptchaBlocked(true), 8000);
    return () => clearTimeout(timer);
  }, [step, captchaRequired, turnstileToken]);

  function update<K extends keyof ValuationFormData>(key: K, value: ValuationFormData[K]) {
    setData((prev) => ({ ...prev, [key]: value }));
  }

  function toggleFeature(id: ValuationFormData["features"][number]) {
    setData((prev) => ({
      ...prev,
      features: prev.features.includes(id)
        ? prev.features.filter((f) => f !== id)
        : [...prev.features, id],
    }));
  }

  function toggleContactDay(day: ValuationFormData["contactDays"][number]) {
    setData((prev) => ({
      ...prev,
      contactDays: prev.contactDays.includes(day)
        ? prev.contactDays.filter((d) => d !== day)
        : [...prev.contactDays, day],
    }));
  }

  async function handleSubmit() {
    setStatus("submitting");
    // estimateValue/submitValuationRequest already degrade gracefully and
    // never throw for a normal visitor, but a network blip on the way to
    // the server action itself still could — this must never leave the
    // visitor without a number.
    try {
      const { estimate: result, saved } = await submitValuationRequest(data, turnstileToken);
      setEstimate(result);
      setSaveFailed(!saved);
    } catch {
      setEstimate(null);
      setSaveFailed(true);
    }
    setStatus("done");
  }

  if (status === "done") {
    return (
      <div className="rounded-2xl border border-line bg-paper-dim p-8 md:p-10">
        <p className="text-xs font-medium tracking-[0.2em] text-ink-soft/70 uppercase">
          Ihre Ersteinschätzung
        </p>

        {estimate ? (
          <>
            <p className="mt-5 font-display text-4xl font-medium text-ink md:text-5xl">
              {formatEuro(estimate.headline)}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <p className="text-sm text-ink-soft/80">
                Wahrscheinliche Spanne: {formatEuro(estimate.low)} – {formatEuro(estimate.high)}
              </p>
              {!isLand(data) ? (
                <span className="rounded-full border border-line px-2.5 py-0.5 text-xs text-ink-soft/70">
                  {PRECISION_BADGE[estimate.precision]}
                </span>
              ) : null}
            </div>
            <p className="mt-5 max-w-md text-sm text-ink-soft/80">
              Grobe, unverbindliche Ersteinschätzung auf Basis öffentlich verfügbarer Marktdaten
              {estimate.regionMatched ? (
                <> für die Region {estimate.region}</>
              ) : (
                <> auf Basis unseres Referenz-Preisniveaus, da Ihr Standort nicht eindeutig zugeordnet werden konnte</>
              )}{" "}
              (Stand {estimate.asOf}) und Ihrer Angaben. Ersetzt keine Wertermittlung durch einen
              Sachverständigen vor Ort.
            </p>
            {!isLand(data) && estimate.precision !== "detailliert" ? (
              <p className="mt-2 max-w-md text-xs text-ink-soft/60">
                Je mehr Angaben Sie machen (z. B. Energieausweis, Zustand, bei Wohnungen Etage &
                Aufzug), desto enger wird diese Spanne.
              </p>
            ) : null}
          </>
        ) : (
          <p className="mt-4 max-w-md text-ink-soft/90">
            Auf Basis Ihrer Angaben lässt sich noch keine automatische Einschätzung berechnen —
            wir melden uns persönlich bei Ihnen.
          </p>
        )}

        {saveFailed && data.contactConsent ? (
          <p className="mt-6 rounded-lg border border-accent/30 bg-accent/10 p-3 text-sm text-ink-soft">
            Ihr Kontaktwunsch konnte technisch nicht übermittelt werden. Bitte schreiben Sie uns
            zusätzlich kurz an{" "}
            <a href="mailto:kontakt@deininger-objektwert.de" className="underline">
              kontakt@deininger-objektwert.de
            </a>
            , damit wir uns melden können.
          </p>
        ) : data.contactConsent ? (
          <p className="mt-6 text-sm text-ink-soft/70">
            Danke! Wir melden uns zu Ihrer Wunschzeit unter der angegebenen Kontaktmöglichkeit.
          </p>
        ) : (
          <p className="mt-6 text-sm text-ink-soft/70">
            Danke! Wenn Sie diese Einschätzung vertiefen möchten, kontaktieren Sie uns gerne
            direkt.
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-line bg-paper-dim p-8 md:p-10">
      <div className="flex items-center justify-between text-xs text-ink-soft/70">
        <span>
          Schritt {step + 1} von {TOTAL_STEPS}
        </span>
        <span>{formStepLabels[step]}</span>
      </div>
      <div className="mt-3 h-px w-full bg-line">
        <motion.div
          className="h-px bg-ink"
          animate={{ width: `${((step + 1) / TOTAL_STEPS) * 100}%` }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <div className="mt-8 min-h-[220px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-5"
          >
            {step === 0 && (
              <>
                <p className="text-sm text-ink-soft">Um welche Art von Immobilie geht es?</p>
                <OptionGrid
                  options={propertyTypeOptions}
                  value={data.propertyType}
                  onChange={(value) => update("propertyType", value)}
                />
              </>
            )}

            {step === 1 && (
              <TextField
                label="Ort / PLZ"
                value={data.location}
                onChange={(value) => update("location", value)}
                placeholder="z. B. 89522 Heidenheim"
                autoComplete="postal-code"
              />
            )}

            {step === 2 && (
              <div className="grid gap-5 sm:grid-cols-2">
                {!isLand(data) && (
                  <TextField
                    label="Wohnfläche (m²)"
                    value={data.livingArea}
                    onChange={(value) => update("livingArea", value)}
                    type="number"
                    placeholder="z. B. 140"
                  />
                )}
                {hasOwnPlot(data) && (
                  <TextField
                    label="Grundstück (m²)"
                    value={data.plotArea}
                    onChange={(value) => update("plotArea", value)}
                    type="number"
                    placeholder={isLand(data) ? "z. B. 650" : "falls zutreffend"}
                  />
                )}
              </div>
            )}

            {step === 3 &&
              (isLand(data) ? (
                <p className="text-sm text-ink-soft/70">
                  Für unbebaute Grundstücke nicht erforderlich — weiter geht&apos;s.
                </p>
              ) : (
                <>
                  <p className="text-sm text-ink-soft">Baujahr (ungefähr)</p>
                  <OptionGrid options={yearBuiltOptions} value={data.yearBuilt} onChange={(value) => update("yearBuilt", value)} />
                  <p className="pt-2 text-sm text-ink-soft">
                    Zustand von Heizung, Elektrik und Leitungen
                  </p>
                  <OptionGrid
                    options={conditionOptions}
                    value={data.condition}
                    onChange={(value) => update("condition", value)}
                    columns={1}
                  />

                  <p className="pt-2 text-sm text-ink-soft">
                    Energieausweis-Effizienzklasse, falls bekannt (optional — beeinflusst den
                    Wert spürbar, macht die Schätzung genauer)
                  </p>
                  <OptionGrid
                    options={energyClassOptions}
                    value={data.energyClass}
                    onChange={(value) => update("energyClass", value)}
                    columns={2}
                  />

                  <p className="pt-2 text-sm text-ink-soft">
                    Sind Feuchtigkeits-, Schimmel- oder Geruchsauffälligkeiten erkennbar?
                    (optional)
                  </p>
                  <BoolToggle
                    value={data.moistureIssues}
                    onChange={(value) => update("moistureIssues", value)}
                    yesLabel="Ja, auffällig"
                    noLabel="Nein, unauffällig"
                  />
                </>
              ))}

            {step === 4 &&
              (isLand(data) ? (
                <p className="text-sm text-ink-soft/70">
                  Für unbebaute Grundstücke nicht erforderlich — weiter geht&apos;s.
                </p>
              ) : (
                <>
                  {data.propertyType === "wohnung" && (
                    <>
                      <p className="text-sm text-ink-soft">Etage (optional)</p>
                      <OptionGrid
                        options={floorLevelOptions}
                        value={data.floorLevel}
                        onChange={(value) => update("floorLevel", value)}
                        columns={1}
                      />
                      <p className="pt-2 text-sm text-ink-soft">Aufzug vorhanden? (optional)</p>
                      <BoolToggle value={data.hasElevator} onChange={(value) => update("hasElevator", value)} />
                      <div className="pt-2" />
                    </>
                  )}
                  <p className="text-sm text-ink-soft">
                    Was trifft auf die Immobilie zu? Einfach das auswählen, was zutrifft —
                    alles optional.
                  </p>
                  <ChipGrid
                    options={featureOptions.filter(
                      (option) => !option.onlyFor || (data.propertyType && option.onlyFor.includes(data.propertyType))
                    )}
                    values={data.features}
                    onToggle={toggleFeature}
                  />
                </>
              ))}

            {step === 5 && (
              <div className="space-y-5">
                <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-line px-4 py-3.5 text-sm">
                  <input
                    type="checkbox"
                    checked={data.contactConsent}
                    onChange={(event) => update("contactConsent", event.target.checked)}
                    className="mt-0.5 h-4 w-4 shrink-0 accent-ink"
                  />
                  <span className="text-ink-soft">
                    Ja, ich möchte zu dieser Einschätzung unverbindlich kontaktiert werden.
                  </span>
                </label>

                {data.contactConsent ? (
                  <>
                    <TextField
                      label="Name"
                      value={data.name}
                      onChange={(value) => update("name", value)}
                      autoComplete="name"
                    />
                    <TextField
                      label="E-Mail"
                      value={data.email}
                      onChange={(value) => update("email", value)}
                      type="email"
                      autoComplete="email"
                    />
                    <TextField
                      label="Telefon"
                      value={data.phone}
                      onChange={(value) => update("phone", value)}
                      type="tel"
                      autoComplete="tel"
                    />
                    <p className="text-xs text-ink-soft/60">
                      E-Mail oder Telefon reicht — mindestens eines davon brauchen wir, um Sie
                      wirklich zu erreichen.
                    </p>

                    <div className="pt-2">
                      <p className="text-sm text-ink-soft">
                        An welchen Tagen erreichen wir Sie am besten? (optional)
                      </p>
                      <div className="mt-2">
                        <ChipGrid options={contactDayOptions} values={data.contactDays} onToggle={toggleContactDay} wrap />
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-ink-soft">Und zu welcher Tageszeit? (optional)</p>
                      <div className="mt-2">
                        <OptionGrid
                          options={contactTimeOptions}
                          value={data.contactTime}
                          onChange={(value) => update("contactTime", value)}
                        />
                      </div>
                    </div>

                    <label className="block">
                      <span className="text-sm text-ink-soft">Notiz an uns (optional)</span>
                      <textarea
                        value={data.contactNotes}
                        onChange={(event) => update("contactNotes", event.target.value)}
                        rows={3}
                        placeholder="z. B. Besonderheiten der Immobilie, konkrete Fragen…"
                        className="mt-2 w-full rounded-xl border border-line bg-paper px-4 py-3 text-ink outline-none transition-colors focus:border-ink"
                      />
                    </label>
                  </>
                ) : (
                  <p className="text-sm text-ink-soft/70">
                    Ohne Häkchen erhalten Sie Ihre Einschätzung direkt im nächsten Schritt, ganz
                    ohne dass Sie Name oder Kontaktdaten angeben müssen.
                  </p>
                )}
                {captchaRequired && (
                  <TurnstileWidget onToken={setTurnstileToken} onError={() => setCaptchaBlocked(true)} />
                )}
                {captchaRequired && !turnstileToken && (
                  <p className="text-xs text-ink-soft/60">
                    {captchaBlocked
                      ? "Sicherheitsprüfung nicht verfügbar — Sie können trotzdem fortfahren."
                      : "Sicherheitsprüfung wird geladen …"}
                  </p>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="text-sm text-ink-soft transition-colors hover:text-ink disabled:opacity-0"
        >
          Zurück
        </button>

        {step < TOTAL_STEPS - 1 ? (
          <button
            type="button"
            onClick={() => setStep((s) => Math.min(TOTAL_STEPS - 1, s + 1))}
            disabled={!isStepValid(step, data)}
            className="rounded-full bg-ink px-6 py-2.5 text-sm text-paper transition-opacity hover:bg-ink-soft disabled:opacity-30"
          >
            Weiter
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={
              !isStepValid(step, data) ||
              status === "submitting" ||
              (captchaRequired && !turnstileToken && !captchaBlocked)
            }
            className="rounded-full bg-ink px-6 py-2.5 text-sm text-paper transition-opacity hover:bg-ink-soft disabled:opacity-30"
          >
            {status === "submitting" ? "Region wird abgeglichen …" : "Wert ermitteln"}
          </button>
        )}
      </div>
    </div>
  );
}
