import { isDarkSquare, parseSquareId, squareId } from "@/lib/board";

export type CheckersSide = "red" | "white";
export type CheckersPiece = {
  side: CheckersSide;
  king: boolean;
};

export type CheckersBoard = Record<string, CheckersPiece>;

export type CheckersMove = {
  from: string;
  to: string;
  captures?: string;
};

export type CheckersState = {
  board: CheckersBoard;
  turn: CheckersSide;
  forcedFrom: string | null;
  lastMove: string[];
  status: string;
  winner: CheckersSide | null;
};

const opponent = {
  red: "white",
  white: "red",
} satisfies Record<CheckersSide, CheckersSide>;

export function createCheckersState(): CheckersState {
  const board: CheckersBoard = {};

  for (let row = 0; row < 8; row += 1) {
    for (let col = 0; col < 8; col += 1) {
      if (!isDarkSquare(row, col)) {
        continue;
      }

      if (row < 3) {
        board[squareId(row, col)] = { side: "red", king: false };
      }

      if (row > 4) {
        board[squareId(row, col)] = { side: "white", king: false };
      }
    }
  }

  return {
    board,
    turn: "red",
    forcedFrom: null,
    lastMove: [],
    status: "Red to move. Captures are forced.",
    winner: null,
  };
}

export function getCheckersLegalMoves(state: CheckersState, from: string) {
  const piece = state.board[from];

  if (!piece || piece.side !== state.turn || state.winner) {
    return [];
  }

  if (state.forcedFrom && state.forcedFrom !== from) {
    return [];
  }

  const allCaptures = getAllCaptureMoves(state.board, state.turn);
  const moves = getPieceMoves(state.board, from, piece, allCaptures.length > 0);

  if (state.forcedFrom) {
    return moves.filter((move) => move.captures);
  }

  return allCaptures.length > 0 ? moves.filter((move) => move.captures) : moves;
}

export function getCheckersLegalTargets(state: CheckersState, from: string) {
  return getCheckersLegalMoves(state, from).map((move) => move.to);
}

export function moveCheckersPiece(state: CheckersState, from: string, to: string): CheckersState {
  const legalMove = getCheckersLegalMoves(state, from).find((move) => move.to === to);

  if (!legalMove) {
    return {
      ...state,
      status: "Illegal move. Standard American checkers is not decorative.",
    };
  }

  const movingPiece = state.board[from];
  const board = { ...state.board };
  delete board[from];

  if (legalMove.captures) {
    delete board[legalMove.captures];
  }

  const { row } = parseSquareId(to);
  const crowned = movingPiece.king || (movingPiece.side === "red" && row === 7) || (movingPiece.side === "white" && row === 0);
  board[to] = { ...movingPiece, king: crowned };

  const mustContinue = Boolean(
    legalMove.captures && getPieceMoves(board, to, board[to], true).some((move) => move.captures),
  );

  if (mustContinue) {
    return {
      ...state,
      board,
      forcedFrom: to,
      lastMove: [from, to],
      status: `${labelSide(state.turn)} must continue the jump.`,
    };
  }

  const nextTurn = opponent[state.turn];
  const winner = getWinner(board, nextTurn);

  return {
    board,
    turn: nextTurn,
    forcedFrom: null,
    lastMove: [from, to],
    status: winner ? `${labelSide(state.turn)} wins.` : `${labelSide(nextTurn)} to move.`,
    winner,
  };
}

function getWinner(board: CheckersBoard, nextTurn: CheckersSide) {
  const pieces = Object.values(board);

  if (!pieces.some((piece) => piece.side === nextTurn)) {
    return opponent[nextTurn];
  }

  if (getAllMoves(board, nextTurn).length === 0) {
    return opponent[nextTurn];
  }

  return null;
}

function getAllMoves(board: CheckersBoard, side: CheckersSide) {
  const captures = getAllCaptureMoves(board, side);

  if (captures.length > 0) {
    return captures;
  }

  return Object.entries(board).flatMap(([from, piece]) =>
    piece.side === side ? getPieceMoves(board, from, piece, false) : [],
  );
}

function getAllCaptureMoves(board: CheckersBoard, side: CheckersSide) {
  return Object.entries(board).flatMap(([from, piece]) =>
    piece.side === side ? getPieceMoves(board, from, piece, true).filter((move) => move.captures) : [],
  );
}

function getPieceMoves(board: CheckersBoard, from: string, piece: CheckersPiece, capturesOnly: boolean) {
  const { row, col } = parseSquareId(from);
  const directions = getDirections(piece);
  const moves: CheckersMove[] = [];

  directions.forEach(([rowDelta, colDelta]) => {
    const nextRow = row + rowDelta;
    const nextCol = col + colDelta;
    const jumpRow = row + rowDelta * 2;
    const jumpCol = col + colDelta * 2;
    const nextId = squareId(nextRow, nextCol);
    const jumpId = squareId(jumpRow, jumpCol);
    const adjacent = board[nextId];

    if (isOnBoard(jumpRow, jumpCol) && adjacent?.side === opponent[piece.side] && !board[jumpId]) {
      moves.push({ from, to: jumpId, captures: nextId });
    }

    if (!capturesOnly && isOnBoard(nextRow, nextCol) && !adjacent) {
      moves.push({ from, to: nextId });
    }
  });

  return moves;
}

function getDirections(piece: CheckersPiece) {
  if (piece.king) {
    return [
      [1, 1],
      [1, -1],
      [-1, 1],
      [-1, -1],
    ];
  }

  return piece.side === "red"
    ? [
        [1, 1],
        [1, -1],
      ]
    : [
        [-1, 1],
        [-1, -1],
      ];
}

function isOnBoard(row: number, col: number) {
  return row >= 0 && row < 8 && col >= 0 && col < 8;
}

export function labelSide(side: CheckersSide) {
  return side === "red" ? "Red" : "White";
}

