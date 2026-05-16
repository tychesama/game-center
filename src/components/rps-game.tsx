"use client";

import confetti from "canvas-confetti";
import { useEffect, useRef, useState } from "react";

type Throw = "rock" | "paper" | "scissors";

const throws: Throw[] = ["rock", "paper", "scissors"];
const icons: Record<Throw, string> = {
  rock: "Rock",
  paper: "Paper",
  scissors: "Scissors",
};

export function RpsGame() {
  const [playerThrow, setPlayerThrow] = useState<Throw | null>(null);
  const [botThrow, setBotThrow] = useState<Throw | null>(null);
  const [status, setStatus] = useState("Choose your throw");
  const [score, setScore] = useState({ player: 0, bot: 0, draw: 0 });
  const celebrationKey = useRef<string | null>(null);

  useEffect(() => {
    if (!playerThrow || !botThrow) {
      return;
    }

    const result = resolveRound(playerThrow, botThrow);
    const key = playerThrow + "-" + botThrow + "-" + result;
    if (celebrationKey.current === key) {
      return;
    }

    celebrationKey.current = key;
    if (result === "player") {
      void confetti({ particleCount: 110, spread: 65, origin: { y: 0.7 }, zIndex: 9999 });
    }
  }, [botThrow, playerThrow]);

  function playRound(choice: Throw) {
    const randomThrow = getRandomThrow();
    const result = resolveRound(choice, randomThrow);

    setPlayerThrow(choice);
    setBotThrow(randomThrow);
    setScore((current) => ({
      ...current,
      [result]: current[result] + 1,
    }));
    setStatus(
      result === "player"
        ? "You win the round"
        : result === "bot"
          ? "Arcade bot wins the round"
          : "Draw round",
    );
  }

  function resetScore() {
    setPlayerThrow(null);
    setBotThrow(null);
    setStatus("Choose your throw");
    setScore({ player: 0, bot: 0, draw: 0 });
    celebrationKey.current = null;
  }

  return (
    <div className="grid w-full gap-6 xl:grid-cols-[minmax(0,1fr)_20rem]">
      <section className="space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.14em] text-[var(--gc-muted)]">
              Solo quickplay
            </p>
            <p className="mt-1 text-lg font-semibold" aria-live="polite">
              {status}
            </p>
          </div>
          <div className="rounded-2xl border-2 border-[var(--gc-ink)] bg-[var(--gc-surface)] px-4 py-3 text-xs font-black uppercase tracking-[0.16em]">
            Randomizer bot
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {throws.map((choice) => (
            <button
              key={choice}
              type="button"
              onClick={() => playRound(choice)}
              className="gc-panel flex min-h-44 flex-col items-center justify-center gap-4 p-6 text-center transition hover:-translate-y-1"
            >
              <span className="text-4xl font-black uppercase tracking-[-0.06em]">{icons[choice]}</span>
              <span className="rounded-full bg-[var(--gc-accent)] px-3 py-2 text-xs font-black uppercase tracking-[0.16em] text-[var(--gc-accent-ink)]">
                Throw
              </span>
            </button>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <RoundCard label="You played" value={playerThrow ? icons[playerThrow] : "Waiting"} />
          <RoundCard label="Bot played" value={botThrow ? icons[botThrow] : "Waiting"} />
        </div>
      </section>

      <aside className="gc-panel p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.14em]">Scoreboard</p>
            <p className="mt-1 text-sm font-semibold text-[var(--gc-muted)]">
              Best of however long you feel like.
            </p>
          </div>
          <button type="button" className="gc-button" onClick={resetScore}>
            Reset
          </button>
        </div>

        <div className="mt-5 grid gap-3">
          <ScoreChip label="You" value={score.player} />
          <ScoreChip label="Bot" value={score.bot} />
          <ScoreChip label="Draws" value={score.draw} />
        </div>
      </aside>
    </div>
  );
}

function RoundCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="gc-panel p-5">
      <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--gc-muted)]">{label}</p>
      <p className="mt-3 text-3xl font-black">{value}</p>
    </div>
  );
}

function ScoreChip({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl bg-[color:color-mix(in_srgb,var(--gc-surface-strong)_70%,white)] px-4 py-4">
      <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--gc-muted)]">{label}</p>
      <p className="mt-2 text-3xl font-black">{value}</p>
    </div>
  );
}

function resolveRound(player: Throw, bot: Throw) {
  if (player === bot) {
    return "draw" as const;
  }

  if (
    (player === "rock" && bot === "scissors") ||
    (player === "paper" && bot === "rock") ||
    (player === "scissors" && bot === "paper")
  ) {
    return "player" as const;
  }

  return "bot" as const;
}

function getRandomThrow(): Throw {
  return throws[Math.floor(Math.random() * throws.length)];
}
