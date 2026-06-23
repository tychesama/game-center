import { gameThemes } from "./themes";

export type GameSlug =
  | "chess"
  | "checkers"
  | "tictactoe"
  | "rps"
  | "snackrush"
  | "future";

export type GamePreview = "board" | "tictactoe" | "rps" | "snackrush" | "locked";

export type Game = {
  slug: GameSlug;
  title: string;
  eyebrow: string;
  description: string;
  players: string;
  status: string;
  href?: string;
  locked?: boolean;
  preview?: GamePreview;
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
    preview: "tictactoe",
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
    preview: "rps",
    theme: gameThemes.rps,
  },
  {
    slug: "snackrush",
    title: "Snack Rush",
    eyebrow: "Candy chaos",
    description:
      "A bright candy-shop arcade slot for catching sweets, dodging rotten snacks, chaining skills, and chasing Sugar Rush scores.",
    players: "1 PLAYER",
    status: "New slot",
    href: "/snackrush",
    preview: "snackrush",
    theme: gameThemes.snackrush,
  },
  {
    slug: "future",
    title: "Future Game",
    eyebrow: "Cabinet locked",
    description:
      "A reserved mystery slot for whatever strange little game joins the cabinet next.",
    players: "TBA",
    status: "Locked",
    locked: true,
    preview: "locked",
    theme: gameThemes.future,
  },
];

export function getGame(slug: GameSlug) {
  return games.find((game) => game.slug === slug);
}
