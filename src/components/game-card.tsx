"use client";

import Link from "next/link";

import type { Game, GamePreview } from "@/lib/games";
import { themeStyle } from "@/lib/themes";
import { useSoundEffects } from "@/lib/use-sound-effects";

export function GameCard({ game }: { game: Game }) {
  const playSound = useSoundEffects();
  const href = game.href ?? "";
  const locked = game.locked || href === "";
  const cardClassName = [
    "gc-game-card group relative overflow-hidden rounded-[var(--gc-radius)] border-2 border-[var(--gc-ink)] bg-[var(--gc-surface)] p-5 shadow-[8px_8px_0_var(--gc-ink)] transition duration-200",
    locked
      ? "cursor-not-allowed opacity-90"
      : "hover:-translate-y-1 hover:shadow-[12px_12px_0_var(--gc-ink)]",
  ].join(" ");
  const content = <GameCardContent game={game} locked={locked} />;

  if (locked) {
    return (
      <article
        style={themeStyle(game.theme)}
        className={cardClassName}
        data-game-preview={game.preview ?? "board"}
        data-disabled="true"
      >
        {content}
      </article>
    );
  }

  return (
    <Link
      href={href}
      style={themeStyle(game.theme)}
      onClick={() => playSound("click")}
      onMouseEnter={() => playSound("hover")}
      className={cardClassName}
      data-game-preview={game.preview ?? "board"}
    >
      {content}
    </Link>
  );
}

function GameCardContent({ game, locked }: { game: Game; locked: boolean }) {
  const showStatus = locked;

  return (
    <>
      <div className="gc-game-card-orb absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[var(--gc-accent)] opacity-70 transition group-hover:scale-125" />
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
            {showStatus ? (
              <span className="rounded-full border border-[var(--gc-ink)] px-3 py-2">
                {locked ? "Locked" : game.status}
              </span>
            ) : null}
          </div>
        </div>
        <MiniPreview variant={game.preview ?? "board"} />
      </div>
    </>
  );
}

function MiniPreview({ variant }: { variant: GamePreview }) {
  if (variant === "snackrush") {
    return <SnackRushPreview />;
  }

  if (variant === "tictactoe") {
    return <TicTacToePreview />;
  }

  if (variant === "rps") {
    return <RpsPreview />;
  }

  if (variant === "locked") {
    return <LockedPreview />;
  }

  return <MiniBoard />;
}

function TicTacToePreview() {
  const marks = ["X", "", "O", "", "X", "", "O", "", "X"];

  return (
    <div className="gc-tictactoe-preview grid aspect-square grid-cols-3 gap-1.5 overflow-hidden rounded-2xl border-2 border-[var(--gc-ink)] bg-[var(--gc-panel-soft)] p-2 shadow-[4px_4px_0_var(--gc-ink)]">
      {marks.map((mark, index) => (
        <span key={`${mark}-${index}`} className="grid place-items-center rounded-xl border-2 border-[color-mix(in_srgb,var(--gc-ink)_70%,transparent)] bg-[var(--gc-surface)] text-2xl font-black leading-none">
          {mark}
        </span>
      ))}
    </div>
  );
}

function RpsPreview() {
  return (
    <div className="gc-rps-preview relative grid aspect-square place-items-center overflow-hidden rounded-2xl border-2 border-[var(--gc-ink)] bg-[linear-gradient(135deg,var(--gc-panel-soft),var(--gc-surface))] shadow-[4px_4px_0_var(--gc-ink)]">
      <span className="absolute left-2 top-2 grid h-10 w-10 place-items-center rounded-full border-2 border-[var(--gc-ink)] bg-[var(--gc-accent)] text-xl shadow-[2px_2px_0_var(--gc-ink)]">
        ✊
      </span>
      <span className="absolute right-2 top-8 grid h-10 w-10 place-items-center rounded-full border-2 border-[var(--gc-ink)] bg-[var(--gc-accent-strong)] text-xl shadow-[2px_2px_0_var(--gc-ink)]">
        ✌️
      </span>
      <span className="absolute bottom-2 left-1/2 grid h-10 w-10 -translate-x-1/2 place-items-center rounded-full border-2 border-[var(--gc-ink)] bg-[var(--gc-surface)] text-xl shadow-[2px_2px_0_var(--gc-ink)]">
        ✋
      </span>
      <span className="font-mono text-xs font-black uppercase tracking-[0.18em] text-[var(--gc-muted)]">
        VS
      </span>
    </div>
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

function SnackRushPreview() {
  const candies = ["🍩", "🍬", "⭐", "🧲", "💣", "🥫"];

  return (
    <div className="gc-snackrush-preview aspect-square overflow-hidden rounded-3xl border-2 border-[var(--gc-ink)] shadow-[4px_4px_0_var(--gc-ink)]">
      <div className="gc-snackrush-preview-title">Rush</div>
      <div className="gc-snackrush-candy-grid" aria-hidden="true">
        {candies.map((candy) => (
          <span key={candy}>{candy}</span>
        ))}
      </div>
      <div className="gc-snackrush-basket" aria-hidden="true">
        🧺
      </div>
    </div>
  );
}

function LockedPreview() {
  return (
    <div className="gc-locked-preview aspect-square overflow-hidden rounded-2xl border-2 border-dashed border-[var(--gc-ink)] bg-[var(--gc-board-light)] shadow-[4px_4px_0_var(--gc-ink)]">
      <span className="text-4xl" aria-hidden="true">
        🔒
      </span>
      <span className="font-mono text-[0.6rem] font-black uppercase tracking-[0.18em]">
        Future
      </span>
    </div>
  );
}
