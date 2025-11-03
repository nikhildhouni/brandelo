"use client";

import Link from "next/link";
import {
  ArrowRight,
  TrendingUp,
  Globe,
  UsersRound,
  Megaphone,
  PenTool,
  Wrench,
  type Icon as LucideIcon,
} from "lucide-react";
import { ComponentProps } from "react";

/** ——— Types ——— */
type WorkItem = {
  title: string;
  desc: string;
  href: string;
  icon?: keyof typeof ICONS; // choose one from ICONS map below
};

type OurWorkProps = {
  title?: string;
  items?: WorkItem[];
  className?: string;
};

/** ——— Icon map for the round badge ——— */
const ICONS = {
  seo: TrendingUp,
  web: Globe,
  smm: UsersRound,
  marketing: Megaphone,
  design: PenTool,
  devops: Wrench,
} satisfies Record<string, typeof LucideIcon>;

/** ——— Default data (mirrors your screenshot text) ——— */
const DEFAULT_ITEMS: WorkItem[] = [
  {
    title: "SEO Optimization",
    desc:
      "Brandelo is a leading Social Media Marketing Agency in Delhi NCR offering Paid Social Media Marketing Services & SMM Services in India.",
    href: "/services/seo",
    icon: "seo",
  },
  {
    title: "Website Development",
    desc:
      "Brandelo is a leading Social Media Marketing Agency in Delhi NCR offering Paid Social Media Marketing Services & SMM Services in India.",
    href: "/services/website-development",
    icon: "web",
  },
  {
    title: "Social Media Marketing",
    desc:
      "Brandelo is a leading Social Media Marketing Agency in Delhi NCR offering Paid Social Media Marketing Services & SMM Services in India.",
    href: "/services/social-media-marketing",
    icon: "smm",
  },
  {
    title: "SEO Optimization",
    desc:
      "Brandelo is a leading Social Media Marketing Agency in Delhi NCR offering Paid Social Media Marketing Services & SMM Services in India.",
    href: "/services/seo",
    icon: "seo",
  },
  {
    title: "Website Development",
    desc:
      "Brandelo is a leading Social Media Marketing Agency in Delhi NCR offeri1ng Paid Social Media Marketing Services & SMM Services in India.",
    href: "/services/website-development",
    icon: "web",
  },
  {
    title: "Social Media Marketing",
    desc:
      "Brandelo is a leading Social Media Marketing Agency in Delhi NCR offering Paid Social Media Marketing Services & SMM Services in India.",
    href: "/services/social-media-marketing",
    icon: "smm",
  },
];

/** ——— Component ——— */
export default function OurWork({
  title = "OUR WORK",
  items = DEFAULT_ITEMS,
  className = "",
}: OurWorkProps) {
  return (
    <section
      className={[
        "relative mx-auto max-w-7xl px-4 py-10 sm:py-12 md:py-16",
        className,
      ].join(" ")}
    >
      {/* Watermark heading */}
      <div className="relative">
        <h2 className="text-3xl font-extrabold tracking-tight text-black dark:text-white">
          {title}
        </h2>
        <div
          aria-hidden
          className="pointer-events-none select-none absolute -top-6 left-0 text-[clamp(48px,12vw,160px)] font-extrabold leading-none tracking-tight text-black/5 dark:text-white/5"
        >
          {title}
        </div>
      </div>

      {/* Grid */}
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it, i) => (
          <WorkCard key={i} {...it} />
        ))}
      </div>
    </section>
  );
}

/** ——— Card ——— */
function WorkCard({ title, desc, href, icon = "seo" }: WorkItem) {
  const BadgeIcon = ICONS[icon] ?? TrendingUp;
  return (
    <div className="group relative rounded-lg border border-black/10 bg-white shadow-sm transition-all duration-200 hover:shadow-lg dark:border-white/10 dark:bg-[#121615]">
      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
          {title}
        </h3>
        <p className="mt-2 line-clamp-4 text-[13px] leading-5 text-slate-700 dark:text-slate-200/80">
          {desc}
        </p>

        {/* Read more row */}
        <Link
          href={href}
          className="mt-6 inline-flex items-center gap-3 text-[13px] font-medium text-slate-900/80 transition-colors hover:text-slate-900 dark:text-white/80 dark:hover:text-white"
        >
          Read more
          <span className="grid h-7 w-7 place-items-center rounded-full border border-slate-900/15 bg-slate-900/[0.04] transition-all duration-200 group-hover:translate-x-0.5 dark:border-white/20 dark:bg-white/10">
            <ArrowRight className="h-4 w-4" />
          </span>
        </Link>
      </div>

      {/* Overlapping round badge (bottom-right) */}
      <div className="pointer-events-none absolute -bottom-5 -right-5">
        <BadgeCircle>
          <BadgeIcon className="h-7 w-7 text-[#2e5b3f]" />
        </BadgeCircle>
      </div>
    </div>
  );
}

/** ——— Small bits ——— */
function BadgeCircle({
  children,
  ...props
}: ComponentProps<"div"> & { children: React.ReactNode }) {
  return (
    <div
      {...props}
      className={[
        "relative grid h-16 w-16 place-items-center rounded-full",
        "bg-gradient-to-b from-white to-slate-100 shadow-md ring-1 ring-black/10",
        "dark:from-[#1b221f] dark:to-[#121615] dark:ring-white/10",
      ].join(" ")}
    >
      {/* inner subtle ring for the layered look */}
      <div className="absolute inset-1 rounded-full ring-1 ring-black/10 dark:ring-white/10" />
      <div className="relative">{children}</div>
    </div>
  );
}
