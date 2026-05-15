"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ThemeSwitcher } from "@/components/theme-switcher";

const navItems = [
  { href: "/", label: "Lobby" },
  { href: "/chess", label: "Chess" },
  { href: "/checkers", label: "Checkers" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 border-b-2 border-[color:color-mix(in_srgb,var(--gc-ink)_12%,transparent)] bg-[color:color-mix(in_srgb,var(--gc-background)_82%,white)] backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-6 py-4 sm:px-10 lg:flex-row lg:items-center lg:justify-between lg:px-16">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="text-2xl font-black tracking-[-0.05em]">
            GameCenter
          </Link>
          <span className="rounded-full border-2 border-[var(--gc-ink)] bg-[var(--gc-surface)] px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.18em]">
            Phase 1
          </span>
        </div>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <nav className="flex flex-wrap gap-2">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={[
                    "rounded-full border-2 px-4 py-2 text-sm font-black uppercase tracking-[0.14em] transition",
                    active
                      ? "border-[var(--gc-ink)] bg-[var(--gc-accent)]"
                      : "border-transparent bg-transparent hover:border-[var(--gc-ink)] hover:bg-[var(--gc-surface)]",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}
