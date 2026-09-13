"use client";

import { useRef, useState } from "react";
import { submitDocuments } from "@/lib/document-submit";
import { TurnstileWidget } from "@/components/valuation-form/turnstile-widget";

const MAX_FILE_MB = 4;

export function DocumentSubmitForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [skippedFiles, setSkippedFiles] = useState<string[]>([]);
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const captchaRequired = Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    const formData = new FormData(event.currentTarget);
    try {
      const result = await submitDocuments(formData, turnstileToken);
      if (!result.ok) {
        setErrorMessage(result.error ?? "Etwas ist schiefgelaufen.");
        setStatus("error");
        return;
      }
      setSkippedFiles(result.skippedFiles ?? []);
      setStatus("done");
      formRef.current?.reset();
      setFileNames([]);
    } catch {
      setErrorMessage("Ihre Anfrage konnte technisch nicht übermittelt werden. Bitte schreiben Sie uns direkt per E-Mail.");
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-2xl border border-line bg-paper-dim p-8 md:p-10">
        <p className="text-xs font-medium tracking-[0.2em] text-accent uppercase">Danke</p>
        <p className="mt-4 font-display text-2xl font-medium text-ink">
          Ihre Unterlagen sind bei uns eingegangen.
        </p>
        <p className="mt-3 max-w-md text-sm text-ink-soft/90">
          Wir melden uns persönlich bei Ihnen, sobald wir alles gesichtet haben.
        </p>
        {skippedFiles.length > 0 ? (
          <p className="mt-4 rounded-lg border border-accent/30 bg-accent/10 p-3 text-sm text-ink-soft">
            Diese Dateien konnten nicht übernommen werden (zu groß oder falsches Format, max.{" "}
            {MAX_FILE_MB} MB, PDF/JPG/PNG/HEIC): {skippedFiles.join(", ")}. Schicken Sie diese
            gerne zusätzlich per E-Mail.
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="rounded-2xl border border-line bg-paper-dim p-8 md:p-10"
    >
      <div className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm text-ink-soft">Name *</span>
            <input
              name="name"
              required
              className="mt-2 w-full rounded-xl border border-line bg-paper px-4 py-3 text-ink outline-none focus:border-ink"
            />
          </label>
          <label className="block">
            <span className="text-sm text-ink-soft">Objektart</span>
            <select
              name="propertyType"
              className="mt-2 w-full rounded-xl border border-line bg-paper px-4 py-3 text-ink outline-none focus:border-ink"
            >
              <option value="">Bitte wählen</option>
              <option value="haus">Haus</option>
              <option value="wohnung">Wohnung</option>
              <option value="mehrfamilienhaus">Mehrfamilienhaus</option>
              <option value="grundstueck">Grundstück</option>
            </select>
          </label>
          <label className="block">
            <span className="text-sm text-ink-soft">E-Mail</span>
            <input
              name="email"
              type="email"
              className="mt-2 w-full rounded-xl border border-line bg-paper px-4 py-3 text-ink outline-none focus:border-ink"
            />
          </label>
          <label className="block">
            <span className="text-sm text-ink-soft">Telefon</span>
            <input
              name="phone"
              type="tel"
              className="mt-2 w-full rounded-xl border border-line bg-paper px-4 py-3 text-ink outline-none focus:border-ink"
            />
          </label>
        </div>
        <p className="text-xs text-ink-soft/60">E-Mail oder Telefon reicht — eines von beiden brauchen wir.</p>

        <label className="block">
          <span className="text-sm text-ink-soft">Adresse der Immobilie</span>
          <input
            name="location"
            placeholder="z. B. 89522 Heidenheim, Musterstraße 5"
            className="mt-2 w-full rounded-xl border border-line bg-paper px-4 py-3 text-ink outline-none focus:border-ink"
          />
        </label>

        <label className="block">
          <span className="text-sm text-ink-soft">Nachricht</span>
          <textarea
            name="message"
            rows={4}
            placeholder="Was möchten Sie uns zu Ihrer Immobilie mitteilen?"
            className="mt-2 w-full rounded-xl border border-line bg-paper px-4 py-3 text-ink outline-none focus:border-ink"
          />
        </label>

        <label className="block">
          <span className="text-sm text-ink-soft">
            Unterlagen (Grundriss, Energieausweis, Fotos, Grundbuchauszug, …)
          </span>
          <input
            name="files"
            type="file"
            multiple
            accept="application/pdf,image/jpeg,image/png,image/webp,image/heic"
            onChange={(event) => setFileNames(Array.from(event.target.files ?? []).map((f) => f.name))}
            className="mt-2 w-full rounded-xl border border-dashed border-line bg-paper px-4 py-3 text-sm text-ink-soft outline-none focus:border-ink"
          />
          <span className="mt-1.5 block text-xs text-ink-soft/60">
            PDF, JPG, PNG oder HEIC, bis zu {MAX_FILE_MB} MB pro Datei, mehrere Dateien möglich.
          </span>
          {fileNames.length > 0 ? (
            <span className="mt-1.5 block text-xs text-ink-soft">{fileNames.join(", ")}</span>
          ) : null}
        </label>

        {errorMessage ? (
          <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{errorMessage}</p>
        ) : null}

        {captchaRequired && <TurnstileWidget onToken={setTurnstileToken} />}

        <button
          type="submit"
          disabled={status === "submitting" || (captchaRequired && !turnstileToken)}
          className="rounded-full bg-ink px-6 py-2.5 text-sm text-paper transition-opacity hover:bg-ink-soft disabled:opacity-50"
        >
          {status === "submitting" ? "Wird gesendet …" : "Unterlagen einreichen"}
        </button>
      </div>
    </form>
  );
}
