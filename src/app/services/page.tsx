"use client";

import { motion, useMotionTemplate, useSpring } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useRef, type MouseEvent } from "react";
import type { CSSProperties } from "react";

type Service = {
  title: string;
  subtitle: string;
  blurb: string;
  img: string;
};

const SERVICES: Service[] = [
  {
    title: "Marketing",
    subtitle: "Digital Marketing Services",
    blurb:
      "Worked with Freelancers Often Faced Payment Delays. Worked with Freelancers Often Faced Payment Delays. Worked with Freelancers Often Faced Payment Delays.",
    img: "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "SEO",
    subtitle: "Search Engine Optimization",
    blurb:
      "Technical + On-page + Content clusters. Clean architecture and intent-driven content to rank & bank.",
    img: "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Social",
    subtitle: "Social Media Marketing",
    blurb:
      "Channel-native creative, UGC, influencers, and always-on calendars that build community & revenue.",
    img: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Web Development",
    subtitle: "Modern Websites & Apps",
    blurb:
      "We craft blazing fast, responsive and SEO-friendly websites in Next.js/React. From landing pages to full-stack web apps, we deliver performance and scalability.",
    img: "https://images.unsplash.com/photo-1529101091764-c3526daf38fe?q=80&w=1600&auto=format&fit=crop",
  },
];

/** Framer Motion v11 uses tuple easings (not strings) */
const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fx = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: EASE_OUT, delay },
  viewport: { once: true, amount: 0.25 },
});

// --- tiny helper for interactive glow ---
function useCardGlow() {
  const ref = useRef<HTMLDivElement | null>(null);
  const mx = useSpring(0, { stiffness: 200, damping: 30 });
  const my = useSpring(0, { stiffness: 200, damping: 30 });

  const maskImage = useMotionTemplate`radial-gradient(240px 240px at ${mx}px ${my}px, rgba(255,255,255,.18), transparent 60%)`;
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mx.set(e.clientX - rect.left);
    my.set(e.clientY - rect.top);
  };

  return { ref, maskImage, handleMouseMove };
}

// Child row component (so hooks are not inside a loop)
function ServiceRow({ s, i }: { s: Service; i: number }) {
  const { ref, maskImage, handleMouseMove } = useCardGlow();
  const isOdd = i % 2 === 1;

  return (
    <motion.div
      {...fx(i * 0.06)}
      className={`relative grid gap-10 items-center lg:grid-cols-2 ${
        isOdd ? "lg:[&>*:first-child]:order-2" : ""
      }`}
    >
      {/* Text card */}
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="group relative rounded-2xl p-1"
      >
        {/* conic edge */}
        <div
          className="absolute inset-0 -z-10 rounded-2xl opacity-70 blur-sm"
          style={{
            background:
              "conic-gradient(from 140deg at 50% 50%, rgba(16,185,129,.35), rgba(14,165,233,.35), rgba(217,70,239,.35), rgba(16,185,129,.35))",
          }}
        />
        <div className="relative rounded-2xl bg-white/70 dark:bg-gray-900/60 ring-1 ring-gray-200/70 dark:ring-gray-800/70 backdrop-blur-xl">
          <div className="p-7 md:p-9">
            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
              <span className="bg-gradient-to-r from-emerald-500 via-sky-500 to-fuchsia-500 bg-clip-text text-transparent">
                {s.title}
              </span>
            </h2>

            <div className="mt-3">
              <h3 className="text-base md:text-lg font-semibold text-gray-800 dark:text-gray-200">
                {s.subtitle}
              </h3>
              <p className="mt-3 max-w-xl leading-relaxed text-gray-600 dark:text-gray-400">
                {s.blurb}
              </p>
            </div>

            <div className="mt-7 flex items-center gap-4">
              {/* skinny switch-like outline */}
              <span className="inline-block h-10 w-28 rounded-full border border-gray-300/70 dark:border-gray-700/70" />
              <motion.a
                href="/contact"
                whileHover={{ x: 3 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-2.5 font-semibold text-white shadow hover:bg-emerald-700 transition"
              >
                Explore <ArrowRight size={16} />
              </motion.a>
            </div>

            <p className="mt-6 text-sm text-gray-600 dark:text-gray-400">
              we don’t have market- we create <br /> digital success stories
            </p>
          </div>
        </div>
      </motion.div>

      {/* Visual card with interactive glow + subtle tilt */}
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        whileHover={{ rotateX: isOdd ? -2 : 2, rotateY: isOdd ? 2 : -2, y: -6 }}
        style={{ transformStyle: "preserve-3d" as CSSProperties["transformStyle"] }}
        transition={{ type: "spring", stiffness: 200, damping: 18 }}
        className="relative rounded-2xl"
      >
        {/* glow follows cursor */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 rounded-2xl"
          style={{
            WebkitMaskImage: maskImage,
            maskImage: maskImage,
            background:
              "linear-gradient(90deg, rgba(16,185,129,.35), rgba(14,165,233,.35), rgba(217,70,239,.35))",
          }}
        />
        {/* frame */}
        <div className="relative rounded-2xl bg-white/60 dark:bg-gray-900/50 p-2 ring-1 ring-gray-200/70 dark:ring-gray-800/70 backdrop-blur">
          <motion.div
            initial={{ scale: 1.02 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
            className="relative aspect-[4/3] overflow-hidden rounded-xl"
          >
            <motion.div
              initial={{ scale: 1.05 }}
              whileHover={{ scale: 1.08 }}
              transition={{ type: "spring", stiffness: 120, damping: 16 }}
              className="absolute inset-0"
            >
              <Image
                src={s.img}
                alt={s.title}
                fill
                className="object-cover"
                unoptimized
                priority={i < 2}
              />
            </motion.div>

            {/* corner badge */}
            <motion.span
              initial={{ opacity: 0, y: -6 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5, ease: EASE_OUT }}
              className="absolute left-3 top-3 rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white shadow-md dark:bg-white/10 backdrop-blur"
            >
              {s.title}
            </motion.span>
          </motion.div>
        </div>

        {/* playful doodle */}
        <svg
          aria-hidden
          className="absolute -top-6 -right-4 h-16 w-16 text-gray-300 dark:text-gray-700"
          viewBox="0 0 64 64"
          fill="none"
        >
          <path
            d="M6 50C12 34 20 14 34 12c14-2 19 16 6 22S18 52 6 50Z"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>
    </motion.div>
  );
}

export default function ServicesPage() {
  return (
    <main className="text-gray-900 dark:text-gray-100">
      {/* ---------- HEADER (unchanged) ---------- */}
      <section className="relative grid place-items-center h-[90vh] overflow-hidden">
        {/* soft aurora */}
        <div className="absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]">
          <div className="absolute inset-0 blur-2xl opacity-90 bg-[conic-gradient(from_0deg_at_50%_50%,rgba(16,185,129,.25),rgba(14,165,233,.25),rgba(217,70,239,.25),rgba(16,185,129,.25))]" />
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight text-center"
        >
          Our{" "}
          <span className="bg-gradient-to-r from-emerald-500 via-sky-500 to-fuchsia-500 bg-clip-text text-transparent">
            Services
          </span>
        </motion.h1>
        <motion.p
          {...fx(0.12)}
          className="mt-5 max-w-2xl text-center text-lg md:text-xl text-gray-700 dark:text-gray-300"
        >
          we don’t have markets— we create digital success stories
        </motion.p>
      </section>

      {/* ---------- MODERN SERVICES (updated) ---------- */}
      <section className="max-w-6xl mx-auto px-6 pb-28 space-y-16">
        {SERVICES.map((s, i) => (
          <ServiceRow key={s.title} s={s} i={i} />
        ))}
      </section>

      {/* ---------- Classy CTA (updated) ---------- */}
      <section className="relative py-20">
        {/* soft background glow */}
        <div
          className="pointer-events-none absolute inset-0 -z-10 mx-auto max-w-5xl blur-3xl opacity-40"
          style={{
            background:
              "radial-gradient(500px 200px at 50% 50%, rgba(16,185,129,.25), transparent 60%)",
          }}
        />
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
            className="relative overflow-hidden rounded-3xl p-[1px]"
            style={{
              background:
                "linear-gradient(90deg, rgba(16,185,129,.45), rgba(14,165,233,.45), rgba(217,70,239,.45))",
            }}
          >
            <div className="relative rounded-3xl bg-white/80 dark:bg-gray-900/60 backdrop-blur-xl ring-1 ring-gray-200/70 dark:ring-gray-800/70">
              <div className="px-8 py-12 md:px-14 md:py-16 text-center">
                <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                  Ready to explore more?
                </h3>
                <p className="mt-3 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  Let’s craft your next digital win—performance-first design, search-ready content, and scroll-stopping creative.
                </p>
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-7 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-600 via-sky-600 to-fuchsia-600 px-8 py-3 font-semibold text-white shadow-lg"
                >
                  Get in Touch <ArrowRight size={18} />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
