import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { CookieConsent } from "@/components/analytics/cookie-consent";
import { ClarityLoader } from "@/components/analytics/clarity-loader";
import { ModelArt } from "@/components/ui/model-art";
import { ConversionBand } from "@/components/ui/conversion-band";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <div className="site-main">
        {/* Kleine Modell-Illustration neben der Überschrift, nur auf grossen Bildschirmen */}
        <ModelArt className="site-art" />
        {children}
      </div>
      <ConversionBand />
      <SiteFooter />
      <ClarityLoader projectId={process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID ?? ""} />
      <CookieConsent />
    </>
  );
}
