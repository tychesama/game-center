import Link from "next/link";
import type React from "react";

import type { Game } from "@/lib/games";
import { themeStyle } from "@/lib/themes";

type GameShellProps = {
  game: Game;
  children: React.ReactNode;
};

export function GameShell({ game, children }: GameShellProps) {
  return (
    <main
      data-game-theme={game.theme.name}
      style={themeStyle(game.theme)}
      className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-8 sm:px-10 lg:px-16"
    >
      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <aside className="gc-panel flex flex-col justify-between p-6 sm:p-8">
          <div>
            <p className="font-mono text-sm font-bold uppercase tracking-[0.22em] text-[var(--gc-accent-strong)]">
              {game.eyebrow}
            </p>
            <h1 className="mt-3 text-6xl font-black leading-none tracking-[-0.08em]">
              {game.title}
            </h1>
            <p className="mt-5 text-base font-semibold leading-7 text-[var(--gc-muted)]">
              {game.description}
            </p>
          </div>

          <div className="mt-10 grid gap-3 text-sm font-black uppercase tracking-[0.16em]">
            <span className="rounded-full bg-[var(--gc-accent)] px-4 py-3">
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

        <div className="gc-panel flex items-center justify-center p-5">{children}</div>
      </div>
    </main>
  );
}
