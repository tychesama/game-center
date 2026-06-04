"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useSyncExternalStore } from "react";

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
const themeChangeEvent = "game-center-theme-change";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const themeName = useSyncExternalStore(subscribeToThemeChanges, getThemeSnapshot, getThemeServerSnapshot);

  const setThemeName = useCallback((name: ThemePresetName) => {
    window.localStorage.setItem(storageKey, name);
    window.dispatchEvent(new Event(themeChangeEvent));
  }, []);

  useEffect(() => {
    const theme = themePresets[themeName];
    const root = document.documentElement;

    Object.entries(theme.variables).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });

    root.dataset.buttonStyle = theme.buttonStyle;
    root.dataset.boardStyle = theme.boardStyle;
    root.dataset.pieceStyle = theme.pieceStyle;
    root.dataset.themePreset = theme.name;
  }, [themeName]);

  const value = useMemo(
    () => ({
      activeTheme: themePresets[themeName],
      setThemeName,
    }),
    [setThemeName, themeName],
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

function subscribeToThemeChanges(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(themeChangeEvent, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(themeChangeEvent, onStoreChange);
  };
}

function getThemeSnapshot(): ThemePresetName {
  const saved = window.localStorage.getItem(storageKey) as ThemePresetName | null;
  return saved && themePresets[saved] ? saved : defaultThemePreset.name;
}

function getThemeServerSnapshot(): ThemePresetName {
  return defaultThemePreset.name;
}
