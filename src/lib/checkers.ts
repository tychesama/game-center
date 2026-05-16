export type CheckersColor = "red" | "black";

export type CheckersPiece = {
  color: CheckersColor;
  king: boolean;
};

export type CheckersBoard = Array<CheckersPiece | null>;

export type CheckersMove = {
  from: number;
  to: number;
  captures: number[];
};

export type CheckersStatus =
  | { type: "active"; message: string }
  | { type: "win"; winner: CheckersColor; message: string }
  | { type: "draw"; message: string };

export type CheckersState = {
  board: CheckersBoard;
  turn: CheckersColor;
  selected: number | null;
  legalMoves: CheckersMove[];
  mustContinueFrom: number | null;
  status: CheckersStatus;
  winner: CheckersColor | null;
  history: string[];
  lastMove: CheckersMove | null;
};

const BOARD_SIZE = 8;

export function createInitialCheckersState(): CheckersState {
  const board = createInitialBoard();
  return {
    board,
    turn: "red",
    selected: null,
    legalMoves: getLegalMoves(board, "red"),
    mustContinueFrom: null,
    status: { type: "active", message: "Dark to move" },
    winner: null,
    history: ["Game started"],
    lastMove: null,
  };
}

export function tryCheckersMove(
  state: CheckersState,
  from: number,
  to: number,
): CheckersState {
  if (state.status.type !== "active") {
    return state;
  }

  const legalMoves = state.mustContinueFrom !== null
    ? getLegalMoves(state.board, state.turn, state.mustContinueFrom)
    : getLegalMoves(state.board, state.turn);

  const move = legalMoves.find((candidate) => candidate.from === from && candidate.to === to);
  if (!move) {
    return {
      ...state,
      selected: from,
      legalMoves,
      status: { type: "active", message: "Illegal move" },
    };
  }

  const board = state.board.slice();
  const piece = board[from];
  if (!piece) {
    return state;
  }

  board[from] = null;
  move.captures.forEach((captureIndex) => {
    board[captureIndex] = null;
  });

  const promoted = shouldPromote(piece, to) ? { ...piece, king: true } : piece;
  board[to] = promoted;

  const moreCaptures = move.captures.length > 0 ? getCaptureMoves(board, to) : [];
  if (move.captures.length > 0 && moreCaptures.length > 0) {
    return {
      ...state,
      board,
      selected: to,
      legalMoves: moreCaptures,
      mustContinueFrom: to,
      lastMove: move,
      history: state.history.concat(describeCheckersMove(piece.color, move, promoted.king && !piece.king)),
      status: { type: "active", message: "Continue capture chain" },
    };
  }

  const nextTurn = state.turn === "red" ? "black" : "red";
  const nextMoves = getLegalMoves(board, nextTurn);
  if (countPieces(board, nextTurn) === 0 || nextMoves.length === 0) {
    return {
      ...state,
      board,
      turn: nextTurn,
      selected: null,
      legalMoves: [],
      mustContinueFrom: null,
      winner: state.turn,
      lastMove: move,
      history: state.history.concat(describeCheckersMove(piece.color, move, promoted.king && !piece.king)),
      status: { type: "win", winner: state.turn, message: labelForColor(state.turn) + " wins" },
    };
  }

  return {
    ...state,
    board,
    turn: nextTurn,
    selected: null,
    legalMoves: nextMoves,
    mustContinueFrom: null,
    lastMove: move,
    history: state.history.concat(describeCheckersMove(piece.color, move, promoted.king && !piece.king)),
    status: { type: "active", message: labelForColor(nextTurn) + " to move" },
  };
}

export function squareIsSelectable(state: CheckersState, index: number) {
  const piece = state.board[index];
  return !!piece && piece.color === state.turn && state.legalMoves.some((move) => move.from === index);
}

export function createInitialBoard(): CheckersBoard {
  return Array.from({ length: 64 }, (_, index) => {
    if (!isDarkSquare(index)) {
      return null;
    }

    const row = Math.floor(index / BOARD_SIZE);
    if (row < 3) {
      return { color: "black", king: false };
    }

    if (row > 4) {
      return { color: "red", king: false };
    }

    return null;
  });
}

export function getLegalMoves(
  board: CheckersBoard,
  turn: CheckersColor,
  forcedFrom?: number,
): CheckersMove[] {
  const pieces = board
    .map((piece, index) => ({ piece, index }))
    .filter((entry) => entry.piece?.color === turn)
    .filter((entry) => forcedFrom === undefined || forcedFrom === entry.index);

  const captureMoves = pieces.flatMap((entry) => getCaptureMoves(board, entry.index));
  if (captureMoves.length > 0) {
    return captureMoves;
  }

  return pieces.flatMap((entry) => getSimpleMoves(board, entry.index));
}

function getSimpleMoves(board: CheckersBoard, from: number): CheckersMove[] {
  const piece = board[from];
  if (!piece) {
    return [];
  }

  return getDirections(piece).flatMap(([rowStep, colStep]) => {
    const target = offsetIndex(from, rowStep, colStep);
    if (target === null || board[target]) {
      return [];
    }

    return [{ from, to: target, captures: [] }];
  });
}

function getCaptureMoves(board: CheckersBoard, from: number): CheckersMove[] {
  const piece = board[from];
  if (!piece) {
    return [];
  }

  return getDirections(piece).flatMap(([rowStep, colStep]) => {
    const middle = offsetIndex(from, rowStep, colStep);
    const landing = offsetIndex(from, rowStep * 2, colStep * 2);
    if (middle === null || landing === null) {
      return [];
    }

    const middlePiece = board[middle];
    if (!middlePiece || middlePiece.color === piece.color || board[landing]) {
      return [];
    }

    return [{ from, to: landing, captures: [middle] }];
  });
}

function getDirections(piece: CheckersPiece) {
  if (piece.king) {
    return [
      [-1, -1],
      [-1, 1],
      [1, -1],
      [1, 1],
    ] as const;
  }

  return piece.color === "red"
    ? ([[-1, -1], [-1, 1]] as const)
    : ([[1, -1], [1, 1]] as const);
}

function offsetIndex(index: number, rowStep: number, colStep: number) {
  const row = Math.floor(index / BOARD_SIZE) + rowStep;
  const col = (index % BOARD_SIZE) + colStep;
  if (row < 0 || row >= BOARD_SIZE || col < 0 || col >= BOARD_SIZE) {
    return null;
  }
  return row * BOARD_SIZE + col;
}

function isDarkSquare(index: number) {
  return (Math.floor(index / BOARD_SIZE) + (index % BOARD_SIZE)) % 2 === 1;
}

function shouldPromote(piece: CheckersPiece, to: number) {
  const row = Math.floor(to / BOARD_SIZE);
  return (piece.color === "red" && row === 0) || (piece.color === "black" && row === 7);
}

function countPieces(board: CheckersBoard, color: CheckersColor) {
  return board.filter((piece) => piece?.color === color).length;
}

function labelForColor(color: CheckersColor) {
  return color === "red" ? "Dark" : "Light";
}

function describeCheckersMove(color: CheckersColor, move: CheckersMove, promoted: boolean) {
  const action = move.captures.length > 0 ? "captured" : "moved";
  const crown = promoted ? " and crowned" : "";
  return labelForColor(color) + " " + action + " " + squareLabel(move.from) + " to " + squareLabel(move.to) + crown;
}

function squareLabel(index: number) {
  const row = String(8 - Math.floor(index / BOARD_SIZE));
  const col = String.fromCharCode(97 + (index % BOARD_SIZE));
  return col + row;
}
