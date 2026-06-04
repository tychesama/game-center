"use client";

import Image from "next/image";
import confetti from "canvas-confetti";
import { Chess, type Square } from "chess.js";
import { useEffect, useMemo, useRef, useState } from "react";

import { getActiveChessPieceSet } from "@/lib/themes";
import { useSoundEffects } from "@/lib/use-sound-effects";

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

export function ChessGame(props: { onFeedbackChange?: (message: string | null) => void }) {
  const [fen, setFen] = useState(new Chess().fen());
  const [selected, setSelected] = useState<Square | null>(null);
  const [legalTargets, setLegalTargets] = useState<Square[]>([]);
  const [status, setStatus] = useState<GameStatus>({ type: "active", message: "White to move" });
  const [timers, setTimers] = useState<Timers>(initialTimers);
  const [history, setHistory] = useState<string[]>([]);
  const [dragSource, setDragSource] = useState<Square | null>(null);
  const [hoverTarget, setHoverTarget] = useState<Square | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [moveCount, setMoveCount] = useState(0);
  const celebrationKey = useRef<string | null>(null);
  const playSound = useSoundEffects();

  const game = useMemo(() => new Chess(fen), [fen]);
  const board = game.board();
  const turn = game.turn() === "w" ? "white" : "black";
  const pieceSet = getActiveChessPieceSet();
  const pieceSizeClass = pieceSet === "arcade" ? "h-[104%] w-[104%]" : "h-[94%] w-[94%]";
  const draggedPiece = dragSource ? game.get(dragSource) : null;

  useEffect(() => {
    if (!feedback) {
      props.onFeedbackChange?.(null);
      return;
    }

    props.onFeedbackChange?.(feedback);
    const timeout = window.setTimeout(() => setFeedback(null), 1800);
    return () => window.clearTimeout(timeout);
  }, [feedback, props]);

  useEffect(() => {
    if (status.type !== "finished" || !status.winner) {
      return;
    }

    const key = status.winner + "-" + history.length;
    if (celebrationKey.current === key) {
      return;
    }

    celebrationKey.current = key;
    playSound("boardgameWin");
    burstConfetti();
  }, [history.length, playSound, status]);

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
      playSound("error");
      setFeedback(piece ? "Wrong color. It is " + turn + " to move." : "No piece selected.");
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
      playSound("error");
      setFeedback("Illegal move.");
      setSelected(null);
      setLegalTargets([]);
      return;
    }

    playSound("boardgameTap");
    setFen(next.fen());
    setMoveCount((value) => value + 1);
    setSelected(null);
    setLegalTargets([]);
    setHistory((entries) => entries.concat(move.san));
    setStatus(resolveChessStatus(next));
  }

  function legalTargetsForDrag() {
    if (!dragSource) {
      return [];
    }
    const piece = game.get(dragSource);
    if (!piece || piece.color !== game.turn()) {
      return [];
    }
    return game.moves({ square: dragSource, verbose: true }).map((move) => move.to);
  }

  const dragTargets = legalTargetsForDrag();

  function resetGame() {
    playSound("click");
    setFen(new Chess().fen());
    setSelected(null);
    setLegalTargets([]);
    setHistory([]);
    setMoveCount(0);
    celebrationKey.current = null;
    setTimers(initialTimers);
    setStatus({ type: "active", message: "White to move" });
  }

  return (
    <div className="relative grid w-full gap-6 xl:grid-cols-[minmax(0,1fr)_20rem]">
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.14em] text-[var(--gc-muted)]">
              Standard chess
            </p>
            <p className="mt-1 text-lg font-semibold" aria-live="polite">
              {status.message}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <TurnBadge side={turn} />
            <TimerCard label="White" active={turn === "white" && status.type === "active"} seconds={timers.white} />
            <TimerCard label="Black" active={turn === "black" && status.type === "active"} seconds={timers.black} />
          </div>
        </div>

        <div className={["gc-board grid aspect-square grid-cols-8 overflow-hidden border-4 border-[var(--gc-ink)] bg-[var(--gc-board-light)] p-1 [box-shadow:var(--gc-board-shadow)]", dragSource ? "cursor-none" : ""].join(" ")}>
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
                  onDragOver={(event) => {
                    event.preventDefault();
                    if (dragTargets.includes(square)) {
                      setHoverTarget(square);
                    }
                  }}
                  onDrop={(event) => {
                    event.preventDefault();
                    const from = event.dataTransfer.getData("text/plain") as Square;
                    if (from) {
                      const valid = game.moves({ square: from, verbose: true }).some((move) => move.to === square);
                      if (valid) {
                        commitMove(from, square);
                      } else {
                        playSound("error");
                        setFeedback("Illegal move.");
                      }
                    }
                    setDragSource(null);
                    setHoverTarget(null);
                  }}
                  onDragEnter={() => {
                    if (dragTargets.includes(square)) {
                      setHoverTarget(square);
                    }
                  }}
                  onDragLeave={() => {
                    if (hoverTarget === square) {
                      setHoverTarget(null);
                    }
                  }}
                  className={[
                    "relative flex aspect-square items-center justify-center transition",
                    dark ? "bg-[var(--gc-board-dark)]" : "bg-[var(--gc-board-light)]",
                    selectedHere ? "ring-4 ring-[var(--gc-accent)] ring-inset" : "",
                    targetHere ? "after:absolute after:h-4 after:w-4 after:rounded-full after:bg-[var(--gc-accent)] after:content-['']" : "",
                  ].join(" ")}
                >
                  <span className="absolute left-1 top-1 font-mono text-[10px] font-bold uppercase text-[color:color-mix(in_srgb,var(--gc-ink)_55%,transparent)]">
                    {square}
                  </span>
                  {piece ? (
                    <span
                      draggable={status.type === "active" && piece.color === game.turn()}
                      onDragStart={(event) => {
                        event.dataTransfer.setData("text/plain", square);
                        event.dataTransfer.effectAllowed = "move";
                        setDragSource(square);
                        setSelected(square);
                        setLegalTargets(game.moves({ square, verbose: true }).map((move) => move.to));
                      }}
                      onDragEnd={() => {
                        setDragSource(null);
                        setHoverTarget(null);
                      }}
                      className={[
                        "group/piece flex h-full w-full items-center justify-center",
                        dragSource === square ? "opacity-0 cursor-none" : "cursor-grab",
                      ].join(" ")}
                    >
                      <Image
                        src={resolveChessPieceAsset(pieceSet, piece.color, piece.type)}
                        alt={(piece.color === "w" ? "White " : "Black ") + pieceNameMap[piece.type]}
                        width={96}
                        height={96}
                        className={[
                          "block object-contain object-center drop-shadow-[0_6px_10px_rgba(0,0,0,0.35)] transition duration-150 group-hover/piece:scale-110 [image-rendering:auto]",
                          pieceSizeClass,
                        ].join(" ")}
                        priority={rowIndex < 2 || rowIndex > 5}
                      />
                    </span>
                  ) : null}
                  {!piece && dragSource && hoverTarget === square && dragTargets.includes(square) && draggedPiece ? (
                    <span className="pointer-events-none flex h-full w-full items-center justify-center">
                      <Image
                        src={resolveChessPieceAsset(pieceSet, draggedPiece.color, draggedPiece.type)}
                        alt=""
                        width={96}
                        height={96}
                        className={[
                          "block object-contain object-center opacity-75 drop-shadow-[0_6px_10px_rgba(0,0,0,0.2)]",
                          pieceSizeClass,
                        ].join(" ")}
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
            <li className="rounded-2xl bg-[var(--gc-panel-strong)] px-4 py-3 font-semibold text-[var(--gc-muted)]">
              No moves yet.
            </li>
          ) : (
            history.map((move, index) => (
              <li
                key={move + String(index)}
                className="rounded-2xl bg-[var(--gc-panel-strong)] px-4 py-3 font-semibold"
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

function burstConfetti() {
  void confetti({
    particleCount: 150,
    spread: 80,
    startVelocity: 55,
    origin: { y: 0.6 },
    zIndex: 9999,
  });
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
  pieceSet: "arcade" | "royal" | "festival",
  color: "w" | "b",
  type: keyof typeof pieceNameMap,
) {
  if (pieceSet === "arcade") {
    return "/assets/chess/set-arcade/" + color + type + ".png";
  }

  if (pieceSet === "royal") {
    const sideKey = color === "w" ? "w" : "b";
    return "/assets/chess/set-royal/" + sideKey + type + ".svg";
  }

  const suffix = "3";
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
  return "/assets/chess/set-festival/" + pieceKey + sideKey + suffix + ".png";
}

function TurnBadge({ side }: { side: "white" | "black" }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border-2 border-[var(--gc-ink)] bg-[var(--gc-surface)] px-4 py-3">
      <span
        className={[
          "h-5 w-5 rounded-full border-2 border-[var(--gc-ink)]",
          side === "white" ? "bg-[var(--gc-piece-light)]" : "bg-[var(--gc-piece-dark)]",
        ].join(" ")}
      />
      <span className="text-xs font-black uppercase tracking-[0.16em]">
        {side} move
      </span>
    </div>
  );
}

function TimerCard(props: { label: string; seconds: number; active: boolean }) {
  return (
    <div
      className={[
        "rounded-2xl border px-4 py-3 text-center",
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
