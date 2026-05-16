"use client";

import confetti from "canvas-confetti";
import { useEffect, useMemo, useRef, useState } from "react";

type Cell = "X" | "O" | null;
type Winner = "player" | "bot" | "draw" | null;

const winningLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export function TicTacToeGame() {
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(null));
  const [status, setStatus] = useState("Your move");
  const [winner, setWinner] = useState<Winner>(null);
  const [score, setScore] = useState({ player: 0, bot: 0, draw: 0 });
  const celebrationKey = useRef<string | null>(null);

  const winningLine = useMemo(() => findWinningLine(board), [board]);

  useEffect(() => {
    if (!winner) {
      return;
    }

    const key = winner + "-" + board.join("");
    if (celebrationKey.current === key) {
      return;
    }

    celebrationKey.current = key;
    if (winner === "player") {
      void confetti({ particleCount: 120, spread: 75, origin: { y: 0.6 }, zIndex: 9999 });
    }
  }, [board, winner]);

  function handleSelect(index: number) {
    if (board[index] || winner) {
      return;
    }

    const afterPlayer = board.slice();
    afterPlayer[index] = "X";

    const playerResult = resolveBoard(afterPlayer);
    if (playerResult) {
      finalizeRound(afterPlayer, playerResult);
      return;
    }

    setBoard(afterPlayer);
    setStatus("Arcade bot is thinking");

    window.setTimeout(() => {
      const botIndex = findBestMove(afterPlayer);
      const afterBot = afterPlayer.slice();
      afterBot[botIndex] = "O";
      const botResult = resolveBoard(afterBot);
      if (botResult) {
        finalizeRound(afterBot, botResult);
        return;
      }
      setBoard(afterBot);
      setStatus("Your move");
    }, 280);
  }

  function finalizeRound(nextBoard: Cell[], result: Exclude<Winner, null>) {
    setBoard(nextBoard);
    setWinner(result);
    setScore((current) => ({
      ...current,
      [result]: current[result] + 1,
    }));
    setStatus(
      result === "player" ? "You win" : result === "bot" ? "Arcade bot wins" : "Draw round",
    );
  }

  function resetRound() {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setStatus("Your move");
    celebrationKey.current = null;
  }

  return (
    <div className="grid w-full gap-6 xl:grid-cols-[minmax(0,1fr)_20rem]">
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.14em] text-[var(--gc-muted)]">
              Solo arcade duel
            </p>
            <p className="mt-1 text-lg font-semibold" aria-live="polite">
              {status}
            </p>
          </div>
          <div className="rounded-2xl border-2 border-[var(--gc-ink)] bg-[var(--gc-surface)] px-4 py-3 text-xs font-black uppercase tracking-[0.16em]">
            You are X
          </div>
        </div>

        <div className="gc-board mx-auto grid aspect-square w-full max-w-[42rem] grid-cols-3 gap-3 rounded-[calc(var(--gc-radius)+0.4rem)] border-4 border-[var(--gc-ink)] bg-[var(--gc-panel-soft)] p-3 [box-shadow:var(--gc-board-shadow)]">
          {board.map((cell, index) => {
            const highlighted = winningLine?.includes(index);
            return (
              <button
                key={index}
                type="button"
                onClick={() => handleSelect(index)}
                className={[
                  "flex aspect-square items-center justify-center rounded-[calc(var(--gc-radius)-0.2rem)] border-2 border-[var(--gc-ink)] transition sm:hover:-translate-y-1",
                  highlighted
                    ? "bg-[var(--gc-panel-accent-soft)]"
                    : "bg-[var(--gc-panel-float)]",
                ].join(" ")}
              >
                <Mark cell={cell} />
              </button>
            );
          })}
        </div>
      </section>

      <aside className="gc-panel p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.14em]">Scoreboard</p>
            <p className="mt-1 text-sm font-semibold text-[var(--gc-muted)]">
              Unbeatable bot. Short rounds.
            </p>
          </div>
          <button type="button" className="gc-button" onClick={resetRound}>
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

function ScoreChip({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl bg-[var(--gc-panel-strong)] px-4 py-4">
      <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--gc-muted)]">{label}</p>
      <p className="mt-2 text-3xl font-black">{value}</p>
    </div>
  );
}

function Mark({ cell }: { cell: Cell }) {
  if (cell === "X") {
    return (
      <svg viewBox="0 0 100 100" className="h-[78%] w-[78%]" aria-hidden="true">
        <path
          d="M22 22 L78 78 M78 22 L22 78"
          stroke="var(--gc-accent-strong)"
          strokeWidth="14"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (cell === "O") {
    return (
      <svg viewBox="0 0 100 100" className="h-[74%] w-[74%]" aria-hidden="true">
        <circle
          cx="50"
          cy="50"
          r="28"
          stroke="var(--gc-ink)"
          strokeWidth="14"
          fill="none"
        />
      </svg>
    );
  }

  return null;
}

function resolveBoard(board: Cell[]): Exclude<Winner, null> | null {
  const line = findWinningLine(board);
  if (line) {
    return board[line[0]] === "X" ? "player" : "bot";
  }
  return board.every(Boolean) ? "draw" : null;
}

function findWinningLine(board: Cell[]) {
  return winningLines.find(([a, b, c]) => board[a] && board[a] === board[b] && board[a] === board[c]) ?? null;
}

function findBestMove(board: Cell[]) {
  let bestScore = -Infinity;
  let bestMove = 0;

  for (let index = 0; index < board.length; index += 1) {
    if (board[index]) {
      continue;
    }

    const next = board.slice();
    next[index] = "O";
    const score = minimax(next, false);
    if (score > bestScore) {
      bestScore = score;
      bestMove = index;
    }
  }

  return bestMove;
}

function minimax(board: Cell[], isBotTurn: boolean): number {
  const result = resolveBoard(board);
  if (result === "bot") {
    return 1;
  }
  if (result === "player") {
    return -1;
  }
  if (result === "draw") {
    return 0;
  }

  if (isBotTurn) {
    let score = -Infinity;
    for (let index = 0; index < board.length; index += 1) {
      if (board[index]) {
        continue;
      }
      const next = board.slice();
      next[index] = "O";
      score = Math.max(score, minimax(next, false));
    }
    return score;
  }

  let score = Infinity;
  for (let index = 0; index < board.length; index += 1) {
    if (board[index]) {
      continue;
    }
    const next = board.slice();
    next[index] = "X";
    score = Math.min(score, minimax(next, true));
  }
  return score;
}
