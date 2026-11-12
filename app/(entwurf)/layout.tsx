import type { Metadata } from "next";
import { Gabarito, Hanken_Grotesk } from "next/font/google";

const gabarito = Gabarito({ subsets: ["latin"], variable: "--font-gabarito", display: "swap" });
const hanken = Hanken_Grotesk({ subsets: ["latin"], variable: "--font-hanken", display: "swap" });

// Entwurf: nicht in Suchmaschinen aufnehmen
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function EntwurfLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${gabarito.variable} ${hanken.variable} min-h-screen bg-[#0c3c47] font-[family-name:var(--font-hanken)] text-[#f6f3ec] selection:bg-[#ffd23f] selection:text-[#0a2b33]`}
    >
      {children}
    </div>
  );
}
