"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type FAQ = { q: string; a: string };
type Props = {
  title?: string;
  watermark?: string;
  faqs?: FAQ[];
  illustrationSrc?: string;
  onAsk?: (text: string) => Promise<void> | void;
};

export default function FAQSectionWDB({
  title = "Frequently Asked Questions",
  watermark = "FAQs",
  illustrationSrc = "/images/faq/faq.png",
  faqs = [
    { q: "What is Web Digital Bazaar?", a: "We’re a full-stack digital growth studio offering SEO, SMM, Ads, and dev." },
    { q: "How soon can we start?", a: "Usually within a week after scoping and onboarding." },
    { q: "Do you have monthly plans?", a: "Yes—tiered retainers for different growth stages." },
    { q: "Can you work with my in-house team?", a: "Absolutely. We integrate with your tools and workflows." },
    { q: "What results can I expect?", a: "Clear KPIs, transparent reporting, and compounding growth." },
  ],
  onAsk,
}: Props) {
  const [open, setOpen] = useState<number | null>(0);
  const [askText, setAskText] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!askText.trim()) return;
    try {
      await onAsk?.(askText.trim());
      setAskText("");
    } catch {}
  };

  return (
    <section className="relative overflow-hidden py-24 bg-gradient-to-b from-white via-white to-gray-50 dark:from-[#0b1020] dark:via-[#0b1020] dark:to-black">
      {/* Gradient Glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_10%,rgba(59,130,246,0.1),transparent_50%),radial-gradient(60%_50%_at_80%_20%,rgba(34,197,94,0.1),transparent_50%)] dark:bg-[radial-gradient(80%_60%_at_50%_10%,rgba(59,130,246,0.18),transparent_50%),radial-gradient(60%_50%_at_80%_20%,rgba(168,85,247,0.18),transparent_50%)]" />
      </div>

      {/* Watermark */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-10 select-none text-center text-[clamp(40px,12vw,80px)] font-extrabold leading-none tracking-tight text-black/5 dark:text-white/5"
      >
        {watermark}
      </div>

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-start gap-14 px-6 md:grid-cols-2">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="md:col-span-2 text-center text-4xl font-semibold text-gray-900 dark:text-white sm:text-5xl"
        >
          {title}
        </motion.h2>

        {/* Left: FAQs */}
        <div className="order-2 space-y-4 md:order-1">
          {faqs.map((item, i) => (
            <FAQItem
              key={i}
              index={i}
              open={open === i}
              onToggle={() => setOpen(open === i ? null : i)}
              {...item}
            />
          ))}
        </div>

        {/* Right: Illustration + Ask */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="order-1 md:order-2"
        >
          <div className="flex justify-center md:justify-end">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="relative w-[320px] rounded-[2rem] border border-black/10 bg-white/60 shadow-xl backdrop-blur-xl dark:border-white/15 dark:bg-white/10"
            >
              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-tr from-emerald-400/10 via-cyan-400/10 to-fuchsia-400/10 blur-2xl" />
              <Image
                src={illustrationSrc}
                alt="FAQ illustration"
                width={320}
                height={260}
                className="relative z-10 h-auto w-full rounded-[1.8rem] object-contain"
                priority
              />
            </motion.div>
          </div>

          <div className="mt-8 rounded-2xl border border-black/10 bg-white/70 p-6 text-center shadow-xl backdrop-blur-xl dark:border-white/15 dark:bg-white/10">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Still have a question?
            </h3>
            <p className="mt-1 text-sm text-gray-600 dark:text-white/70">
              Ask anything — we’ll reply soon!
            </p>

            <form
              onSubmit={handleSubmit}
              className="mx-auto mt-4 flex max-w-md flex-col gap-3"
            >
              <input
                value={askText}
                onChange={(e) => setAskText(e.target.value)}
                placeholder="Type your question..."
                className="rounded-xl border border-black/10 bg-white/80 px-3 py-2 text-sm text-gray-900 shadow-sm outline-none placeholder:text-gray-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200 dark:border-white/15 dark:bg-white/10 dark:text-white dark:placeholder:text-white/50"
              />
              <motion.button
                type="submit"
                whileTap={{ scale: 0.97 }}
                whileHover={{ scale: 1.03 }}
                className="mx-auto inline-flex min-w-[140px] items-center justify-center rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 px-6 py-2 text-sm font-semibold text-black shadow-[0_8px_30px_rgba(56,189,248,.3)] hover:opacity-90"
              >
                Send
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Single FAQ Item ---------- */
function FAQItem({
  index,
  q,
  a,
  open,
  onToggle,
}: {
  index: number;
  q: string;
  a: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      layout
      className="group relative overflow-hidden rounded-2xl border border-black/10 bg-white/70 shadow-md backdrop-blur-xl transition dark:border-white/15 dark:bg-white/10"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center gap-4 px-5 py-4 text-left"
      >
        <div className="grid h-10 w-14 place-items-center rounded-xl border border-black/10 bg-white/60 text-sm font-bold text-gray-500 dark:border-white/15 dark:bg-white/10 dark:text-white/70">
          {String(index + 1).padStart(2, "0")}
        </div>
        <div className="flex-1 text-base font-semibold text-gray-900 dark:text-white">
          {q}
        </div>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="text-gray-800 dark:text-white/80"
        >
          {open ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="faq-content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <div className="px-5 pb-5 text-sm leading-relaxed text-gray-700 dark:text-white/70">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
