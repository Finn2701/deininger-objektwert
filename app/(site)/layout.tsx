import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { CookieConsent } from "@/components/analytics/cookie-consent";
import { ClarityLoader } from "@/components/analytics/clarity-loader";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      {children}
      <SiteFooter />
      <ClarityLoader projectId={process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID ?? ""} />
      <CookieConsent />
    </>
  );
}
