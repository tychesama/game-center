import { CheckersPageClient } from "@/components/checkers-page-client";
import { getGame } from "@/lib/games";

export default function CheckersPage() {
  const game = getGame("checkers");

  if (!game) {
    return null;
  }

  return <CheckersPageClient game={game} />;
}
