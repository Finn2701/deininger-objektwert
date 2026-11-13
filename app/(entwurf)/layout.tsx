import { CookieConsent } from "@/components/analytics/cookie-consent";
import { ClarityLoader } from "@/components/analytics/clarity-loader";

/** Startseite mit dem scrollgesteuerten 3D-Modell: eigener Rahmen in Petrol, Schrift kommt aus dem Root-Layout. */
export default function StartLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0c3c47] font-[family-name:var(--font-hanken)] text-[#f6f3ec] selection:bg-[#ffd23f] selection:text-[#0a2b33]">
      {children}
      <ClarityLoader projectId={process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID ?? ""} />
      <CookieConsent />
    </div>
  );
}
