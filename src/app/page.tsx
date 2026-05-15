import { GameCard } from "@/components/game-card";
import { games } from "@/lib/games";

export default function Home() {
  return (
    <main className="overflow-hidden">
      <section className="relative mx-auto flex min-h-[calc(100vh-5.5rem)] w-full max-w-7xl flex-col px-6 py-8 sm:px-10 lg:px-16">
        <div className="gc-lobby-glow pointer-events-none absolute inset-0 -z-0" />

        <div className="grid flex-1 items-center gap-10 py-10 lg:grid-cols-[1.04fr_0.96fr]">
          <div className="max-w-3xl">
            <p className="gc-chip mb-5 inline-flex">
              Pick a board, start the ritual
            </p>
            <h1 className="text-6xl font-black leading-[0.9] tracking-[-0.08em] sm:text-7xl lg:text-8xl">
              One lobby for dangerously civilized games.
            </h1>
            <p className="mt-7 max-w-2xl text-lg font-semibold leading-8 text-[var(--gc-muted)]">
              GameCenter is a playful board-game hub built for modular growth.
              Phase 1 locks the shell, theme engine, and game routes before real
              move logic starts landing.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="gc-badge">Chess shell</span>
              <span className="gc-badge">Checkers shell</span>
              <span className="gc-badge">Theme switcher live</span>
            </div>
          </div>

          <div className="grid gap-5">
            {games.map((game) => (
              <GameCard key={game.slug} game={game} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
