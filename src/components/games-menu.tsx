"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { games } from "@/lib/games";

export function GamesMenu() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (!ref.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const activeGame = games.find((game) => pathname.startsWith(game.href));

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        className="gc-header-control gc-header-button min-w-38 justify-between px-4"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((value) => !value)}
      >
        <span>{activeGame ? activeGame.title : "Games"}</span>
        <span className={open ? "rotate-180 transition" : "transition"}>▾</span>
      </button>

      {open ? (
        <div className="absolute right-0 top-[calc(100%+0.75rem)] z-40 min-w-72 rounded-[calc(var(--gc-radius)-0.2rem)] border border-[color:color-mix(in_srgb,var(--gc-ink)_18%,transparent)] bg-[var(--gc-panel-float)] p-2 shadow-[var(--gc-card-shadow)]">
          {games.map((game) => {
            const active = pathname.startsWith(game.href);
            return (
              <Link
                key={game.href}
                href={game.href}
                onClick={() => setOpen(false)}
                className={[
                  "block rounded-2xl px-4 py-3 transition",
                  active
                    ? "bg-[var(--gc-panel-accent-soft)]"
                    : "hover:bg-[var(--gc-panel-strong)]",
                ].join(" ")}
              >
                <span className="block text-sm font-black uppercase tracking-[0.14em]">
                  {game.title}
                </span>
                <span className="mt-1 block text-sm font-semibold text-[var(--gc-muted)]">
                  {game.description}
                </span>
              </Link>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
