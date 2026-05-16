import { GameShell } from "@/components/game-shell";
import { RpsGame } from "@/components/rps-game";
import { getGame } from "@/lib/games";

export default function RpsPage() {
  const game = getGame("rps");

  if (!game) {
    return null;
  }

  return (
    <GameShell
      game={game}
      insights={{
        ruleset: "Rock, paper, scissors against a randomizing arcade rival with ongoing round scoring.",
        focus: "A fast extra mode that broadens the lobby without needing heavy board logic.",
        controls: "Pick a throw card and the bot answers immediately.",
      }}
    >
      <RpsGame />
    </GameShell>
  );
}
