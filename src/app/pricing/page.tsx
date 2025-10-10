"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Check, ArrowRight, Info } from "lucide-react";

/**
 * /app/pricing/page.tsx (example path)
 * WDB – Pricing Page (Neon Glass, Always-Dark + Full-Bleed Backdrop)
 * - Backdrop is fixed + outside the constrained container (no side gutters)
 * - Palette matches FounderSection (bg #0b1020 + aurora + grid + conic glow)
 * - Auto-currency preserved; FM v11 animations; accessibility tweaks
 */

/* ===================== Types & Data ===================== */
type Rates = Record<string, number>;

const CATEGORIES = [
  { key: "seo", label: "Search Engine Optimization" },
  { key: "smm", label: "Social Media Marketing" },
  { key: "web", label: "Web Development" },
  { key: "ads", label: "Paid Ads" },
  { key: "content", label: "Content + On Page SEO" },
] as const;

type Tier = { name: string; price: number; badge?: string; features: string[] };
type Section = { key: (typeof CATEGORIES)[number]["key"]; label: string; tiers: Tier[] };

const SECTIONS: Section[] = [
  {
    key: "seo",
    label: "Search Engine Optimization",
    tiers: [
      { name: "Starter", price: 7999, badge: "Best for local", features: ["1–3 Keywords", "Site Health Audit", "Meta & Alt Optimization", "Google My Business Setup", "Monthly Report"] },
      { name: "Growth", price: 14999, badge: "Popular", features: ["5–10 Keywords", "Technical Fixes", "On-page Optimization", "Backlink Outreach (8/mo)", "Bi-weekly Report"] },
      { name: "Scale", price: 24999, badge: "Competitive", features: ["15–25 Keywords", "Content Strategy", "Schema + Internal Links", "Backlink Outreach (20/mo)", "Weekly Report"] },
      { name: "Elite", price: 39999, badge: "Aggressive", features: ["30+ Keywords", "Full Tech SEO + Speed", "Content + Link Building", "Digital PR", "Dedicated Manager"] },
    ],
  },
  {
    key: "smm",
    label: "Social Media Marketing",
    tiers: [
      { name: "Starter", price: 8999, features: ["8 Posts / mo", "2 Reels / mo", "Hashtag Research", "Calendar & Scheduling", "Monthly Report"] },
      { name: "Growth", price: 14999, badge: "Popular", features: ["12 Posts / mo", "4 Reels / mo", "Copies & Captions", "Community Management", "Bi-weekly Report"] },
      { name: "Scale", price: 22999, features: ["16 Posts / mo", "6 Reels / mo", "Paid Boost Strategy", "UGC Guidance", "Weekly Insights"] },
      { name: "Elite", price: 32999, features: ["22 Posts / mo", "8 Reels / mo", "Influencer Collabs", "Shoot Direction", "Dedicated Manager"] },
    ],
  },
  {
    key: "web",
    label: "Web Development",
    tiers: [
      { name: "Landing", price: 14999, badge: "Fast", features: ["1–3 Pages", "Responsive UI", "SEO Ready", "Basic Animations", "Delivery in 5–7 days"] },
      { name: "Business", price: 34999, badge: "Popular", features: ["Up to 8 Pages", "CMS (Blog)", "Contact & Lead Forms", "Speed Optimized", "Analytics Setup"] },
      { name: "E-commerce", price: 69999, features: ["Product Catalog", "Payments + Cart", "Coupons & Wishlist", "Order Emails", "Training + Docs"] },
      { name: "Custom App", price: 119999, features: ["Next.js / React", "API Integrations", "Auth & Roles", "Deploy & CI/CD", "3 Months Support"] },
    ],
  },
  {
    key: "ads",
    label: "Paid Ads",
    tiers: [
      { name: "Starter", price: 8999, features: ["Budget ≤ ₹30k", "Google / Meta", "Pixel & Conversion Setup", "2 Campaigns", "Monthly Report"] },
      { name: "Growth", price: 14999, badge: "Popular", features: ["Budget ≤ ₹75k", "Funnel & Audiences", "A/B Creative Testing", "Remarketing", "Bi-weekly Report"] },
      { name: "Scale", price: 23999, features: ["Budget ≤ ₹150k", "Full-funnel Strategy", "Advanced Bidding", "Custom Dashboards", "Weekly Sync"] },
      { name: "Elite", price: 34999, features: ["Budget > ₹150k", "Multi-channel", "Creative Studio Support", "Marketing Mix Modeling", "Dedicated Manager"] },
    ],
  },
  {
    key: "content",
    label: "Content + On Page SEO",
    tiers: [
      { name: "Starter", price: 6999, features: ["2 Blogs / mo", "Topic & Outline", "On-page Optimization", "Internal Linking", "Indexing"] },
      { name: "Growth", price: 11999, badge: "Popular", features: ["4 Blogs / mo", "Keyword Clusters", "Content Briefs", "Image SEO", "Bi-weekly Report"] },
      { name: "Scale", price: 18999, features: ["8 Blogs / mo", "Long-form + Guides", "Content Upgrades", "Schema Markup", "Weekly Insights"] },
    ],
  },
];

/* ===================== Currency Helpers ===================== */
type Maybe<T> = T | undefined;
function getCookie(name: string): Maybe<string> {
  if (typeof document === "undefined") return;
  const m = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return m?.[2];
}
function localeGuess(): string {
  if (typeof navigator !== "undefined" && navigator.language) return navigator.language;
  return "en-IN";
}
function currencyFromLocale(loc: string): string {
  const region = loc.split("-")[1]?.toUpperCase();
  const map: Record<string, string> = {
    IN: "INR", US: "USD", GB: "GBP", DE: "EUR", FR: "EUR", IT: "EUR", ES: "EUR", NL: "EUR",
    AE: "AED", AU: "AUD", CA: "CAD", SG: "SGD", JP: "JPY",
  };
  return (region && map[region]) || "INR";
}
async function fetchRates(): Promise<Rates> {
  const res = await fetch("/api/rates", { cache: "force-cache" });
  if (!res.ok) return { INR: 1 };
  const j = await res.json();
  return (j?.rates as Rates) ?? { INR: 1 };
}
function convertFromINR(amountINR: number, toCurrency: string, rates: Rates) {
  const r = rates?.[toCurrency];
  return r && isFinite(r) ? amountINR * r : amountINR;
}
function formatCurrency(amount: number, currency: string, locale: string) {
  try {
    return new Intl.NumberFormat(locale, { style: "currency", currency, maximumFractionDigits: 0 }).format(amount);
  } catch {
    return `${currency} ${Math.round(amount).toLocaleString()}`;
  }
}

/* ===================== Animations ===================== */
const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } },
};

/* ===================== Full-Bleed Backdrop ===================== */
function NeonBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      {/* Base */}
      <div className="absolute inset-0 bg-[#0b1020]" />
      {/* Radial aurora blend (blue/purple/green) */}
      <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_10%,rgba(99,102,241,0.25),transparent_50%),radial-gradient(70%_50%_at_80%_20%,rgba(34,197,94,0.20),transparent_50%)]" />
      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-40 [mask-image:radial-gradient(70%_60%_at_50%_42%,black,transparent)]">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-pricing-fixed" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeOpacity="0.06" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pricing-fixed)" />
        </svg>
      </div>
      {/* Slow conic glow */}
      <div
        aria-hidden
        className="absolute -top-40 left-1/2 h-[70rem] w-[70rem] -translate-x-1/2 rounded-full blur-3xl opacity-35"
        style={{
          background:
            "conic-gradient(from 180deg at 50% 50%, rgba(59,130,246,0.35), rgba(168,85,247,0.35), rgba(34,197,94,0.35), rgba(59,130,246,0.35))",
          animation: "spin 50s linear infinite",
        }}
      />
      <style jsx>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

/* ===================== Page ===================== */
export default function PricingPageWDB() {
  const [active, setActive] = useState<(typeof CATEGORIES)[number]["key"]>("seo");
  const reduce = useReducedMotion();

  const [locale, setLocale] = useState("en-IN");
  const [currency, setCurrency] = useState("INR");
  const [rates, setRates] = useState<Rates>({ INR: 1 });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const loc = localeGuess();
    setLocale(loc);
    const cookieCur = getCookie("wdb_currency");
    setCurrency(cookieCur || currencyFromLocale(loc));
    fetchRates().then((r) => {
      setRates(r);
      setLoaded(true);
    });
  }, []);

  const sections = useMemo(() => {
    return SECTIONS.map((s) => ({
      ...s,
      tiers: s.tiers.map((t) => {
        const converted = convertFromINR(t.price, currency, rates);
        const displayPrice = formatCurrency(converted, currency, locale);
        return { ...t, displayPrice } as Tier & { displayPrice: string };
      }),
    }));
  }, [currency, rates, locale]);

  return (
    <div className="relative min-h-screen text-white">
      <NeonBackdrop />

      <main className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Note */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="mb-8 flex items-center justify-center gap-2 text-sm text-white/70"
        >
          <Info className="h-4 w-4" />
          <span>Prices auto-convert from INR (cached ~12h)</span>
        </motion.div>

        {/* Sticky chips */}
        <div className="top-16 z-30 mb-10">
          <div className="relative mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-2 py-2 backdrop-blur-md shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
            {CATEGORIES.map((cat) => {
              const isActive = active === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => {
                    setActive(cat.key);
                    document.getElementById(cat.key)?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActive(cat.key);
                      document.getElementById(cat.key)?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                  }}
                  aria-current={isActive}
                  className={`relative rounded-full border border-white/10 px-4 py-2 text-sm transition-all hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400/60 ${
                    isActive ? "bg-white/15 text-white" : "bg-white/5 text-white"
                  } backdrop-blur-md`}
                >
                  {cat.label}
                  {isActive && (
                    <motion.span
                      layoutId="chip-underline"
                      className="absolute inset-0 rounded-full ring-2 ring-emerald-400/60"
                      transition={
                        reduce
                          ? { type: "tween" as const, duration: 0.25 }
                          : { type: "spring" as const, stiffness: 300, damping: 25 }
                      }
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-20">
          {sections.map((section, sIdx) => (
            <section id={section.key} key={section.key} className="scroll-mt-24">
              <motion.header
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.4 }}
                className="mb-8 text-center"
              >
                <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{section.label}</h2>
                <p className="mt-2 text-sm text-white/70">Select a plan that matches your goals & budget.</p>
              </motion.header>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {section.tiers.map((tier, i) => (
                  <GlassCard
                    key={tier.name}
                    tier={tier as Tier & { displayPrice?: string }}
                    sectionKey={section.key}
                    delay={i * 0.06 + sIdx * 0.02}
                    reduce={reduce}
                    loaded={loaded}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Footer CTA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="mt-24 rounded-2xl border border-white/15 bg-white/10 p-6 text-center backdrop-blur-md shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]"
        >
          <h3 className="text-xl font-semibold">Need a custom plan?</h3>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-white/70">
            Tell us your goals and baseline. We'll tailor a package across SEO, content, ads, and web so you only pay for what you need.
          </p>
          <a
            href="/contact"
            className="mt-4 inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/10 px-5 py-2 text-sm font-medium backdrop-blur-md transition hover:shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60"
          >
            Talk to an expert
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </motion.div>
      </main>
    </div>
  );
}

/* ===================== Card ===================== */
function GlassCard({
  tier,
  sectionKey,
  delay = 0,
  reduce,
  loaded,
}: {
  tier: Tier & { displayPrice?: string };
  sectionKey: string;
  delay?: number;
  reduce: boolean | null;
  loaded: boolean;
}) {
  const fallbackINR = useMemo(() => {
    try {
      return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(tier.price);
    } catch {
      return `₹${tier.price.toLocaleString("en-IN")}`;
    }
  }, [tier.price]);

  return (
    <motion.article
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: reduce ? 0 : delay }}
      className="group relative flex h-full flex-col rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-md shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] ring-1 ring-transparent transition will-change-transform hover:-translate-y-1 hover:shadow-lg hover:ring-emerald-400/30"
      style={{
        backgroundImage:
          "radial-gradient(1200px 400px at 50% -10%, rgba(16,185,129,0.08), transparent 60%)",
      }}
    >
      {tier.badge && (
        <motion.span
          initial={{ opacity: 0, y: -6 }}
          whileInView={{ opacity: 1, y: 0, transition: { delay: 0.15, ease: EASE_OUT } }}
          viewport={{ once: true }}
          className="absolute right-4 top-4 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 px-3 py-1 text-[10px] font-medium uppercase tracking-wide text-emerald-50 shadow"
        >
          {tier.badge}
        </motion.span>
      )}

      <div className="pb-4">
        <h3 className="text-lg font-semibold tracking-tight">{tier.name}</h3>
        <div className="mt-2 flex items-end gap-1">
          <span className="text-3xl font-bold">{loaded && tier.displayPrice ? tier.displayPrice : fallbackINR}</span>
          <span className="text-xs text-white/70">/ month</span>
        </div>
      </div>

      <ul className="mb-6 mt-2 space-y-2 text-sm">
        {tier.features.map((f, i2) => (
          <li key={i2} className="flex items-start gap-2">
            <Check className="mt-0.5 h-4 w-4 flex-none" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto">
        <motion.a
          href={`/contact?service=${sectionKey}&plan=${tier.name}`}
          whileHover={{ scale: reduce ? 1 : 1.02 }}
          whileTap={{ scale: reduce ? 1 : 0.98 }}
          className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 bg-gradient-to-br from-emerald-500/90 to-emerald-600/90 px-4 py-2 text-sm font-medium text-emerald-50 shadow-lg transition hover:brightness-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/70"
        >
          Choose plan
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
        </motion.a>
        <p className="mt-3 text-center text-xs text-white/70">No hidden fees or surprises</p>
      </div>

      {/* glossy corners highlight on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.06) 20%, rgba(255,255,255,0.0) 40%)",
          WebkitMask:
            "radial-gradient(26px 26px at 24px 24px, black 40%, transparent 41%), radial-gradient(26px 26px at calc(100% - 24px) calc(100% - 24px), black 40%, transparent 41%)",
          mask:
            "radial-gradient(26px 26px at 24px 24px, black 40%, transparent 41%), radial-gradient(26px 26px at calc(100% - 24px) calc(100% - 24px), black 40%, transparent 41%)",
        }}
      />
    </motion.article>
  );
}
