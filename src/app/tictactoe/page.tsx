import { GameShell } from "@/components/game-shell";
import { TicTacToeGame } from "@/components/tictactoe-game";
import { getGame } from "@/lib/games";

export default function TicTacToePage() {
  const game = getGame("tictactoe");

  if (!game) {
    return null;
  }

  return (
    <GameShell
      game={game}
      insights={{
        ruleset: "Classic three-in-a-row with a real solo bot, round detection, and instant reset flow.",
        focus: "Fast solo sessions that still feel intentional rather than placeholder content.",
        controls: "Tap any open cell. The bot responds automatically after your move.",
      }}
    >
      <TicTacToeGame />
    </GameShell>
  );
}
