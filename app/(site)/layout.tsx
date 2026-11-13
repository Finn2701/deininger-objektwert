import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { CookieConsent } from "@/components/analytics/cookie-consent";
import { ClarityLoader } from "@/components/analytics/clarity-loader";
import { ModelArt } from "@/components/ui/model-art";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      {/* Illustrationsband: gleiche Bildwelt wie die Startseite, auf allen Unterseiten */}
      <div className="page-band" aria-hidden>
        <div className="mx-auto flex h-full w-full max-w-[84rem] items-end justify-between gap-6 px-5 sm:px-8 lg:px-12">
          <div className="page-band-dots hidden md:block" />
          <ModelArt className="page-band-art" />
        </div>
      </div>
      <div className="site-main">{children}</div>
      <SiteFooter />
      <ClarityLoader projectId={process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID ?? ""} />
      <CookieConsent />
    </>
  );
}
