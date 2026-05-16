"use client";

import { useEffect, useState } from "react";

import {
  createInitialCheckersState,
  squareIsSelectable,
  tryCheckersMove,
  type CheckersColor,
} from "@/lib/checkers";

type Timers = {
  red: number;
  black: number;
};

const initialTimers: Timers = {
  red: 600,
  black: 600,
};

export function CheckersGame() {
  const [state, setState] = useState(createInitialCheckersState);
  const [timers, setTimers] = useState(initialTimers);
  const [dragSource, setDragSource] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (state.status.type !== "active") {
      return;
    }

    const interval = window.setInterval(() => {
      setTimers((current) => {
        const nextValue = current[state.turn] - 1;
        if (nextValue <= 0) {
          setState((previous) => ({
            ...previous,
            winner: previous.turn === "red" ? "black" : "red",
            status: {
              type: "win",
              winner: previous.turn === "red" ? "black" : "red",
              message: (previous.turn === "red" ? "Black" : "Red") + " wins on time",
            },
          }));
          return { ...current, [state.turn]: 0 };
        }

        return { ...current, [state.turn]: nextValue };
      });
    }, 1000);

    return () => window.clearInterval(interval);
  }, [state.turn, state.status.type, tick]);

  useEffect(() => {
    if (!feedback) {
      return;
    }

    const timeout = window.setTimeout(() => setFeedback(null), 1800);
    return () => window.clearTimeout(timeout);
  }, [feedback]);

  function selectOrMove(index: number) {
    if (state.status.type !== "active") {
      return;
    }

    if (state.selected !== null) {
      const before = state;
      setState((current) => tryCheckersMove(current, current.selected as number, index));
      if (!before.legalMoves.some((move) => move.from === before.selected && move.to === index)) {
        setFeedback("Illegal move.");
      }
      setTick((value) => value + 1);
      return;
    }

    if (squareIsSelectable(state, index)) {
      setState((current) => ({
        ...current,
        selected: index,
        status: { type: "active", message: labelForColor(current.turn) + " piece selected" },
      }));
      return;
    }

    const piece = state.board[index];
    setFeedback(piece ? "Wrong piece. It is " + labelForColor(state.turn) + " to move." : "No piece selected.");
  }

  function reset() {
    setState(createInitialCheckersState());
    setTimers(initialTimers);
    setTick(0);
  }

  return (
    <div className="relative grid w-full gap-6 xl:grid-cols-[minmax(0,1fr)_20rem]">
      <MoveFeedback message={feedback} />
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.14em] text-[var(--gc-muted)]">
              American checkers
            </p>
            <p className="mt-1 text-lg font-semibold">{state.status.message}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <TurnBadge side={state.turn} />
            <TimerCard label="Red" active={state.turn === "red" && state.status.type === "active"} seconds={timers.red} />
            <TimerCard label="Black" active={state.turn === "black" && state.status.type === "active"} seconds={timers.black} />
          </div>
        </div>

        <div className={["gc-board grid aspect-square grid-cols-8 overflow-hidden border-4 border-[var(--gc-ink)] bg-[var(--gc-board-light)] p-1 [box-shadow:var(--gc-board-shadow)]", dragSource !== null ? "cursor-none" : ""].join(" ")}>
          {state.board.map((piece, index) => {
            const row = Math.floor(index / 8);
            const col = index % 8;
            const dark = (row + col) % 2 === 1;
            const selected = state.selected === index;
            const target =
              state.selected !== null &&
              state.legalMoves.some((move) => move.from === state.selected && move.to === index);

            return (
              <button
                key={index}
                type="button"
                onClick={() => selectOrMove(index)}
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => {
                  event.preventDefault();
                  const from = Number(event.dataTransfer.getData("text/plain"));
                  if (!Number.isNaN(from)) {
                    setState((current) => tryCheckersMove(current, from, index));
                    setTick((value) => value + 1);
                  }
                  setDragSource(null);
                }}
                className={[
                  "relative flex aspect-square items-center justify-center transition",
                  dark ? "bg-[var(--gc-board-dark)]" : "bg-[var(--gc-board-light)]",
                  selected ? "ring-4 ring-[var(--gc-accent)] ring-inset" : "",
                  target ? "after:absolute after:h-4 after:w-4 after:rounded-full after:bg-[color:color-mix(in_srgb,var(--gc-accent)_70%,white)] after:content-['']" : "",
                ].join(" ")}
              >
                <span className="absolute left-1 top-1 font-mono text-[10px] font-bold uppercase text-[color:color-mix(in_srgb,var(--gc-ink)_40%,white)]">
                  {String.fromCharCode(97 + col)}
                  {8 - row}
                </span>
                {piece ? (
                  <span
                    draggable={piece.color === state.turn && state.status.type === "active"}
                  onDragStart={(event) => {
                    event.dataTransfer.setData("text/plain", String(index));
                    event.dataTransfer.effectAllowed = "move";
                    event.dataTransfer.setDragImage(createEmptyDragImage(), 0, 0);
                    setDragSource(index);
                  }}
                    onDragEnd={() => setDragSource(null)}
                    className={[
                      "gc-piece flex h-[72%] w-[72%] items-center justify-center border-2 border-[var(--gc-ink)] text-xl font-black shadow-[0_8px_18px_rgba(0,0,0,0.18)]",
                      piece.color === "red"
                        ? "bg-[var(--gc-piece-dark)] text-[var(--gc-piece-light)]"
                        : "bg-[var(--gc-piece-light)] text-[var(--gc-piece-dark)]",
                      dragSource === index ? "opacity-0 cursor-none" : "cursor-grab",
                    ].join(" ")}
                  >
                    {piece.king ? "K" : ""}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      </section>

      <aside className="gc-panel p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.14em]">Move log</p>
            <p className="mt-1 text-sm font-semibold text-[var(--gc-muted)]">
              Forced captures are enforced. Click or drag pieces to move.
            </p>
          </div>
          <button type="button" className="gc-button" onClick={reset}>
            Reset
          </button>
        </div>

        <ol className="mt-5 grid max-h-[28rem] gap-2 overflow-auto pr-1 text-sm">
          {state.history
            .slice()
            .reverse()
            .map((entry, index) => (
              <li
                key={entry + String(index)}
                className="rounded-2xl bg-[color:color-mix(in_srgb,var(--gc-surface-strong)_70%,white)] px-4 py-3 font-semibold"
              >
                {entry}
              </li>
            ))}
        </ol>
      </aside>
    </div>
  );
}

function TimerCard(props: { label: string; seconds: number; active: boolean }) {
  return (
    <div
      className={[
        "rounded-2xl border px-4 py-3 text-center",
        props.active
          ? "border-[var(--gc-accent)] bg-[color:color-mix(in_srgb,var(--gc-accent)_18%,white)]"
          : "border-[color:color-mix(in_srgb,var(--gc-ink)_18%,transparent)] bg-[color:color-mix(in_srgb,var(--gc-surface)_88%,white)]",
      ].join(" ")}
    >
      <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--gc-muted)]">
        {props.label}
      </p>
      <p className="mt-1 font-mono text-lg font-bold">{formatSeconds(props.seconds)}</p>
    </div>
  );
}

function formatSeconds(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0");
}

function labelForColor(color: CheckersColor) {
  return color === "red" ? "Red" : "Black";
}

function createEmptyDragImage() {
  const image = document.createElement("canvas");
  image.width = 1;
  image.height = 1;
  return image;
}

function MoveFeedback({ message }: { message: string | null }) {
  if (!message) {
    return null;
  }

  return (
    <div className="pointer-events-none absolute left-1/2 top-4 z-20 -translate-x-1/2 rounded-2xl border-2 border-[var(--gc-ink)] bg-[var(--gc-surface)] px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-[var(--gc-ink)] shadow-[var(--gc-card-shadow)]">
      {message}
    </div>
  );
}

function TurnBadge({ side }: { side: CheckersColor }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border-2 border-[var(--gc-ink)] bg-[var(--gc-surface)] px-4 py-3">
      <span
        className={[
          "h-5 w-5 rounded-full border-2 border-[var(--gc-ink)]",
          side === "red" ? "bg-[var(--gc-piece-dark)]" : "bg-[var(--gc-piece-light)]",
        ].join(" ")}
      />
      <span className="text-xs font-black uppercase tracking-[0.16em]">
        {labelForColor(side)} move
      </span>
    </div>
  );
}
