// app/admin/layout.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Activity,
  LayoutDashboard,
  Settings,
  Users,
  Menu,
  Sparkles,
  CircleDot,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Leads", href: "/admin/leads", icon: Users },
  { label: "Clients", href: "/admin/clients", icon: Users },
  { label: "Forms", href: "/admin/forms", icon: Activity },
  { label: "Blogs", href: "/admin/blogs", icon: Settings },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex min-h-screen">
        {/* Sidebar - Desktop */}
        <aside className="hidden md:flex w-64 flex-col border-r border-slate-200 bg-white">
          {/* Brand bar */}
          <div className="flex h-16 items-center gap-3 border-b border-slate-200 px-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-linear-to-br from-indigo-500 via-sky-500 to-emerald-400 text-white shadow-md">
              <Sparkles className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <p className="text-sm font-semibold tracking-tight">
                Brandelo Admin
              </p>
              <p className="text-[11px] uppercase tracking-[0.22em] text-slate-400">
                control center
              </p>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex-1 space-y-1 px-3 py-4">
            {navItems.map((item) => {
              const active = pathname.startsWith(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                    active
                      ? "bg-indigo-50 text-indigo-700 border border-indigo-100"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  )}
                >
                  <span
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-md border text-[13px]",
                      active
                        ? "border-indigo-200 bg-white text-indigo-600"
                        : "border-slate-200 bg-slate-50 text-slate-500 group-hover:border-slate-300"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="truncate">{item.label}</span>
                  {active && (
                    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Footer / user info */}
          <div className="border-t border-slate-200 px-4 py-3 text-xs">
            <p className="mb-1 flex items-center gap-1 text-[11px] uppercase tracking-[0.22em] text-slate-400">
              <CircleDot className="h-3 w-3 text-emerald-500" />
              signed in
            </p>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Brandelo Operator</p>
                <p className="text-[11px] text-slate-500">admin@brandelo</p>
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500 text-xs font-semibold text-white">
                BR
              </div>
            </div>
          </div>
        </aside>

        {/* Sidebar - Mobile */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 flex md:hidden">
            {/* Overlay */}
            <div
              className="fixed inset-0 bg-black/25"
              onClick={() => setSidebarOpen(false)}  
            />
            {/* Panel */}
            <div className="relative z-50 flex w-64 flex-col border-r border-slate-200 bg-white">
              <div className="flex h-16 items-center justify-between border-b border-slate-200 px-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-linear-to-br from-indigo-500 via-sky-500 to-emerald-400 text-[11px] font-semibold text-white">
                    B
                  </div> 
                  <span className="text-sm font-semibold">
                    Brandelo Admin
                  </span>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="text-xs text-slate-500 hover:text-slate-900"
                >
                  Close
                </button>
              </div>
              <nav className="flex-1 space-y-1 px-3 py-4">
                {navItems.map((item) => {
                  const active = pathname.startsWith(item.href);
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                        active
                          ? "bg-indigo-50 text-indigo-700 border border-indigo-100"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      )}
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 bg-slate-50 text-slate-500">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        )}

        {/* Main content area */}
        <div className="flex flex-1 flex-col">
          {/* Topbar */}
          <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 shadow-sm md:px-6">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="inline-flex items-center justify-center rounded-md border border-slate-200 bg-white px-2 py-1 text-xs text-slate-600 shadow-sm hover:bg-slate-50 md:hidden"
              >
                <Menu className="mr-1 h-3.5 w-3.5" />
                Menu
              </button>
              <div>
                <p className="text-[11px] uppercase tracking-[0.28em] text-slate-400">
                  Brandelo admin
                </p>
                <p className="text-sm font-medium">
                  Welcome back,{" "}
                  <span className="text-indigo-600 font-semibold">
                    Operator
                  </span>{" "}
                  👋
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] text-slate-600 md:flex">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span>All systems normal</span>
              </div>
            </div>
          </header>

          {/* Page content */}
          <main className="flex-1 bg-slate-50 px-3 py-4 md:px-6 md:py-6">
            <div className="mx-auto max-w-6xl rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
