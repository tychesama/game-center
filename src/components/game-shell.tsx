import Link from "next/link";
import type React from "react";

import type { Game } from "@/lib/games";

type GameShellProps = {
  game: Game;
  children: React.ReactNode;
  insights?: {
    ruleset: string;
    focus: string;
    controls: string;
  };
  feedback?: React.ReactNode;
};

const defaultInsights = {
  ruleset:
    "Local two-player flow with timers, move validation, feedback, and end-state celebration.",
  focus: "Stable interaction first, then broader polish, tests, and deployment hardening.",
  controls: "Use either click-to-move or drag-and-drop. Legal targets preview while dragging.",
};

export function GameShell({ game, children, insights = defaultInsights, feedback }: GameShellProps) {
  return (
    <main
      data-game-theme={game.theme.name}
      style={
        {
          "--gc-game-accent": game.theme.accent,
          "--gc-game-accent-strong": game.theme.accentStrong,
        } as React.CSSProperties
      }
      className="relative min-h-[calc(100vh-5.5rem)] overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,color-mix(in_srgb,var(--gc-game-accent)_22%,transparent),transparent_24%),radial-gradient(circle_at_90%_20%,color-mix(in_srgb,var(--gc-game-accent-strong)_18%,transparent),transparent_26%),linear-gradient(180deg,color-mix(in_srgb,var(--gc-surface)_62%,var(--gc-background)),var(--gc-background))]" />
      <section className="relative mx-auto flex w-full max-w-[1440px] flex-col gap-6 px-6 py-6 sm:px-10 xl:px-12">
      <div className="grid gap-6 xl:grid-cols-[23rem_minmax(0,1fr)]">
        <aside className="gc-panel flex flex-col justify-between p-6">
          <div>
            <p className="font-mono text-sm font-bold uppercase tracking-[0.22em] text-[var(--gc-game-accent-strong)]">
              {game.eyebrow}
            </p>
            <h1 className="mt-3 text-5xl font-black leading-none tracking-[0]">
              {game.title}
            </h1>
            <p className="mt-5 text-base font-semibold leading-7 text-[var(--gc-muted)]">
              {game.description}
            </p>
          </div>

          <div className="mt-10 grid gap-3 text-sm font-black uppercase tracking-[0.16em]">
            <span className="rounded-full bg-[var(--gc-game-accent)] px-4 py-3 text-[var(--gc-accent-ink)]">
              {game.players}
            </span>
            <span className="rounded-full border-2 border-[var(--gc-ink)] px-4 py-3">
              {game.status}
            </span>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl border-2 border-[var(--gc-ink)] bg-[color:color-mix(in_srgb,var(--gc-surface)_76%,white)] px-4 py-4">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--gc-muted)]">
                  Input
                </p>
                <p className="mt-2 text-base font-black">Drag + Click</p>
              </div>
              <div className="rounded-2xl border-2 border-[var(--gc-ink)] bg-[color:color-mix(in_srgb,var(--gc-surface)_76%,white)] px-4 py-4">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--gc-muted)]">
                  Match
                </p>
                <p className="mt-2 text-base font-black">Local</p>
              </div>
            </div>
            <Link href="/" className="gc-button mt-3">
              Back to lobby
            </Link>
          </div>
        </aside>

        <div className="grid gap-6">
          <div className="gc-panel p-5">{children}</div>
          <div className="grid gap-4 xl:grid-cols-3">
            <div className="gc-panel p-5">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--gc-muted)]">
                Ruleset
              </p>
              <p className="mt-3 text-base font-semibold leading-7">
                {insights.ruleset}
              </p>
            </div>
            <div className="gc-panel p-5">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--gc-muted)]">
                Focus
              </p>
              <p className="mt-3 text-base font-semibold leading-7">
                {insights.focus}
              </p>
            </div>
            <div className="gc-panel p-5">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--gc-muted)]">
                Controls
              </p>
              <p className="mt-3 text-base font-semibold leading-7">
                {insights.controls}
              </p>
            </div>
          </div>
          {feedback ? <div className="gc-panel p-5">{feedback}</div> : null}
        </div>
      </div>
      </section>
    </main>
  );
}
