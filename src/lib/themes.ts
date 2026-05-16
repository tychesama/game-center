import type React from "react";

export type GameTheme = {
  name: string;
  background: string;
  surface: string;
  ink: string;
  muted: string;
  accent: string;
  accentInk: string;
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
  chessPieceSet: "arcade" | "royal" | "festival";
  variables: Record<string, string>;
};

export const defaultTheme: GameTheme = {
  name: "arcade-lobby",
  background: "#fff1d6",
  surface: "#fffaf0",
  ink: "#21160b",
  muted: "#7b624a",
  accent: "#ffd447",
  accentInk: "#21160b",
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
  chessPieceSet: "arcade",
  variables: {
    "--gc-background": "#fff1d6",
    "--gc-surface": "#fffaf0",
    "--gc-surface-strong": "#fff3d8",
    "--gc-ink": "#21160b",
    "--gc-muted": "#6e5843",
    "--gc-accent": "#ffd447",
    "--gc-accent-ink": "#21160b",
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
    chessPieceSet: "royal",
    variables: {
      "--gc-background": "#10192f",
      "--gc-surface": "#233455",
      "--gc-surface-strong": "#30446d",
      "--gc-ink": "#f8fbff",
      "--gc-muted": "#e2ecff",
      "--gc-accent": "#6cf0ff",
      "--gc-accent-ink": "#08111f",
      "--gc-accent-strong": "#ff8a5b",
      "--gc-board-light": "#476595",
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
    chessPieceSet: "festival",
    variables: {
      "--gc-background": "#fff3fa",
      "--gc-surface": "#ffffff",
      "--gc-surface-strong": "#ffe3ef",
      "--gc-ink": "#2b1023",
      "--gc-muted": "#7d506d",
      "--gc-accent": "#ff5da2",
      "--gc-accent-ink": "#2b1023",
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
    accentInk: "#22180f",
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
    accentInk: "#2b1118",
    accentStrong: "#1f9e89",
    boardLight: "#ffd4dd",
    boardDark: "#141414",
    pieceLight: "#ffffff",
    pieceDark: "#e31b54",
    buttonBg: "#2b1118",
    buttonFg: "#fff7f8",
    radius: "1.8rem",
  },
  tictactoe: {
    name: "neon-grid",
    background: "#eef8ff",
    surface: "#ffffff",
    ink: "#17233a",
    muted: "#58708d",
    accent: "#66d9ff",
    accentInk: "#0a1930",
    accentStrong: "#ff8b5c",
    boardLight: "#d9f4ff",
    boardDark: "#8cbcd6",
    pieceLight: "#ffffff",
    pieceDark: "#17233a",
    buttonBg: "#17233a",
    buttonFg: "#f7fcff",
    radius: "1.5rem",
  },
  rps: {
    name: "party-burst",
    background: "#fff6dd",
    surface: "#fffdf6",
    ink: "#26190d",
    muted: "#7d644d",
    accent: "#ffb703",
    accentInk: "#26190d",
    accentStrong: "#219ebc",
    boardLight: "#ffe7a0",
    boardDark: "#ffb703",
    pieceLight: "#fffaf0",
    pieceDark: "#26190d",
    buttonBg: "#26190d",
    buttonFg: "#fffaf0",
    radius: "1.6rem",
  },
} satisfies Record<string, GameTheme>;

export function getActiveThemeName(): ThemePresetName {
  if (typeof window === "undefined") {
    return "arcade";
  }

  const saved = window.localStorage.getItem("game-center-theme");
  if (saved === "midnight" || saved === "festival" || saved === "arcade") {
    return saved;
  }

  return "arcade";
}

export function getActiveChessPieceSet() {
  return themePresets[getActiveThemeName()].chessPieceSet;
}

export function themeStyle(theme: GameTheme): React.CSSProperties {
  return {
    "--gc-background": theme.background,
    "--gc-surface": theme.surface,
    "--gc-ink": theme.ink,
    "--gc-muted": theme.muted,
    "--gc-accent": theme.accent,
    "--gc-accent-ink": theme.accentInk,
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
