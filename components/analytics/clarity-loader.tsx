"use client";

import { useEffect } from "react";
import { COOKIE_CONSENT_EVENT } from "./cookie-consent";

const STORAGE_KEY = "cookie_consent";

type ClarityFn = ((...args: unknown[]) => void) & { q: unknown[] };

// Microsofts offizielles Install-Snippet: window.clarity muss schon als
// Queue-Funktion existieren, BEVOR das eigentliche Tag-Script lädt, sonst
// wirft das Script beim Initialisieren einen TypeError.
function loadClarity(projectId: string) {
  const w = window as typeof window & { clarity?: ClarityFn };
  if (w.clarity) return;

  const clarityFn = ((...args: unknown[]) => {
    clarityFn.q.push(args);
  }) as ClarityFn;
  clarityFn.q = [];
  w.clarity = clarityFn;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.clarity.ms/tag/${projectId}`;
  const firstScript = document.getElementsByTagName("script")[0];
  firstScript?.parentNode?.insertBefore(script, firstScript);
}

export function ClarityLoader({ projectId }: { projectId: string }) {
  useEffect(() => {
    if (!projectId) return;

    try {
      if (window.localStorage.getItem(STORAGE_KEY) === "accepted") {
        loadClarity(projectId);
      }
    } catch {
      // kein localStorage -> einfach kein Tracking laden
    }

    function onConsentChange(event: Event) {
      const detail = (event as CustomEvent<string>).detail;
      if (detail === "accepted") loadClarity(projectId);
    }

    window.addEventListener(COOKIE_CONSENT_EVENT, onConsentChange);
    return () => window.removeEventListener(COOKIE_CONSENT_EVENT, onConsentChange);
  }, [projectId]);

  return null;
}
