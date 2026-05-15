type BoardPreviewProps = {
  variant: "chess" | "checkers";
};

const chessPieces = new Map([
  [0, "R"],
  [1, "N"],
  [2, "B"],
  [3, "Q"],
  [4, "K"],
  [5, "B"],
  [6, "N"],
  [7, "R"],
  [8, "P"],
  [9, "P"],
  [10, "P"],
  [11, "P"],
  [12, "P"],
  [13, "P"],
  [14, "P"],
  [15, "P"],
  [48, "P"],
  [49, "P"],
  [50, "P"],
  [51, "P"],
  [52, "P"],
  [53, "P"],
  [54, "P"],
  [55, "P"],
  [56, "R"],
  [57, "N"],
  [58, "B"],
  [59, "Q"],
  [60, "K"],
  [61, "B"],
  [62, "N"],
  [63, "R"],
]);

export function BoardPreview({ variant }: BoardPreviewProps) {
  return (
    <div className="w-full max-w-[38rem]">
      <div className="mb-4 flex items-center justify-between gap-3 font-mono text-xs font-bold uppercase tracking-[0.2em] text-[var(--gc-muted)]">
        <span>Placeholder board</span>
        <span>No rules yet</span>
      </div>
      <div className="gc-board grid aspect-square grid-cols-8 overflow-hidden border-4 border-[var(--gc-ink)] bg-[var(--gc-board-light)] p-1 [box-shadow:var(--gc-board-shadow)]">
        {Array.from({ length: 64 }, (_, index) => (
          <Square key={index} index={index} variant={variant} />
        ))}
      </div>
    </div>
  );
}

function Square({ index, variant }: { index: number; variant: BoardPreviewProps["variant"] }) {
  const row = Math.floor(index / 8);
  const col = index % 8;
  const isDark = (row + col) % 2 === 1;
  const checkerPiece = variant === "checkers" && isDark && (row < 3 || row > 4);
  const chessPiece = variant === "chess" ? chessPieces.get(index) : null;
  const isTopPiece = row < 3;

  return (
    <div
      className={
        isDark
          ? "grid place-items-center bg-[var(--gc-board-dark)]"
          : "grid place-items-center bg-[var(--gc-board-light)]"
      }
    >
      {checkerPiece ? (
        <span
          className={[
            "gc-piece h-3/5 w-3/5 border-2 border-[var(--gc-ink)]",
            isTopPiece
              ? "bg-[var(--gc-piece-dark)] shadow-[inset_0_-6px_0_rgba(0,0,0,0.22)]"
              : "bg-[var(--gc-piece-light)] shadow-[inset_0_-6px_0_rgba(0,0,0,0.12)]",
          ].join(" ")}
        />
      ) : null}
      {chessPiece ? (
        <span
          className={[
            "gc-piece grid h-3/5 w-3/5 place-items-center border-2 border-[var(--gc-ink)] font-mono text-xs font-bold sm:text-lg",
            index < 16
              ? "bg-[var(--gc-piece-dark)] text-[var(--gc-piece-light)]"
              : "bg-[var(--gc-piece-light)] text-[var(--gc-piece-dark)]",
          ].join(" ")}
        >
          {chessPiece}
        </span>
      ) : null}
    </div>
  );
}
