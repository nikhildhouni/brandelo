"use client";

import { useCallback, useMemo, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { Rocket, Sparkles, ArrowRight, Shield, TrendingUp } from "lucide-react";

/**
 * Hero3DGlassy.tsx — Light/Dark ready
 * — Fixes for light mode visibility: higher contrast, lighter glass, darker text.
 * — Tailwind dark: variants keep the original neon vibe in dark mode.
 */

type Action = {
  label: string;
  onClick?: () => void;
  href?: string;
};

type HeroProps = {
  kicker?: string;
  title?: string;
  subtitle?: string;
  primary?: Action;
  secondary?: Action;
  bullets?: string[];
};

function useParallaxTilt(intensity = 12) {
  const ref = useRef<HTMLDivElement | null>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  const rx = useTransform(my, [0, 1], [intensity, -intensity]);
  const ry = useTransform(mx, [0, 1], [-intensity, intensity]);

  const rxSpring = useSpring(rx, { stiffness: 160, damping: 14, mass: 0.4 });
  const rySpring = useSpring(ry, { stiffness: 160, damping: 14, mass: 0.4 });

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mx.set(x);
    my.set(y);
  }, [mx, my]);

  const onLeave = useCallback(() => {
    mx.set(0.5);
    my.set(0.5);
  }, [mx, my]);

  return { ref, rx: rxSpring, ry: rySpring, onMouseMove, onLeave };
}

export default function Hero3DGlassy({
  kicker = "WDB • Digital Marketing",
  title = "Amplify Growth with Data‑Driven Marketing",
  subtitle = "3D experiences, glassy UI, and high‑impact campaigns that convert. We blend SEO, Paid Ads, and Content to scale your brand.",
  primary = { label: "Get Free Audit" },
  secondary = { label: "See Pricing" },
  bullets = ["SEO Sprints", "Performance Ads", "Content Engine"],
}: HeroProps) {
  const prefersReduced = useReducedMotion();
  const { ref, rx, ry, onMouseMove, onLeave } = useParallaxTilt(14);

  const cardStyle = useMemo(() => ({
    rotateX: prefersReduced ? 0 : rx,
    rotateY: prefersReduced ? 0 : ry,
  }), [rx, ry, prefersReduced]);

  const renderAction = (a?: Action, variant: "primary" | "ghost" = "primary") => {
    if (!a) return null;
    const className =
      variant === "primary"
        ? "inline-flex items-center gap-2 rounded-2xl px-5 py-3 font-medium shadow-lg shadow-black/10 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-emerald-300 dark:from-emerald-400 dark:to-cyan-400"
        : "inline-flex items-center gap-2 rounded-2xl px-5 py-3 font-medium border bg-black/5 text-gray-900 hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-black/10 border-black/10 backdrop-blur dark:border-white/30 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:focus:ring-white/30";

    const content = (
      <span className="inline-flex items-center gap-2">
        {variant === "primary" ? <Rocket className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
        {a.label}
      </span>
    );

    if (a.href) {
      return (
        <a href={a.href} className={className} aria-label={a.label}>
          {content}
        </a>
      );
    }
    return (
      <button onClick={a.onClick} className={className} aria-label={a.label}>
        {content}
      </button>
    );
  };

  return (
    <section className="relative overflow-hidden">
      {/* Background: LIGHT by default, DARK via class */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* Light base */}
        <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_10%,rgba(99,102,241,0.18),transparent_50%),radial-gradient(70%_50%_at_80%_20%,rgba(34,197,94,0.16),transparent_50%),#ffffff] dark:bg-[radial-gradient(80%_60%_at_50%_10%,rgba(99,102,241,0.25),transparent_50%),radial-gradient(70%_50%_at_80%_20%,rgba(34,197,94,0.20),transparent_50%),#0b1020]" />

        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-40 [mask-image:radial-gradient(70%_60%_at_50%_40%,black,transparent)]">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
                <path d="M 32 0 L 0 0 0 32" fill="none" stroke="black" strokeOpacity="0.06" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" className="dark:[&_path]:stroke-white" />
          </svg>
        </div>

        {/* Animated aurora ribbons (softer in light) */}
        <motion.div
          aria-hidden
          className="absolute -top-24 left-1/2 h-[60rem] w-[60rem] -translate-x-1/2 rounded-full blur-3xl opacity-20 dark:opacity-40"
          style={{
            background:
              "conic-gradient(from 180deg at 50% 50%, rgba(59,130,246,0.35), rgba(168,85,247,0.35), rgba(34,197,94,0.35), rgba(59,130,246,0.35))",
          }}
          animate={prefersReduced ? undefined : { rotate: 360 }}
          transition={prefersReduced ? undefined : { duration: 40, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-28 lg:py-32">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          {/* Left: Copy */}
          <div className="relative">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-gray-700 backdrop-blur border-black/10 bg-white/60 dark:border-white/20 dark:bg-white/10 dark:text-white/90">
              <Sparkles className="h-3.5 w-3.5" />
              <span>{kicker}</span>
            </div>

            <h1 className="text-4xl font-semibold leading-tight text-gray-900 sm:text-5xl lg:text-6xl dark:text-white">
              {title}
            </h1>

            <p className="mt-5 max-w-xl text-base text-gray-700 sm:text-lg dark:text-white/80">
              {subtitle}
            </p>

            {/* Bullets */}
            <ul className="mt-6 flex flex-wrap gap-3 text-sm text-gray-800 dark:text-white/85">
              {bullets.map((b, i) => (
                <li key={i} className="inline-flex items-center gap-2 rounded-full border px-3 py-1 backdrop-blur border-black/10 bg-black/5 dark:border-white/20 dark:bg-white/5">
                  <Shield className="h-4 w-4" /> {b}
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              {renderAction(primary, "primary")}
              {renderAction(secondary, "ghost")}
            </div>

            {/* Trust row */}
            <div className="mt-8 flex flex-wrap items-center gap-6 text-xs text-gray-500 dark:text-white/60">
              <div className="inline-flex items-center gap-2"><TrendingUp className="h-4 w-4" /> Avg. ROAS 3.4x</div>
              <div className="inline-flex items-center gap-2"><Shield className="h-4 w-4" /> GDPR + SOC2 Ready</div>
            </div>
          </div>

          {/* Right: 3D Card */}
          <motion.div
            className="relative mx-auto w-full max-w-xl [perspective:1400px]"
            onMouseMove={onMouseMove}
            onMouseLeave={onLeave}
          >
            {/* Glow halo */}
            <div className="pointer-events-none absolute -inset-8 -z-10 rounded-[2rem] bg-gradient-to-tr from-indigo-500/20 via-emerald-400/15 to-fuchsia-500/20 blur-2xl dark:from-indigo-500/30 dark:via-emerald-400/25 dark:to-fuchsia-500/30" />

            <motion.div
              ref={ref}
              style={cardStyle}
              className="group relative rounded-[2rem] border p-6 shadow-2xl shadow-black/10 [transform-style:preserve-3d] border-black/10 bg-white/70 backdrop-blur-xl dark:border-white/15 dark:bg-white/10"
            >
              {/* Shine layer */}
              <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[2rem] [transform:translateZ(40px)]">
                <div className="absolute -inset-1 bg-[radial-gradient(40rem_20rem_at_var(--mx,50%)_-20%,rgba(255,255,255,0.25),transparent_60%)] transition-[--mx] duration-200" />
              </div>

              {/* Top chips */}
              <div className="flex flex-wrap items-center gap-2 [transform:translateZ(50px)]">
                <span className="rounded-full border px-3 py-1 text-xs backdrop-blur border-black/10 bg-white/60 text-gray-800 dark:border-white/20 dark:bg-white/10 dark:text-white/85">Real‑time Insights</span>
                <span className="rounded-full border px-3 py-1 text-xs backdrop-blur border-black/10 bg-white/60 text-gray-800 dark:border-white/20 dark:bg-white/10 dark:text-white/85">A/B Testing</span>
                <span className="rounded-full border px-3 py-1 text-xs backdrop-blur border-black/10 bg-white/60 text-gray-800 dark:border-white/20 dark:bg-white/10 dark:text-white/85">Attribution</span>
              </div>

              {/* Core panel */}
              <div className="mt-6 grid grid-cols-3 gap-4 [transform:translateZ(30px)]">
                {[
                  { label: "SEO", value: "+128%", note: "Organic" },
                  { label: "Paid Ads", value: "-34%", note: "CPC" },
                  { label: "Revenue", value: "+3.4x", note: "ROAS" },
                ].map((kpi, i) => (
                  <div key={i} className="rounded-xl border p-4 backdrop-blur border-black/10 bg-white/70 text-gray-900 dark:border-white/15 dark:bg-white/10 dark:text-white/90">
                    <div className="text-xs uppercase tracking-wide text-gray-600 dark:text-white/60">{kpi.label}</div>
                    <div className="mt-1 text-2xl font-semibold">{kpi.value}</div>
                    <div className="text-[11px] text-gray-600 dark:text-white/60">{kpi.note}</div>
                  </div>
                ))}
              </div>

              {/* Floating badges */}
              <motion.div
                aria-hidden
                className="pointer-events-none absolute -left-6 top-10 hidden sm:block"
                initial={{ y: 10, opacity: 0 }}
                animate={prefersReduced ? { opacity: 1 } : { y: [10, -10, 10], opacity: 1 }}
                transition={prefersReduced ? undefined : { duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="flex items-center gap-2 rounded-xl border px-3 py-2 backdrop-blur border-black/10 bg-white/70 text-gray-900 dark:border-white/20 dark:bg-white/10 dark:text-white/90 [transform:translateZ(60px)]">
                  <Rocket className="h-4 w-4" /> Launch Strategy
                </div>
              </motion.div>

              <motion.div
                aria-hidden
                className="pointer-events-none absolute -right-6 bottom-10 hidden sm:block"
                initial={{ y: -10, opacity: 0 }}
                animate={prefersReduced ? { opacity: 1 } : { y: [-10, 10, -10], opacity: 1 }}
                transition={prefersReduced ? undefined : { duration: 7, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="flex items-center gap-2 rounded-xl border px-3 py-2 backdrop-blur border-black/10 bg-white/70 text-gray-900 dark:border-white/20 dark:bg-white/10 dark:text-white/90 [transform:translateZ(60px)]">
                  <TrendingUp className="h-4 w-4" /> Growth Playbook
                </div>
              </motion.div>

              {/* Bottom ribbon */}
              <div className="mt-6 overflow-hidden rounded-xl border p-4 backdrop-blur border-black/10 bg-white/70 text-gray-900 dark:border-white/15 dark:bg-gradient-to-br dark:from-white/10 dark:to-white/5 dark:text-white/90 [transform:translateZ(20px)]">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <div className="text-sm text-gray-600 dark:text-white/70">Campaign Health</div>
                    <div className="text-lg font-medium">93/100</div>
                  </div>

                  <motion.div className="h-2 w-40 rounded-full bg-black/10 dark:bg-white/10" initial={false}>
                    <motion.div
                      className="h-2 rounded-full bg-black/70 dark:bg-white"
                      initial={{ width: 0 }}
                      whileInView={{ width: "86%" }}
                      viewport={{ once: true, amount: 0.6 }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                    />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Accessibility + CSS variables update for shine */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function(){
              var root = document.documentElement;
              function setMx(e){
                var x = (e.clientX / window.innerWidth) * 100;
                root.style.setProperty('--mx', x + '%');
              }
              window.addEventListener('mousemove', setMx, { passive: true });
            })();
          `,
        }}
      />
    </section>
  );
}
