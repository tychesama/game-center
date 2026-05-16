import { ChessPageClient } from "@/components/chess-page-client";
import { getGame } from "@/lib/games";

export default function ChessPage() {
  const game = getGame("chess");

  if (!game) {
    return null;
  }

  return <ChessPageClient game={game} />;
}
