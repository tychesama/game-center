"use client";

import { useState } from "react";

import { CheckersGame } from "@/components/checkers-game";
import { FeedbackPanel } from "@/components/feedback-panel";
import { GameShell } from "@/components/game-shell";
import type { Game } from "@/lib/games";

export function CheckersPageClient({ game }: { game: Game }) {
  const [feedback, setFeedback] = useState<string | null>(null);

  return (
    <GameShell
      game={game}
      feedback={<FeedbackPanel message={feedback} emptyLabel="Move prompts show here." />}
    >
      <CheckersGame onFeedbackChange={setFeedback} />
    </GameShell>
  );
}
