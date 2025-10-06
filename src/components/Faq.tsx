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
  title = "Frequently Asked Question",
  watermark = "Frequently Asked Question",
  illustrationSrc = "/images/faq/faq.png", // replace with your asset
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
    } catch {
      // no-op, keep UX simple
    }
  };

  return (
    <section className="relative overflow-hidden bg-white py-16 dark:bg-[#0b0f0e]">
      {/* Watermark */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-6 select-none text-center text-[clamp(40px,12vw,80px)] font-extrabold leading-none tracking-tight text-black/5 dark:text-white/5"
      >
        {watermark}
      </div>

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-start gap-10 px-6 md:grid-cols-2">
        {/* Heading */}
        <h2 className="md:col-span-2 -mt-2 text-center text-2xl font-extrabold tracking-tight text-black drop-shadow-[0_2px_0_rgba(0,0,0,0.25)] dark:text-white dark:drop-shadow-[0_2px_0_rgba(255,255,255,0.08)]">
          {title}
        </h2>

        {/* Left: Accordion list */}
        <div className="order-2 md:order-1 space-y-4">
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

        {/* Right: Illustration + Ask form */}
        <div className="order-1 md:order-2">
          {/* Illustration */}
          <div className="flex justify-center md:justify-end">
            <Image
              src={illustrationSrc}
              alt="FAQ illustration"
              width={320}
              height={260}
              className="h-auto w-[320px] object-contain"
              priority
            />
          </div>

          {/* Ask box */}
          <div className="mt-4 text-center">
            <h3 className="text-lg font-semibold text-black dark:text-white">Any Question?</h3>
            <p className="mt-1 text-sm text-gray-700 dark:text-white/70">
              You can ask anything you want to know about feedback
            </p>

            <form
              onSubmit={handleSubmit}
              className="mx-auto mt-4 flex max-w-md flex-col gap-3"
            >
              <label className="sr-only" htmlFor="ask-input">Let me know</label>
              <input
                id="ask-input"
                value={askText}
                onChange={(e) => setAskText(e.target.value)}
                placeholder="Enter here"
                className="rounded-md border border-black/10 bg-white px-3 py-2 text-sm text-black shadow-sm outline-none placeholder:text-gray-400 focus:border-black/30 focus:ring-2 focus:ring-green-800/20 dark:border-white/15 dark:bg-white/5 dark:text-white dark:placeholder:text-white/50 dark:focus:border-white/30"
              />
              <button
                type="submit"
                className="mx-auto inline-flex min-w-[120px] items-center justify-center rounded-full bg-[#245433] px-7 py-2 text-sm font-semibold text-white shadow-[0_2px_0_rgba(0,0,0,0.25)] transition-all hover:bg-[#1f4a2d] hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-700"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Single FAQ Row ---------- */
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
      className="group relative overflow-hidden rounded-md bg-white/90 shadow-sm ring-1 ring-black/5 backdrop-blur-sm transition dark:bg-white/5 dark:ring-white/10"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center gap-4 px-4 py-4 text-left"
      >
        {/* Number badge like screenshot */}
        <div className="grid h-10 w-14 place-items-center rounded-md bg-gray-100 text-sm font-bold text-gray-500 shadow-sm dark:bg-white/10 dark:text-white/60">
          {String(index + 1).padStart(2, "0")}
        </div>

        <div className="flex-1 text-[15px] font-semibold text-black dark:text-white">
          {q}
        </div>

        <div className="shrink-0 text-black/70 transition group-hover:scale-110 dark:text-white/80">
          {open ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <div className="px-4 pb-4 pt-0 text-sm leading-relaxed text-gray-700 dark:text-white/75">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
