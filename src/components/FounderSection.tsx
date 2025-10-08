"use client";

import { motion } from "framer-motion";
import { Linkedin, Instagram, Twitter, Sparkles, Quote } from "lucide-react";

/**
 * FounderSection.tsx — Modern Animated Founder Intro
 * - 3D glassy card with glow hover
 * - Animated entrance & quote fade-in
 * - Responsive layout with image + bio
 * - Light/dark mode friendly
 */

export default function FounderSection() {
  return (
    <section className="relative overflow-hidden py-24 bg-gradient-to-b from-white via-white to-gray-50 dark:from-[#0b1020] dark:via-[#0b1020] dark:to-black">
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_10%,rgba(16,185,129,0.1),transparent_50%),radial-gradient(70%_50%_at_80%_20%,rgba(59,130,246,0.1),transparent_50%)] dark:bg-[radial-gradient(80%_60%_at_50%_10%,rgba(59,130,246,0.18),transparent_50%),radial-gradient(70%_50%_at_80%_20%,rgba(168,85,247,0.18),transparent_50%)]" />
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="grid items-center gap-10 lg:grid-cols-2"
        >
          {/* Founder Image */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 150, damping: 15 }}
            className="relative mx-auto w-full max-w-sm rounded-[2rem] border border-black/10 bg-white/60 p-2 shadow-xl backdrop-blur-xl dark:border-white/15 dark:bg-white/10"
          >
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-tr from-emerald-400/10 via-cyan-400/10 to-fuchsia-400/10 blur-2xl" />
            <img
              src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=800&auto=format&fit=crop"
              alt="Founder portrait"
              className="relative z-10 rounded-[1.8rem] object-cover"
            />
          </motion.div>

          {/* Founder Details */}
          <div className="space-y-6 text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs text-gray-800 backdrop-blur dark:border-white/20 dark:bg-white/10 dark:text-white/90">
              <Sparkles className="h-3.5 w-3.5" /> Meet Our Founder
            </div>

            <h2 className="text-4xl font-semibold text-gray-900 dark:text-white sm:text-5xl">
              Shaurya Sarin
            </h2>
            <p className="text-lg text-gray-600 dark:text-white/70">
              Founder & CEO of WDB — with over a decade of experience in digital marketing, Sarah has led campaigns for over 150 brands, scaling startups to global recognition.
            </p>

            {/* Quote */}
            <motion.blockquote
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="relative rounded-2xl border border-black/10 bg-white/70 p-6 italic text-gray-800 shadow-md backdrop-blur dark:border-white/20 dark:bg-white/10 dark:text-white/80"
            >
              <Quote className="absolute -top-3 left-4 h-6 w-6 text-emerald-400 opacity-70" />
              "Marketing isn't about selling products — it's about creating stories that people believe in."
            </motion.blockquote>

            {/* Social Links */}
            <div className="flex gap-4 pt-2">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-black/10 bg-white/70 p-3 text-gray-800 shadow-sm transition hover:scale-110 hover:text-emerald-500 dark:border-white/20 dark:bg-white/10 dark:text-white dark:hover:text-emerald-400"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-black/10 bg-white/70 p-3 text-gray-800 shadow-sm transition hover:scale-110 hover:text-emerald-500 dark:border-white/20 dark:bg-white/10 dark:text-white dark:hover:text-emerald-400"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-black/10 bg-white/70 p-3 text-gray-800 shadow-sm transition hover:scale-110 hover:text-emerald-500 dark:border-white/20 dark:bg-white/10 dark:text-white dark:hover:text-emerald-400"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
