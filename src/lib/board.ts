export type BoardSide = "white" | "black" | "red";

export type BoardSquare = {
  row: number;
  col: number;
  id: string;
};

export function boardSquares(size = 8): BoardSquare[] {
  return Array.from({ length: size * size }, (_, index) => {
    const row = Math.floor(index / size);
    const col = index % size;

    return {
      row,
      col,
      id: squareId(row, col),
    };
  });
}

export function squareId(row: number, col: number) {
  return `${row}-${col}`;
}

export function parseSquareId(id: string) {
  const [row, col] = id.split("-").map(Number);
  return { row, col };
}

export function isDarkSquare(row: number, col: number) {
  return (row + col) % 2 === 1;
}

