import Link from "next/link";

import { GamesMenu } from "@/components/games-menu";
import { ThemeSwitcher } from "@/components/theme-switcher";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-[color:color-mix(in_srgb,var(--gc-ink)_18%,transparent)] bg-[color:color-mix(in_srgb,var(--gc-surface)_76%,var(--gc-background))] backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-6 py-3 sm:px-10 lg:px-16">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3">
            <span className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-xl border-2 border-[var(--gc-ink)] bg-[var(--gc-surface)] shadow-[4px_4px_0_var(--gc-ink)]">
              <svg
                aria-hidden="true"
                viewBox="0 0 64 64"
                className="h-8 w-8"
                fill="none"
              >
                <rect x="6" y="10" width="52" height="44" rx="14" fill="#1E2435" />
                <rect x="10" y="14" width="44" height="36" rx="10" fill="#2A3550" />
                <circle cx="22" cy="32" r="7" fill="#FFD447" />
                <path d="M22 26v12M16 32h12" stroke="#1E2435" strokeWidth="3" strokeLinecap="round" />
                <circle cx="42" cy="27" r="4.5" fill="#6CF0FF" />
                <circle cx="36" cy="37" r="4.5" fill="#FF8A5B" />
                <circle cx="48" cy="37" r="4.5" fill="#FFE18E" />
              </svg>
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
            className="gc-header-control gc-header-button px-4"
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
