"use client";

import { getGame } from "@/lib/games";
import { useSoundEffects } from "@/lib/use-sound-effects";

const showcasePanels = [
  {
    title: "What is it?",
    icon: "🍬",
    body: "SnackRush is a bright candy-shop arcade website built around a goofy, fast, playful game idea. It is meant to feel colorful, loud, readable, and instantly fun from the first screen.",
  },
  {
    title: "Why I built it",
    icon: "💡",
    body: "I built the site mostly for fun. I wanted my own game space where I could enjoy the mechanics, try ideas I personally like, and keep shaping the vibe without waiting on someone else's rules.",
  },
  {
    title: "Build + GitHub",
    icon: "🤖",
    body: "The project is mostly AI-generated work shaped through iteration. The site is built as a React/Vite web app with custom CSS, local browser state, and a GitHub repo tracking the source.",
    link: "https://github.com/tychesama/snack-rush",
  },
];

export default function SnackRushPage() {
  const game = getGame("snackrush");
  const playSound = useSoundEffects();

  if (!game) {
    return null;
  }

  return (
    <main
      className="relative min-h-[calc(100vh-5.5rem)] overflow-hidden bg-[var(--gc-background)] text-[var(--gc-ink)]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_14%,color-mix(in_srgb,var(--gc-accent)_22%,transparent),transparent_25%),radial-gradient(circle_at_88%_20%,color-mix(in_srgb,var(--gc-accent-strong)_18%,transparent),transparent_28%),linear-gradient(180deg,color-mix(in_srgb,var(--gc-surface)_58%,var(--gc-background)),var(--gc-background))]" />
      <div className="pointer-events-none absolute left-[3%] top-[8rem] text-8xl opacity-10 blur-[1px] drop-shadow-[0_18px_2px_color-mix(in_srgb,var(--gc-ink)_10%,transparent)]">
        🍬
      </div>
      <div className="pointer-events-none absolute bottom-10 right-[6%] text-8xl opacity-10 blur-[1px] drop-shadow-[0_18px_2px_color-mix(in_srgb,var(--gc-ink)_10%,transparent)]">
        🍭
      </div>

      <section className="relative mx-auto flex min-h-[calc(100vh-5.5rem)] w-full max-w-[1500px] flex-col justify-center px-5 py-8 sm:px-8 lg:px-12">
        <div className="relative overflow-hidden rounded-[calc(var(--gc-radius)+0.6rem)] border-2 border-[color-mix(in_srgb,var(--gc-ink)_82%,transparent)] bg-[color-mix(in_srgb,var(--gc-surface)_94%,white)] px-5 py-8 shadow-[var(--gc-card-shadow)] sm:px-8 lg:px-12 lg:py-11">
          <div className="pointer-events-none absolute inset-5 rounded-[calc(var(--gc-radius)+0.1rem)] border border-dashed border-[color-mix(in_srgb,var(--gc-accent)_40%,transparent)]" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(90deg,transparent,color-mix(in_srgb,var(--gc-accent)_60%,transparent),transparent)]" />
          <div className="pointer-events-none absolute left-10 top-10 text-4xl text-[var(--gc-accent)] opacity-40 drop-shadow-[2px_2px_0_color-mix(in_srgb,var(--gc-ink)_28%,transparent)]">
            ✦
          </div>
          <div className="pointer-events-none absolute right-12 top-16 text-4xl text-[var(--gc-accent)] opacity-40 drop-shadow-[2px_2px_0_color-mix(in_srgb,var(--gc-ink)_28%,transparent)]">
            ✦
          </div>

          <div className="relative mx-auto flex w-fit items-center justify-center gap-4">
            <span className="hidden rounded-full border-2 border-[var(--gc-ink)] bg-[var(--gc-panel-soft)] p-3 text-4xl shadow-[var(--gc-card-shadow)] transition sm:inline-grid">
              🍭
            </span>
            <h1 className="text-center text-6xl font-black leading-[0.9] tracking-[0] text-[var(--gc-ink)] [text-shadow:0_4px_0_color-mix(in_srgb,var(--gc-accent)_52%,transparent)] sm:text-7xl lg:text-8xl">
              SnackRush
            </h1>
            <span className="hidden rounded-full border-2 border-[var(--gc-ink)] bg-[var(--gc-panel-soft)] p-3 text-4xl shadow-[var(--gc-card-shadow)] transition sm:inline-grid">
              🍬
            </span>
          </div>

          <div className="relative mt-10 grid gap-6 lg:grid-cols-3 lg:items-stretch">
            {showcasePanels.map((panel) => (
              <article
                key={panel.title}
                className="group rounded-[calc(var(--gc-radius)+0.15rem)] border-2 border-[var(--gc-ink)] bg-[var(--gc-panel-float)] p-4 shadow-[var(--gc-card-shadow)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_18px_42px_color-mix(in_srgb,var(--gc-accent)_18%,transparent)]"
              >
                <div className="min-h-full overflow-hidden rounded-[calc(var(--gc-radius)-0.15rem)] border border-[color-mix(in_srgb,var(--gc-ink)_28%,transparent)] bg-[linear-gradient(135deg,var(--gc-panel-soft),var(--gc-surface))] p-6 transition duration-200 group-hover:bg-[linear-gradient(135deg,var(--gc-panel-strong),var(--gc-surface))]">
                  <div className="flex items-start gap-4">
                    <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border-2 border-[var(--gc-ink)] bg-[var(--gc-surface)] text-3xl shadow-[3px_3px_0_color-mix(in_srgb,var(--gc-ink)_70%,transparent)] transition duration-200 group-hover:scale-105" aria-hidden="true">
                      {panel.icon}
                    </span>
                    <h2 className="text-2xl font-black uppercase leading-tight tracking-[0] text-[var(--gc-ink)] sm:text-3xl">
                      {panel.title}
                    </h2>
                  </div>
                  <p className="mt-6 text-base font-bold leading-8 text-[var(--gc-muted)] sm:text-lg">
                    {panel.body}
                  </p>
                  {panel.link ? (
                    <a
                      href={panel.link}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => playSound("click")}
                      onMouseEnter={(event) => {
                        event.stopPropagation();
                        playSound("hover");
                      }}
                      className="gc-button mt-6 w-full text-center"
                    >
                      View GitHub repo ↗
                    </a>
                  ) : null}
                </div>
              </article>
            ))}
          </div>

          <div className="relative mx-auto mt-10 max-w-4xl transition duration-200 hover:-translate-y-1">
            <a
              href="https://snackrush.joemidpan.com"
              target="_blank"
              rel="noreferrer"
              onClick={() => playSound("click")}
              onMouseEnter={() => playSound("hover")}
              className="gc-button w-full px-6 py-5 text-center text-base tracking-[0.18em] sm:text-lg"
            >
              Visit snackrush.joemidpan.com ↗
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
