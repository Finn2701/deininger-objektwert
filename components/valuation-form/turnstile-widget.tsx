"use client";

import Script from "next/script";
import { useId } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
        }
      ) => void;
    };
  }
}

export function TurnstileWidget({
  onToken,
  onError,
}: {
  onToken: (token: string | null) => void;
  onError?: () => void;
}) {
  const id = useId().replace(/:/g, "");
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  if (!siteKey) return null;

  return (
    <div>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="afterInteractive"
        onReady={() => {
          window.turnstile?.render(`#turnstile-${id}`, {
            sitekey: siteKey,
            callback: (token: string) => onToken(token),
            "expired-callback": () => onToken(null),
            "error-callback": () => onError?.(),
          });
        }}
        onError={() => onError?.()}
      />
      <div id={`turnstile-${id}`} />
    </div>
  );
}
