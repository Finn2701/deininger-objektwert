import type { Metadata } from "next";
import { AalenSalePage } from "@/components/marketing/aalen-sale-page";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Haus verkaufen in Aalen: Wert, Unterlagen & Ablauf",
  description:
    "Haus in Aalen verkaufen: kostenlose Wertspanne, Unterlagen-Checkliste, lokale Marktdaten und ein klarer Ablauf bis zum Notartermin.",
  alternates: { canonical: "/haus-verkaufen-aalen" },
};

export default function HausVerkaufenAalenPage() {
  return <AalenSalePage kind="house" />;
}
