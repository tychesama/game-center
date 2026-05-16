"use client";

import confetti from "canvas-confetti";
import { useEffect, useRef, useState } from "react";

type Throw = "rock" | "paper" | "scissors";

const throws: Throw[] = ["rock", "paper", "scissors"];
const labels: Record<Throw, string> = {
  rock: "Rock",
  paper: "Paper",
  scissors: "Scissors",
};
const icons: Record<Throw, string> = {
  rock: "/assets/rps/rock.svg",
  paper: "/assets/rps/paper.svg",
  scissors: "/assets/rps/scissors.svg",
};

export function RpsGame() {
  const [playerThrow, setPlayerThrow] = useState<Throw | null>(null);
  const [botThrow, setBotThrow] = useState<Throw | null>(null);
  const [status, setStatus] = useState("Choose your throw");
  const [score, setScore] = useState({ player: 0, bot: 0, draw: 0 });
  const [countdown, setCountdown] = useState<number | null>(null);
  const pendingResult = useRef<{ throw: Throw; result: ReturnType<typeof resolveRound> } | null>(null);
  const countdownTimeouts = useRef<number[]>([]);
  const revealTimeout = useRef<number | null>(null);
  const celebrationKey = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      countdownTimeouts.current.forEach((timeout) => window.clearTimeout(timeout));
      if (revealTimeout.current !== null) {
        window.clearTimeout(revealTimeout.current);
      }
    };
  }, []);

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
      burstConfetti();
    }
  }, [botThrow, playerThrow]);

  function playRound(choice: Throw) {
    if (countdown !== null) {
      return;
    }

    const randomThrow = getRandomThrow();
    const result = resolveRound(choice, randomThrow);

    setPlayerThrow(choice);
    setBotThrow(null);
    pendingResult.current = { throw: randomThrow, result };
    setCountdown(3);
    setStatus("Bot reveal in 3");
    countdownTimeouts.current.forEach((timeout) => window.clearTimeout(timeout));
    countdownTimeouts.current = [
      window.setTimeout(() => setCountdown(2), 1000),
      window.setTimeout(() => setCountdown(1), 2000),
    ];
    if (revealTimeout.current !== null) {
      window.clearTimeout(revealTimeout.current);
    }

    revealTimeout.current = window.setTimeout(() => {
      const pending = pendingResult.current;
      if (!pending) {
        return;
      }

      setCountdown(null);
      setBotThrow(pending.throw);
      setScore((currentScore) => ({
        ...currentScore,
        [pending.result]: currentScore[pending.result] + 1,
      }));
      setStatus(
        pending.result === "player"
          ? "You win the round"
          : pending.result === "bot"
            ? "Arcade bot wins the round"
            : "Draw round",
      );
      pendingResult.current = null;
      revealTimeout.current = null;
      countdownTimeouts.current = [];
    }, 3000);
  }

  function resetScore() {
    countdownTimeouts.current.forEach((timeout) => window.clearTimeout(timeout));
    countdownTimeouts.current = [];
    if (revealTimeout.current !== null) {
      window.clearTimeout(revealTimeout.current);
      revealTimeout.current = null;
    }
    pendingResult.current = null;
    setPlayerThrow(null);
    setBotThrow(null);
    setCountdown(null);
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
            Arcade bot
          </div>
        </div>

        <div className="gc-panel grid gap-2 p-5 md:grid-cols-[1fr_11rem_1fr] md:items-center">
          <RoundCard label="You chose" throwValue={playerThrow} />
          <div className="order-first flex min-h-40 flex-col items-center justify-center rounded-[var(--gc-radius)] border-2 border-[var(--gc-ink)] bg-[var(--gc-panel-strong)] px-4 py-6 text-center md:order-none">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--gc-muted)]">Battlezone</p>
            <p className="mt-3 text-6xl font-black leading-none">
              {countdown !== null ? countdown : "VS"}
            </p>
          </div>
          <RoundCard label="Bot chose" throwValue={botThrow} mirrored />
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {throws.map((choice) => (
            <button
              key={choice}
              type="button"
              onClick={() => playRound(choice)}
              disabled={countdown !== null}
              className="gc-panel flex min-h-48 flex-col items-center justify-center gap-4 p-5 text-center transition hover:-translate-y-1 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span className="relative flex h-32 w-32 items-center justify-center rounded-3xl bg-[var(--gc-panel-float)] p-4">
                <ThrowIcon throwValue={choice} />
              </span>
              <span className="text-2xl font-black uppercase tracking-[-0.06em]">{labels[choice]}</span>
              <span className="rounded-full bg-[var(--gc-accent)] px-3 py-2 text-xs font-black uppercase tracking-[0.16em] text-[var(--gc-accent-ink)]">
                Throw
              </span>
            </button>
          ))}
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

function RoundCard(props: { label: string; throwValue?: Throw | null; mirrored?: boolean }) {
  return (
    <div className="rounded-[var(--gc-radius)] bg-[var(--gc-panel-soft)] p-5 text-center">
      <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--gc-muted)]">{props.label}</p>
      {props.throwValue ? (
        <div className="mt-4 flex min-h-40 flex-col items-center justify-center gap-3">
          <span className="relative flex h-32 w-32 items-center justify-center rounded-3xl bg-[var(--gc-panel-float)] p-4">
            <ThrowIcon throwValue={props.throwValue} mirrored={props.mirrored} />
          </span>
          <p className="text-2xl font-black uppercase tracking-[0.04em]">{labels[props.throwValue]}</p>
        </div>
      ) : (
        <div className="mt-4 flex min-h-40 flex-col items-center justify-center gap-3">
          <span className="relative flex h-32 w-32 items-center justify-center rounded-3xl border-2 border-dashed border-[color:color-mix(in_srgb,var(--gc-ink)_28%,transparent)] bg-[var(--gc-panel-float)] text-4xl font-black text-[var(--gc-muted)]">
            ?
          </span>
          <p className="text-2xl font-black uppercase tracking-[0.04em]">Waiting</p>
        </div>
      )}
    </div>
  );
}

function ThrowIcon(props: { throwValue: Throw; mirrored?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={[
        "gc-rps-icon block h-full w-full",
      ].join(" ")}
      style={{
        transform: props.mirrored ? "scaleX(-1)" : undefined,
        WebkitMaskImage: `url(${icons[props.throwValue]})`,
        maskImage: `url(${icons[props.throwValue]})`,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        WebkitMaskSize: "contain",
        maskSize: "contain",
      }}
    />
  );
}

function ScoreChip({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl bg-[var(--gc-panel-strong)] px-4 py-4">
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

function burstConfetti() {
  void confetti({
    particleCount: 140,
    spread: 72,
    startVelocity: 48,
    origin: { y: 0.64 },
    zIndex: 9999,
  });
}
