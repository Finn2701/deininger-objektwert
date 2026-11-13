import type { Metadata } from "next";
import { login } from "../actions";
import { ModelArt } from "@/components/ui/model-art";

export const metadata: Metadata = {
  title: "Login",
  robots: { index: false, follow: false },
};

export default async function BackendLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 py-10">
      <ModelArt className="h-auto w-64 max-w-full sm:w-80" />
      <div className="w-full max-w-sm rounded-[2rem] bg-paper p-8 md:p-10">
        <p className="text-xs font-medium tracking-[0.2em] text-accent uppercase">Backend</p>
        <h1 className="mt-3 font-display text-2xl font-medium text-ink">Anmelden</h1>

        {error ? (
          <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
            Anmeldung fehlgeschlagen: {error}
          </p>
        ) : null}

        <form action={login} className="mt-8 space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm text-ink-soft">
              E-Mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="mt-1.5 w-full rounded-xl border border-line bg-white px-4 py-3 text-ink outline-none focus:border-ink"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm text-ink-soft">
              Passwort
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="mt-1.5 w-full rounded-xl border border-line bg-white px-4 py-3 text-ink outline-none focus:border-ink"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-ink px-6 py-3 text-sm text-paper transition-colors hover:bg-ink-soft"
          >
            Anmelden
          </button>
        </form>
      </div>
    </div>
  );
}
