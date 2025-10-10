"use client";

import { motion } from "framer-motion";
import { Linkedin, Instagram, Twitter, Sparkles, Quote } from "lucide-react";

/**
 * FounderSection.tsx — Always-dark neon + glass
 * - Hard-locked dark palette (no `dark:` classes)
 * - Aurora + grid backdrop, glassy cards, glossy socials
 */

export default function FounderSection() {
  return (
    <section className="relative isolation-isolate overflow-hidden bg-[#0b1020] text-white py-24">
      {/* Background: aurora + grid + slow conic glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_10%,rgba(99,102,241,0.25),transparent_50%),radial-gradient(70%_50%_at_80%_20%,rgba(34,197,94,0.20),transparent_50%),#0b1020]" />
        <div className="absolute inset-0 opacity-40 [mask-image:radial-gradient(70%_60%_at_50%_42%,black,transparent)]">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-founder-fixed" width="32" height="32" patternUnits="userSpaceOnUse">
                <path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeOpacity="0.06" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-founder-fixed)" />
          </svg>
        </div>
        <div
          aria-hidden
          className="absolute -top-40 left-1/2 h-[70rem] w-[70rem] -translate-x-1/2 rounded-full blur-3xl opacity-35"
          style={{
            background:
              "conic-gradient(from 180deg at 50% 50%, rgba(59,130,246,0.35), rgba(168,85,247,0.35), rgba(34,197,94,0.35), rgba(59,130,246,0.35))",
            animation: "spin 50s linear infinite",
          }}
        />
        <style jsx>{`
          @keyframes spin { to { transform: rotate(360deg); } }
        `}</style>
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="grid items-center gap-10 lg:grid-cols-2"
        >
          {/* Founder Image — glassy card */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 150, damping: 15 }}
            className="relative mx-auto w-full max-w-sm rounded-[2rem] border border-white/15 bg-white/10 p-2 shadow-2xl backdrop-blur-xl"
          >
            <div className="absolute inset-0 rounded-[2rem] bg-[conic-gradient(from_0deg,rgba(16,185,129,.25),rgba(59,130,246,.25),rgba(168,85,247,.25),rgba(16,185,129,.25))] opacity-40" />
            <img
              src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=800&auto=format&fit=crop"
              alt="Founder portrait"
              className="relative z-10 rounded-[1.8rem] object-cover"
            />
            {/* soft top highlight */}
            <div className="pointer-events-none absolute inset-x-0 top-2 h-24 rounded-[1.8rem] bg-gradient-to-b from-white/25 to-transparent" />
          </motion.div>

          {/* Founder Details */}
          <div className="space-y-6 text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white/90 backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" /> Meet Our Founder
            </div>

            <h2 className="text-4xl font-semibold sm:text-5xl">Shaurya Sarin</h2>
            <p className="text-lg text-white/80">
              Founder & CEO of WDB — with over a decade of experience in digital marketing, Shaurya has led campaigns
              for over 150 brands, scaling startups to global recognition.
            </p>

            {/* Quote — glass card */}
            <motion.blockquote
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="relative rounded-2xl border border-white/15 bg-white/10 p-6 italic text-white/80 shadow-2xl backdrop-blur-xl"
            >
              <Quote className="absolute -top-3 left-4 h-6 w-6 text-emerald-300/80" />
              “Marketing isn't about selling products — it's about creating stories that people believe in.”
            </motion.blockquote>

            {/* Social Links — glossy pills */}
            <div className="flex gap-4 pt-2">
              {[
                { href: "https://linkedin.com", Icon: Linkedin, label: "LinkedIn" },
                { href: "https://instagram.com", Icon: Instagram, label: "Instagram" },
                { href: "https://twitter.com", Icon: Twitter, label: "Twitter" },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group relative grid h-11 w-11 place-items-center overflow-hidden rounded-full border border-white/20 bg-white/10 text-white backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/60"
                >
                  <span className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
