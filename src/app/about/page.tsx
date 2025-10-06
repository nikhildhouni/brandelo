"use client";

import { motion, useScroll, useSpring, useTransform, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useMemo, useRef } from "react";
import { Sparkles, Stars, ArrowRight, Target, Rocket, ChartLine } from "lucide-react";
import FAQSectionWDB from "@/components/Faq";
import Testimonials from "@/components/Testimonial";

/** ---------- Assets (kept lightweight) ---------- */
const TEAM = [
  { name: "Sarah Lee", role: "CEO", img: "https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?q=80&w=1200&auto=format&fit=crop" },
  { name: "James Smith", role: "Marketing Head", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1200&auto=format&fit=crop" },
  { name: "Emily Johnson", role: "Creative Director", img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop" },
];

const LOGOS = [
  "https://images.unsplash.com/photo-1581287053822-5e1af8f6c8d0?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1542744173-05336fcc7ad4?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1508830524289-0adcbe822b40?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop",
];

/** ---------- Easings (FM v11 wants tuples, not strings) ---------- */
const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];
const LINEAR: [number, number, number, number] = [0, 0, 1, 1];

/** ---------- Helpers ---------- */
const fx = (delay = 0, y = 20) => ({
  initial: { opacity: 0, y },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: EASE_OUT, delay },
  viewport: { once: true, amount: 0.25 },
});

export default function AboutUs() {
  const prefersReduced = useReducedMotion();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bar = useSpring(scrollYProgress, { stiffness: 140, damping: 20, mass: 0.2 });
  const heroFade = useTransform(scrollYProgress, [0, 1], [1, 0.88]); // subtle

  const yearCards = useMemo(
    () => [
      { year: "2018", text: "Founded with a vision to transform businesses digitally." },
      { year: "2020", text: "Expanded globally with 50+ clients." },
      { year: "2023", text: "Recognized among top digital agencies." },
    ],
    []
  );

  return (
    <main className="relative w-full text-gray-900 dark:text-gray-100 selection:bg-blue-500/20 overflow-hidden">
      {/* Thin progress bar (optional use somewhere if you want) */}
      {/* <motion.div style={{ scaleX: bar }} className="fixed left-0 right-0 top-0 h-[3px] origin-left bg-gradient-to-r from-blue-500 via-fuchsia-500 to-cyan-400 z-50" /> */}

      {/* ===== HERO (clean, image-free) ===== */}
      <section
        ref={heroRef}
        className="relative flex flex-col items-center justify-center h-[90vh] text-center"
        aria-label="About us hero"
      >
        {/* Minimal, performant aurora */}
        <motion.div
          aria-hidden
          style={{ opacity: heroFade }}
          className="absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]"
        >
          <div className="absolute inset-0 blur-2xl opacity-90 bg-[conic-gradient(from_0deg_at_50%_50%,rgba(59,130,246,.28),rgba(168,85,247,.28),rgba(34,211,238,.28),rgba(59,130,246,.28))]" />
          {/* tiny noise for texture */}
          <div className="absolute inset-0 opacity-15 [background:radial-gradient(circle_at_20%_20%,#fff1_10%,transparent_40%),radial-gradient(circle_at_80%_30%,#fff1_8%,transparent_40%),radial-gradient(circle_at_40%_80%,#fff1_6%,transparent_40%)]" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight"
        >
          About{" "}
          <span className="bg-gradient-to-r from-blue-500 via-fuchsia-500 to-cyan-400 bg-clip-text text-transparent">
            Us
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6, ease: EASE_OUT }}
          className="mt-5 text-lg md:text-xl max-w-2xl text-gray-700 dark:text-gray-300"
        >
          We help brands grow with creativity, strategy, and innovation—powering performance with data & design.
        </motion.p>

        {/* Compact chips */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {[
            { icon: <Sparkles size={16} />, text: "Creative-first" },
            { icon: <ChartLine size={16} />, text: "Performance-driven" },
            { icon: <Stars size={16} />, text: "Delightful CX" },
          ].map((b, i) => (
            <motion.span
              key={i}
              initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.96 }}
              animate={prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.25 + i * 0.07, duration: 0.4, ease: EASE_OUT }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm bg-white/70 dark:bg-gray-900/60 ring-1 ring-gray-200/70 dark:ring-gray-700/70 backdrop-blur"
            >
              {b.icon}
              {b.text}
            </motion.span>
          ))}
        </div>

        {/* Soft bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-20 [mask-image:linear-gradient(to_bottom,transparent,black)] bg-gradient-to-b from-transparent to-gray-50/60 dark:to-gray-900/60" />
      </section>

      {/* ===== SOCIAL PROOF ===== */}
      <section className="py-10 bg-white/60 dark:bg-gray-950/40 backdrop-blur">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-center text-xs md:text-sm uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
            Trusted by teams at
          </p>
          <div className="relative overflow-hidden mt-6">
            <motion.div
              className="flex gap-10 items-center"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 18, ease: LINEAR, repeat: Infinity }}
            >
              {[...LOGOS, ...LOGOS].map((src, i) => (
                <div key={i} className="relative h-10 w-44 grayscale opacity-80">
                  <Image src={src} alt="" fill className="object-cover rounded-md" unoptimized />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== JOURNEY ===== */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="sticky top-16 z-10 mb-10 inline-flex items-center gap-2 rounded-full bg-white/70 dark:bg-gray-800/70 px-4 py-2 text-sm ring-1 ring-gray-200 dark:ring-gray-700 backdrop-blur">
            <Rocket size={16} />
            Our Journey
          </div>

        <div className="grid md:grid-cols-3 gap-8">
          {yearCards.map((item, idx) => (
            <motion.article
              key={idx}
              {...fx(idx * 0.05)}
              className="group relative overflow-hidden rounded-2xl bg-white/80 dark:bg-gray-800/80 ring-1 ring-gray-200/70 dark:ring-gray-700/70"
            >
              <div className="relative p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-semibold">{item.year}</h3>
                  <span className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700">Milestone {idx + 1}</span>
                </div>
                <p className="mt-2 text-gray-600 dark:text-gray-400">{item.text}</p>
                <div className="mt-6 h-1 w-0 bg-gradient-to-r from-blue-500 via-fuchsia-500 to-cyan-400 transition-all duration-300 group-hover:w-24" />
              </div>
            </motion.article>
          ))}
        </div>
        </div>
      </section>

      {/* ===== TEAM ===== */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="sticky top-16 z-10 mb-10 inline-flex items-center gap-2 rounded-full bg-white/70 dark:bg-gray-800/70 px-4 py-2 text-sm ring-1 ring-gray-200 dark:ring-gray-700 backdrop-blur">
            <Stars size={16} />
            Meet Our Team
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {TEAM.map((m, idx) => (
              <motion.article
                key={idx}
                {...fx(idx * 0.05)}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 140, damping: 16 }}
                className="group relative overflow-hidden rounded-2xl ring-1 ring-gray-200/70 dark:ring-gray-700/70 bg-white/80 dark:bg-gray-800/80"
              >
                <div className="relative w-full h-60">
                  <Image src={m.img} alt={m.name} fill className="object-cover" unoptimized />
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-semibold">{m.name}</h3>
                  <p className="text-gray-500 dark:text-gray-400">{m.role}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== VALUES ===== */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.h2 {...fx()} className="text-3xl md:text-4xl font-bold">What We Value</motion.h2>
            <motion.p {...fx(0.08)} className="mt-3 text-gray-700 dark:text-gray-300">
              Principles that shape our work and partnerships.
            </motion.p>

            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              {[
                { icon: <Target size={16} />, title: "Clarity", desc: "Clear goals, transparent reporting." },
                { icon: <ChartLine size={16} />, title: "Impact", desc: "Meaningful, measurable outcomes." },
                { icon: <Sparkles size={16} />, title: "Craft", desc: "Pixel-perfect creative." },
                { icon: <Rocket size={16} />, title: "Momentum", desc: "Iterate fast, learn faster." },
              ].map((v, i) => (
                <motion.div
                  key={i}
                  {...fx(0.05 * i)}
                  className="rounded-2xl bg-white/80 dark:bg-gray-800/80 ring-1 ring-gray-200/70 dark:ring-gray-700/70 p-4"
                >
                  <div className="flex items-center gap-2 font-medium">{v.icon}{v.title}</div>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* simple collage replacement removed (for speed) */}
          <div className="rounded-2xl h-64 lg:h-80 ring-1 ring-gray-200 dark:ring-gray-700 bg-gradient-to-br from-gray-100 to-white dark:from-gray-800 dark:to-gray-900 grid place-items-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">Lean, no-image section for faster loads</p>
          </div>
        </div>
      </section>

      {/* ===== EXPERIENCE ===== */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.h2 {...fx()} className="text-3xl md:text-4xl font-bold">Our Experience</motion.h2>
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {[
              { title: "100+", desc: "Projects Completed" },
              { title: "50+", desc: "Global Clients" },
              { title: "5+", desc: "Years of Experience" },
            ].map((exp, idx) => (
              <motion.div
                key={idx}
                {...fx(0.05 * idx)}
                className="relative p-8 rounded-2xl bg-white/80 dark:bg-gray-800/80 ring-1 ring-gray-200/70 dark:ring-gray-700/70 shadow-sm"
              >
                <h3 className="text-5xl font-extrabold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                  {exp.title}
                </h3>
                <p className="mt-2 text-gray-700 dark:text-gray-300">{exp.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <Testimonials />

      {/* ===== FAQ ===== */}
      <FAQSectionWDB />

      {/* ===== CTA ===== */}
      <section className="py-20 text-center relative">
        <motion.h2 {...fx()} className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Grow Your Business?
        </motion.h2>
        <a
          href="/contact"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold bg-gradient-to-r from-blue-600 via-fuchsia-600 to-cyan-500 text-white shadow-lg ring-1 ring-white/10 hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 transition"
        >
          Get in Touch <ArrowRight size={18} />
        </a>
        <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">We’ll reply within 1 business day.</p>
      </section>
    </main>
  );
}
