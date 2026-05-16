"use client";

import { useState } from "react";

import { ChessGame } from "@/components/chess-game";
import { FeedbackPanel } from "@/components/feedback-panel";
import { GameShell } from "@/components/game-shell";
import type { Game } from "@/lib/games";

export function ChessPageClient({ game }: { game: Game }) {
  const [feedback, setFeedback] = useState<string | null>(null);

  return (
    <GameShell
      game={game}
      feedback={<FeedbackPanel message={feedback} emptyLabel="Move prompts show here." />}
    >
      <ChessGame onFeedbackChange={setFeedback} />
    </GameShell>
  );
}
