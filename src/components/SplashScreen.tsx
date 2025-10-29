"use client";

import { motion } from "framer-motion";

const letters = [
  {
    char: "B",
    tintMain: "rgba(80,140,255,0.55)",
    glow: "rgba(80,140,255,0.6)",
    gradTop: "rgba(180,220,255,0.8)",
    gradBottom: "rgba(40,80,255,0.15)",
  },
  {
    char: "R",
    tintMain: "rgba(80,255,140,0.5)",
    glow: "rgba(80,255,140,0.45)",
    gradTop: "rgba(200,255,220,0.8)",
    gradBottom: "rgba(40,255,140,0.15)",
  },
  {
    char: "A",
    tintMain: "rgba(255,200,80,0.55)",
    glow: "rgba(255,200,80,0.45)",
    gradTop: "rgba(255,240,200,0.8)",
    gradBottom: "rgba(255,180,60,0.15)",
  },
  {
    char: "N",
    tintMain: "rgba(255,140,80,0.55)",
    glow: "rgba(255,140,80,0.45)",
    gradTop: "rgba(255,220,200,0.8)",
    gradBottom: "rgba(255,120,60,0.15)",
  },
  {
    char: "D",
    tintMain: "rgba(255,80,140,0.55)",
    glow: "rgba(255,80,140,0.45)",
    gradTop: "rgba(255,200,220,0.8)",
    gradBottom: "rgba(255,60,120,0.15)",
  },
  {
    char: "E",
    tintMain: "rgba(255,80,255,0.55)",
    glow: "rgba(255,80,255,0.45)",
    gradTop: "rgba(255,210,255,0.8)",
    gradBottom: "rgba(200,60,255,0.2)",
  },
  {
    char: "L",
    tintMain: "rgba(170,140,255,0.55)",
    glow: "rgba(170,140,255,0.45)",
    gradTop: "rgba(220,210,255,0.8)",
    gradBottom: "rgba(140,80,255,0.2)",
  },
  {
    char: "O",
    tintMain: "rgba(120,110,255,0.55)",
    glow: "rgba(120,110,255,0.45)",
    gradTop: "rgba(210,210,255,0.8)",
    gradBottom: "rgba(90,70,255,0.2)",
  },
];

export default function SplashScreen() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-black overflow-hidden">
      {/* cinematic color glow bg */}
      <div className="pointer-events-none absolute inset-0 blur-[200px] opacity-30 bg-[radial-gradient(circle_at_50%_40%,rgba(255,0,64,0.5)_0%,rgba(0,0,0,0)_70%)]" />

      {/* subtle spectrum wash so background isn't flat */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-screen [background-image:radial-gradient(circle_at_10%_10%,rgba(255,255,255,0.4)_0%,rgba(0,0,0,0)_60%),radial-gradient(circle_at_90%_20%,rgba(0,150,255,0.4)_0%,rgba(0,0,0,0)_60%),radial-gradient(circle_at_50%_80%,rgba(255,0,200,0.4)_0%,rgba(0,0,0,0)_60%)]" />

      {/* LETTER ROW */}
      <motion.div
        className="relative flex flex-wrap items-center justify-center gap-[0.6rem] sm:gap-3"
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 1 },
          show: {
            opacity: 1,
            transition: {
              staggerChildren: 0.22,
            },
          },
        }}
      >
        {letters.map((l, i) => (
          <motion.div
            key={i}
            variants={{
              hidden: {
                opacity: 0,
                y: 40,
                scale: 0.8,
                filter: "blur(16px)",
              },
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
            {/* 3D tilt wrapper */}
            <div className="relative flex items-center justify-center [transform-style:preserve-3d] [transform:rotateX(8deg)_rotateY(-12deg)]">
              {/* GLOW / aura */}
              <span
                aria-hidden
                className="absolute pointer-events-none font-extrabold leading-none blur-[28px] text-[72px] sm:text-[88px]"
                style={{
                  color: l.glow,
                  textShadow: `
                    0 0 30px ${l.glow},
                    0 0 80px ${l.glow},
                    0 40px 120px rgba(0,0,0,0.8)
                  `,
                  opacity: 0.6,
                  filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.8))",
                }}
              >
                {l.char}
              </span>

              {/* CORE BODY (colored / translucent glass) */}
              <span
                className="relative font-extrabold leading-none text-[72px] sm:text-[88px] text-transparent"
                style={{
                  backgroundImage: `
                    radial-gradient(circle at 30% 20%, ${l.gradTop} 0%, rgba(255,255,255,0.05) 60%),
                    radial-gradient(circle at 70% 80%, ${l.tintMain} 0%, rgba(0,0,0,0) 70%)
                  `,
                  WebkitBackgroundClip: "text",
                  filter: `
                    drop-shadow(0 24px 40px rgba(0,0,0,0.9))
                    drop-shadow(0 0 20px rgba(255,255,255,0.4))
                  `,
                  WebkitTextStroke: "1px rgba(255,255,255,0.4)",
                  textShadow: `
                    0 1px 2px rgba(255,255,255,0.6),
                    0 -2px 4px rgba(0,0,0,0.8),
                    0 20px 30px rgba(0,0,0,0.9)
                  `,
                }}
              >
                {l.char}
              </span>

              {/* RIM / bevel edge highlight */}
              <span
                aria-hidden
                className="absolute pointer-events-none font-extrabold leading-none text-[72px] sm:text-[88px]"
                style={{
                  color: "transparent",
                  WebkitTextStroke: "2px rgba(255,255,255,0.18)",
                  filter: `
                    drop-shadow(0 0 6px rgba(255,255,255,0.7))
                    drop-shadow(0 0 24px rgba(255,255,255,0.4))
                  `,
                  mixBlendMode: "screen",
                }}
              >
                {l.char}
              </span>

              {/* SPECULAR highlight swipe */}
              <span
                aria-hidden
                className="absolute pointer-events-none font-extrabold leading-none text-[72px] sm:text-[88px]"
                style={{
                  backgroundImage:
                    "linear-gradient(to bottom, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.0) 60%)",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                  opacity: 0.4,
                  filter: "blur(0.5px)",
                  mixBlendMode: "screen",
                }}
              >
                {l.char}
              </span>

              {/* DEPTH SHADOW bottom side (fake thickness) */}
              <span
                aria-hidden
                className="absolute pointer-events-none font-extrabold leading-none text-[72px] sm:text-[88px]"
                style={{
                  color: "transparent",
                  backgroundImage:
                    "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 60%)",
                  WebkitBackgroundClip: "text",
                  opacity: 0.5,
                  filter: "blur(2px)",
                }}
              >
                {l.char}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* tagline under logo */}
      <motion.div
        className="mt-8 text-[11px] sm:text-[12px] tracking-[0.3em] text-white/60 uppercase text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2, duration: 1.2 }}
      >
        YOUR DIGITAL GROWTH PARTNER
      </motion.div>

      {/* floor reflection / bloom */}
      <div className="pointer-events-none absolute bottom-[15vh] sm:bottom-[12vh] opacity-[0.12] blur-[60px] w-[80%] max-w-[800px] h-[200px] rounded-full bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,0.6)_0%,rgba(0,0,0,0)_70%)]" />
    </div>
  );
}
