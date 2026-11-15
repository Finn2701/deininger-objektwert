import type { Metadata } from "next";
import { AalenSalePage } from "@/components/marketing/aalen-sale-page";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Wohnung verkaufen in Aalen: Wert, WEG-Unterlagen & Ablauf",
  description:
    "Wohnung in Aalen verkaufen: Wert kostenlos einschätzen, WEG-Unterlagen vollständig vorbereiten und lokale Marktdaten richtig einordnen.",
  alternates: { canonical: "/wohnung-verkaufen-aalen" },
};

export default function WohnungVerkaufenAalenPage() {
  return <AalenSalePage kind="apartment" />;
}
