"use client";

import { useThemePreset } from "@/components/theme-provider";
import { themePresetList, type ThemePresetName } from "@/lib/themes";

export function ThemeSwitcher() {
  const { activeTheme, setThemeName } = useThemePreset();

  return (
    <label className="flex items-center gap-3">
      <span className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--gc-muted)]">
        Theme rig
      </span>
      <select
        aria-label="Select site theme"
        value={activeTheme.name}
        onChange={(event) => setThemeName(event.target.value as ThemePresetName)}
        className="gc-select"
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
