"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Instagram, Facebook, Twitter } from "lucide-react";

type Item = { href: string; label: string };
const items: Item[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
];

export default function Navbar2D() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href);

  return (
    <header className="sticky top-0 z-50">
      {/* background aurora blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 left-1/3 h-72 w-72 rounded-full bg-gradient-to-tr from-emerald-400/30 via-sky-400/30 to-fuchsia-400/30 blur-3xl animate-slow-float" />
        <div className="absolute -bottom-24 right-1/4 h-80 w-80 rounded-full bg-gradient-to-tr from-amber-400/25 via-rose-400/25 to-indigo-400/25 blur-3xl animate-slower-float" />
      </div>

      {/* Top info strip */}
      <div className="hidden md:block bg-[#1f3b2c] text-white/90 text-[13px]">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-center justify-between py-2">
            <div className="flex flex-wrap gap-5">
              <Info icon="📍" text="Noida Sector 63 H-187" />
              <Info icon="✉️" text="info@xyzagency.com" href="mailto:info@xyzagency.com" />
              <Info icon="📞" text="+91 98997 83757" href="tel:+919899783757" />
            </div>
            <div className="flex items-center gap-3">
              <span className="font-medium tracking-wide">Follow us</span>
              <Social type="instagram" href="https://instagram.com/" />
              <Social type="facebook" href="https://facebook.com/" />
              <Social type="twitter" href="https://twitter.com/" />
            </div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <div className="bg-transparent px-3 py-3 backdrop-blur-sm">
        <nav className="mx-auto max-w-7xl">
          <div className="relative">
            <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r from-emerald-500 via-sky-500 to-fuchsia-500 opacity-80 blur-[6px] animate-hue" />
            <div className="rounded-2xl border border-white/10 bg-white/70 shadow-[0_10px_40px_rgba(16,24,40,.15)] backdrop-blur-xl dark:bg-white/10">
              <div className="flex h-[72px] items-center justify-between px-4 md:px-6">
                {/* Brand */}
                <Link href="/" className="group flex items-center gap-3">
                  <Logo2D />
                  <span className="text-lg font-semibold tracking-tight text-gray-800 transition-colors group-hover:text-emerald-700 dark:text-gray-100 dark:group-hover:text-emerald-300">
                    Xyz<span className="text-gray-500 dark:text-gray-300/70"> Agency</span>
                  </span>
                </Link>

                {/* Desktop links */}
                <div className="hidden lg:flex items-center gap-6">
                  {items.map((it) => (
                    <Link
                      key={it.href}
                      href={it.href}
                      className={`group relative text-sm font-medium transition-colors
                        ${
                          isActive(it.href)
                            ? "text-emerald-700 dark:text-emerald-300"
                            : "text-gray-700 hover:text-emerald-600 dark:text-gray-200 dark:hover:text-emerald-300"
                        }`}
                    >
                      {it.label}
                      <span
                        className={`pointer-events-none absolute left-0 -bottom-1 h-[2px] w-full origin-left scale-x-0 bg-gradient-to-r from-emerald-500 to-sky-500 transition-transform duration-300
                          ${isActive(it.href) ? "scale-x-100" : "group-hover:scale-x-100"}`}
                      />
                    </Link>
                  ))}
                </div>

                {/* Right actions: only CTA */}
                <div className="hidden md:flex items-center gap-2">
                  <Link href="/contact" className="cta-sheen">
                    <span>Contact us</span>
                  </Link>
                </div>

                {/* Burger on small screens */}
                <div className="flex items-center md:hidden">
                  <MobileToggle open={open} onToggle={() => setOpen((v) => !v)} />
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Mobile drawer */}
        <MobileMenu items={items} isActive={isActive} open={open} onClose={() => setOpen(false)} />
      </div>

      <style jsx>{`
        @keyframes hue {
          0% { filter: hue-rotate(0deg) }
          100% { filter: hue-rotate(360deg) }
        }
      `}</style>
    </header>
  );
}

/* ---------- Small bits ---------- */

function Info({ icon, text, href }: { icon: string; text: string; href?: string }) {
  const Content = (
    <span className="inline-flex items-center gap-2 text-white/85">
      <span>{icon}</span>
      <span>{text}</span>
    </span>
  );
  return href ? (
    <a href={href} className="hover:underline underline-offset-2">
      {Content}
    </a>
  ) : (
    Content
  );
}

/* Social with lucide-react icons */
function Social({
  type,
  href = "#",
}: {
  type: "instagram" | "facebook" | "twitter";
  href?: string;
}) {
  const iconMap = {
    instagram: <Instagram className="h-4 w-4" aria-hidden="true" />,
    facebook: <Facebook className="h-4 w-4" aria-hidden="true" />,
    twitter: <Twitter className="h-4 w-4" aria-hidden="true" />,
  } as const;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={type}
      className="grid h-8 w-8 place-items-center rounded-full border border-white/20 bg-white/10 text-white/90 transition
                 hover:translate-y-[-2px] hover:bg-white/20"
    >
      {iconMap[type]}
    </a>
  );
}

/* ---------- Logo ---------- */
function Logo2D() {
  return (
    <div className="relative grid h-9 w-9 place-items-center">
      <div className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-tr from-emerald-400/60 to-sky-400/60 blur-md" />
      <div className="h-7 w-7 rounded-xl bg-gradient-to-br from-emerald-500 to-sky-500 shadow-lg ring-1 ring-black/10" />
    </div>
  );
}

/* ---------- Mobile ---------- */
function MobileToggle({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      aria-label="Toggle menu"
      aria-expanded={open}
      className="rounded-xl p-2 text-gray-700 ring-1 ring-gray-300/60 backdrop-blur hover:bg-white/60 dark:text-gray-100 dark:hover:bg-white/10"
    >
      <svg viewBox="0 0 24 24" className="h-6 w-6">
        <path
          d={open ? "M6 18L18 6M6 6l12 12" : "M3 6h18M3 12h18M3 18h18"}
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
}

function MobileMenu({
  items,
  isActive,
  open,
  onClose,
}: {
  items: Item[];
  isActive: (href: string) => boolean | undefined;
  open: boolean;
  onClose: () => void;
}) {
  return (
    <div
      className={`lg:hidden transition-[max-height,opacity] duration-500 ease-out overflow-hidden
                  ${open ? "max-h-80 opacity-100" : "max-h-0 opacity-0"}`}
    >
      <div className="mx-auto max-w-7xl px-4 pb-4">
        <div className="mt-3 rounded-2xl border border-white/10 bg-white/80 p-2 backdrop-blur-xl shadow-lg dark:bg-white/10">
          {items.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              onClick={onClose}
              className={`block rounded-xl px-3 py-2 text-sm font-medium transition hover:bg-white dark:hover:bg-white/10
                          ${
                            isActive(it.href)
                              ? "text-emerald-700 dark:text-emerald-300"
                              : "text-gray-700 dark:text-gray-100"
                          }`}
            >
              {it.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={onClose}
            className="mt-2 block rounded-xl border border-emerald-500/40 bg-emerald-50 px-3 py-2 text-center text-sm font-semibold text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-300 dark:hover:bg-emerald-500/20"
          >
            Contact us
          </Link>
        </div>
      </div>
    </div>
  );
}
