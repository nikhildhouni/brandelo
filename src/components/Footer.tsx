"use client";

import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  ChevronDown,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
} from "lucide-react";
import { useState } from "react";

type Props = {
  email?: string;
  phone?: string;
  address?: string[];
  hours?: string[];
  gst?: string;
  legal?: { label: string; href: string }[];
  socials?: { type: "facebook" | "instagram" | "twitter" | "linkedin"; href: string }[];
};

export default function ContactFooterWDB({
  email = "info@xyzagency.com",
  phone = "+91 98997 93757",
  address = ["UP, Noida", "Sector 63"],
  hours = ["Office hours", "Monday–Friday", "10AM–7PM"],
  gst = "09QZUPES6134H1ZL",
  legal = [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Term & Condition", href: "/terms" },
    { label: "Refund Policy", href: "/refund" },
    { label: "why us?", href: "/why-us" },
    { label: "Carrers", href: "/careers" },
  ],
  socials = [
    { type: "facebook", href: "https://facebook.com/" },
    { type: "instagram", href: "https://instagram.com/" },
    { type: "twitter", href: "https://x.com/" },
    { type: "linkedin", href: "https://linkedin.com/" },
  ],
}: Props) {
  const [service, setService] = useState("");

  return (
    <footer className="mt-24 bg-[#ececeb] text-[#0e0e0e] dark:bg-[#0b0f0e] dark:text-white/90">
      {/* Top block */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Left: Title + meta */}
          <div className="md:col-span-5">
            <h2 className="text-[clamp(36px,10vw,72px)] font-extrabold leading-none tracking-tight drop-shadow-[0_3px_0_rgba(0,0,0,0.25)] dark:drop-shadow-[0_3px_0_rgba(255,255,255,0.08)]">
              Get in Touch
            </h2>

            <div className="mt-6 grid grid-cols-2 gap-8">
              <div className="transition-transform duration-300 hover:-translate-y-0.5">
                <div className="mb-2 text-[13px] uppercase tracking-wide text-black/70 dark:text-white/60">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 opacity-70" /> UP, Noida
                  </span>
                </div>
                <div className="text-[15px] leading-5 whitespace-pre-line text-black/90 dark:text-white/80">
                  {address.join("\n")}
                </div>
              </div>

              <div className="relative pl-6 transition-transform duration-300 hover:-translate-y-0.5">
                {/* vertical divider like the screenshot */}
                <span className="absolute left-0 top-0 h-full w-px bg-black/20 dark:bg-white/15" />
                <div className="text-[13px] text-black/80 dark:text-white/70">
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 opacity-70" /> {hours[0]}
                  </span>
                </div>
                <div className="text-[13px] text-black/80 dark:text-white/70">{hours[1]}</div>
                <div className="text-[13px] text-black/80 dark:text-white/70">{hours[2]}</div>
              </div>
            </div>
          </div>

          {/* Right: simple underline form */}
          <div className="md:col-span-7">
            <form
              className="grid grid-cols-1 gap-6"
              onSubmit={(e) => {
                e.preventDefault();
                // hook up your submit logic here (email, API, etc.)
              }}
            >
              {/* Name split first/last */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Label> Name </Label>
                <div className="hidden sm:block" />{/* spacer to align like screenshot */}
                <UnderlineInput placeholder="First Name" autoComplete="given-name" />
                <UnderlineInput placeholder="Last Name" autoComplete="family-name" />
              </div>

              {/* Services select (fake underline style) */}
              <div>
                <Label> Services </Label>
                <div className="relative">
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full appearance-none bg-transparent py-1.5 text-[15px] outline-none border-b border-black/60 dark:border-white/30 focus:border-black dark:focus:border-white transition-colors duration-300"
                  >
                    <option value="" disabled>
                      Select a service
                    </option>
                    <option>SEO</option>
                    <option>Social Media Marketing</option>
                    <option>PPC</option>
                    <option>Content Marketing</option>
                    <option>Email Marketing</option>
                    <option>Website Development</option>
                    <option>App Development</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-0 top-1.5 h-4 w-4 text-black/70 dark:text-white/70 transition-transform duration-300 peer-focus-within:rotate-180" />
                </div>
              </div>

              {/* Number */}
              <div>
                <Label> Number </Label>
                <UnderlineInput placeholder="+91" inputMode="tel" autoComplete="tel" />
              </div>

              {/* Email */}
              <div>
                <Label> Email </Label>
                <UnderlineInput placeholder="@gmail.com" type="email" autoComplete="email" />
              </div>

              {/* Submit small pill */}
              <div>
                <button
                  type="submit"
                  className="rounded-full bg-[#2e5b3f] px-5 py-1.5 text-sm font-semibold text-white shadow-[0_2px_0_rgba(0,0,0,0.25)] hover:bg-[#274e36] active:scale-[0.98] transition-transform duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#2e5b3f] focus-visible:ring-offset-[#ececeb] dark:focus-visible:ring-offset-[#0b0f0e]"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Email + phone row */}
        <div className="mt-10 grid grid-cols-1 items-center gap-6 sm:grid-cols-2">
          <Link
            href={`mailto:${email}`}
            className="group inline-flex items-center gap-3 text-xl font-extrabold sm:text-2xl transition-transform duration-200 hover:-translate-y-0.5"
          >
            <Mail className="h-5 w-5 text-[#2e5b3f] group-hover:scale-110 transition-transform duration-200" />
            <span className="text-black dark:text-white">{email}</span>
          </Link>

          <div className="flex items-center justify-start gap-3 sm:justify-end">
            <Phone className="h-5 w-5 text-[#2e5b3f]" />
            <span className="text-xl font-extrabold sm:text-2xl text-black dark:text-white">
              {phone}
            </span>
          </div>
        </div>

        {/* Social icons row */}
        <div className="mt-6 flex items-center justify-end gap-3">
          {socials.map((s) => (
            <Social key={s.type} type={s.type} href={s.href} />
          ))}
        </div>
      </div>

      {/* Bottom legal bar */}
      <div className="border-t border-black/10 bg-[#0f1713] text-white/80 dark:border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-5 text-[13px]">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            {/* links */}
            <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
              {legal.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  className="hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-sm transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            {/* GST + © */}
            <div className="text-center">
              <div className="mb-1">
                GST NO: <span className="font-semibold text-white">{gst}</span>
              </div>
              <div>
                ©{new Date().getFullYear()} XYZ Agency &nbsp; | &nbsp; All Rights Reserved
              </div>
            </div>

            {/* spacer to balance layout */}
            <div className="hidden w-[140px] sm:block" />
          </div> 
        </div>
      </div>
    </footer>
  );
}

/* ——— small bits ——— */
function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-1 text-[18px] font-semibold text-black dark:text-white">
      {children}
    </div>
  );
}

function UnderlineInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full border-0 border-b border-black/60 bg-transparent py-1.5 text-[15px] outline-none placeholder:text-black/40 focus:border-black transition-colors duration-300 dark:border-white/30 dark:placeholder:text-white/50 dark:text-white dark:focus:border-white"
    />
  );
}

function Social({
  type,
  href,
}: {
  type: "facebook" | "instagram" | "twitter" | "linkedin";
  href: string;
}) {
  const Icon = { facebook: Facebook, instagram: Instagram, twitter: Twitter, linkedin: Linkedin }[
    type
  ];
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={type}
      className={[
        // light theme base
        "grid h-9 w-9 place-items-center rounded-full border transition-all duration-200",
        "border-slate-900/15 bg-slate-900/[0.04] text-slate-900 hover:bg-slate-900/[0.07] hover:-translate-y-0.5 active:translate-y-0",
        // dark theme overrides
        "dark:border-white/20 dark:bg-white/10 dark:text-white dark:hover:bg-white/20",
        // focus ring
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black/30 focus-visible:ring-offset-[#ececeb] dark:focus-visible:ring-white/40 dark:focus-visible:ring-offset-[#0b0f0e]",
        // glossy subtle inner highlight for modern look
        "relative overflow-hidden",
      ].join(" ")}
    >
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 transition-opacity duration-200 hover:opacity-100 dark:from-white/15" />
      <Icon className="h-4.5 w-4.5" />
    </Link>
  );
}
