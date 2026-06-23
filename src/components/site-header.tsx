"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

import { ThemeSwitcher } from "@/components/theme-switcher";
import { games } from "@/lib/games";
import { useSoundEffects } from "@/lib/use-sound-effects";

export function SiteHeader() {
  const pathname = usePathname();
  const [gamesOpen, setGamesOpen] = useState(false);
  const gamesMenuRef = useRef<HTMLDetailsElement | null>(null);
  const audioMuted = useSyncExternalStore(subscribeToAudioMute, getAudioMuteSnapshot, getAudioMuteServerSnapshot);
  const playSound = useSoundEffects();

  useEffect(() => {
    if (!gamesOpen) {
      return;
    }

    function closeOnOutsideClick(event: PointerEvent) {
      if (!gamesMenuRef.current?.contains(event.target as Node)) {
        setGamesOpen(false);
      }
    }

    window.addEventListener("pointerdown", closeOnOutsideClick);
    return () => window.removeEventListener("pointerdown", closeOnOutsideClick);
  }, [gamesOpen]);

  function toggleAudio() {
    const nextMuted = !audioMuted;
    window.localStorage.setItem("gamecenter-audio-muted", String(nextMuted));
    window.dispatchEvent(new Event("gamecenter-audio-muted-change"));
    if (!nextMuted) {
      playSound("click");
    }
  }

  return (
    <header className="sticky top-0 z-30 border-b border-[color:color-mix(in_srgb,var(--gc-ink)_18%,transparent)] bg-[color:color-mix(in_srgb,var(--gc-surface)_76%,var(--gc-background))] backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-3 sm:px-10 lg:px-16">
        <div className="flex flex-wrap items-center gap-3">
          <Link href="/" className="flex items-center gap-3" onClick={() => playSound("click")}>
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
        </div>

        <div className="flex flex-wrap items-center justify-end gap-3">
          <button
            type="button"
            className="gc-header-control gc-header-button px-4"
            aria-pressed={audioMuted}
            aria-label={audioMuted ? "Unmute audio" : "Mute audio"}
            onClick={toggleAudio}
          >
            {audioMuted ? "Muted" : "Audio"}
          </button>
          <Link
            href="/"
            className="gc-header-control gc-header-button px-4"
            onClick={() => playSound("click")}
          >
            Lobby
          </Link>
          <details
            ref={gamesMenuRef}
            className="gc-games-menu relative"
            open={gamesOpen}
            onToggle={(event) => setGamesOpen(event.currentTarget.open)}
          >
            <summary
              className={[
                "gc-header-control gc-header-button cursor-pointer list-none px-4",
                games.some((game) => game.href && pathname === game.href)
                  ? "bg-[var(--gc-panel-accent-soft)] shadow-[4px_4px_0_color-mix(in_srgb,var(--gc-accent)_45%,transparent)]"
                  : "",
              ].join(" ")}
              aria-label="Open games menu"
              onClick={() => playSound("click")}
            >
              Games
              <span aria-hidden="true" className="text-sm leading-none">▾</span>
            </summary>
            <nav
              className="absolute right-0 top-[calc(100%+0.75rem)] z-40 grid min-w-56 gap-2 rounded-[var(--gc-radius)] border-2 border-[var(--gc-ink)] bg-[var(--gc-surface)] p-2 shadow-[var(--gc-card-shadow)]"
              aria-label="Games"
            >
              {games.map((game) => {
                const href = game.href ?? "";
                const active = href ? pathname === href : false;

                if (game.locked || href === "") {
                  return (
                    <span
                      key={game.slug}
                      className="rounded-2xl px-4 py-3 text-sm font-black uppercase tracking-[0.12em] text-[var(--gc-muted)] opacity-70"
                      aria-disabled="true"
                    >
                      {game.title} · Locked
                    </span>
                  );
                }

                return (
                  <Link
                    key={game.slug}
                    href={href}
                    onClick={() => {
                      playSound("click");
                      setGamesOpen(false);
                    }}
                    className={[
                      "rounded-2xl px-4 py-3 text-sm font-black uppercase tracking-[0.12em] transition hover:bg-[var(--gc-panel-accent-soft)]",
                      active ? "bg-[var(--gc-panel-accent-soft)] text-[var(--gc-ink)]" : "text-[var(--gc-muted)]",
                    ].join(" ")}
                  >
                    {game.title}
                  </Link>
                );
              })}
            </nav>
          </details>
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}

function subscribeToAudioMute(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener("gamecenter-audio-muted-change", onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener("gamecenter-audio-muted-change", onStoreChange);
  };
}

function getAudioMuteSnapshot() {
  return window.localStorage.getItem("gamecenter-audio-muted") === "true";
}

function getAudioMuteServerSnapshot() {
  return false;
}
