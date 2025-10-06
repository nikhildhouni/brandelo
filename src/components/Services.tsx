"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

type ServiceTab = "marketing" | "design" | "technology";

const DATA: Record<ServiceTab, { title: string; points: string[]; image: string }> = {
  marketing: {
    title: "Marketing",
    points: ["SEO", "Social Media Marketing", "PPC", "Content Marketing", "Email Marketing"],
    image: "/images/services/marketing.avif",
  },
  design: {
    title: "Design",
    points: ["UI/UX Design", "Wireframes & Prototypes", "Brand Identity", "Design Systems", "Illustrations"],
    image: "/images/services/design.avif",
  },
  technology: {
    title: "Technology",
    points: ["Website Development", "App Development", "E-commerce", "API Integrations", "Performance & Security"],
    image: "/images/services/technology.avif",
  },
};

export default function ServicesWDB() {
  const [tab, setTab] = useState<ServiceTab>("marketing");
  const content = useMemo(() => DATA[tab], [tab]);

  return (
    <section
      id="services"
      className="relative mt-24 bg-white py-20 sm:py-24 lg:py-28 dark:bg-black"
    >
      {/* faint background text */}
      <div className="pointer-events-none absolute inset-x-0 top-4 text-center text-6xl font-extrabold text-black/5 sm:text-7xl lg:text-8xl dark:text-white/5">
        Our Services
      </div>

      <div className="mx-auto max-w-7xl px-4">
        {/* visible title */}
        <h2 className="mb-10 text-center text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl dark:text-white">
          <span className="relative inline-block">
            Our Services
            <span className="absolute -bottom-2 left-1/2 h-[4px] w-24 -translate-x-1/2 rounded-full bg-emerald-600 dark:bg-emerald-400" />
          </span>
        </h2>

        {/* tabs */}
        <div className="mb-12 flex flex-wrap items-center justify-center gap-4 sm:gap-5">
          <Pill active={tab === "marketing"} onClick={() => setTab("marketing")}>
            Marketing
          </Pill>
          <Pill active={tab === "design"} onClick={() => setTab("design")}>
            Design
          </Pill>
          <Pill active={tab === "technology"} onClick={() => setTab("technology")}>
            Technology
          </Pill>
        </div>

        {/* content grid */}
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 lg:gap-20">
          {/* left list */}
          <AnimatePresence mode="wait">
            <motion.ul
              key={tab + "-list"}
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -14 }}
              transition={{ duration: 0.28 }}
              className="space-y-5 pl-2 sm:pl-6 lg:pl-10"
            >
              {content.points.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-emerald-600 sm:h-6 sm:w-6 dark:text-emerald-400" />
                  <span className="leading-relaxed text-lg font-semibold text-[#1f3b2c] sm:text-xl lg:text-2xl dark:text-white">
                    {p}
                  </span>
                </li>
              ))}
            </motion.ul>
          </AnimatePresence>

          {/* right image card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={tab + "-image"}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 14 }}
              transition={{ duration: 0.28 }}
              className="relative"
            >
              {/* soft glow frame */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-emerald-300/40 via-sky-300/40 to-emerald-300/40 blur-md dark:from-emerald-400/25 dark:via-sky-400/25 dark:to-emerald-400/25" />
              <div className="relative overflow-hidden rounded-3xl bg-white shadow-[0_12px_40px_rgba(16,24,40,.14)] ring-1 ring-gray-200 dark:bg-white/5 dark:shadow-[0_12px_40px_rgba(0,0,0,.35)] dark:ring-white/10">
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src={content.image}
                    alt={content.title}
                    fill
                    className="object-cover"
                    sizes="(min-width:1280px) 640px, (min-width:768px) 520px, 100vw"
                    priority={tab === "marketing"}
                  />
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white/20 to-transparent dark:from-white/10" />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* --- pill component --- */
function Pill({
  active,
  onClick,
  children,
}: {
  active?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "rounded-full px-7 py-3 text-base sm:text-lg font-semibold transition shadow-sm ring-1 backdrop-blur",
        active
          ? "bg-white text-[#1f3b2c] ring-emerald-400 shadow-[0_2px_0_rgba(0,0,0,0.06)] dark:bg-white/10 dark:text-white dark:ring-emerald-400"
          : "bg-white/70 text-gray-900 ring-gray-300 hover:bg-white dark:bg-white/5 dark:text-white/80 dark:ring-white/15 dark:hover:bg-white/10",
      ].join(" ")}
    >
      {children}
    </button>
  );
}
