"use client";

import { motion } from "framer-motion";

const letters = [
  { char: "B", color: "#00BFFF" }, // Deep Sky Blue
  { char: "R", color: "#00FF99" }, // Mint Green
  { char: "A", color: "#FFD700" }, // Gold
  { char: "N", color: "#FF6347" }, // Tomato Red
  { char: "D", color: "#FF1493" }, // Deep Pink
  { char: "E", color: "#9B30FF" }, // Purple
  { char: "L", color: "#00FFFF" }, // Cyan
  { char: "O", color: "#FF7F00" }, // Orange
];

export default function SplashScreen() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-black overflow-hidden">
      {/* cinematic background glow */}
      <div className="pointer-events-none absolute inset-0 blur-[200px] opacity-30 bg-[radial-gradient(circle_at_50%_40%,rgba(255,0,64,0.5)_0%,rgba(0,0,0,0)_70%)]" />

      {/* slight color wash */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-screen [background-image:radial-gradient(circle_at_10%_10%,rgba(255,255,255,0.4)_0%,rgba(0,0,0,0)_60%),radial-gradient(circle_at_90%_20%,rgba(0,150,255,0.4)_0%,rgba(0,0,0,0)_60%),radial-gradient(circle_at_50%_80%,rgba(255,0,200,0.4)_0%,rgba(0,0,0,0)_60%)]" />

      {/* LETTERS */}
      <motion.div
        className="relative flex flex-wrap items-center justify-center gap-[0.6rem] sm:gap-3"
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 1 },
          show: {
            opacity: 1,
            transition: { staggerChildren: 0.22 },
          },
        }}
      >
        {letters.map((l, i) => (
          <motion.div
            key={i}
            variants={{
              hidden: { opacity: 0, y: 40, scale: 0.8, filter: "blur(16px)" },
              show: {
                opacity: 1,
                y: 0,
                scale: 1,
                filter: "blur(0px)",
                transition: {
                  type: "spring",
                  stiffness: 140,
                  damping: 20,
                  duration: 0.9,
                },
              },
            }}
            className="relative flex select-none items-center justify-center will-change-transform [perspective:1200px]"
          >
            {/* GLOW */}
            <span
              aria-hidden
              className="absolute pointer-events-none font-extrabold leading-none blur-[28px] text-[72px] sm:text-[88px]"
              style={{
                color: l.color,
                textShadow: `
                  0 0 40px ${l.color},
                  0 0 100px ${l.color},
                  0 40px 120px rgba(0,0,0,0.8)
                `,
                opacity: 0.7,
              }}
            >
              {l.char}
            </span>

            {/* MAIN COLORED LETTER */}
            <span
              className="relative font-extrabold leading-none text-[72px] sm:text-[88px]"
              style={{
                color: l.color,
                filter: `
                  drop-shadow(0 8px 15px rgba(0,0,0,0.6))
                  drop-shadow(0 0 20px ${l.color})
                `,
              }}
            >
              {l.char}
            </span>

            {/* EDGE LIGHT */}
            <span
              aria-hidden
              className="absolute pointer-events-none font-extrabold leading-none text-[72px] sm:text-[88px]"
              style={{
                color: "transparent",
                WebkitTextStroke: `2px ${l.color}`,
                opacity: 0.4,
              }}
            >
              {l.char}
            </span>
          </motion.div>
        ))}
      </motion.div>

      {/* tagline */}
      <motion.div
        className="mt-8 text-[11px] sm:text-[12px] tracking-[0.3em] text-white/60 uppercase text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2, duration: 1.2 }}
      >
        YOUR DIGITAL GROWTH PARTNER
      </motion.div>

      {/* floor reflection */}
      <div className="pointer-events-none absolute bottom-[15vh] sm:bottom-[12vh] opacity-[0.12] blur-[60px] w-[80%] max-w-[800px] h-[200px] rounded-full bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,0.6)_0%,rgba(0,0,0,0)_70%)]" />
    </div>
  );
}
