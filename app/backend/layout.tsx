import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { logout } from "./actions";

export default async function BackendLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <div className="min-h-screen bg-paper">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-paper">
      <header className="border-b border-line">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-8">
            <span className="font-display text-sm font-medium text-ink">Backend</span>
            <nav className="flex gap-6 text-sm text-ink-soft">
              <Link href="/backend" className="hover:text-ink">
                Anfragen
              </Link>
              <Link href="/backend/kunden" className="hover:text-ink">
                Kunden
              </Link>
              <Link href="/backend/projekte" className="hover:text-ink">
                Projekte
              </Link>
              <Link href="/backend/inhalte" className="hover:text-ink">
                Inhalte
              </Link>
              <Link href="/backend/faq" className="hover:text-ink">
                FAQ
              </Link>
            </nav>
          </div>
          <form action={logout}>
            <button type="submit" className="text-sm text-ink-soft hover:text-ink">
              Abmelden
            </button>
          </form>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-10">{children}</main>
    </div>
  );
}
