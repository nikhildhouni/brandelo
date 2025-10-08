"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Star, StarHalf, Quote, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

/**
 * TestimonialSection.tsx — Glassy, fully animated, modern testimonials
 * - Auto‑play carousel with smooth spring transitions
 * - Drag/swipe support (mouse + touch)
 * - 3D tilt on hover + cursor sheen
 * - Light/dark mode, accessible
 * No external carousel libs needed.
 */

type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
  rating?: number; // 0..5, can be decimal .5
};

const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Aarav Mehta",
    role: "Growth Head",
    company: "Zentro Apparel",
    avatar: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=400&auto=format&fit=crop",
    quote:
      "WDB helped us unlock a new growth curve — creative testing + landing page sprints took our ROAS from 1.4x to 3.2x in 6 weeks.",
    rating: 5,
  },
  {
    id: "t2",
    name: "Sara Kapoor",
    role: "Founder",
    company: "PlumePay",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=400&auto=format&fit=crop",
    quote:
      "Beautiful design system and a clean web experience. The handoff was seamless and our ship velocity jumped immediately.",
    rating: 4.5,
  },
  {
    id: "t3",
    name: "Kabir Anand",
    role: "CTO",
    company: "Nordic Gear",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop",
    quote:
      "The engineering team set up analytics the right way — server events + dashboards gave us reliable insights to scale.",
    rating: 5,
  },
];

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
  function onLeave() {
    mx.set(0.5);
    my.set(0.5);
  }
  return { mx, rx: rxS, ry: ryS, onMove, onLeave };
}

function Stars({ value = 5 }: { value?: number }) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  return (
    <div className="inline-flex items-center gap-1 text-amber-400" aria-label={`${value} out of 5 stars`}>
      {Array.from({ length: full }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-current" />
      ))}
      {half && <StarHalf className="h-4 w-4 fill-current" />}
      {Array.from({ length: 5 - full - (half ? 1 : 0) }).map((_, i) => (
        <Star key={`e${i}`} className="h-4 w-4 opacity-30" />
      ))}
    </div>
  );
}

export default function TestimonialSection() {
  const [index, setIndex] = useState(0);
  const [isPaused, setPaused] = useState(false);
  const count = TESTIMONIALS.length;
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Auto‑play
  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), 4000);
    return () => clearInterval(id);
  }, [count, isPaused]);

  const go = (dir: -1 | 1) => setIndex((i) => (i + dir + count) % count);

  // Drag / swipe via pointer events
  const startX = useRef<number | null>(null);
  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    startX.current = e.clientX;
  }
  function onPointerUp(e: React.PointerEvent<HTMLDivElement>) {
    if (startX.current == null) return;
    const dx = e.clientX - startX.current;
    if (Math.abs(dx) > 40) go(dx > 0 ? -1 : 1);
    startX.current = null;
  }

  const active = useMemo(() => TESTIMONIALS[index], [index]);

  return (
    <section className="relative overflow-hidden py-24 bg-gradient-to-b from-white via-white to-gray-50 dark:from-[#0b1020] dark:via-[#0b1020] dark:to-black">
      {/* background aurora */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(70%_50%_at_50%_10%,rgba(99,102,241,0.12),transparent_50%),radial-gradient(60%_40%_at_80%_20%,rgba(16,185,129,0.12),transparent_50%)] dark:bg-[radial-gradient(70%_50%_at_50%_10%,rgba(99,102,241,0.18),transparent_50%),radial-gradient(60%_40%_at_80%_20%,rgba(168,85,247,0.18),transparent_50%)]" />
      </div>

      <div className="mx-auto max-w-5xl px-6">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="mx-auto mb-3 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs text-gray-800 backdrop-blur dark:border-white/20 dark:bg-white/10 dark:text-white/90">
            <Sparkles className="h-3.5 w-3.5" /> What clients say
          </div>
          <h2 className="text-4xl sm:text-5xl font-semibold text-gray-900 dark:text-white">Testimonials</h2>
          <p className="mt-2 text-gray-600 dark:text-white/70">Proof of impact across marketing, design, and technology.</p>
        </div>

        {/* Carousel */}
        <div
          ref={containerRef}
          className="relative"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="relative mx-auto w-full max-w-3xl">
            <AnimatePresence mode="wait">
              <Slide key={active.id} t={active} />
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              aria-label="Previous testimonial"
              onClick={() => go(-1)}
              className="rounded-xl border border-black/10 bg-white/70 p-2 text-gray-800 shadow-sm backdrop-blur transition hover:bg-white/90 dark:border-white/20 dark:bg-white/10 dark:text-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <Dots count={count} index={index} onSelect={setIndex} />
            <button
              aria-label="Next testimonial"
              onClick={() => go(1)}
              className="rounded-xl border border-black/10 bg-white/70 p-2 text-gray-800 shadow-sm backdrop-blur transition hover:bg-white/90 dark:border-white/20 dark:bg-white/10 dark:text-white"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Slide({ t }: { t: Testimonial }) {
  const { mx, rx, ry, onMove, onLeave } = useTilt(10);
  const mxPct = useTransform(mx, (v) => `${v * 100}%`);
  const sheen = useMotionTemplate`radial-gradient(40rem 20rem at ${mxPct} -20%, rgba(255,255,255,0.25), transparent 60%)`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.98 }}
      transition={{ duration: 0.45 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry }}
      className="relative rounded-[2rem] border border-black/10 bg-white/70 p-6 shadow-2xl backdrop-blur-xl dark:border-white/15 dark:bg-white/10 [transform-style:preserve-3d]"
      role="group"
    >
      {/* border glow */}
      <div className="absolute inset-0 rounded-[2rem] bg-[conic-gradient(from_0deg,rgba(16,185,129,.35),rgba(59,130,246,.35),rgba(168,85,247,.35),rgba(16,185,129,.35))] opacity-40" />

      {/* sheen */}
      <motion.div className="pointer-events-none absolute inset-0 rounded-[2rem]" style={{ background: sheen }} />

      <div className="relative z-10 grid gap-6 sm:grid-cols-[auto,1fr] sm:gap-8">
        {/* Avatar */}
        <div className="flex items-start gap-4 sm:flex-col">
          <img
            src={t.avatar}
            alt={`${t.name} avatar`}
            className="h-16 w-16 shrink-0 rounded-2xl object-cover sm:h-24 sm:w-24 border border-white/30"
          />
          <div className="hidden sm:block">
            <Stars value={t.rating ?? 5} />
          </div>
        </div>

        {/* Content */}
        <div>
          <Quote className="mb-2 h-6 w-6 text-emerald-400" />
          <p className="text-lg text-gray-800 dark:text-white/80">
            “{t.quote}”
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-2 text-sm">
            <span className="font-semibold text-gray-900 dark:text-white">{t.name}</span>
            <span className="text-gray-500 dark:text-white/60">• {t.role}, {t.company}</span>
          </div>
          <div className="mt-3 sm:hidden">
            <Stars value={t.rating ?? 5} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Dots({ count, index, onSelect }: { count: number; index: number; onSelect: (i: number) => void }) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          aria-label={`Go to slide ${i + 1}`}
          className={`h-2.5 w-2.5 rounded-full transition ${
            i === index ? "bg-gray-900 dark:bg-white" : "bg-gray-400/40 hover:bg-gray-500/60 dark:bg-white/30 dark:hover:bg-white/50"
          }`}
        />
      ))}
    </div>
  );
}
