"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Megaphone, PenTool, Cpu } from "lucide-react";

/**
 * ServicesSection.tsx — Always-dark, neon glass look (self-scoped)
 * - Dark palette forced via `dark` class on the root <section>
 * - Aurora + grid background to match the hero
 * - Glassy cards with subtle hover glow
 */

const SERVICES = [
  {
    icon: Megaphone,
    title: "Marketing",
    desc:
      "From SEO to Social Media and Paid Ads, we craft growth strategies that attract and convert your target audience.",
    gradient: "from-emerald-400/20 to-cyan-400/20",
    link: "/services/marketing",
  },
  {
    icon: PenTool,
    title: "Design",
    desc:
      "Creative storytelling through sleek UI/UX, branding, and content design that amplifies your brand's voice.",
    gradient: "from-fuchsia-400/20 to-indigo-400/20",
    link: "/services/design",
  },
  {
    icon: Cpu,
    title: "Technology",
    desc:
      "Web, automation, and analytics solutions built with modern frameworks to empower performance and scalability.",
    gradient: "from-amber-400/20 to-orange-400/20",
    link: "/services/technology",
  },
];

export default function ServicesSection() {
  return (
    <section className="relative overflow-hidden dark bg-[#0b1020] text-white py-24">
      {/* Background (aurora + grid) */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_10%,rgba(99,102,241,0.25),transparent_50%),radial-gradient(70%_50%_at_80%_20%,rgba(34,197,94,0.20),transparent_50%),#0b1020]" />
        <div className="absolute inset-0 opacity-40 [mask-image:radial-gradient(70%_60%_at_50%_40%,black,transparent)]">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-svcs" width="32" height="32" patternUnits="userSpaceOnUse">
                <path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeOpacity="0.06" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-svcs)" />
          </svg>
        </div>
        <motion.div
          aria-hidden
          className="absolute -top-40 left-1/2 h-[70rem] w-[70rem] -translate-x-1/2 rounded-full blur-3xl opacity-35"
          style={{
            background:
              "conic-gradient(from 180deg at 50% 50%, rgba(59,130,246,0.35), rgba(168,85,247,0.35), rgba(34,197,94,0.35), rgba(59,130,246,0.35))",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-semibold mb-4"
        >
          Our Core Services
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="max-w-2xl mx-auto text-white/70 mb-16"
        >
          We merge creativity, technology, and strategy to deliver experiences that accelerate your brand’s digital journey.
        </motion.p>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.title}
              className="group relative rounded-3xl border border-white/15 bg-white/10 backdrop-blur-xl p-8 shadow-2xl hover:shadow-[0_20px_90px_rgba(59,130,246,0.25)] transition-all duration-300 hover:-translate-y-1"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ delay: 0.08 * i, duration: 0.6, ease: "easeOut" }}
            >
              {/* Hover Gradient Glow */}
              <div
                className={`pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br ${s.gradient} opacity-0 group-hover:opacity-100 blur-2xl transition duration-500`}
              />

              <div className="relative z-10 flex flex-col items-start text-left">
                <div className="mb-6 rounded-2xl border border-white/20 bg-white/10 p-3 backdrop-blur-xl shadow-lg">
                  <s.icon className="h-7 w-7 text-white" />
                </div>

                <h3 className="text-2xl font-semibold mb-3">{s.title}</h3>

                <p className="text-white/75 mb-6">{s.desc}</p>

                <motion.div whileHover={{ x: 4 }}>
                  <Link
                    href={s.link}
                    className="inline-flex items-center gap-2 text-sm font-medium text-emerald-300 hover:underline"
                  >
                    Learn More →
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Optional mini-CTA row to mirror your hero’s vibe */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-16 inline-flex items-center gap-6 text-sm text-white/70"
        >
          <span className="inline-flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
            Fast kickoff
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-cyan-400/80" />
            Transparent pricing
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-fuchsia-400/80" />
            Senior talent only
          </span>
        </motion.div>
      </div>
    </section>
  );
}
