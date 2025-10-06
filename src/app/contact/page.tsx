"use client";

import { motion, useMotionTemplate, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  ArrowRight,
  CheckCircle,
  Shield,
  Trophy,
  Sparkles,
} from "lucide-react";

const fx = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: "easeOut", delay },
  viewport: { once: true, amount: 0.25 },
});

function useCardGlow() {
  const ref = useRef<HTMLDivElement | null>(null);
  const mx = useSpring(0, { stiffness: 200, damping: 30 });
  const my = useSpring(0, { stiffness: 200, damping: 30 });
  const maskImage = useMotionTemplate`radial-gradient(260px 260px at ${mx}px ${my}px, rgba(255,255,255,.2), transparent 60%)`;
  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mx.set(e.clientX - rect.left);
    my.set(e.clientY - rect.top);
  };
  return { ref, maskImage, handleMouseMove };
}

export default function ContactPage() {
  const { ref, maskImage, handleMouseMove } = useCardGlow();
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setSent(true);
    setLoading(false);
    (e.currentTarget as HTMLFormElement).reset();
  }

  return (
    <main className="text-gray-900 dark:text-gray-100">
      {/* ---------- HEADER (UNCHANGED) ---------- */}
      <section className="relative grid place-items-center h-[90vh] overflow-hidden">
        <div className="absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]">
          <div className="absolute inset-0 blur-2xl opacity-90 bg-[conic-gradient(from_0deg_at_50%_50%,rgba(16,185,129,.25),rgba(14,165,233,.25),rgba(217,70,239,.25),rgba(16,185,129,.25))]" />
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight text-center"
        >
          Get in{" "}
          <span className="bg-gradient-to-r from-emerald-500 via-sky-500 to-fuchsia-500 bg-clip-text text-transparent">
            Touch
          </span>
        </motion.h1>
        <motion.p
          {...fx(0.12)}
          className="mt-5 max-w-2xl text-center text-lg md:text-xl text-gray-700 dark:text-gray-300"
        >
          Brief bhejo. KPI set karte hain. Results deliver karte hain.
        </motion.p>
      </section>

      {/* ---------- TRUST + QUICK ACTION BAR ---------- */}
      <section className="relative -mt-16 pb-6">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div {...fx(0.05)} className="grid gap-4 md:grid-cols-3">
            <QuickAction
              icon={<MessageCircle />}
              title="WhatsApp"
              desc="Fastest response"
              href="https://wa.me/15552345678"
            />
            <QuickAction
              icon={<Phone />}
              title="Call us"
              desc="Mon–Fri, 10am–7pm"
              href="tel:+15552345678"
            />
            <QuickAction
              icon={<Mail />}
              title="Email"
              desc="hello@youragency.com"
              href="mailto:hello@youragency.com"
            />
          </motion.div>

          <motion.div {...fx(0.08)} className="mt-6 grid gap-4 sm:grid-cols-3">
            <Stat label="Ad Spend Managed" value="$12M+" />
            <Stat label="Avg. SEO Growth (6m)" value="+168%" />
            <Stat label="Clients Retained" value="92%" />
          </motion.div>
        </div>
      </section>

      {/* ---------- MAIN GRID: STICKY FORM + INFO ---------- */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid gap-10 lg:grid-cols-[1.1fr,0.9fr] items-start relative isolate">
          {/* Sticky Lead Form (raised z-index) */}
          <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            {...fx(0.06)}
            className="relative rounded-3xl p-[1px] lg:sticky lg:top-24 lg:z-20"
            style={{
              background:
                "linear-gradient(90deg, rgba(16,185,129,.45), rgba(14,165,233,.45), rgba(217,70,239,.45))",
            }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10 rounded-3xl"
              style={{
                WebkitMaskImage: maskImage as any,
                maskImage: maskImage as any,
                background:
                  "linear-gradient(90deg, rgba(16,185,129,.35), rgba(14,165,233,.35), rgba(217,70,239,.35))",
              }}
            />
            <div className="rounded-3xl bg-white/85 dark:bg-gray-900/65 backdrop-blur-xl ring-1 ring-gray-200/70 dark:ring-gray-800/70">
              <div className="p-6 md:p-10">
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                  <Shield className="h-5 w-5" />
                  <p className="text-sm">No spam. NDA on request.</p>
                </div>
                <h2 className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight">
                  Start your growth project
                </h2>

                <form onSubmit={onSubmit} className="mt-8 grid gap-5">
                  <FloatingField
                    label="Full name"
                    name="name"
                    autoComplete="name"
                  />
                  <div className="grid gap-5 md:grid-cols-2">
                    <FloatingField
                      label="Work email"
                      name="email"
                      type="email"
                      autoComplete="email"
                    />
                    <FloatingField
                      label="Phone/WhatsApp"
                      name="phone"
                      autoComplete="tel"
                    />
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <SelectField
                      label="Budget"
                      name="budget"
                      required
                      options={[
                        "$1k–$5k",
                        "$5k–$15k",
                        "$15k–$50k",
                        "$50k+",
                      ]}
                    />
                    <SelectField
                      label="Timeline"
                      name="timeline"
                      options={[
                        "ASAP",
                        "2–4 weeks",
                        "1–3 months",
                        "Exploring",
                      ]}
                    />
                  </div>

                  <div>
                    <span className="block text-sm font-medium mb-2">
                      Services interested
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "SEO",
                        "Paid Ads",
                        "Social",
                        "CRO",
                        "Web Dev",
                        "Content",
                      ].map((tag) => (
                        <label key={tag} className="cursor-pointer">
                          <input
                            type="checkbox"
                            name="services"
                            value={tag}
                            className="peer sr-only"
                          />
                          <span className="inline-flex items-center rounded-full px-3 py-1 text-sm ring-1 ring-gray-300/70 dark:ring-gray-700/70 peer-checked:bg-emerald-600 peer-checked:text-white transition">
                            {tag}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <FloatingTextarea
                    label="Project brief"
                    name="message"
                    rows={5}
                    placeholder="Goals, KPIs, target markets, URLs…"
                  />

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      By submitting, you agree to our{" "}
                      <a href="/privacy" className="underline hover:no-underline">
                        Privacy Policy
                      </a>
                      .
                    </p>
                    <motion.button
                      type="submit"
                      whileHover={{ x: 3 }}
                      whileTap={{ scale: 0.97 }}
                      disabled={loading}
                      className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-2.5 font-semibold text-white shadow hover:bg-emerald-700 disabled:opacity-60"
                    >
                      {loading ? "Sending…" : "Get proposal"}{" "}
                      <ArrowRight size={16} />
                    </motion.button>
                  </div>

                  {sent && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 px-4 py-3 text-emerald-700 dark:text-emerald-300"
                    >
                      <CheckCircle size={18} />
                      Thanks! We’ll reach out shortly.
                    </motion.div>
                  )}
                </form>
              </div>
            </div>
          </motion.div>

          {/* Right column (kept below the sticky form) */}
          <div className="space-y-8 relative z-10">
            {/* Social proof / badges */}
            <motion.div
              {...fx(0.08)}
              className="rounded-2xl bg-white/70 dark:bg-gray-900/60 ring-1 ring-gray-200/70 dark:ring-gray-800/70 backdrop-blur p-6"
            >
              <div className="flex items-center gap-2 text-amber-600">
                <Trophy className="h-5 w-5" />
                <p className="font-semibold">Trusted by 120+ brands</p>
              </div>
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 opacity-90">
                {["/logos/1.svg", "/logos/2.svg", "/logos/3.svg", "/logos/4.svg"].map(
                  (_, i) => (
                    <div
                      key={i}
                      className="h-10 rounded-md bg-gray-100 dark:bg-gray-800 grid place-items-center text-xs text-gray-500"
                    >
                      Logo
                    </div>
                  )
                )}
              </div>
            </motion.div>

            {/* Contact cards */}
            <motion.div {...fx(0.1)} className="grid gap-4 sm:grid-cols-2">
              <InfoCard
                icon={<Mail />}
                title="Email"
                value="hello@youragency.com"
                href="mailto:hello@youragency.com"
              />
              <InfoCard
                icon={<Phone />}
                title="Phone"
                value="+1 (555) 234-5678"
                href="tel:+15552345678"
              />
              <InfoCard
                icon={<MapPin />}
                title="Offices"
                value="NYC · Bengaluru (Remote-first)"
                href="https://maps.google.com"
                target="_blank"
              />
              <InfoCard
                icon={<Clock />}
                title="Hours"
                value="Mon–Fri · 10:00–19:00 IST"
              />
            </motion.div>

            {/* Map with overlay card */}
            <motion.div
              {...fx(0.12)}
              className="relative overflow-hidden rounded-3xl ring-1 ring-gray-200/70 dark:ring-gray-800/70 shadow-lg"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.849172350793!2d-74.00601528459348!3d40.712775979330204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQyJzQ2LjAiTiA3NMKwMDAnMjAuMCJX!5e0!3m2!1sen!2sus!4v1678381290480!5m2!1sen!2sus"
                width="100%"
                height="420"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background/80 to-transparent"></div>

              {/* Floating CTA card */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                className="absolute left-6 bottom-6 right-6 md:left-8 md:bottom-8 md:right-auto"
              >
                <div className="max-w-md rounded-2xl bg-white/90 dark:bg-gray-900/80 backdrop-blur ring-1 ring-gray-200/70 dark:ring-gray-800/70 p-4 md:p-5">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 rounded-lg p-2 ring-1 ring-gray-200/70 dark:ring-gray-800/70 bg-white/60 dark:bg-gray-900/60">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold">Prefer WhatsApp?</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Send your brief & links—team replies fast.
                      </p>
                      <a
                        href="https://wa.me/15552345678"
                        className="mt-2 inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-emerald-700"
                      >
                        Chat on WhatsApp <ArrowRight size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ---------- BOTTOM CTA STRIP ---------- */}
      <section className="relative py-16">
        <div
          className="pointer-events-none absolute inset-0 -z-10 mx-auto max-w-5xl blur-3xl opacity-40"
          style={{
            background:
              "radial-gradient(500px 220px at 50% 50%, rgba(16,185,129,.25), transparent 60%)",
          }}
        />
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            {...fx(0.06)}
            className="relative overflow-hidden rounded-3xl p-[1px]"
            style={{
              background:
                "linear-gradient(90deg, rgba(16,185,129,.45), rgba(14,165,233,.45), rgba(217,70,239,.45))",
            }}
          >
            <div className="rounded-3xl bg-white/80 dark:bg-gray-900/60 backdrop-blur-xl ring-1 ring-gray-200/70 dark:ring-gray-800/70">
              <div className="px-8 py-12 md:px-14 md:py-14 text-center">
                <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                  Book a strategy call (15 min)
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  No pressure. Pure value. Actionable next steps.
                </p>
                <a
                  href="/book"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-600 via-sky-600 to-fuchsia-600 px-7 py-3 font-semibold text-white shadow-lg"
                >
                  See calendar <ArrowRight size={18} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

/* -------------------- UI Helpers -------------------- */

function FloatingField({
  label,
  name,
  type = "text",
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <label className="relative block">
      <input
        name={name}
        type={type}
        autoComplete={autoComplete}
        required
        placeholder=" "
        className="peer w-full rounded-xl bg-transparent px-4 py-3 ring-1 ring-gray-300/70 dark:ring-gray-700/70 focus:outline-none focus:ring-2 focus:ring-emerald-500"
      />
      <span
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 bg-background px-1 text-sm text-gray-500 transition-all
        peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-gray-500
        peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-emerald-600"
      >
        {label}
      </span>
    </label>
  );
}

function FloatingTextarea({
  label,
  name,
  rows = 5,
  placeholder,
}: {
  label: string;
  name: string;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <label className="relative block">
      <textarea
        name={name}
        required
        rows={rows}
        placeholder=" "
        className="peer w-full rounded-xl bg-transparent px-4 py-3 ring-1 ring-gray-300/70 dark:ring-gray-700/70 focus:outline-none focus:ring-2 focus:ring-emerald-500"
      />
      <span
        className="pointer-events-none absolute left-3 top-3 bg-background px-1 text-sm text-gray-500 transition-all
        peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-gray-500
        peer-focus:top-0 peer-focus:translate-y-0 peer-focus:text-emerald-600"
      >
        {label}
      </span>
      {placeholder ? <span className="sr-only">{placeholder}</span> : null}
    </label>
  );
}

function SelectField({
  label,
  name,
  options,
  required,
}: {
  label: string;
  name: string;
  options: string[];
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="block text-sm font-medium mb-2">{label}</span>
      <select
        name={name}
        required={required}
        defaultValue=""
        className="w-full rounded-xl bg-transparent px-4 py-3 ring-1 ring-gray-300/70 dark:ring-gray-700/70 focus:outline-none focus:ring-2 focus:ring-emerald-500"
      >
        <option value="" disabled className="bg-white dark:bg-gray-900">
          Select
        </option>
        {options.map((o) => (
          <option key={o} className="bg-white dark:bg-gray-900">
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

function InfoCard({
  icon,
  title,
  value,
  href,
  target,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  href?: string;
  target?: "_blank";
}) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="rounded-2xl bg-white/70 dark:bg-gray-900/60 backdrop-blur ring-1 ring-gray-200/70 dark:ring-gray-800/70 p-5"
    >
      {href ? (
        <a href={href} target={target} className="flex items-start gap-3">
          <span className="p-2 rounded-lg bg-white/60 dark:bg-gray-900/60 ring-1 ring-gray-200/70 dark:ring-gray-800/70">
            {icon}
          </span>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
            <p className="font-medium">{value}</p>
          </div>
        </a>
      ) : (
        <div className="flex items-start gap-3">
          <span className="p-2 rounded-lg bg-white/60 dark:bg-gray-900/60 ring-1 ring-gray-200/70 dark:ring-gray-800/70">
            {icon}
          </span>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
            <p className="font-medium">{value}</p>
          </div>
        </div>
      )}
    </motion.div>
  );
}

function QuickAction({
  icon,
  title,
  desc,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="group relative rounded-2xl p-[1px] block"
      style={{
        background:
          "linear-gradient(90deg, rgba(16,185,129,.45), rgba(14,165,233,.45), rgba(217,70,239,.45))",
      }}
    >
      <div className="rounded-2xl bg-white/80 dark:bg-gray-900/60 backdrop-blur ring-1 ring-gray-200/70 dark:ring-gray-800/70 p-4">
        <div className="flex items-center gap-3">
          <span className="p-2 rounded-lg bg-white/60 dark:bg-gray-900/60 ring-1 ring-gray-200/70 dark:ring-gray-800/70">
            <div className="h-5 w-5">{icon}</div>
          </span>
          <div>
            <p className="font-semibold">{title}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{desc}</p>
          </div>
        </div>
      </div>
    </a>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white/70 dark:bg-gray-900/60 backdrop-blur ring-1 ring-gray-200/70 dark:ring-gray-800/70 p-5 text-center">
      <p className="text-2xl font-extrabold">{value}</p>
      <p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
    </div>
  );
}
