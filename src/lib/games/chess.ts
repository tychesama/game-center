import { Chess, type Color, type PieceSymbol, type Square } from "chess.js";

import { parseSquareId, squareId } from "@/lib/board";

export type ChessPiece = {
  color: Color;
  type: PieceSymbol;
};

export type ChessMoveResult = {
  game: Chess;
  ok: boolean;
  lastMove: string[];
  message: string;
};

export function createChessGame() {
  return new Chess();
}

export function cloneChessGame(game: Chess) {
  return new Chess(game.fen());
}

export function squareIdToChessSquare(id: string): Square {
  const { row, col } = parseSquareId(id);
  const file = String.fromCharCode(97 + col);
  const rank = 8 - row;

  return `${file}${rank}` as Square;
}

export function chessSquareToSquareId(square: Square) {
  const file = square.charCodeAt(0) - 97;
  const rank = Number(square[1]);

  return squareId(8 - rank, file);
}

export function getChessPiece(game: Chess, id: string): ChessPiece | null {
  return game.get(squareIdToChessSquare(id)) ?? null;
}

export function getChessLegalTargets(game: Chess, fromId: string) {
  const from = squareIdToChessSquare(fromId);

  return game
    .moves({ square: from, verbose: true })
    .map((move) => chessSquareToSquareId(move.to));
}

export function moveChessPiece(game: Chess, fromId: string, toId: string): ChessMoveResult {
  const next = cloneChessGame(game);
  const from = squareIdToChessSquare(fromId);
  const to = squareIdToChessSquare(toId);

  try {
    const move = next.move({ from, to, promotion: "q" });

    if (!move) {
      return {
        game,
        ok: false,
        lastMove: [],
        message: "Illegal move. The court rejects this nonsense.",
      };
    }

    return {
      game: next,
      ok: true,
      lastMove: [fromId, toId],
      message: describeChessState(next),
    };
  } catch {
    return {
      game,
      ok: false,
      lastMove: [],
      message: "Illegal move. Try one the rules actually permit.",
    };
  }
}

export function describeChessState(game: Chess) {
  if (game.isCheckmate()) {
    return `${game.turn() === "w" ? "Black" : "White"} wins by checkmate.`;
  }

  if (game.isDraw()) {
    return "Draw. Civilization survives, barely.";
  }

  if (game.isCheck()) {
    return `${game.turn() === "w" ? "White" : "Black"} is in check.`;
  }

  return `${game.turn() === "w" ? "White" : "Black"} to move.`;
}

export function getChessStatus(game: Chess, timedOutSide: "white" | "black" | null) {
  if (timedOutSide) {
    return `${timedOutSide === "white" ? "Black" : "White"} wins on time.`;
  }

  return describeChessState(game);
}
