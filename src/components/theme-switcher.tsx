"use client";

import { useThemePreset } from "@/components/theme-provider";
import { themePresetList, type ThemePresetName } from "@/lib/themes";
import { useSoundEffects } from "@/lib/use-sound-effects";

export function ThemeSwitcher() {
  const { activeTheme, setThemeName } = useThemePreset();
  const playSound = useSoundEffects();

  return (
    <label className="gc-header-control gc-header-button flex items-center gap-2 px-4" onMouseEnter={() => playSound("hover")}>
      <span className="h-2.5 w-2.5 rounded-full border border-[var(--gc-ink)] bg-[var(--gc-accent)]" />
      <span className="text-xs font-black uppercase tracking-[0.14em] text-[var(--gc-ink)]">
        Theme
      </span>
      <select
        aria-label="Select site theme"
        value={activeTheme.name}
        onChange={(event) => {
          playSound("click");
          setThemeName(event.target.value as ThemePresetName);
        }}
        className="gc-select !border-0 !bg-transparent !p-0 text-xs font-black uppercase tracking-[0.14em] text-[var(--gc-ink)]"
      >
        {themePresetList.map((theme) => (
          <option key={theme.name} value={theme.name}>
            {theme.label}
          </option>
        ))}
      </select>
    </label>
  );
}
