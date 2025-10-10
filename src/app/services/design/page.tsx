"use client";

import React from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import {
  PenTool,
  Palette,
  Layout,
  Image as ImageIcon,
  Layers,
  BadgeCheck,
  Sparkles,
  ArrowRight,
  Rocket,
  Tag,
} from "lucide-react";

/**
 * app/services/design/page.tsx (Next.js App Router)
 * — Ultra‑modern, glassy, and fully animated (Design Services)
 * — Zero external images, Tailwind + Framer Motion only
 *
 * Fixed: Framer Motion transition type error by using a cubic‑bezier array for `ease` instead of the string "easeOut".
 */

// Use a cubic‑bezier array (Easing) instead of a string for type safety with Framer Motion v11+.
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]; // approx easeOut

const fadeUp = (d = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.7, delay: d, ease: EASE },
});

const SERVICES = [
  {
    icon: PenTool,
    title: "Brand Identity",
    blurb:
      "Strategy‑led logos, typography, and visual language that make your brand unmistakable and memorable.",
    bullets: ["Logo + marks", "Tone & voice", "Brand guidelines"],
  },
  {
    icon: Layout,
    title: "UI/UX Design",
    blurb:
      "Human‑centered interfaces that are simple, accessible, and conversion‑focused across web & mobile.",
    bullets: ["User flows", "Wireframes", "Hi‑fi prototypes"],
  },
  {
    icon: ImageIcon,
    title: "Web Design",
    blurb:
      "Marketing sites and landing pages with crisp art direction, motion, and on‑brand components.",
    bullets: ["Hero art direction", "Micro‑interactions", "Responsive layouts"],
  },
  {
    icon: Layers,
    title: "Design Systems",
    blurb:
      "Token‑driven systems, components, and documentation that keep teams moving fast and on‑brand.",
    bullets: ["Design tokens", "Component library", "Usage docs"],
  },
] as const;

const STEPS = [
  { icon: Sparkles, title: "Discover", desc: "Audience, positioning, and success metrics." },
  { icon: PenTool, title: "Define", desc: "Brand pillars, IA, and UX principles." },
  { icon: Layout, title: "Wireframe", desc: "Flows, IA, and rapid low‑fi mapping." },
  { icon: Palette, title: "Design", desc: "Hi‑fi visuals, motion, and prototypes." },
  { icon: BadgeCheck, title: "Handoff", desc: "Specs, tokens, and component documentation." },
] as const;

const FAQ = [
  {
    q: "What files do we get?",
    a: "Editable source files (Figma), tokens, a component library, and exportable assets as needed.",
  },
  {
    q: "Can you work with our devs?",
    a: "Yes—design tokens, component specs, and paired implementation sprints are our default approach.",
  },
  { q: "Do you handle branding from scratch?", a: "Absolutely. From discovery workshops to full identity systems and brand guidelines." },
  { q: "How do you test designs?", a: "Click‑thru prototypes, usability tests, and instrumentation plans for post‑launch measurement." },
] as const;

const KPIS = [
  { label: "Design Velocity", value: 3.2, suffix: "×" },
  { label: "Time‑to‑Ship", value: 42, suffix: "%" },
  { label: "Usability Gains", value: 2.1, suffix: "×" },
  { label: "Consistency", value: 95, suffix: "%" },
] as const;

const CASES = [
  {
    tag: "Branding",
    title: "Rebrand lifted recall by 2.4×",
    metric: "+2.4× recall",
    icon: Palette,
  },
  { tag: "SaaS UI", title: "Simplified IA cut task time 37%", metric: "-37% task time", icon: Layout },
  { tag: "E‑com UX", title: "Checkout polish raised CR 18%", metric: "+18% CVR", icon: Layers },
] as const;

export default function DesignPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-white via-white to-gray-50 dark:from-[#0b1020] dark:via-[#0b1020] dark:to-black">
      <Aurora />
      <Grid />

      <Hero />

      {/* Services */}
      <section id="services" className="relative">
        <div className="mx-auto max-w-7xl px-6 py-10 md:py-16">
          <motion.h2 {...fadeUp(0)} className="text-2xl font-semibold text-gray-900 md:text-4xl dark:text-white">
            What we design
          </motion.h2>
          <motion.p {...fadeUp(0.05)} className="mt-2 max-w-2xl text-gray-600 dark:text-gray-300">
            Beautiful meets useful. Systems, not screenshots—so every pixel pushes outcomes.
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
            How we craft
          </motion.h2>
          <motion.p {...fadeUp(0.05)} className="mt-2 max-w-2xl text-gray-600 dark:text-gray-300">
            From discovery to handoff, a calm, repeatable cadence.
          </motion.p>

          <ol className="mt-10 grid gap-5 md:grid-cols-5">
            {STEPS.map((st, i) => (
              <motion.li key={st.title} {...fadeUp(i * 0.05)} className="glassy-card group relative rounded-2xl p-5">
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

      {/* Contact CTA */}
      <section id="contact" className="relative">
        <div className="mx-auto max-w-7xl px-6 py-14 md:py-20">
          <motion.div {...fadeUp(0)} className="glassy-card relative overflow-hidden rounded-3xl p-8 md:p-12">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,.15),transparent_35%),radial-gradient(circle_at_80%_30%,rgba(99,102,241,.15),transparent_35%),radial-gradient(circle_at_50%_80%,rgba(236,72,153,.15),transparent_35%)]" />
            <div className="relative z-10 grid items-center gap-6 md:grid-cols-[1.2fr_.8fr]">
              <div>
                <h3 className="text-balance text-2xl font-semibold text-gray-900 md:text-4xl dark:text-white">
                  Ready to elevate your brand?
                </h3>
                <p className="mt-2 max-w-xl text-gray-600 dark:text-gray-300">
                  Book a 30‑min design consult. We’ll audit your UI and shape a focused plan.
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
          <span className="text-sm">Free 10‑point UI/UX review</span>
          <Link
            href="/contact"
            className="ml-1 inline-flex items-center gap-2 rounded-xl border border-white/20 bg-gray-900 px-3 py-1.5 text-xs text-white hover:-translate-y-0.5 dark:bg-white dark:text-black"
          >
            Talk to design
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
          <span>Design that performs</span>
        </motion.div>

        <motion.h1
          {...fadeUp(0.1)}
          className="mt-6 text-balance text-4xl font-semibold leading-tight tracking-tight md:text-6xl bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent dark:from-white dark:via-gray-200 dark:to-white"
        >
          Interfaces that {" "}
          <span className="relative inline-block">
            <motion.span style={{ rotateX: rx as any, rotateY: ry as any }} className="inline-block will-change-transform">
              feel beautiful and ship fast
            </motion.span>
            <span className="pointer-events-none absolute inset-x-0 bottom-1 h-2 bg-gradient-to-r from-fuchsia-400/30 via-emerald-400/30 to-indigo-400/30 blur" />
          </span>
        </motion.h1>

        <motion.p {...fadeUp(0.2)} className="mt-5 max-w-2xl text-pretty text-lg text-gray-600 md:text-xl dark:text-gray-300">
          We blend brand, UX, and motion to craft experiences that delight users and drive results.
        </motion.p>

        <motion.div {...fadeUp(0.3)} className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
          <Link
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-gray-900 px-5 py-3 text-white shadow-lg shadow-gray-900/10 transition [--shine:linear-gradient(115deg,transparent_0%,transparent_40%,rgba(255,255,255,.6)_50%,transparent_60%,transparent_100%)] hover:-translate-y-0.5 hover:shadow-xl dark:bg-white dark:text-black"
          >
            <span className="relative overflow-hidden">
              <span className="relative z-10">Start a design sprint</span>
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
            <motion.div key={label} {...fadeUp(0.05 * i)} className="glassy-card rounded-2xl p-4 text-center">
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
    <motion.article {...fadeUp(0.05 * index)} whileHover={{ y: -4 }} className="glassy-card group relative rounded-2xl p-5">
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
            <BadgeCheck className="mt-0.5 h-4 w-4 flex-none" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
      <Link href="/contact" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-gray-900 underline-offset-2 hover:underline dark:text-white">
        Learn more <ArrowRight className="h-3.5 w-3.5" />
      </Link>
      <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-gradient-to-tr from-emerald-400/30 to-indigo-400/30 blur-xl transition-opacity group-hover:opacity-100" />
    </motion.article>
  );
}

function AnimatedCounter({ to, suffix = "" }: { to: number; suffix?: string }) {
  return (
    <motion.span className="block text-2xl font-semibold text-gray-900 md:text-3xl dark:text-white" initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.6 }} transition={{ duration: 0.6, ease: EASE }}>
      <Counter to={to} />{suffix}
    </motion.span>
  );
}

function Counter({ to }: { to: number }) {
  const decimals = String(to).includes(".") ? 1 : 0;
  return (
    <AnimatePresence mode="wait">
      <motion.span key={to} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6, ease: EASE }}>
        {to.toFixed(decimals)}
      </motion.span>
    </AnimatePresence>
  );
}

function Accordion({ items }: { items: { q: string; a: string }[] }) {
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
      <motion.div className="absolute -top-32 left-1/2 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-gradient-to-tr from-indigo-400/25 via-emerald-400/25 to-fuchsia-400/25 blur-3xl" initial={{ opacity: 0.2, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, ease: EASE }} />
      <motion.div className="absolute bottom-[-20%] left-[10%] h-72 w-72 rounded-full bg-gradient-to-tr from-fuchsia-400/20 to-cyan-400/20 blur-3xl" animate={{ y: [0, -12, 0] }} transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }} />
      <motion.div className="absolute right-[10%] top-[20%] h-72 w-72 rounded-full bg-gradient-to-tr from-emerald-400/20 to-indigo-400/20 blur-3xl" animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 9, ease: "easeInOut" }} />
    </div>
  );
}

function Grid() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,transparent_95%,rgba(0,0,0,.05)_95%),linear-gradient(to_right,transparent,transparent_95%,rgba(0,0,0,.05)_95%)] bg-[length:24px_24px] dark:bg-[linear-gradient(to_bottom,transparent,transparent_95%,rgba(255,255,255,.08)_95%),linear-gradient(to_right,transparent,transparent_95%,rgba(255,255,255,.08)_95%)]" />
      <motion.div className="absolute inset-0 bg-[radial-gradient(600px_200px_at_50%_10%,rgba(255,255,255,.18),transparent)] dark:bg-[radial-gradient(600px_200px_at_50%_10%,rgba(255,255,255,.06),transparent)]" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, ease: EASE }} />
    </div>
  );
}