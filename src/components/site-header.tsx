"use client";

import Link from "next/link";

import { GamesMenu } from "@/components/games-menu";
import { ThemeSwitcher } from "@/components/theme-switcher";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-[color:color-mix(in_srgb,var(--gc-ink)_18%,transparent)] bg-[color:color-mix(in_srgb,var(--gc-surface)_76%,var(--gc-background))] backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-6 py-4 sm:px-10 lg:flex-row lg:items-center lg:justify-between lg:px-16">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="text-2xl font-black tracking-[-0.05em]">
            GameCenter
          </Link>
          <span className="rounded-full border border-[color:color-mix(in_srgb,var(--gc-ink)_20%,transparent)] bg-[color:color-mix(in_srgb,var(--gc-surface)_92%,white)] px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--gc-muted)]">
            Phase 2
          </span>
        </div>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/"
              className="rounded-full border border-[color:color-mix(in_srgb,var(--gc-ink)_22%,transparent)] bg-[color:color-mix(in_srgb,var(--gc-surface)_88%,white)] px-4 py-2 text-sm font-black uppercase tracking-[0.14em] transition hover:-translate-y-px"
            >
              Lobby
            </Link>
            <GamesMenu />
          </div>
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}
