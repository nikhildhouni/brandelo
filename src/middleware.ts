// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// match all pages (skip static & api as needed)
export const config = {
  matcher: ["/((?!_next|static|assets|favicon.ico|api/rates).*)"],
};

const MAP: Record<string, string> = {
  IN: "INR", US: "USD", GB: "GBP", DE: "EUR", FR: "EUR", IT: "EUR", ES: "EUR",
  NL: "EUR", IE: "EUR", PT: "EUR", AT: "EUR", BE: "EUR",
  AE: "AED", AU: "AUD", CA: "CAD", SG: "SGD", JP: "JPY",
};

function currencyFromAcceptLanguage(acceptLang?: string | null): string {
  if (!acceptLang) return "INR";
  // e.g. "en-US,en;q=0.9"
  const first = acceptLang.split(",")[0]?.trim() || "";
  const region = first.split("-")[1]?.toUpperCase();
  return (region && MAP[region]) || "INR";
}

export function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const country = req.geo?.country; // Vercel prod pe aata hai; local me mostly undefined

  // Always (re)set cookie on every navigation to avoid stale values across browsers/sessions
  const currency = country ? (MAP[country] || "INR") : currencyFromAcceptLanguage(req.headers.get("accept-language"));

  res.cookies.set("wdb_currency", currency, {
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
    sameSite: "lax",
  });

  return res;
}
