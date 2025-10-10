"use client";

import React from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import {
  Rocket,
  Target,
  LineChart,
  Megaphone,
  Users,
  MousePointerClick,
  ChartNoAxesCombined,
  BarChart3,
  Sparkles,
  Timer,
  Zap,
  ShieldCheck,
  ArrowRight,
  Lightbulb,
  Handshake,
  Tag,
} from "lucide-react";

/**
 * app/services/marketing/page.tsx (Next.js App Router)
 * — Ultra‑modern, glassy, and fully animated
 * — Zero external images, Tailwind + Framer Motion only
 *
 * NOTE: Fixed Framer Motion type error by replacing string easings (e.g. "easeOut", "easeInOut")
 * with cubic‑bezier arrays which satisfy the Easing type in newer versions.
 */

// Cubic‑bezier easing constants (type-safe for Framer Motion v11+)
const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];
const EASE_IN_OUT: [number, number, number, number] = [0.42, 0, 0.58, 1];

const fadeUp = (d = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.7, delay: d, ease: EASE_OUT },
});

const SERVICES = [
  {
    icon: Megaphone,
    title: "Paid Ads",
    blurb:
      "Full-funnel media buying across Google, Meta, and YouTube. We optimize creatives, bids, and audiences to scale profitably.",
    bullets: ["Performance creatives", "ROAS-first structure", "Realtime dashboards"],
  },
  {
    icon: LineChart,
    title: "SEO",
    blurb:
      "Technical, on‑page, and authority building for durable organic growth. Built on content systems, not guesswork.",
    bullets: ["Topic clusters", "Tech audits", "Link strategy"],
  },
  {
    icon: Users,
    title: "Social Growth",
    blurb:
      "Narrative‑driven content calendars, UGC pipelines, and community playbooks that turn followers into fans.",
    bullets: ["UGC + hooks", "Channel ops", "Analytics"],
  },
  {
    icon: ChartNoAxesCombined,
    title: "CRO",
    blurb:
      "Hypothesis‑driven experiments across landing pages and funnels to lift CVR without adding ad spend.",
    bullets: ["A/B program", "Heuristic audits", "Session insights"],
  },
] as const;

const STEPS = [
  { icon: Lightbulb, title: "Discover", desc: "Goals, audience, unit economics, and success metrics." },
  { icon: Target, title: "Strategy", desc: "Channel mix, creative angles, and measurement plan." },
  { icon: MousePointerClick, title: "Launch", desc: "Ship fast: trackers, pixels, ads, and content calendar." },
  { icon: BarChart3, title: "Optimize", desc: "Weekly cycles: test, learn, scale winners, cut waste." },
  { icon: ShieldCheck, title: "Scale", desc: "Automation + guardrails for efficient growth." },
] as const;

const FAQ = [
  {
    q: "How soon can we start?",
    a: "Typically within 7–10 business days after kickoff. We use a 30‑day sprint cadence with weekly check‑ins.",
  },
  {
    q: "What do you need from us?",
    a: "Access to ad accounts/analytics, brand assets, product context, and a decision‑maker for fast iteration.",
  },
  { q: "Do you work on performance pricing?", a: "Yes. Hybrid retainers with performance incentives are available for qualified products." },
  { q: "What’s included in reporting?", a: "A live Looker/Datastudio dashboard + weekly executive snapshots and experiment logs." },
] as const;

const KPIS = [
  { label: "Avg. ROAS Lift", value: 2.7, suffix: "×" },
  { label: "CAC Reduction", value: 34, suffix: "%" },
  { label: "Lead Quality", value: 1.9, suffix: "×" },
  { label: "Content Velocity", value: 3.5, suffix: "×" },
] as const;

const CASES = [
  {
    tag: "D2C",
    title: "Scaled to 4.3× ROAS in 60 days",
    metric: "+83% revenue",
    icon: Rocket,
  },
  { tag: "SaaS", title: "Cut CAC by 41% in 2 sprints", metric: "-41% CAC", icon: Timer },
  { tag: "EdTech", title: "Tripled qualified demos", metric: "3.1× SQLs", icon: Zap },
] as const;

export default function MarketingPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-white via-white to-gray-50 dark:from-[#070b18] dark:via-[#070b18] dark:to-black">
      {/* Decorative background */}
      <Aurora />
      <Grid />

      {/* Animated Hero */}
      <Hero />

      {/* Services */}
      <section id="services" className="relative">
        <div className="mx-auto max-w-7xl px-6 py-10 md:py-16">
          <motion.h2 {...fadeUp(0)} className="text-2xl font-semibold text-gray-900 md:text-4xl dark:text-white">
            What we do
          </motion.h2>
          <motion.p {...fadeUp(0.05)} className="mt-2 max-w-2xl text-gray-600 dark:text-gray-300">
            Channel experts, one playbook. We ship fast, measure obsessively, and scale what works.
          </motion.p>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s, i) => (
              <ServiceCard key={s.title} {...s} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Process timeline */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-6 py-10 md:py-16">
          <motion.h2 {...fadeUp(0)} className="text-2xl font-semibold text-gray-900 md:text-4xl dark:text-white">
            How we work
          </motion.h2>
          <motion.p {...fadeUp(0.05)} className="mt-2 max-w-2xl text-gray-600 dark:text-gray-300">
            A simple loop that compounds results.
          </motion.p>

          <ol className="mt-10 grid gap-5 md:grid-cols-5">
            {STEPS.map((st, i) => (
              <motion.li
                key={st.title}
                {...fadeUp(i * 0.05)}
                className="glassy-card group relative rounded-2xl p-5"
              >
                <div className="flex items-center gap-3">
                  <span className="rounded-xl border border-white/20 bg-white/70 p-2 backdrop-blur dark:bg-white/10">
                    <st.icon className="h-5 w-5 text-gray-900 dark:text-white" />
                  </span>
                  <p className="font-medium text-gray-900 dark:text-white">{st.title}</p>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-300">{st.desc}</p>
                <div className="absolute -right-2 -top-2 hidden h-8 w-8 rotate-6 rounded-full bg-gradient-to-tr from-fuchsia-400/50 to-emerald-400/50 blur-sm md:block" />
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* Case highlights */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-6 py-10 md:py-16">
          <motion.h2 {...fadeUp(0)} className="text-2xl font-semibold text-gray-900 md:text-4xl dark:text-white">
            Recent outcomes
          </motion.h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {CASES.map((c, i) => (
              <motion.div key={c.title} {...fadeUp(0.05 * i)} className="glassy-card relative rounded-2xl p-6">
                <span className="inline-flex items-center gap-2 text-xs font-medium text-gray-600 dark:text-gray-300">
                  <Tag className="h-3.5 w-3.5" />
                  {c.tag}
                </span>
                <div className="mt-3 flex items-start gap-3">
                  <div className="rounded-xl border border-white/20 bg-white/70 p-2 backdrop-blur dark:bg-white/10">
                    <c.icon className="h-5 w-5 text-gray-900 dark:text-white" />
                  </div>
                  <div>
                    <p className="text-base font-medium text-gray-900 dark:text-white">{c.title}</p>
                    <p className="mt-1 text-sm text-emerald-600 dark:text-emerald-400">{c.metric}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials + FAQ */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-6 py-10 md:py-16">
          <div className="grid gap-8 lg:grid-cols-2">
            <motion.div {...fadeUp(0)} className="glassy-card rounded-2xl p-6">
              <div className="flex items-center gap-2 text-gray-800 dark:text-gray-100">
                <Handshake className="h-5 w-5" />
                <p className="font-medium">What partners say</p>
              </div>
              <blockquote className="mt-4 text-balance text-lg text-gray-700 dark:text-gray-300">
                “They run growth like engineers—tight loops, clean dashboards, and creative that actually sells. Our CAC fell 38% while revenue climbed.”
              </blockquote>
              <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">— VP Growth, B2C Subscription</p>
            </motion.div>

            <motion.div {...fadeUp(0.05)} className="glassy-card rounded-2xl p-2">
              <Accordion items={FAQ} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="relative">
        <div className="mx-auto max-w-7xl px-6 py-14 md:py-20">
          <motion.div
            {...fadeUp(0)}
            className="glassy-card relative overflow-hidden rounded-3xl p-8 md:p-12"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,.15),transparent_35%),radial-gradient(circle_at_80%_30%,rgba(99,102,241,.15),transparent_35%),radial-gradient(circle_at_50%_80%,rgba(236,72,153,.15),transparent_35%)]" />
            <div className="relative z-10 grid items-center gap-6 md:grid-cols-[1.2fr_.8fr]">
              <div>
                <h3 className="text-balance text-2xl font-semibold text-gray-900 md:text-4xl dark:text-white">
                  Ready to build your growth engine?
                </h3>
                <p className="mt-2 max-w-xl text-gray-600 dark:text-gray-300">
                  Book a 30‑min strategy session. We’ll review your numbers and map a sprint plan.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-gray-900 px-5 py-3 text-white shadow-lg transition [--shine:linear-gradient(115deg,transparent_0%,transparent_45%,rgba(255,255,255,.7)_55%,transparent_65%,transparent_100%)] hover:-translate-y-0.5 hover:shadow-xl dark:bg-white dark:text-black"
                >
                  <span className="relative overflow-hidden">
                    <span className="relative z-10">Book a session</span>
                    <span className="absolute inset-0 -translate-x-full bg-[image:var(--shine)] bg-[length:250%_100%] transition-transform group-hover:translate-x-0" />
                  </span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href="#services"
                  className="inline-flex items-center justify-center rounded-2xl border border-black/10 bg-white/60 px-5 py-3 text-gray-800 backdrop-blur hover:-translate-y-0.5 dark:border-white/10 dark:bg-white/10 dark:text-white"
                >
                  View packages
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sticky CTA footer */}
      <div className="pointer-events-none fixed inset-x-0 bottom-4 z-40 flex justify-center px-4">
        <div className="pointer-events-auto glassy-card flex items-center gap-3 rounded-2xl px-4 py-3 shadow-xl">
          <Rocket className="h-4 w-4" />
          <span className="text-sm">Get a free teardown of your funnel</span>
          <Link
            href="/contact"
            className="ml-1 inline-flex items-center gap-2 rounded-xl border border-white/20 bg-gray-900 px-3 py-1.5 text-xs text-white hover:-translate-y-0.5 dark:bg-white dark:text-black"
          >
            Talk to growth
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* Tiny style helpers */}
      <style>{`
        .glassy-card {background: linear-gradient(180deg, rgba(255,255,255,0.65), rgba(255,255,255,0.45)); border: 1px solid rgba(255,255,255,.35); backdrop-filter: blur(12px);} 
        .dark .glassy-card {background: linear-gradient(180deg, rgba(255,255,255,0.10), rgba(255,255,255,0.06)); border-color: rgba(255,255,255,.15);} 
      `}</style>
    </main>
  );
}

/* ---------- Small Components ---------- */

function Hero() {
  // Parallax cursor glow + 3D headline tilt
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [0, 1], [-8, 8]), { stiffness: 120, damping: 20 });
  const ry = useSpring(useTransform(mx, [0, 1], [8, -8]), { stiffness: 120, damping: 20 });

  const onMouseMove = (e: React.MouseEvent) => {
    const b = (e.currentTarget as HTMLElement).getBoundingClientRect();
    mx.set((e.clientX - b.left) / b.width);
    my.set((e.clientY - b.top) / b.height);
  };

  return (
    <section className="relative" onMouseMove={onMouseMove}>
      <div className="mx-auto max-w-7xl px-6 pt-24 pb-8 md:pt-32">
        <motion.div {...fadeUp(0)} className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/40 px-3 py-1 text-sm text-gray-700 backdrop-blur dark:bg-white/10 dark:text-gray-200">
          <Sparkles className="h-4 w-4" />
          <span>Marketing that compounds</span>
        </motion.div>

        <motion.h1
          {...fadeUp(0.1)}
          className="mt-6 text-balance text-4xl font-semibold leading-tight tracking-tight md:text-6xl bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent dark:from-white dark:via-gray-200 dark:to-white"
        >
          Growth systems that {" "}
          <span className="relative inline-block">
            <motion.span style={{ rotateX: rx as any, rotateY: ry as any }} className="inline-block will-change-transform">
              turn attention into revenue
            </motion.span>
            <span className="pointer-events-none absolute inset-x-0 bottom-1 h-2 bg-gradient-to-r from-fuchsia-400/30 via-emerald-400/30 to-indigo-400/30 blur" />
          </span>
        </motion.h1>

        <motion.p
          {...fadeUp(0.2)}
          className="mt-5 max-w-2xl text-pretty text-lg text-gray-600 md:text-xl dark:text-gray-300"
        >
          We blend Paid, SEO, Social, and CRO into one loop—so every experiment, creative, and click makes the next one smarter.
        </motion.p>

        <motion.div {...fadeUp(0.3)} className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
          <Link
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-gray-900 px-5 py-3 text-white shadow-lg shadow-gray-900/10 transition [--shine:linear-gradient(115deg,transparent_0%,transparent_40%,rgba(255,255,255,.6)_50%,transparent_60%,transparent_100%)] hover:-translate-y-0.5 hover:shadow-xl dark:bg-white dark:text-black"
          >
            <span className="relative overflow-hidden">
              <span className="relative z-10">Start a growth sprint</span>
              <span className="absolute inset-0 -translate-x-full bg-[image:var(--shine)] bg-[length:250%_100%] bg-clip-text text-transparent transition-transform group-hover:translate-x-0" />
            </span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="#services"
            className="inline-flex items-center gap-2 rounded-2xl border border-black/10 bg-white/60 px-5 py-3 text-gray-800 backdrop-blur transition hover:-translate-y-0.5 dark:border-white/10 dark:bg-white/10 dark:text-white"
          >
            Explore services
          </Link>
        </motion.div>
      </div>

      {/* KPI strip */}
      <div className="mx-auto max-w-7xl px-6 pb-14">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {KPIS.map(({ label, value, suffix }, i) => (
            <motion.div
              key={label}
              {...fadeUp(0.05 * i)}
              className="glassy-card rounded-2xl p-4 text-center"
            >
              <AnimatedCounter to={value} suffix={suffix} />
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Floating orbs reacting to cursor */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-10 top-10 h-32 w-32 rounded-full bg-gradient-to-tr from-emerald-400/25 to-cyan-400/25 blur-2xl"
        style={{ x: useTransform(mx, (v) => (v - 0.5) * 40), y: useTransform(my, (v) => (v - 0.5) * 40) }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute right-6 top-24 h-24 w-24 rounded-full bg-gradient-to-tr from-fuchsia-400/25 to-indigo-400/25 blur-2xl"
        style={{ x: useTransform(mx, (v) => (0.5 - v) * 40), y: useTransform(my, (v) => (0.5 - v) * 40) }}
      />
    </section>
  );
}

function ServiceCard({ icon: Icon, title, blurb, bullets, index }: any) {
  return (
    <motion.article
      {...fadeUp(0.05 * index)}
      whileHover={{ y: -4 }}
      className="glassy-card group relative rounded-2xl p-5"
    >
      <div className="flex items-center gap-3">
        <span className="rounded-xl border border-white/20 bg-white/70 p-2 backdrop-blur dark:bg-white/10">
          <Icon className="h-5 w-5 text-gray-900 dark:text-white" />
        </span>
        <h3 className="text-base font-semibold text-gray-900 dark:text-white">{title}</h3>
      </div>
      <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">{blurb}</p>
      <ul className="mt-4 space-y-2 text-sm text-gray-700 dark:text-gray-300">
        {bullets.map((b: string) => (
          <li key={b} className="flex items-start gap-2">
            <ShieldCheck className="mt-0.5 h-4 w-4 flex-none" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
      <Link
        href="/contact"
        className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-gray-900 underline-offset-2 hover:underline dark:text-white"
      >
        Learn more <ArrowRight className="h-3.5 w-3.5" />
      </Link>
      <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-gradient-to-tr from-emerald-400/30 to-indigo-400/30 blur-xl transition-opacity group-hover:opacity-100" />
    </motion.article>
  );
}

function AnimatedCounter({ to, suffix = "" }: { to: number; suffix?: string }) {
  return (
    <motion.span
      className="block text-2xl font-semibold text-gray-900 md:text-3xl dark:text-white"
      initial={{ opacity: 0, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.6, ease: EASE_OUT }}
    >
      <Counter to={to} />{suffix}
    </motion.span>
  );
}

function Counter({ to }: { to: number }) {
  const decimals = String(to).includes(".") ? 1 : 0;
  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={to}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: EASE_OUT }}
      >
        {to.toFixed(decimals)}
      </motion.span>
    </AnimatePresence>
  );
}

function Accordion({ items }: { items: ReadonlyArray<{ q: string; a: string }> }) {
  return (
    <div className="divide-y divide-white/10">
      {items.map((it) => (
        <details key={it.q} className="group p-4">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
            <span className="text-sm font-medium text-gray-900 dark:text-white">{it.q}</span>
            <ArrowRight className="h-4 w-4 transition group-open:rotate-90" />
          </summary>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{it.a}</p>
        </details>
      ))}
    </div>
  );
}

function Aurora() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute -top-32 left-1/2 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-gradient-to-tr from-indigo-400/25 via-emerald-400/25 to-fuchsia-400/25 blur-3xl"
        initial={{ opacity: 0.2, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: EASE_OUT }}
      />
      <motion.div
        className="absolute bottom-[-20%] left-[10%] h-72 w-72 rounded-full bg-gradient-to-tr from-fuchsia-400/20 to-cyan-400/20 blur-3xl"
        animate={{ y: [0, -12, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: EASE_IN_OUT }}
      />
      <motion.div
        className="absolute right-[10%] top-[20%] h-72 w-72 rounded-full bg-gradient-to-tr from-emerald-400/20 to-indigo-400/20 blur-3xl"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 9, ease: EASE_IN_OUT }}
      />
    </div>
  );
}

function Grid() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <div
        className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,transparent_95%,rgba(0,0,0,.05)_95%),linear-gradient(to_right,transparent,transparent_95%,rgba(0,0,0,.05)_95%)] bg-[length:24px_24px] dark:bg-[linear-gradient(to_bottom,transparent,transparent_95%,rgba(255,255,255,.08)_95%),linear-gradient(to_right,transparent,transparent_95%,rgba(255,255,255,.08)_95%)]"
      />
      {/* Subtle spotlight following scroll */}
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(600px_200px_at_50%_10%,rgba(255,255,255,.18),transparent)] dark:bg-[radial-gradient(600px_200px_at_50%_10%,rgba(255,255,255,.06),transparent)]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: EASE_OUT }}
      />
    </div>
  );
}
