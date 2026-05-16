import { gameThemes } from "./themes";

export type GameSlug = "chess" | "checkers" | "tictactoe" | "rps";

export type Game = {
  slug: GameSlug;
  title: string;
  eyebrow: string;
  description: string;
  players: string;
  status: string;
  href: string;
  theme: (typeof gameThemes)[GameSlug];
};

export const games: Game[] = [
  {
    slug: "chess",
    title: "Chess",
    eyebrow: "Royal tactics",
    description:
      "Full local chess with legal moves, captures, special rules, clocks, and a proper piece set.",
    players: "2 players",
    status: "Playable",
    href: "/chess",
    theme: gameThemes.chess,
  },
  {
    slug: "checkers",
    title: "Checkers",
    eyebrow: "Jump and crown",
    description:
      "American checkers with forced captures, multi-jumps, kinging, turn flow, and clocks.",
    players: "2 players",
    status: "Playable",
    href: "/checkers",
    theme: gameThemes.checkers,
  },
  {
    slug: "tictactoe",
    title: "Tic Tac Toe",
    eyebrow: "Pocket duel",
    description:
      "Fast solo rounds against an arcade bot with turn logic, win checks, and instant rematches.",
    players: "1 PLAYER vs BOT",
    status: "Playable",
    href: "/tictactoe",
    theme: gameThemes.tictactoe,
  },
  {
    slug: "rps",
    title: "Rock Paper Scissors",
    eyebrow: "Lucky throw",
    description:
      "Quick best-of chaos against a randomizing arcade rival with score tracking and round feedback.",
    players: "1 PLAYER vs BOT",
    status: "Playable",
    href: "/rps",
    theme: gameThemes.rps,
  },
];

export function getGame(slug: GameSlug) {
  return games.find((game) => game.slug === slug);
}
