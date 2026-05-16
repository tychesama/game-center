import Link from "next/link";

import type { Game } from "@/lib/games";
import { themeStyle } from "@/lib/themes";

export function GameCard({ game }: { game: Game }) {
  return (
    <Link
      href={game.href}
      style={themeStyle(game.theme)}
      className="group relative overflow-hidden rounded-[var(--gc-radius)] border-2 border-[var(--gc-ink)] bg-[var(--gc-surface)] p-5 shadow-[8px_8px_0_var(--gc-ink)] transition duration-200 hover:-translate-y-1 hover:shadow-[12px_12px_0_var(--gc-ink)]"
    >
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[var(--gc-accent)] opacity-70 transition group-hover:scale-125" />
      <div className="relative grid gap-5 sm:grid-cols-[1fr_8rem] sm:items-center">
        <div>
          <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[var(--gc-accent-strong)]">
            {game.eyebrow}
          </p>
          <h2 className="gc-midnight-stroke mt-2 text-4xl font-black tracking-[-0.06em]">
            {game.title}
          </h2>
          <p className="mt-3 max-w-xl text-sm font-semibold leading-6 text-[var(--gc-muted)]">
            {game.description}
          </p>
          <div className="mt-5 flex flex-wrap gap-2 text-xs font-black uppercase tracking-[0.16em]">
            <span className="rounded-full bg-[var(--gc-accent)] px-3 py-2 text-[var(--gc-accent-ink)]">
              {game.players}
            </span>
            <span className="rounded-full border border-[var(--gc-ink)] px-3 py-2">
              {game.status}
            </span>
          </div>
        </div>
        <MiniBoard />
      </div>
    </Link>
  );
}

function MiniBoard() {
  return (
    <div className="grid aspect-square grid-cols-4 overflow-hidden rounded-2xl border-2 border-[var(--gc-ink)] bg-[var(--gc-board-light)] shadow-[4px_4px_0_var(--gc-ink)]">
      {Array.from({ length: 16 }, (_, index) => (
        <span
          key={index}
          className={
            (Math.floor(index / 4) + index) % 2 === 0
              ? "bg-[var(--gc-board-light)]"
              : "bg-[var(--gc-board-dark)]"
          }
        />
      ))}
    </div>
  );
}
