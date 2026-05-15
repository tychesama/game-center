import { BoardPreview } from "@/components/board-preview";
import { GameShell } from "@/components/game-shell";
import { getGame } from "@/lib/games";

export default function ChessPage() {
  const game = getGame("chess");

  if (!game) {
    return null;
  }

  return (
    <GameShell game={game}>
      <BoardPreview variant="chess" />
    </GameShell>
  );
}
