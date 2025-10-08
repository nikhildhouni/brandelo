"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Megaphone, PenTool, Cpu } from "lucide-react";

/**
 * ServicesSection.tsx
 * — Three Modern 3D-Glassy Animated Cards for Services
 * — Tailwind + Framer Motion + Lucide
 * — Added service-specific links (Next.js routing)
 */

const SERVICES = [
  {
    icon: Megaphone,
    title: "Marketing",
    desc: "From SEO to Social Media and Paid Ads, we craft growth strategies that attract and convert your target audience.",
    gradient: "from-emerald-400/20 to-cyan-400/20",
    link: "/services/marketing",
  },
  {
    icon: PenTool,
    title: "Design",
    desc: "Creative storytelling through sleek UI/UX, branding, and content design that amplifies your brand's voice.",
    gradient: "from-fuchsia-400/20 to-indigo-400/20",
    link: "/services/design",
  },
  {
    icon: Cpu,
    title: "Technology",
    desc: "Web, automation, and analytics solutions built with modern frameworks to empower performance and scalability.",
    gradient: "from-amber-400/20 to-orange-400/20",
    link: "/services/technology",
  },
];

export default function ServicesSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-white to-gray-50 dark:from-[#0b1020] dark:via-[#0b1020] dark:to-black py-24">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-semibold mb-4 text-gray-900 dark:text-white"
        >
          Our Core Services
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="max-w-2xl mx-auto text-gray-600 dark:text-white/70 mb-16"
        >
          We merge creativity, technology, and strategy to deliver experiences that accelerate your brand’s digital journey.
        </motion.p>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.title}
              className="group relative rounded-3xl border border-black/10 dark:border-white/15 bg-white/60 dark:bg-white/10 backdrop-blur-xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i, duration: 0.6 }}
            >
              {/* Hover Gradient Glow */}
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${s.gradient} opacity-0 group-hover:opacity-100 blur-2xl transition duration-500`} />

              <div className="relative z-10 flex flex-col items-start text-left">
                <div className="mb-6 rounded-2xl border border-white/20 bg-white/30 dark:bg-white/10 p-3 backdrop-blur-xl shadow-lg">
                  <s.icon className="h-7 w-7 text-gray-900 dark:text-white" />
                </div>

                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                  {s.title}
                </h3>

                <p className="text-gray-700 dark:text-white/70 mb-6">{s.desc}</p>

                <motion.div whileHover={{ x: 4 }}>
                  <Link
                    href={s.link}
                    className="inline-flex items-center gap-2 text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:underline"
                  >
                    Learn More →
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
