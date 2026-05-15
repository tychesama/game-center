"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

import {
  defaultThemePreset,
  themePresets,
  type ThemePreset,
  type ThemePresetName,
} from "@/lib/themes";

type ThemeContextValue = {
  activeTheme: ThemePreset;
  setThemeName: (name: ThemePresetName) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);
const storageKey = "game-center-theme";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeName, setThemeName] = useState<ThemePresetName>(() => {
    if (typeof window === "undefined") {
      return defaultThemePreset.name;
    }

    const saved = window.localStorage.getItem(storageKey) as ThemePresetName | null;
    return saved && themePresets[saved] ? saved : defaultThemePreset.name;
  });

  useEffect(() => {
    const theme = themePresets[themeName];
    const root = document.documentElement;

    Object.entries(theme.variables).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });

    root.dataset.buttonStyle = theme.buttonStyle;
    root.dataset.boardStyle = theme.boardStyle;
    root.dataset.pieceStyle = theme.pieceStyle;
    window.localStorage.setItem(storageKey, theme.name);
  }, [themeName]);

  const value = useMemo(
    () => ({
      activeTheme: themePresets[themeName],
      setThemeName,
    }),
    [themeName],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useThemePreset() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useThemePreset must be used inside ThemeProvider");
  }

  return context;
}
