"use client";

import type React from "react";

import { boardSquares, isDarkSquare } from "@/lib/board";

export type RenderPieceArgs = {
  squareId: string;
  row: number;
  col: number;
};

type GameBoardProps = {
  label: string;
  selectedSquare: string | null;
  legalTargets: string[];
  lastMove?: string[];
  disabledSquares?: string[];
  onSquareClick: (squareId: string) => void;
  onDropPiece: (from: string, to: string) => void;
  renderPiece: (args: RenderPieceArgs) => React.ReactNode;
};

export function GameBoard({
  label,
  selectedSquare,
  legalTargets,
  lastMove = [],
  disabledSquares = [],
  onSquareClick,
  onDropPiece,
  renderPiece,
}: GameBoardProps) {
  return (
    <div
      aria-label={label}
      className="gc-board grid aspect-square w-full max-w-[42rem] grid-cols-8 overflow-hidden border-4 border-[var(--gc-ink)] bg-[var(--gc-board-light)] p-1 [box-shadow:var(--gc-board-shadow)]"
      role="grid"
    >
      {boardSquares().map((square) => {
        const dark = isDarkSquare(square.row, square.col);
        const selected = selectedSquare === square.id;
        const legal = legalTargets.includes(square.id);
        const recent = lastMove.includes(square.id);
        const disabled = disabledSquares.includes(square.id);

        return (
          <button
            key={square.id}
            aria-label={`Square ${square.id}`}
            className={[
              "relative grid aspect-square place-items-center border-0 p-0 transition",
              dark ? "bg-[var(--gc-board-dark)]" : "bg-[var(--gc-board-light)]",
              selected ? "ring-4 ring-inset ring-[var(--gc-accent)]" : "",
              recent ? "after:absolute after:inset-2 after:rounded-xl after:border-2 after:border-[var(--gc-accent)]" : "",
              disabled ? "cursor-not-allowed opacity-70" : "cursor-pointer hover:brightness-110",
            ].join(" ")}
            disabled={disabled}
            onClick={() => onSquareClick(square.id)}
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => {
              event.preventDefault();
              const from = event.dataTransfer.getData("text/plain");
              if (from) {
                onDropPiece(from, square.id);
              }
            }}
            role="gridcell"
            type="button"
          >
            {legal ? (
              <span className="pointer-events-none absolute h-4 w-4 rounded-full bg-[var(--gc-accent)] shadow-[0_0_0_3px_color-mix(in_srgb,var(--gc-ink)_45%,transparent)]" />
            ) : null}
            {renderPiece({ ...square, squareId: square.id })}
          </button>
        );
      })}
    </div>
  );
}

export function DraggablePiece({
  squareId,
  children,
  className,
}: {
  squareId: string;
  children: React.ReactNode;
  className: string;
}) {
  return (
    <span
      className={className}
      draggable
      onDragStart={(event) => {
        event.dataTransfer.setData("text/plain", squareId);
        event.dataTransfer.effectAllowed = "move";
      }}
    >
      {children}
    </span>
  );
}
