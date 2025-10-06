"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, GalleryHorizontalEnd } from "lucide-react";
import { useRef } from "react";

// ---------------------------------------------
// Types
// ---------------------------------------------
type HeroProps = {
  mainImage: string;
  smallTop?: string;
  smallMid?: string;
  smallBottom?: string;
  services?: string[];
  kicker?: string; // small heading above H1
  title?: string; // main H1
  subtitle?: string; // paragraph under H1
};

// ---------------------------------------------
// Component
// ---------------------------------------------
export default function Hero({
  mainImage,
  smallTop,
  smallMid,
  smallBottom,
  services = [
    "Social Media Marketing",
    "Website Development",
    "UI/UX Design",
    "Content Marketing",
    "Email Marketing",
    "App Development",
    "SEO Services",
  ],
  kicker = "Welcome to the Best",
  title = "XYX AGENCY",
  subtitle =
    "We help brands grow with performance-driven marketing, modern web experiences, and clean design.",
}: HeroProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-white">
      {/* Decorative gradient backdrop */}
      <BackdropGradients />

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-14 md:grid-cols-2 md:py-18 lg:gap-14 lg:py-24">
        {/* Left content */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.p
            className="mb-3 inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-emerald-700"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05, duration: 0.4 }}
            aria-label="kicker"
          >
            {kicker} <span className="text-gray-900">Digital Marketing Agency</span>
            <SparkleDot />
          </motion.p>

          <motion.h1
            className="text-4xl font-extrabold leading-tight text-gray-900 sm:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.12, duration: 0.55 }}
          >
            {title}
          </motion.h1>

          <motion.p
            className="mt-4 max-w-xl text-base text-gray-600 sm:text-lg"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {subtitle}
          </motion.p>

          <motion.div
            className="mt-7 flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.28, duration: 0.45 }}
          >
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm ring-1 ring-emerald-600/80 transition hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/70"
              aria-label="Get a free audit"
            >
              Get a Free Audit
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-800 ring-0 transition hover:-translate-y-0.5 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
              aria-label="See our work"
            >
              <GalleryHorizontalEnd className="h-4 w-4" />
              See Our Work
            </Link>
          </motion.div>
        </motion.div>

        {/* Right collage / visual */}
        <motion.div
          className="relative"
          style={{ y: yParallax }}
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="mx-auto max-w-md">
            <div className="group relative aspect-square w-full rounded-3xl bg-gradient-to-b from-emerald-50 to-emerald-100/40 shadow-xl ring-1 ring-gray-200/60">
              {/* Subtle glow ring */}
              <div className="pointer-events-none absolute -inset-[1px] rounded-3xl bg-[radial-gradient(ellipse_at_top,_rgba(16,185,129,0.18),rgba(255,255,255,0))]" />

              <Image
                src={mainImage}
                alt="Hero image"
                fill
                priority
                className="rounded-3xl object-cover transition will-change-transform duration-500 group-hover:scale-[1.02] group-hover:rotate-[0.25deg]"
              />

              {/* Floating badges */}
              <div className="pointer-events-none absolute -right-6 top-3 hidden w-40 flex-col gap-3 sm:flex md:-right-8 lg:-right-10">
                {smallTop && <MiniCard src={smallTop} delay={0.05} />}
                {smallMid && <MiniCard src={smallMid} delay={0.12} />}
                {smallBottom && <MiniCard src={smallBottom} delay={0.18} />}
              </div>

              {/* Sparkles overlay */}
              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.25, duration: 0.8 }}
              >
                <FloatingSparkles />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom marquee */}
      <Marquee services={services} />
    </section>
  );
}

// ---------------------------------------------
// Helpers
// ---------------------------------------------
function MiniCard({ src, delay = 0 }: { src: string; delay?: number }) {
  return (
    <motion.div
      className="relative h-24 w-full rounded-2xl bg-white/80 shadow ring-1 ring-gray-200 backdrop-blur"
      initial={{ opacity: 0, y: 16, rotate: -2 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
    >
      <motion.div
        className="absolute inset-0"
        animate={{ y: [0, -6, 0] }}
        transition={{ repeat: Infinity, repeatType: "mirror", duration: 6 + delay * 10, ease: "easeInOut" }}
      >
        <Image src={src} alt="" fill className="rounded-2xl object-cover" />
      </motion.div>
    </motion.div>
  );
}

function SparkleDot() {
  return (
    <motion.span
      className="inline-flex h-4 w-4 items-center justify-center"
      initial={{ scale: 0, rotate: 45, opacity: 0 }}
      whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 220, damping: 16 }}
      aria-hidden
    >
      <Sparkles className="h-4 w-4 text-emerald-600" />
    </motion.span>
  );
}

function FloatingSparkles() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <span className="absolute left-6 top-6 h-2 w-2 rounded-full bg-emerald-400/60 blur-[1px]" />
      <span className="absolute right-8 top-12 h-1.5 w-1.5 rounded-full bg-emerald-300/70 blur-[0.5px]" />
      <span className="absolute bottom-10 left-10 h-1.5 w-1.5 rounded-full bg-teal-400/60" />
      <span className="absolute bottom-8 right-12 h-2 w-2 rounded-full bg-emerald-500/60 blur-[1px]" />
    </div>
  );
}

function BackdropGradients() {
  return (
    <div aria-hidden>
      {/* big blob */}
      <div className="pointer-events-none absolute -top-32 left-1/2 h-80 w-[40rem] -translate-x-1/2 rounded-full bg-gradient-to-br from-emerald-200 via-teal-100 to-transparent opacity-70 blur-3xl" />
      {/* subtle noise overlay for texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-multiply [background-image:radial-gradient(#000_1px,transparent_1px)] [background-size:10px_10px]" />
    </div>
  );
}

function Marquee({ services }: { services: string[] }) {
  if (!services?.length) return null;
  // duplicate to create infinite scroll
  const items = [...services, ...services];

  return (
    <div className="relative border-t border-emerald-900/20 bg-[#1f3b2c] py-2 text-white">
      <div className="mask-fade mx-auto flex max-w-full overflow-hidden">
        {/* Respect reduced motion users */}
        <ul className="marquee flex min-w-full shrink-0 items-center gap-6 px-4 text-sm motion-reduce:animate-none">
          {items.map((label, i) => (
            <li key={i} className="flex items-center gap-3 whitespace-nowrap">
              <span className="rounded-full bg-white/10 px-3 py-1 ring-1 ring-white/20">
                {label}
              </span>
              <span className="text-emerald-300">✴︎</span>
            </li>
          ))}
        </ul>
      </div>

      <style jsx>{`
        .marquee {
          animation: marquee 18s linear infinite;
        }
        .marquee:hover {
          animation-play-state: paused;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .mask-fade:before,
        .mask-fade:after {
          content: "";
          position: absolute;
          top: 0;
          width: 48px;
          height: 100%;
          z-index: 10;
          pointer-events: none;
        }
        .mask-fade:before {
          left: 0;
          background: linear-gradient(to right, rgba(31,59,44,1), rgba(31,59,44,0));
        }
        .mask-fade:after {
          right: 0;
          background: linear-gradient(to left, rgba(31,59,44,1), rgba(31,59,44,0));
        }
      `}</style>
    </div>
  );
}
