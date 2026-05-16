"use client";

import { useThemePreset } from "@/components/theme-provider";
import { themePresetList, type ThemePresetName } from "@/lib/themes";

export function ThemeSwitcher() {
  const { activeTheme, setThemeName } = useThemePreset();

  return (
    <label className="gc-header-control flex items-center gap-2 px-3 py-2">
      <span className="h-2.5 w-2.5 rounded-full border border-[var(--gc-ink)] bg-[var(--gc-accent)]" />
      <span className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--gc-muted)]">
        Theme
      </span>
      <select
        aria-label="Select site theme"
        value={activeTheme.name}
        onChange={(event) => setThemeName(event.target.value as ThemePresetName)}
        className="gc-select !border-0 !bg-transparent !p-0 text-xs"
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
