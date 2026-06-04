"use client";

import confetti from "canvas-confetti";
import { useEffect, useRef, useState } from "react";

import {
  createInitialCheckersState,
  squareIsSelectable,
  tryCheckersMove,
  type CheckersColor,
} from "@/lib/checkers";
import { useSoundEffects } from "@/lib/use-sound-effects";

type Timers = {
  red: number;
  black: number;
};

const initialTimers: Timers = {
  red: 600,
  black: 600,
};

export function CheckersGame(props: { onFeedbackChange?: (message: string | null) => void }) {
  const [state, setState] = useState(createInitialCheckersState);
  const [timers, setTimers] = useState(initialTimers);
  const [dragSource, setDragSource] = useState<number | null>(null);
  const [hoverTarget, setHoverTarget] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [clockStarted, setClockStarted] = useState(false);
  const celebrationKey = useRef<string | null>(null);
  const feedbackCooldownRef = useRef(false);
  const feedbackCooldownTimeoutRef = useRef<number | null>(null);
  const feedbackResetRef = useRef<number | null>(null);
  const playSound = useSoundEffects();

  useEffect(() => {
    if (state.status.type !== "active" || !clockStarted) {
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
              message: labelForColor(previous.turn === "red" ? "black" : "red") + " wins on time",
            },
          }));
          return { ...current, [state.turn]: 0 };
        }

        return { ...current, [state.turn]: nextValue };
      });
    }, 1000);

    return () => window.clearInterval(interval);
  }, [clockStarted, state.turn, state.status.type]);

  useEffect(() => {
    if (!feedback) {
      props.onFeedbackChange?.(null);
      return;
    }

    props.onFeedbackChange?.(feedback);
    const timeout = window.setTimeout(() => setFeedback(null), 13000);
    return () => window.clearTimeout(timeout);
  }, [feedback, props]);

  useEffect(() => {
    return () => {
      if (feedbackResetRef.current !== null) {
        window.clearTimeout(feedbackResetRef.current);
      }
      if (feedbackCooldownTimeoutRef.current !== null) {
        window.clearTimeout(feedbackCooldownTimeoutRef.current);
      }
    };
  }, []);

  function showFeedback(message: string) {
    if (feedbackCooldownRef.current) {
      return;
    }

    feedbackCooldownRef.current = true;
    feedbackCooldownTimeoutRef.current = window.setTimeout(() => {
      feedbackCooldownRef.current = false;
      feedbackCooldownTimeoutRef.current = null;
    }, 520);

    playSound("error");
    if (feedbackResetRef.current !== null) {
      window.clearTimeout(feedbackResetRef.current);
    }

    setFeedback(null);
    feedbackResetRef.current = window.setTimeout(() => {
      setFeedback(message);
      feedbackResetRef.current = null;
    }, 40);
  }

  useEffect(() => {
    if (state.status.type !== "win" || !state.status.winner) {
      return;
    }

    const key = state.status.winner + "-" + state.history.length;
    if (celebrationKey.current === key) {
      return;
    }

    celebrationKey.current = key;
    playSound("boardgameWin");
    burstConfetti();
  }, [playSound, state.history.length, state.status]);

  function selectOrMove(index: number) {
    if (state.status.type !== "active") {
      return;
    }

    if (state.selected !== null) {
      const before = state;
      const valid = before.legalMoves.some((move) => move.from === before.selected && move.to === index);
      setState((current) => tryCheckersMove(current, current.selected as number, index));
      if (valid) {
        playSound("boardgameTap");
        setClockStarted(true);
      } else {
        showFeedback("Illegal move.");
      }
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
    showFeedback(piece ? "Wrong piece. It is " + labelForColor(state.turn) + " to move." : "No piece selected.");
  }

  function reset() {
    playSound("click");
    setState(createInitialCheckersState());
    setTimers(initialTimers);
    setClockStarted(false);
    celebrationKey.current = null;
  }

  return (
    <div className="relative grid w-full gap-6 xl:grid-cols-[minmax(0,1fr)_20rem]">
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.14em] text-[var(--gc-muted)]">
              Checkers
            </p>
            <p className="mt-1 text-lg font-semibold" aria-live="polite">
              Aim for Victory!
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <TurnBadge side={state.turn} />
            <TimerCard label={labelForColor("red")} active={clockStarted && state.turn === "red" && state.status.type === "active"} seconds={timers.red} />
            <TimerCard label={labelForColor("black")} active={clockStarted && state.turn === "black" && state.status.type === "active"} seconds={timers.black} />
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
                onDragOver={(event) => {
                  event.preventDefault();
                  if (dragSource !== null && state.legalMoves.some((move) => move.from === dragSource && move.to === index)) {
                    setHoverTarget(index);
                  }
                }}
                onDrop={(event) => {
                  event.preventDefault();
                  const from = Number(event.dataTransfer.getData("text/plain"));
                  if (!Number.isNaN(from)) {
                    const valid = state.legalMoves.some((move) => move.from === from && move.to === index);
                    if (valid) {
                      playSound("boardgameTap");
                      setClockStarted(true);
                      setState((current) => tryCheckersMove(current, from, index));
                    } else {
                      showFeedback("Illegal move.");
                    }
                  }
                  setDragSource(null);
                  setHoverTarget(null);
                }}
                onDragEnter={() => {
                  if (dragSource !== null && state.legalMoves.some((move) => move.from === dragSource && move.to === index)) {
                    setHoverTarget(index);
                  }
                }}
                onDragLeave={() => {
                  if (hoverTarget === index) {
                    setHoverTarget(null);
                  }
                }}
                className={[
                  "relative flex aspect-square items-center justify-center transition",
                  dark ? "bg-[var(--gc-board-dark)]" : "bg-[var(--gc-board-light)]",
                  selected ? "ring-4 ring-[var(--gc-accent)] ring-inset" : "",
                  target ? "after:absolute after:h-4 after:w-4 after:rounded-full after:bg-[var(--gc-accent)] after:content-['']" : "",
                ].join(" ")}
              >
                <span className="absolute left-1 top-1 font-mono text-[10px] font-bold uppercase text-[color:color-mix(in_srgb,var(--gc-ink)_55%,transparent)]">
                  {String.fromCharCode(97 + col)}
                  {8 - row}
                </span>
                {piece ? (
                  <span
                    draggable={piece.color === state.turn && state.status.type === "active"}
                    onDragStart={(event) => {
                      event.dataTransfer.setData("text/plain", String(index));
                      event.dataTransfer.effectAllowed = "move";
                      setDragSource(index);
                      setState((current) => ({
                        ...current,
                        selected: index,
                        status: { type: "active", message: labelForColor(current.turn) + " piece selected" },
                      }));
                    }}
                    onDragEnd={() => {
                      setDragSource(null);
                      setHoverTarget(null);
                    }}
                    className={[
                      "gc-piece flex h-[72%] w-[72%] items-center justify-center border-2 border-[var(--gc-ink)] text-xl font-black shadow-[0_8px_18px_rgba(0,0,0,0.18)] transition duration-150 hover:scale-105",
                      piece.color === "red"
                        ? "bg-[var(--gc-piece-dark)] text-[var(--gc-piece-light)]"
                        : "bg-[var(--gc-piece-light)] text-[var(--gc-piece-dark)]",
                      dragSource === index ? "opacity-0 cursor-none" : "cursor-grab",
                    ].join(" ")}
                  >
                    {piece.king ? "K" : ""}
                  </span>
                ) : null}
                {!piece && dragSource !== null && hoverTarget === index && state.legalMoves.some((move) => move.from === dragSource && move.to === index) ? (
                  <span
                    className={[
                      "gc-piece pointer-events-none flex h-[72%] w-[72%] items-center justify-center border-2 border-[var(--gc-ink)] text-xl font-black opacity-75 shadow-[0_8px_18px_rgba(0,0,0,0.18)]",
                      state.board[dragSource]?.color === "red"
                        ? "bg-[var(--gc-piece-dark)] text-[var(--gc-piece-light)]"
                        : "bg-[var(--gc-piece-light)] text-[var(--gc-piece-dark)]",
                    ].join(" ")}
                  >
                    {state.board[dragSource]?.king ? "K" : ""}
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
                className="rounded-2xl bg-[var(--gc-panel-strong)] px-4 py-3 font-semibold"
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
        "min-w-[6.25rem] shrink-0",
        props.active
          ? "border-[var(--gc-accent)] bg-[var(--gc-panel-accent-soft)]"
          : "border-[color:color-mix(in_srgb,var(--gc-ink)_18%,transparent)] bg-[var(--gc-panel-soft)]",
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
  return color === "red" ? "Dark" : "Light";
}

function burstConfetti() {
  void confetti({
    particleCount: 150,
    spread: 80,
    startVelocity: 55,
    origin: { y: 0.6 },
    zIndex: 9999,
  });
}

function TurnBadge({ side }: { side: CheckersColor }) {
  return (
    <div className="flex shrink-0 items-center gap-3 rounded-2xl border-2 border-[var(--gc-ink)] bg-[var(--gc-surface)] px-4 py-3">
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
