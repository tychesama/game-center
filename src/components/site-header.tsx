"use client";

import Link from "next/link";
import Image from "next/image";

import { GamesMenu } from "@/components/games-menu";
import { ThemeSwitcher } from "@/components/theme-switcher";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-[color:color-mix(in_srgb,var(--gc-ink)_18%,transparent)] bg-[color:color-mix(in_srgb,var(--gc-surface)_76%,var(--gc-background))] backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-6 py-3 sm:px-10 lg:px-16">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3">
            <span className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-xl border-2 border-[var(--gc-ink)] bg-[var(--gc-surface)] shadow-[4px_4px_0_var(--gc-ink)]">
              <Image
                src="/gamecenter-mark.svg"
                alt="GameCenter logo"
                width={32}
                height={32}
                className="h-8 w-8 object-contain"
                priority
              />
            </span>
            <span className="text-2xl font-black tracking-[0]">GameCenter</span>
          </Link>
          <span className="rounded-full border border-[color:color-mix(in_srgb,var(--gc-ink)_20%,transparent)] bg-[color:color-mix(in_srgb,var(--gc-surface)_92%,white)] px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--gc-muted)]">
            Phase 2
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="gc-header-control px-4 py-2 text-sm font-black uppercase tracking-[0.14em]"
          >
            Lobby
          </Link>
          <GamesMenu />
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}
