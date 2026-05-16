import Link from "next/link";
import type React from "react";

import type { Game } from "@/lib/games";

type GameShellProps = {
  game: Game;
  children: React.ReactNode;
};

export function GameShell({ game, children }: GameShellProps) {
  return (
    <main
      data-game-theme={game.theme.name}
      style={
        {
          "--gc-game-accent": game.theme.accent,
          "--gc-game-accent-strong": game.theme.accentStrong,
        } as React.CSSProperties
      }
      className="mx-auto flex w-full max-w-[1280px] flex-col gap-6 px-6 py-6 sm:px-10 xl:px-12"
    >
      <div className="grid gap-6 xl:grid-cols-[22rem_minmax(0,1fr)]">
        <aside className="gc-panel flex flex-col justify-between p-6">
          <div>
            <p className="font-mono text-sm font-bold uppercase tracking-[0.22em] text-[var(--gc-game-accent-strong)]">
              {game.eyebrow}
            </p>
            <h1 className="mt-3 text-5xl font-black leading-none tracking-[0]">
              {game.title}
            </h1>
            <p className="mt-5 text-base font-semibold leading-7 text-[var(--gc-muted)]">
              {game.description}
            </p>
          </div>

          <div className="mt-10 grid gap-3 text-sm font-black uppercase tracking-[0.16em]">
            <span className="rounded-full bg-[var(--gc-game-accent)] px-4 py-3 text-[var(--gc-accent-ink)]">
              {game.players}
            </span>
            <span className="rounded-full border-2 border-[var(--gc-ink)] px-4 py-3">
              {game.status}
            </span>
            <Link href="/" className="gc-button mt-3">
              Back to lobby
            </Link>
          </div>
        </aside>

        <div className="gc-panel p-5">{children}</div>
      </div>
    </main>
  );
}
