import { describe, expect, it } from "vitest";

import {
  createInitialCheckersState,
  getLegalMoves,
  tryCheckersMove,
  type CheckersBoard,
} from "../src/lib/checkers";

describe("checkers rules", () => {
  it("starts with red turn", () => {
    const state = createInitialCheckersState();
    expect(state.turn).toBe("red");
    expect(state.status.type).toBe("active");
  });

  it("enforces forced captures over simple moves", () => {
    const board: CheckersBoard = Array(64).fill(null);
    board[26] = { color: "red", king: false };
    board[17] = { color: "black", king: false };
    const moves = getLegalMoves(board, "red");

    expect(moves.length).toBe(1);
    expect(moves[0]).toEqual({ from: 26, to: 8, captures: [17] });
  });

  it("switches turn after valid move", () => {
    let state = createInitialCheckersState();
    state = tryCheckersMove(state, 40, 33);
    expect(state.turn).toBe("black");
    expect(state.status.type).toBe("active");
  });
});
