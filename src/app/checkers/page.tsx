import { CheckersGame } from "@/components/checkers-game";
import { GameShell } from "@/components/game-shell";
import { getGame } from "@/lib/games";

export default function CheckersPage() {
  const game = getGame("checkers");

  if (!game) {
    return null;
  }

  return (
    <GameShell game={game}>
      <CheckersGame />
    </GameShell>
  );
}
