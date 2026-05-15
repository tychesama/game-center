import type React from "react";

export type GameTheme = {
  name: string;
  background: string;
  surface: string;
  ink: string;
  muted: string;
  accent: string;
  accentStrong: string;
  boardLight: string;
  boardDark: string;
  pieceLight: string;
  pieceDark: string;
  buttonBg: string;
  buttonFg: string;
  radius: string;
};

export type ThemePresetName = "arcade" | "midnight" | "festival";

export type ThemePreset = {
  name: ThemePresetName;
  label: string;
  buttonStyle: "chunky" | "sleek" | "soft";
  boardStyle: "grid" | "stage" | "arcade";
  pieceStyle: "classic" | "gem" | "ticket";
  variables: Record<string, string>;
};

export const defaultTheme: GameTheme = {
  name: "arcade-lobby",
  background: "#fff1d6",
  surface: "#fffaf0",
  ink: "#21160b",
  muted: "#7b624a",
  accent: "#ffd447",
  accentStrong: "#ff6b35",
  boardLight: "#f8dfaa",
  boardDark: "#2a9d8f",
  pieceLight: "#fff6df",
  pieceDark: "#231f20",
  buttonBg: "#21160b",
  buttonFg: "#fffaf0",
  radius: "1.4rem",
};

export const defaultThemePreset: ThemePreset = {
  name: "arcade",
  label: "Arcade Bloom",
  buttonStyle: "chunky",
  boardStyle: "arcade",
  pieceStyle: "classic",
  variables: {
    "--gc-background": "#fff1d6",
    "--gc-surface": "#fffaf0",
    "--gc-surface-strong": "#fff3d8",
    "--gc-ink": "#21160b",
    "--gc-muted": "#6e5843",
    "--gc-accent": "#ffd447",
    "--gc-accent-strong": "#ff6b35",
    "--gc-board-light": "#f8dfaa",
    "--gc-board-dark": "#2a9d8f",
    "--gc-piece-light": "#fff6df",
    "--gc-piece-dark": "#231f20",
    "--gc-button-bg": "#21160b",
    "--gc-button-fg": "#fffaf0",
    "--gc-radius": "1.4rem",
    "--gc-font-display": "var(--font-bricolage)",
    "--gc-board-shadow": "8px 8px 0 var(--gc-ink)",
    "--gc-card-shadow": "8px 8px 0 var(--gc-ink)",
  },
};

export const themePresets = {
  arcade: defaultThemePreset,
  midnight: {
    name: "midnight",
    label: "Midnight Cabinet",
    buttonStyle: "sleek",
    boardStyle: "stage",
    pieceStyle: "gem",
    variables: {
      "--gc-background": "#121a30",
      "--gc-surface": "#1e2a46",
      "--gc-surface-strong": "#223153",
      "--gc-ink": "#eef4ff",
      "--gc-muted": "#b9caef",
      "--gc-accent": "#6cf0ff",
      "--gc-accent-strong": "#ff8a5b",
      "--gc-board-light": "#314772",
      "--gc-board-dark": "#141d33",
      "--gc-piece-light": "#f7fffc",
      "--gc-piece-dark": "#ff8a5b",
      "--gc-button-bg": "#6cf0ff",
      "--gc-button-fg": "#121a30",
      "--gc-radius": "1.2rem",
      "--gc-font-display": "var(--font-fredoka)",
      "--gc-board-shadow": "0 20px 50px rgba(4, 9, 20, 0.45)",
      "--gc-card-shadow": "0 14px 40px rgba(4, 9, 20, 0.38)",
    },
  },
  festival: {
    name: "festival",
    label: "Festival Ticket",
    buttonStyle: "soft",
    boardStyle: "grid",
    pieceStyle: "ticket",
    variables: {
      "--gc-background": "#fff3fa",
      "--gc-surface": "#ffffff",
      "--gc-surface-strong": "#ffe3ef",
      "--gc-ink": "#2b1023",
      "--gc-muted": "#7d506d",
      "--gc-accent": "#ff5da2",
      "--gc-accent-strong": "#00a38c",
      "--gc-board-light": "#ffd7ea",
      "--gc-board-dark": "#00a38c",
      "--gc-piece-light": "#fff8fd",
      "--gc-piece-dark": "#2b1023",
      "--gc-button-bg": "#ff5da2",
      "--gc-button-fg": "#fff8fd",
      "--gc-radius": "1.8rem",
      "--gc-font-display": "var(--font-nunito)",
      "--gc-board-shadow": "10px 10px 0 var(--gc-accent-strong)",
      "--gc-card-shadow": "0 18px 38px rgba(255, 93, 162, 0.24)",
    },
  },
} satisfies Record<ThemePresetName, ThemePreset>;

export const themePresetList = Object.values(themePresets);

export const gameThemes = {
  chess: {
    name: "royal-clockwork",
    background: "#f2eadc",
    surface: "#fffaf0",
    ink: "#22180f",
    muted: "#715f4b",
    accent: "#d6a84f",
    accentStrong: "#6b2f1a",
    boardLight: "#f2d9b1",
    boardDark: "#4a2f20",
    pieceLight: "#fff8e7",
    pieceDark: "#17120d",
    buttonBg: "#4a2f20",
    buttonFg: "#fff8e7",
    radius: "1rem",
  },
  checkers: {
    name: "carnival-stack",
    background: "#ffe9ed",
    surface: "#fff7f8",
    ink: "#2b1118",
    muted: "#7d4c58",
    accent: "#ff477e",
    accentStrong: "#1f9e89",
    boardLight: "#ffd4dd",
    boardDark: "#141414",
    pieceLight: "#ffffff",
    pieceDark: "#e31b54",
    buttonBg: "#2b1118",
    buttonFg: "#fff7f8",
    radius: "1.8rem",
  },
} satisfies Record<string, GameTheme>;

export function themeStyle(theme: GameTheme): React.CSSProperties {
  return {
    "--gc-background": theme.background,
    "--gc-surface": theme.surface,
    "--gc-ink": theme.ink,
    "--gc-muted": theme.muted,
    "--gc-accent": theme.accent,
    "--gc-accent-strong": theme.accentStrong,
    "--gc-board-light": theme.boardLight,
    "--gc-board-dark": theme.boardDark,
    "--gc-piece-light": theme.pieceLight,
    "--gc-piece-dark": theme.pieceDark,
    "--gc-button-bg": theme.buttonBg,
    "--gc-button-fg": theme.buttonFg,
    "--gc-radius": theme.radius,
  } as React.CSSProperties;
}
