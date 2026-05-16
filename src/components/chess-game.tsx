"use client";

import Image from "next/image";
import { Chess, type Square } from "chess.js";
import { useEffect, useMemo, useState } from "react";

import { getActiveChessPieceSet } from "@/lib/themes";

type Timers = {
  white: number;
  black: number;
};

type GameStatus =
  | { type: "active"; message: string }
  | { type: "finished"; message: string; winner: "white" | "black" | null };

const initialTimers: Timers = {
  white: 600,
  black: 600,
};

const pieceNameMap = {
  p: "pawn",
  r: "rook",
  n: "knight",
  b: "bishop",
  q: "queen",
  k: "king",
} as const;

export function ChessGame() {
  const [fen, setFen] = useState(new Chess().fen());
  const [selected, setSelected] = useState<Square | null>(null);
  const [legalTargets, setLegalTargets] = useState<Square[]>([]);
  const [status, setStatus] = useState<GameStatus>({ type: "active", message: "White to move" });
  const [timers, setTimers] = useState<Timers>(initialTimers);
  const [history, setHistory] = useState<string[]>([]);
  const [dragSource, setDragSource] = useState<Square | null>(null);
  const [moveCount, setMoveCount] = useState(0);

  const game = useMemo(() => new Chess(fen), [fen]);
  const board = game.board();
  const turn = game.turn() === "w" ? "white" : "black";
  const pieceSet = getActiveChessPieceSet();

  useEffect(() => {
    if (status.type !== "active") {
      return;
    }

    const interval = window.setInterval(() => {
      setTimers((current) => {
        const nextValue = current[turn] - 1;
        if (nextValue <= 0) {
          window.clearInterval(interval);
          setStatus({
            type: "finished",
            winner: turn === "white" ? "black" : "white",
            message: (turn === "white" ? "Black" : "White") + " wins on time",
          });
          return { ...current, [turn]: 0 };
        }

        return { ...current, [turn]: nextValue };
      });
    }, 1000);

    return () => window.clearInterval(interval);
  }, [status.type, turn, moveCount]);

  function handleSquareSelect(square: Square) {
    if (status.type !== "active") {
      return;
    }

    if (selected && legalTargets.includes(square)) {
      commitMove(selected, square);
      return;
    }

    const piece = game.get(square);
    if (!piece || piece.color !== game.turn()) {
      setSelected(null);
      setLegalTargets([]);
      return;
    }

    const moves = game.moves({ square, verbose: true }).map((move) => move.to);
    setSelected(square);
    setLegalTargets(moves);
  }

  function commitMove(from: Square, to: Square) {
    const next = new Chess(fen);
    const move = next.move({ from, to, promotion: "q" });
    if (!move) {
      setStatus({ type: "active", message: "Illegal move" });
      setSelected(null);
      setLegalTargets([]);
      return;
    }

    setFen(next.fen());
    setMoveCount((value) => value + 1);
    setSelected(null);
    setLegalTargets([]);
    setHistory((entries) => entries.concat(move.san));
    setStatus(resolveChessStatus(next));
  }

  function resetGame() {
    setFen(new Chess().fen());
    setSelected(null);
    setLegalTargets([]);
    setHistory([]);
    setMoveCount(0);
    setTimers(initialTimers);
    setStatus({ type: "active", message: "White to move" });
  }

  return (
    <div className="grid w-full gap-6 xl:grid-cols-[minmax(0,1fr)_20rem]">
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.14em] text-[var(--gc-muted)]">
              Standard chess
            </p>
            <p className="mt-1 text-lg font-semibold">{status.message}</p>
          </div>
          <div className="flex gap-3">
            <TimerCard label="White" active={turn === "white" && status.type === "active"} seconds={timers.white} />
            <TimerCard label="Black" active={turn === "black" && status.type === "active"} seconds={timers.black} />
          </div>
        </div>

        <div className="gc-board grid aspect-square grid-cols-8 overflow-hidden border-4 border-[var(--gc-ink)] bg-[var(--gc-board-light)] p-1 [box-shadow:var(--gc-board-shadow)]">
          {board.flatMap((row, rowIndex) =>
            row.map((piece, colIndex) => {
              const square = (String.fromCharCode(97 + colIndex) + String(8 - rowIndex)) as Square;
              const dark = (rowIndex + colIndex) % 2 === 1;
              const selectedHere = selected === square;
              const targetHere = legalTargets.includes(square);

              return (
                <button
                  key={square}
                  type="button"
                  onClick={() => handleSquareSelect(square)}
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={(event) => {
                    event.preventDefault();
                    const from = event.dataTransfer.getData("text/plain") as Square;
                    if (from) {
                      commitMove(from, square);
                    }
                    setDragSource(null);
                  }}
                  className={[
                    "relative flex aspect-square items-center justify-center transition",
                    dark ? "bg-[var(--gc-board-dark)]" : "bg-[var(--gc-board-light)]",
                    selectedHere ? "ring-4 ring-[var(--gc-accent)] ring-inset" : "",
                    targetHere ? "after:absolute after:h-4 after:w-4 after:rounded-full after:bg-[color:color-mix(in_srgb,var(--gc-accent)_70%,white)] after:content-['']" : "",
                  ].join(" ")}
                >
                  <span className="absolute left-1 top-1 font-mono text-[10px] font-bold uppercase text-[color:color-mix(in_srgb,var(--gc-ink)_40%,white)]">
                    {square}
                  </span>
                  {piece ? (
                    <span
                      draggable={status.type === "active" && piece.color === game.turn()}
                      onDragStart={(event) => {
                        event.dataTransfer.setData("text/plain", square);
                        setDragSource(square);
                      }}
                      onDragEnd={() => setDragSource(null)}
                      className={dragSource === square ? "scale-110 cursor-grab" : "cursor-grab"}
                    >
                      <Image
                        src={resolveChessPieceAsset(pieceSet, piece.color, piece.type)}
                        alt={(piece.color === "w" ? "White " : "Black ") + pieceNameMap[piece.type]}
                        width={72}
                        height={72}
                        className="h-[74%] w-[74%] object-contain drop-shadow-[0_6px_10px_rgba(0,0,0,0.35)]"
                        priority={rowIndex < 2 || rowIndex > 5}
                      />
                    </span>
                  ) : null}
                </button>
              );
            }),
          )}
        </div>
      </section>

      <aside className="gc-panel p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.14em]">Move log</p>
            <p className="mt-1 text-sm font-semibold text-[var(--gc-muted)]">
              Click a piece then a target square, or drag it.
            </p>
          </div>
          <button type="button" onClick={resetGame} className="gc-button">
            Reset
          </button>
        </div>

        <ol className="mt-5 grid max-h-[28rem] gap-2 overflow-auto pr-1 text-sm">
          {history.length === 0 ? (
            <li className="rounded-2xl bg-[color:color-mix(in_srgb,var(--gc-surface-strong)_70%,white)] px-4 py-3 font-semibold text-[var(--gc-muted)]">
              No moves yet.
            </li>
          ) : (
            history.map((move, index) => (
              <li
                key={move + String(index)}
                className="rounded-2xl bg-[color:color-mix(in_srgb,var(--gc-surface-strong)_70%,white)] px-4 py-3 font-semibold"
              >
                {index + 1}. {move}
              </li>
            ))
          )}
        </ol>
      </aside>
    </div>
  );
}

function resolveChessStatus(game: Chess): GameStatus {
  if (game.isCheckmate()) {
    return {
      type: "finished",
      winner: game.turn() === "w" ? "black" : "white",
      message: "Checkmate. " + (game.turn() === "w" ? "Black" : "White") + " wins",
    };
  }

  if (game.isStalemate()) {
    return { type: "finished", winner: null, message: "Draw by stalemate" };
  }

  if (game.isThreefoldRepetition()) {
    return { type: "finished", winner: null, message: "Draw by repetition" };
  }

  if (game.isInsufficientMaterial()) {
    return { type: "finished", winner: null, message: "Draw by insufficient material" };
  }

  if (game.isDraw()) {
    return { type: "finished", winner: null, message: "Draw" };
  }

  if (game.inCheck()) {
    return {
      type: "active",
      message: (game.turn() === "w" ? "White" : "Black") + " to move, in check",
    };
  }

  return {
    type: "active",
    message: (game.turn() === "w" ? "White" : "Black") + " to move",
  };
}

function resolveChessPieceAsset(
  pieceSet: "arcade" | "midnight" | "festival",
  color: "w" | "b",
  type: keyof typeof pieceNameMap,
) {
  const side = color === "w" ? "white" : "black";

  if (pieceSet === "arcade") {
    return "/assets/chess/set-arcade/chess_piece_2_" + side + "_" + pieceNameMap[type] + ".png";
  }

  const suffix = pieceSet === "midnight" ? "2" : "3";
  const pieceKey =
    type === "p"
      ? "pawn"
      : type === "r"
        ? "rook"
        : type === "n"
          ? "knight"
          : type === "b"
            ? "bishop"
            : type === "q"
              ? "queen"
              : "king";
  const sideKey = color === "w" ? "W" : "B";
  return "/assets/chess/set-" + pieceSet + "/" + pieceKey + sideKey + suffix + ".png";
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
