import type { Metadata } from "next";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Datenschutz",
  robots: { index: false, follow: true },
};

export default function DatenschutzPage() {
  return (
    <>
      <main className="pt-32 pb-24">
        <Container className="max-w-2xl">
          <h1 className="font-display text-3xl font-medium text-ink">Datenschutz</h1>
          <p className="mt-6 text-ink-soft/90">
            Die Datenschutzerklärung wird vor dem Live-Gang ergänzt.
          </p>
        </Container>
      </main>
    </>
  );
}
