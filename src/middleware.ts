// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

// ⬇️ same matcher jo tum pehle use kar rahe the
export const config = {
  matcher: ["/((?!_next|static|assets|favicon.ico|api/rates).*)"],
};

// ---- Currency logic (tumhara purana code) ----

const MAP: Record<string, string> = {
  IN: "INR",
  US: "USD",
  GB: "GBP",
  DE: "EUR",
  FR: "EUR",
  IT: "EUR",
  ES: "EUR",
  NL: "EUR",
  IE: "EUR",
  PT: "EUR",
  AT: "EUR",
  BE: "EUR",
  AE: "AED",
  AU: "AUD",
  CA: "CAD",
  SG: "SGD",
  JP: "JPY",
};

function currencyFromAcceptLanguage(acceptLang?: string | null): string {
  if (!acceptLang) return "INR";
  // e.g. "en-US,en;q=0.9"
  const first = acceptLang.split(",")[0]?.trim() || "";
  const region = first.split("-")[1]?.toUpperCase();
  return (region && MAP[region]) || "INR";
}

// ---- Middleware ----

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const pathname = req.nextUrl.pathname;

  // 1️⃣ Currency cookie har request pe set karo (tumhara pura logic)
  const country = req.headers.get("x-vercel-ip-country") || undefined;

  const currency = country
    ? MAP[country] || "INR"
    : currencyFromAcceptLanguage(req.headers.get("accept-language"));

  res.cookies.set("wdb_currency", currency, {
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
    sameSite: "lax",
  });

  // 2️⃣ Auth guards sirf /dashboard aur /admin ke liye
  if (pathname.startsWith("/dashboard") || pathname.startsWith("/admin")) {
    // Supabase client for middleware
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
      {
        cookies: {
          get(name: string) {
            return req.cookies.get(name)?.value;
          },
          set(name: string, value: string, options: CookieOptions) {
            res.cookies.set(name, value, options);
          },
          remove(name: string, options: CookieOptions) {
            res.cookies.set(name, "", { ...options, maxAge: -1 });
          },
        },
      }
    );

    const {
      data: { session },
    } = await supabase.auth.getSession();

    // 🔒 /dashboard -> login required
    if (pathname.startsWith("/dashboard")) {
      if (!session) {
        return NextResponse.redirect(new URL("/login", req.url));
      }
    }

    // 🔒 /admin -> admin role required
    if (pathname.startsWith("/admin")) {
      if (!session) {
        return NextResponse.redirect(new URL("/login", req.url));
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", session.user.id)
        .single();

      if (profile?.role !== "admin") {
        // logged in but not admin -> normal dashboard
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
    }
  }

  return res;
}
