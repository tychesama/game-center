import { gameThemes } from "./themes";

export type GameSlug = "chess" | "checkers";

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
      "A strategic shell for future move validation, clocks, notation, and piece skins.",
    players: "2 players",
    status: "Board shell ready",
    href: "/chess",
    theme: gameThemes.chess,
  },
  {
    slug: "checkers",
    title: "Checkers",
    eyebrow: "Jump and crown",
    description:
      "A fast baseline for stacked pieces, simple turn flow, and future capture rules.",
    players: "2 players",
    status: "Board shell ready",
    href: "/checkers",
    theme: gameThemes.checkers,
  },
];

export function getGame(slug: GameSlug) {
  return games.find((game) => game.slug === slug);
}
