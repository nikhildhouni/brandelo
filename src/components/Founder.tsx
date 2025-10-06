"use client";

import Image from "next/image";
import Link from "next/link";
import { Instagram, Facebook, Linkedin } from "lucide-react";
import { motion } from "framer-motion";

type Social = { href: string; type: "instagram" | "facebook" | "linkedin" };
type Props = {
  name?: string;
  title?: string;
  company?: string;
  imageSrc?: string;
  socials?: Social[];
};

export default function FounderSection({
  name = "XYZ",
  title = "Founder, Head of Marketing & Sales",
  company = "XYZ Agency",
  imageSrc = "/images/founder/founder.png", // replace with your asset
  socials = [
    { type: "instagram", href: "https://instagram.com/" },
    { type: "facebook", href: "https://facebook.com/" },
    { type: "linkedin", href: "https://linkedin.com/" },
  ],
}: Props) {
  // simple variants for staggered entranceð
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section className="bg-white dark:bg-[#0b0f0e] py-16">
      <motion.div
        className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-2"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
      >
        {/* Left: Founder Illustration + Socials */}
        <motion.div
          variants={fadeUp}
          className="relative flex justify-center md:justify-start"
        >
          <motion.div
            className="relative inline-block will-change-transform"
            whileHover={{ rotate: -0.3, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            {/* Green frame */}
            <motion.div
              aria-hidden
              className="absolute -bottom-4 -right-4 z-0 h-full w-full rounded-lg border-4 border-green-800 dark:border-green-700"
              initial={{ opacity: 0, x: 20, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            />
            {/* Image card */}
            <motion.div
              className="relative z-10 overflow-hidden rounded-lg bg-white shadow-lg dark:bg-white/5"
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <Image
                src={imageSrc}
                alt={`${name} portrait`}
                width={380}
                height={380}
                priority
                className="h-auto w-[380px] object-contain"
              />
              {/* soft top highlight */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white/40 to-transparent dark:from-white/10" />
            </motion.div>

            {/* Socials vertical */}
            <motion.div
              className="absolute -left-14 top-6 flex flex-col gap-3"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {socials.map((s) => (
                <SocialIcon key={s.type} {...s} />
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Right: Text Content */}
        <motion.div variants={fadeUp} className="text-center md:text-left">
          {/* Badge */}
          <motion.div
            className="inline-flex items-center rounded bg-green-800 px-4 py-2 text-white shadow-sm dark:bg-green-700"
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 250, damping: 18 }}
          >
            <span className="relative">
              <span className="absolute -inset-0.5 rounded bg-white/10 blur-sm dark:bg-white/5" aria-hidden />
              <span className="relative z-10 font-semibold">Meet the Founder</span>
            </span>
          </motion.div>

          {/* Name */}
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-black dark:text-white">
            {name}
          </h2>

          {/* Underline accent */}
          <div className="mx-auto mt-1 h-[3px] w-28 rounded bg-black/80 dark:bg-white/80 md:mx-0" />

          {/* Title */}
          <p className="mt-3 text-lg text-gray-700 dark:text-white/80">
            {title} at <span className="font-semibold">{company}</span>
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ——— Social icon button with theme-aware contrast + hover motion ——— */
function SocialIcon({ href, type }: Social) {
  const Icon =
    type === "instagram" ? Instagram : type === "facebook" ? Facebook : Linkedin;

  return (
    <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.96 }}>
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={type}
        className={[
          "grid h-10 w-10 place-items-center rounded bg-green-800 text-white transition-colors",
          "hover:bg-green-700 active:bg-green-900",
          "dark:bg-green-700 dark:hover:bg-green-600 dark:active:bg-green-800",
          // inner glossy highlight
          "relative overflow-hidden",
          // focus ring
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-green-700 dark:focus-visible:ring-green-400",
        ].join(" ")}
      >
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100 dark:from-white/10" />
        <Icon className="h-[18px] w-[18px]" />
      </Link>
    </motion.div>
  );
}
