import { GameCard } from "@/components/game-card";
import { games } from "@/lib/games";

export default function Home() {
  return (
    <main className="relative min-h-[calc(100vh-5.5rem)] overflow-hidden">
      <div className="gc-lobby-glow pointer-events-none absolute inset-0" />
      <section className="relative mx-auto flex min-h-[calc(100vh-5.5rem)] w-full max-w-7xl flex-col px-6 py-6 sm:px-10 lg:px-16">
        <div className="grid flex-1 items-start gap-10 py-6 xl:grid-cols-[1.08fr_0.92fr]">
          <div className="max-w-3xl">
            <p className="gc-chip mb-5 inline-flex">
              Pick a board, start the ritual
            </p>
            <h1 className="gc-midnight-stroke text-6xl font-black leading-[0.9] tracking-[-0.08em] sm:text-7xl lg:text-8xl">
              One lobby for dangerously civilized games.
            </h1>
            <p className="mt-7 max-w-2xl text-lg font-semibold leading-8 text-[var(--gc-muted)]">
              GameCenter is a playful board-game hub built for modular growth.
              Phase 2 brings real local chess, checkers, tic tac toe, and rock
              paper scissors into the cabinet without sacrificing the strange
              little carnival energy.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="gc-badge">Playable chess</span>
              <span className="gc-badge">Playable checkers</span>
              <span className="gc-badge">Solo quickplay modes</span>
              <span className="gc-badge">Drag or click</span>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="gc-panel p-4">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--gc-muted)]">
                  Modes
                </p>
                <p className="mt-2 text-3xl font-black">4</p>
              </div>
              <div className="gc-panel p-4">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--gc-muted)]">
                  Input
                </p>
                <p className="mt-2 text-3xl font-black">Drag + Click</p>
              </div>
              <div className="gc-panel p-4">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--gc-muted)]">
                  Themes
                </p>
                <p className="mt-2 text-3xl font-black">3</p>
              </div>
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
