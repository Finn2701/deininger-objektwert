import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isBackendRoute = request.nextUrl.pathname.startsWith("/backend");
  const isLoginRoute = request.nextUrl.pathname === "/backend/login";

  if (!isBackendRoute) {
    // Cookie-free page view count (see supabase/schema.sql: record_page_view)
    // — a simple per-day, per-path counter, not a per-visitor tracker, so it
    // never blocks the response and a failure here is silently ignored.
    supabase.rpc("record_page_view", { p_path: request.nextUrl.pathname }).then(
      () => {},
      () => {}
    );
  }

  if (isBackendRoute && !isLoginRoute && !user) {
    const loginUrl = new URL("/backend/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  if (isLoginRoute && user) {
    const dashboardUrl = new URL("/backend", request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return response;
}
