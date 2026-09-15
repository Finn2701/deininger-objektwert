"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "cookie_consent";
export const COOKIE_CONSENT_EVENT = "cookie-consent-changed";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      setVisible(!window.localStorage.getItem(STORAGE_KEY));
    } catch {
      setVisible(false);
    }
  }, []);

  function decide(value: "accepted" | "rejected") {
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // Private-Modus o.ä. — dann läuft die Seite einfach ohne Tracking weiter.
    }
    window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_EVENT, { detail: value }));
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-paper p-4 shadow-[0_-4px_24px_rgba(0,0,0,0.06)] sm:p-5">
      <div className="mx-auto flex max-w-4xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-ink-soft">
          Wir nutzen optional Microsoft Clarity, um zu verstehen, wie unsere Website genutzt wird
          und sie zu verbessern. Das setzt Cookies, die nicht technisch notwendig sind. Mehr dazu
          in unserer{" "}
          <a href="/datenschutz" className="underline decoration-ink-soft/40 underline-offset-4 hover:text-ink">
            Datenschutzerklärung
          </a>
          .
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => decide("rejected")}
            className="rounded-full border border-line px-4 py-2 text-sm text-ink-soft hover:text-ink"
          >
            Ablehnen
          </button>
          <button
            type="button"
            onClick={() => decide("accepted")}
            className="rounded-full border border-ink bg-ink px-4 py-2 text-sm text-paper hover:bg-ink/90"
          >
            Akzeptieren
          </button>
        </div>
      </div>
    </div>
  );
}
