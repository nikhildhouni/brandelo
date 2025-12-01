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
import { useState, useMemo } from "react";
import { createClient } from "@/lib/supabase/client"; // 👈 ADD THIS

type Props = {
  email?: string;
  phone?: string;
  address?: string[];
  hours?: string[];
  gst?: string;
  legal?: { label: string; href: string }[];
  socials?: {
    type: "facebook" | "instagram" | "twitter" | "linkedin";
    href: string;
  }[];
};

export default function ContactFooterWDB({
  email = "info@brandelo.com",
  phone = "+91 98997 93757",
  address = ["UP, Noida", "Sector 63"],
  hours = ["Office hours", "Monday–Friday", "10AM–7PM"],
  gst = "09QZUPES6134H1ZL",
  legal = [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Refund Policy", href: "/refund" },
    { label: "Why Us?", href: "/why-us" },
    { label: "Careers", href: "/careers" },
  ],
  socials = [
    { type: "facebook", href: "https://facebook.com/" },
    { type: "instagram", href: "https://instagram.com/" },
    { type: "twitter", href: "https://x.com/" },
    { type: "linkedin", href: "https://linkedin.com/" },
  ],
}: Props) {
  // 👇 Supabase client
  const supabase = useMemo(() => createClient(), []);

  // 🔹 form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [service, setService] = useState("");
  const [number, setNumber] = useState("");
  const [emailInput, setEmailInput] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSuccessMsg(null);
    setErrorMsg(null);

    if (!firstName.trim() || !number.trim() || !service) {
      setErrorMsg("Please fill name, service and phone number.");
      return;
    }

    try {
      setSubmitting(true);

      const payload = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        service,
        phone: number.trim(),
        email: emailInput.trim(),
        source: "website_footer", // optional tracking
      };

      const fullName = `${firstName} ${lastName}`.trim();

      const { error } = await supabase.from("form_submissions").insert({
        form_key: "simple_service",
        form_title: "Service inquiry",
        status: "new",

        first_name: firstName.trim() || null,
        last_name: lastName.trim() || null,
        full_name: fullName || null,
        email: emailInput.trim() || null,
        phone: number.trim() || null,
        service,
        payload, // raw JSON
      });

      if (error) {
        console.error(error);
        setErrorMsg("Something went wrong. Please try again.");
        return;
      }

      // reset form
      setFirstName("");
      setLastName("");
      setService("");
      setNumber("");
      setEmailInput("");

      setSuccessMsg("Thanks! We’ve received your details.");
    } catch (err) {
      console.error(err);
      setErrorMsg("Unexpected error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <footer className="relative isolation-isolate overflow-hidden dark bg-[#0b1020] text-white">
      {/* Background: aurora + grid + slow conic glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_10%,rgba(99,102,241,0.22),transparent_50%),radial-gradient(70%_50%_at_80%_20%,rgba(34,197,94,0.20),transparent_50%),#0b1020]" />
        <div className="absolute inset-0 opacity-40 [mask-image:radial-gradient(70%_60%_at_50%_45%,black,transparent)]">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="grid-footer"
                width="32"
                height="32"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M32 0H0V32"
                  fill="none"
                  stroke="white"
                  strokeOpacity="0.06"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-footer)" />
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
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>

      {/* Top block */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:py-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Left: Title + meta */}
          <div className="md:col-span-5">
            <h2 className="text-[clamp(36px,9vw,72px)] font-extrabold leading-none tracking-tight">
              Get in Touch
            </h2>

            <div className="mt-6 grid grid-cols-2 gap-8">
              <div className="transition-transform duration-300 hover:-translate-y-0.5">
                <div className="mb-2 text-[13px] uppercase tracking-wide text-white/70">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 opacity-70" /> Location
                  </span>
                </div>
                <div className="whitespace-pre-line text-[15px] leading-5 text-white/85">
                  {address.join("\n")}
                </div>
              </div>

              <div className="relative pl-6 transition-transform duration-300 hover:-translate-y-0.5">
                <span className="absolute left-0 top-0 h-full w-px bg-white/15" />
                <div className="text-[13px] text-white/70">
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 opacity-70" /> {hours[0]}
                  </span>
                </div>
                <div className="text-[13px] text-white/70">{hours[1]}</div>
                <div className="text-[13px] text-white/70">{hours[2]}</div>
              </div>
            </div>
          </div>

          {/* Right: glassy underline form */}
          <div className="md:col-span-7">
            <form
              className="grid grid-cols-1 gap-6 rounded-3xl border border-white/15 bg-white/5 p-6 backdrop-blur-xl shadow-2xl"
              onSubmit={handleSubmit} // 👈 HOOKED
            >
              {/* Name split first/last */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Label>Name</Label>
                <div className="hidden sm:block" />
                <UnderlineInput
                  placeholder="First Name"
                  autoComplete="given-name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <UnderlineInput
                  placeholder="Last Name"
                  autoComplete="family-name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>

              {/* Services select */}
              <div>
                <Label>Services</Label>
                <div className="relative">
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="peer w-full appearance-none bg-transparent py-1.5 text-[15px] outline-none border-b border-white/30 focus:border-white transition-colors duration-300"
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
                  <ChevronDown className="pointer-events-none absolute right-0 top-1.5 h-4 w-4 text-white/70 transition-transform duration-300 peer-focus:rotate-180" />
                </div>
              </div>

              {/* Number */}
              <div>
                <Label>Number</Label>
                <UnderlineInput
                  placeholder="+91"
                  inputMode="tel"
                  autoComplete="tel"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                />
              </div>

              {/* Email */}
              <div>
                <Label>Email</Label>
                <UnderlineInput
                  placeholder="@gmail.com"
                  type="email"
                  autoComplete="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                />
              </div>

              {/* messages */}
              {(errorMsg || successMsg) && (
                <div className="text-[12px]">
                  {errorMsg && (
                    <p className="text-red-300">{errorMsg}</p>
                  )}
                  {successMsg && !errorMsg && (
                    <p className="text-emerald-300">{successMsg}</p>
                  )}
                </div>
              )}

              {/* Submit pill */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 px-5 py-2 text-sm font-semibold text-black shadow-[0_8px_30px_rgba(56,189,248,.35)] hover:opacity-95 active:scale-[0.98] transition disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Email + phone row */}
        <div className="mt-12 grid grid-cols-1 items-center gap-6 sm:grid-cols-2">
          <Link
            href={`mailto:${email}`}
            className="group inline-flex items-center gap-3 text-xl font-extrabold sm:text-2xl transition-transform duration-200 hover:-translate-y-0.5"
          >
            <Mail className="h-5 w-5 text-emerald-300 group-hover:scale-110 transition-transform duration-200" />
            <span>{email}</span>
          </Link>

        <div className="flex items-center justify-start gap-3 sm:justify-end">
            <Phone className="h-5 w-5 text-emerald-300" />
            <span className="text-xl font-extrabold sm:text-2xl">{phone}</span>
          </div>
        </div>

        {/* Social icons row */}
        <div className="mt-6 flex items-center justify-end gap-3">
          {socials.map((s) => (
            <Social key={s.type} type={s.type} href={s.href} />
          ))}
        </div>
      </div>

      {/* Bottom legal bar — glassy ribbon */}
      <div className="relative border-t border-white/10 bg-white/5 backdrop-blur-xl">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/10 to-transparent" />
        <div className="mx-auto max-w-7xl px-4 py-5 text-[13px]">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
              {legal.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  className="text-white/80 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-sm transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            <div className="text-center text-white/80">
              <div className="mb-1">
                GST NO:{" "}
                <span className="font-semibold text-white">{gst}</span>
              </div>
              <div>
                ©{new Date().getFullYear()} Brandelo &nbsp; | &nbsp; All
                Rights Reserved
              </div>
            </div>

            <div className="hidden w-[140px] sm:block" />
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ——— bits ——— */
function Label({ children }: { children: React.ReactNode }) {
  return <div className="mb-1 text-[18px] font-semibold">{children}</div>;
}

function UnderlineInput(
  props: React.InputHTMLAttributes<HTMLInputElement>
) {
  return (
    <input
      {...props}
      className="w-full border-0 border-b border-white/30 bg-transparent py-1.5 text-[15px] text-white outline-none placeholder:text-white/50 focus:border-white transition-colors duration-300"
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
  const Icon =
    { facebook: Facebook, instagram: Instagram, twitter: Twitter, linkedin: Linkedin }[
      type
    ];

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={type}
      className={[
        "relative grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur transition-all duration-200",
        "hover:bg-white/15 hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/60",
        "overflow-hidden group",
      ].join(" ")}
    >
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
      <Icon className="h-4.5 w-4.5" />
    </Link>
  );
}
