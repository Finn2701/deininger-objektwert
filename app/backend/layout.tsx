import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { logout } from "./actions";

export default async function BackendLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <div className="backend-shell min-h-screen bg-[#0c3c47]">{children}</div>;
  }

  const nav = [
    ["/backend", "Anfragen"],
    ["/backend/kunden", "Kunden"],
    ["/backend/projekte", "Projekte"],
    ["/backend/inhalte", "Inhalte"],
    ["/backend/faq", "FAQ"],
    ["/backend/ratgeber", "Ratgeber"],
  ];

  return (
    <div className="backend-shell min-h-screen bg-paper">
      <header className="bg-[#0c3c47] text-[#f6f3ec]">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-2.5">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <span className="font-display text-base font-black tracking-[0.02em] uppercase">
              Deininger <span className="font-medium tracking-[0.18em] text-[#a9c4c9]">Backend</span>
            </span>
            <nav className="flex flex-wrap gap-1 text-sm font-semibold">
              {nav.map(([href, label]) => (
                <Link key={href} href={href} className="rounded-full px-4 py-1.5 text-[#cfe0e3] transition-colors hover:bg-white/10 hover:text-white">
                  {label}
                </Link>
              ))}
            </nav>
          </div>
          <form action={logout}>
            <button type="submit" className="rounded-full bg-[#ffd23f] px-5 py-1.5 text-sm font-bold text-[#0a2b33] transition-transform hover:scale-[1.03]">
              Abmelden
            </button>
          </form>
        </div>
        <div className="backend-wave" aria-hidden />
      </header>
      <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
    </div>
  );
}
