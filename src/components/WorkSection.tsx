"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Sparkles, Filter, ArrowUpRight, X, Tag } from "lucide-react";

/**
 * WorkSection.tsx — Ultra‑modern + animated
 * - Animated filter chips with shared layout underline
 * - 3D tilt/parallax on cards (preserve-3d), hover parallax media
 * - Glassy gradient borders + glow
 * - Lightbox with spring open/close
 * - Light/dark mode
 */

type Category = "Marketing" | "Design" | "Technology";

type WorkItem = {
  id: string;
  title: string;
  client: string;
  category: Category;
  cover: string; // image url
  video?: string; // optional video preview
  metrics?: { label: string; value: string }[];
  tags?: string[];
  blurb?: string;
};

const WORKS: WorkItem[] = [
  {
    id: "w1",
    title: "E‑commerce ROAS Lift",
    client: "Zentro Apparel",
    category: "Marketing",
    cover: "https://images.unsplash.com/photo-1545231027-637d2f6210f4?q=80&w=1600&auto=format&fit=crop",
    metrics: [
      { label: "ROAS", value: "+212%" },
      { label: "CPA", value: "-38%" },
    ],
    tags: ["Paid Ads", "Attribution", "Landing Pages"],
    blurb: "Scaled paid search + social with creative testing and post‑click optimization.",
  },
  {
    id: "w2",
    title: "Fintech Brand UI Kit",
    client: "PlumePay",
    category: "Design",
    cover: "https://images.unsplash.com/photo-1551281044-8b89c2b5df36?q=80&w=1600&auto=format&fit=crop",
    metrics: [
      { label: "Design Debt", value: "-72%" },
      { label: "Time‑to‑ship", value: "-30%" },
    ],
    tags: ["Design System", "UI/UX", "Accessibility"],
    blurb: "Atomic design system with tokens, components, and Figma libraries.",
  },
  {
    id: "w3",
    title: "Headless Commerce Site",
    client: "Nordic Gear",
    category: "Technology",
    cover: "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?q=80&w=1600&auto=format&fit=crop",
    metrics: [
      { label: "LCP", value: "1.3s" },
      { label: "Conv.", value: "+19%" },
    ],
    tags: ["Next.js", "Headless CMS", "Edge"],
    blurb: "ISR, edge caching, and modular blocks for fast merchandising.",
  },
  {
    id: "w4",
    title: "Launch Video Funnel",
    client: "Loop Fitness",
    category: "Marketing",
    cover: "https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?q=80&w=1600&auto=format&fit=crop",
    video: "https://cdn.coverr.co/videos/coverr-working-on-laptop-9486/1080p.mp4",
    metrics: [
      { label: "CTR", value: "+64%" },
      { label: "CPL", value: "-28%" },
    ],
    tags: ["Video Ads", "UGC", "YouTube"],
    blurb: "UGC‑style creatives and mid‑funnel education boosted conversions.",
  },
  {
    id: "w5",
    title: "Brand Refresh",
    client: "Alto Studio",
    category: "Design",
    cover: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop",
    metrics: [
      { label: "Recall", value: "+38%" },
      { label: "NPS", value: "+12" },
    ],
    tags: ["Branding", "Guidelines", "Illustration"],
    blurb: "New identity, typography, and motion guidelines with rollout kit.",
  },
  {
    id: "w6",
    title: "Analytics Pipeline",
    client: "GrainFoods Co.",
    category: "Technology",
    cover: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1600&auto=format&fit=crop",
    metrics: [
      { label: "Attribution", value: "+1st‑party" },
      { label: "Latency", value: "-65%" },
    ],
    tags: ["ETL", "Server Events", "Dashboards"],
    blurb: "Server‑side tagging + warehouse models for reliable campaign insights.",
  },
];

const CATEGORIES: ("All" | Category)[] = ["All", "Marketing", "Design", "Technology"];

function useTilt(intensity = 10) {
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useTransform(my, [0, 1], [intensity, -intensity]);
  const ry = useTransform(mx, [0, 1], [-intensity, intensity]);
  const rxS = useSpring(rx, { stiffness: 180, damping: 16 });
  const ryS = useSpring(ry, { stiffness: 180, damping: 16 });
  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  }
  function onLeave() { mx.set(0.5); my.set(0.5); }
  return { mx, rx: rxS, ry: ryS, onMove, onLeave };
}

function WorkCard({ w, i, onOpen }: { w: WorkItem; i: number; onOpen: (id: string) => void }) {
  const { mx, rx, ry, onMove, onLeave } = useTilt(12);
  const parallaxX = useTransform(mx, [0, 1], [-8, 8]);

  return (
    <motion.article
      layout
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry }}
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.45, delay: 0.05 * i }}
      className="group relative overflow-hidden rounded-3xl border border-black/10 bg-white/70 shadow-xl backdrop-blur-xl dark:border-white/15 dark:bg-white/10 [transform-style:preserve-3d]"
    >
      {/* Gradient ring border */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl p-[1px]">
        <div className="absolute inset-0 -z-10 rounded-3xl opacity-40 bg-[conic-gradient(from_0deg,rgba(16,185,129,.5),rgba(59,130,246,.5),rgba(168,85,247,.5),rgba(16,185,129,.5))]" />
      </div>

      {/* Media */}
      <motion.div className="relative aspect-[16/10] overflow-hidden" style={{ x: parallaxX, transform: "translateZ(30px)" }}>
        {w.video ? (
          <video className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" src={w.video} muted playsInline autoPlay loop />
        ) : (
          <img alt={w.title} src={w.cover} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" loading="lazy" />
        )}
        <div className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/70 px-2 py-1 text-[11px] text-white shadow-md backdrop-blur-sm dark:bg-white/20">
          <Tag className="h-3 w-3" /> {w.category}
        </div>
      </motion.div>

      {/* Body */}
      <div className="p-5" style={{ transform: "translateZ(40px)" }}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{w.title}</h3>
            <p className="text-sm text-gray-600 dark:text-white/70">{w.client}</p>
          </div>
          <button
            onClick={() => onOpen(w.id)}
            className="inline-flex items-center gap-1 rounded-xl border border-black/10 bg-black/5 px-3 py-1.5 text-xs text-gray-800 hover:bg-black/10 dark:border-white/20 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
          >
            View <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>

        {w.blurb && <p className="mt-2 text-sm text-gray-700 dark:text-white/70 line-clamp-2">{w.blurb}</p>}

        {w.metrics && (
          <ul className="mt-4 grid grid-cols-2 gap-3">
            {w.metrics.map((m) => (
              <li key={m.label} className="rounded-xl border border-black/10 bg-white/60 p-3 text-center text-sm text-gray-800 backdrop-blur dark:border-white/20 dark:bg-white/10 dark:text-white/80">
                <div className="text-xs text-gray-500 dark:text-white/60">{m.label}</div>
                <div className="text-base font-medium">{m.value}</div>
              </li>
            ))}
          </ul>
        )}

        {w.tags && (
          <div className="mt-4 flex flex-wrap gap-2">
            {w.tags.map((t) => (
              <span key={t} className="rounded-full border border-black/10 bg-white/60 px-2.5 py-1 text-[11px] text-gray-700 backdrop-blur dark:border-white/20 dark:bg-white/10 dark:text-white/70">
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.article>
  );
}

export default function WorkSection() {
  const [active, setActive] = useState<(typeof CATEGORIES)[number]>("All");
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = useMemo(() => (active === "All" ? WORKS : WORKS.filter((w) => w.category === active)), [active]);
  const openItem = useMemo(() => WORKS.find((w) => w.id === openId) || null, [openId]);

  return (
    <section className="relative overflow-hidden py-24 bg-gradient-to-b from-white via-white to-gray-50 dark:from-[#0b1020] dark:via-[#0b1020] dark:to-black">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_10%,rgba(16,185,129,0.12),transparent_50%),radial-gradient(70%_50%_at_80%_20%,rgba(59,130,246,0.12),transparent_50%)] dark:bg-[radial-gradient(80%_60%_at_50%_10%,rgba(59,130,246,0.18),transparent_50%),radial-gradient(70%_50%_at_80%_20%,rgba(168,85,247,0.18),transparent_50%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-gray-800 backdrop-blur border-black/10 bg-white/60 dark:border-white/20 dark:bg-white/10 dark:text-white/90">
              <Sparkles className="h-3.5 w-3.5" /> Our Work
            </div>
            <h2 className="text-4xl sm:text-5xl font-semibold text-gray-900 dark:text-white">Case Studies & Projects</h2>
            <p className="mt-3 text-gray-600 dark:text-white/70 max-w-xl">A mix of performance marketing wins, design systems, and engineering builds.</p>
          </div>

          {/* Filters with animated underline */}
          <div className="relative inline-flex flex-wrap items-center gap-2 rounded-xl border border-black/10 bg-white/60 p-1 backdrop-blur dark:border-white/20 dark:bg-white/10">
            <span className="sr-only">Filter</span>
            <div className="relative flex gap-1">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setActive(c)}
                  className={`relative rounded-lg px-3 py-1.5 text-sm transition ${active === c ? "text-black dark:text-white" : "text-gray-600 hover:text-gray-900 dark:text-white/70 dark:hover:text-white"}`}
                >
                  {active === c && (
                    <motion.span
                      layoutId="active-pill"
                      className="absolute inset-0 -z-10 rounded-lg bg-black/5 dark:bg-white/10"
                      transition={{ type: "spring", stiffness: 400, damping: 28 }}
                    />
                  )}
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((w, i) => (
              <WorkCard key={w.id} w={w} i={i} onOpen={setOpenId} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

    {/* Lightbox Modal (responsive + clamped) */}
<AnimatePresence>
  {openItem && (
    <motion.div
      className="fixed inset-0 z-50 grid place-items-center p-3 sm:p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <button
        aria-label="Close"
        onClick={() => setOpenId(null)}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* Dialog */}
      <motion.div
        role="dialog"
        aria-modal="true"
        className="
          relative w-full 
          max-w-[min(92vw,900px)] sm:max-w-3xl 
          max-h-[90vh] overflow-hidden
          rounded-3xl border border-white/20 
          bg-white/90 shadow-2xl backdrop-blur-xl 
          dark:bg-zinc-900/90
        "
        initial={{ y: 30, scale: 0.98, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 20, scale: 0.98, opacity: 0 }}
        transition={{ type: "spring", stiffness: 220, damping: 22 }}
      >
        {/* Media: fixed, responsive height (avoids overflow) */}
        <div className="relative w-full h-[40vh] sm:h-[48vh]">
          {openItem.video ? (
            <video
              className="h-full w-full object-cover"
              src={openItem.video}
              muted
              playsInline
              autoPlay
              loop
            />
          ) : (
            <img
              className="h-full w-full object-cover"
              src={openItem.cover}
              alt={openItem.title}
            />
          )}

          <button
            onClick={() => setOpenId(null)}
            className="absolute right-3 top-3 inline-flex items-center justify-center rounded-xl bg-black/70 p-2 text-white shadow-md backdrop-blur hover:bg-black/80"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable body: will never exceed viewport */}
        <div className="p-5 sm:p-6 overflow-y-auto max-h-[calc(90vh-40vh)] sm:max-h-[calc(90vh-48vh)]">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                {openItem.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-white/70">
                {openItem.client} • {openItem.category}
              </p>
            </div>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 px-4 py-2 text-sm font-semibold text-black shadow-[0_8px_30px_rgba(56,189,248,.35)] hover:opacity-90"
            >
              Start a Project <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          {openItem.blurb && (
            <p className="mt-3 text-gray-700 dark:text-white/80">
              {openItem.blurb}
            </p>
          )}

          {openItem.metrics && (
            <ul className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-3">
              {openItem.metrics.map((m) => (
                <li
                  key={m.label}
                  className="rounded-xl border border-black/10 bg-white/70 p-3 text-center text-sm text-gray-800 backdrop-blur dark:border-white/20 dark:bg-white/10 dark:text-white/80"
                >
                  <div className="text-xs text-gray-500 dark:text-white/60">
                    {m.label}
                  </div>
                  <div className="text-base font-medium">{m.value}</div>
                </li>
              ))}
            </ul>
          )}

          {openItem.tags && (
            <div className="mt-4 flex flex-wrap gap-2">
              {openItem.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-black/10 bg-white/60 px-2.5 py-1 text-[11px] text-gray-700 backdrop-blur dark:border-white/20 dark:bg-white/10 dark:text-white/70"
                >
                  {t}
                </span>
              ))}
            </div>
          )}

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-black/10 bg-white/70 p-4 backdrop-blur dark:border-white/20 dark:bg-white/10">
              <div className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Approach
              </div>
              <p className="text-sm text-gray-700 dark:text-white/70">
                Discovery, insights, and playbook—then rapid experimentation with weekly reviews.
              </p>
            </div>
            <div className="rounded-2xl border border-black/10 bg-white/70 p-4 backdrop-blur dark:border-white/20 dark:bg-white/10">
              <div className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Stack
              </div>
              <p className="text-sm text-gray-700 dark:text-white/70">
                GA4 / Server-side events, Next.js, Tailwind, Figma, Ads Manager & Looker.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

    </section>
  );
}
