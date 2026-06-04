"use client";

import { useEffect, useRef, useState } from "react";

import { useThemePreset } from "@/components/theme-provider";
import { themePresetList, type ThemePresetName } from "@/lib/themes";
import { useSoundEffects } from "@/lib/use-sound-effects";

export function ThemeSwitcher() {
  const { activeTheme, setThemeName } = useThemePreset();
  const [themeOpen, setThemeOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const playSound = useSoundEffects();

  useEffect(() => {
    if (!themeOpen) {
      return;
    }

    function closeOnOutsideClick(event: PointerEvent) {
      if (!menuRef.current?.contains(event.target as Node)) {
        setThemeOpen(false);
      }
    }

    window.addEventListener("pointerdown", closeOnOutsideClick);
    return () => window.removeEventListener("pointerdown", closeOnOutsideClick);
  }, [themeOpen]);

  return (
    <div ref={menuRef} className="gc-games-menu relative" onMouseEnter={() => playSound("hover")}>
      <button
        type="button"
        className="gc-header-control gc-header-button cursor-pointer px-4"
        aria-label="Open theme menu"
        aria-expanded={themeOpen}
        onClick={() => {
          playSound("click");
          setThemeOpen((open) => !open);
        }}
      >
        <span className="h-2.5 w-2.5 rounded-full border border-[var(--gc-ink)] bg-[var(--gc-accent)]" />
        <span className="text-xs font-black uppercase tracking-[0.14em] text-[var(--gc-ink)]">
          Theme
        </span>
        <span className="text-xs font-black uppercase tracking-[0.14em] text-[var(--gc-ink)]">
          {activeTheme.label}
        </span>
        <span aria-hidden="true" className="text-sm leading-none">▾</span>
      </button>
      {themeOpen ? (
        <nav
          className="absolute right-0 top-[calc(100%+0.75rem)] z-40 grid min-w-60 gap-2 rounded-[var(--gc-radius)] border-2 border-[var(--gc-ink)] bg-[var(--gc-surface)] p-2 shadow-[var(--gc-card-shadow)]"
          aria-label="Themes"
        >
          {themePresetList.map((theme) => {
            const active = activeTheme.name === theme.name;
            return (
              <button
                key={theme.name}
                type="button"
                onClick={() => {
                  playSound("click");
                  setThemeName(theme.name as ThemePresetName);
                  setThemeOpen(false);
                }}
                className={[
                  "rounded-2xl px-4 py-3 text-left text-sm font-black uppercase tracking-[0.12em] transition hover:bg-[var(--gc-panel-accent-soft)]",
                  active ? "bg-[var(--gc-panel-accent-soft)] text-[var(--gc-ink)]" : "text-[var(--gc-muted)]",
                ].join(" ")}
              >
                {theme.label}
              </button>
            );
          })}
        </nav>
      ) : null}
    </div>
  );
}
