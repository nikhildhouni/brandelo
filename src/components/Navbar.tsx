"use client";

import Image from "next/image";
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
    <header className="sticky top-0 z-50 bg-[#050816]/95 backdrop-blur-sm">
      <div className="relative">
        {/* top info strip */}
        <div className="hidden md:block border-b border-white/5 bg-[#050816]/95 text-white/90 text-[13px] backdrop-blur">
          <div className="mx-auto max-w-7xl px-4">
            <div className="flex items-center justify-between py-2">
              <div className="flex flex-wrap gap-5">
                <Info icon="📍" text="Noida Sector 63 • H-187" />
                <Info
                  icon="✉️"
                  text="info@brandelo.com"
                  href="mailto:info@brandelo.com"
                />
                <Info
                  icon="📞"
                  text="+91 98997 83757"
                  href="tel:+919899783757"
                />
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

        {/* nav */}
        <div className="px-3 py-3">
          <nav className="mx-auto max-w-7xl">
            <div className="relative">
              {/* single-color subtle bottom glow */}
              <div className="pointer-events-none absolute inset-x-4 -bottom-[2px] -z-10 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent blur-[1px]" />

              {/* glass shell */}
              <div className="relative rounded-2xl border border-white/10 bg-[#050816]/85 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.6)]">
                <div className="flex h-[72px] items-center justify-between px-4 md:px-6">
                  {/* Brand logo - max focus */}
                  <Link href="/" className="flex items-center">
                   <div className="rounded-xl bg-white px-4 py-1 shadow-sm">
  <Image
    src="/logo.png"
    alt="Brand logo"
    width={140}
    height={40}
    className="object-contain"
    priority
  />
</div>

                  </Link>

                  {/* Desktop links */}
                  <div className="hidden lg:flex items-center gap-6">
                    {items.map((it) => (
                      <Link
                        key={it.href}
                        href={it.href}
                        className="group relative text-sm font-medium text-white/80 hover:text-white transition-colors"
                      >
                        <span
                          className={
                            isActive(it.href) ? "text-cyan-300" : undefined
                          }
                        >
                          {it.label}
                        </span>
                        <span
                          className={`pointer-events-none absolute left-0 -bottom-1 h-[2px] w-full origin-left scale-x-0 bg-cyan-400/90 transition-transform duration-300
                            ${
                              isActive(it.href)
                                ? "scale-x-100"
                                : "group-hover:scale-x-100"
                            }`}
                        />
                      </Link>
                    ))}
                  </div>

                  {/* Right CTA */}
                  <div className="hidden md:flex items-center gap-2">
                    <Link
                      href="/contact"
                      className="relative inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-semibold text-black
                                 bg-cyan-400 shadow-[0_8px_30px_rgba(34,211,238,0.45)]
                                 ring-1 ring-black/20 transition-transform hover:-translate-y-0.5 active:translate-y-0"
                    >
                      Contact us
                    </Link>
                  </div>

                  {/* Mobile burger */}
                  <div className="flex items-center md:hidden">
                    <MobileToggle
                      open={open}
                      onToggle={() => setOpen((v) => !v)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </nav>

          {/* mobile drawer */}
          <MobileMenu
            items={items}
            isActive={isActive}
            open={open}
            onClose={() => setOpen(false)}
          />
        </div>
      </div>
    </header>
  );
}

/* bits */

function Info({
  icon,
  text,
  href,
}: {
  icon: string;
  text: string;
  href?: string;
}) {
  const Content = (
    <span className="inline-flex items-center gap-2 text-white/80">
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

function Social({
  type,
  href = "#",
}: {
  type: "instagram" | "facebook" | "twitter";
  href?: string;
}) {
  const iconMap = {
    instagram: <Instagram className="h-4 w-4" />,
    facebook: <Facebook className="h-4 w-4" />,
    twitter: <Twitter className="h-4 w-4" />,
  } as const;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={type}
      className="grid h-8 w-8 place-items-center rounded-full border border-white/20 bg-white/5 text-white/90 transition hover:-translate-y-0.5 hover:bg-white/15"
    >
      {iconMap[type]}
    </a>
  );
}

function MobileToggle({
  open,
  onToggle,
}: {
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      aria-label="Toggle menu"
      aria-expanded={open}
      className="rounded-xl p-2 text-white ring-1 ring-white/20 bg-white/5 backdrop-blur hover:bg-white/10"
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
      className={`lg:hidden transition-[max-height,opacity] duration-500 ease-out overflow-hidden ${
        open ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 pb-4">
        <div className="mt-3 rounded-2xl border border-white/10 bg-[#050816]/95 p-2 backdrop-blur-xl shadow-lg">
          {items.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              onClick={onClose}
              className={`block rounded-xl px-3 py-2 text-sm font-medium text-white/90 hover:bg-white/5 ${
                isActive(it.href) ? "text-cyan-300" : ""
              }`}
            >
              {it.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={onClose}
            className="mt-2 block rounded-xl border border-cyan-300/60 bg-cyan-300/10 px-3 py-2 text-center text-sm font-semibold text-cyan-200 hover:bg-cyan-300/15"
          >
            Contact us
          </Link>
        </div>
      </div>
    </div>
  );
}
