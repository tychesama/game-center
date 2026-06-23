"use client";

import { getGame } from "@/lib/games";
import { themeStyle } from "@/lib/themes";
import { useSoundEffects } from "@/lib/use-sound-effects";

const showcasePanels = [
  {
    title: "What SnackRush is",
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
      style={themeStyle(game.theme)}
      className="relative min-h-[calc(100vh-5.5rem)] overflow-hidden bg-[var(--gc-background)] text-[var(--gc-ink)]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_9%_17%,rgba(255,47,145,0.38)_0_11%,transparent_12%),radial-gradient(circle_at_91%_13%,rgba(49,214,255,0.42)_0_12%,transparent_13%),linear-gradient(135deg,#ff89de_0%,#ffd080_28%,#fff58c_48%,#8df7ff_74%,#b393ff_100%)]" />
      <div className="pointer-events-none absolute left-[3%] top-[8rem] text-8xl opacity-18 blur-[1px] drop-shadow-[0_18px_2px_rgba(43,18,57,0.14)]">
        🍬
      </div>
      <div className="pointer-events-none absolute bottom-10 right-[6%] text-8xl opacity-18 blur-[1px] drop-shadow-[0_18px_2px_rgba(43,18,57,0.14)]">
        🍭
      </div>

      <section className="relative mx-auto flex min-h-[calc(100vh-5.5rem)] w-full max-w-[1500px] flex-col justify-center px-5 py-8 sm:px-8 lg:px-12">
        <div className="relative overflow-hidden rounded-[2.4rem] border-[7px] border-[#2b1239] bg-[linear-gradient(180deg,rgba(255,255,255,0.97),rgba(255,243,252,0.96))] px-5 py-8 shadow-[0_18px_0_#2b1239,0_30px_42px_rgba(43,18,57,0.26)] sm:px-8 lg:px-12 lg:py-11">
          <div className="pointer-events-none absolute inset-5 rounded-[1.7rem] border-[3px] border-dashed border-[#ffb6d8]/60" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-[repeating-linear-gradient(90deg,rgba(255,91,189,0.2)_0_36px,rgba(255,244,107,0.24)_36px_72px,rgba(49,214,255,0.2)_72px_108px,rgba(154,109,255,0.19)_108px_144px)]" />
          <div className="pointer-events-none absolute left-10 top-10 text-4xl text-[#fff46b] opacity-75 drop-shadow-[3px_3px_0_#2b1239]">
            ✦
          </div>
          <div className="pointer-events-none absolute right-12 top-16 text-4xl text-[#fff46b] opacity-75 drop-shadow-[3px_3px_0_#2b1239]">
            ✦
          </div>

          <div className="relative mx-auto flex w-fit items-center justify-center gap-4">
            <span className="hidden rounded-full border-[4px] border-[#2b1239] bg-[#fff46b] p-3 text-4xl shadow-[0_7px_0_#2b1239] transition sm:inline-grid">
              🍭
            </span>
            <h1 className="text-center text-6xl font-black leading-[0.85] tracking-[-0.08em] text-[#ffb000] [text-shadow:4px_4px_0_#ff2f91,8px_8px_0_#31d6ff,11px_11px_0_#2b1239] sm:text-7xl lg:text-8xl">
              SnackRush
            </h1>
            <span className="hidden rounded-full border-[4px] border-[#2b1239] bg-[#31d6ff] p-3 text-4xl shadow-[0_7px_0_#2b1239] transition sm:inline-grid">
              🍬
            </span>
          </div>

          <div className="relative mt-10 grid gap-6 lg:grid-cols-3 lg:items-stretch">
            {showcasePanels.map((panel) => (
              <article
                key={panel.title}
                onMouseEnter={() => playSound("hover")}
                className="group rounded-[1.7rem] border-[4px] border-[#2b1239] bg-[linear-gradient(135deg,rgba(255,255,255,0.96),rgba(255,244,252,0.94))] p-4 shadow-[7px_7px_0_#2b1239] transition duration-200 hover:-translate-y-1 hover:shadow-[10px_10px_0_#2b1239,0_0_24px_rgba(255,47,145,0.22)]"
              >
                <div className="min-h-full overflow-hidden rounded-[1.15rem] border-[3px] border-[#2b1239] bg-[radial-gradient(circle_at_12%_12%,rgba(255,244,107,0.55)_0_38px,transparent_39px),linear-gradient(125deg,#fffbd0_0%,#fffdf4_45%,#ffeef8_100%)] p-6 shadow-[4px_4px_0_#2b1239] transition duration-200 group-hover:bg-[radial-gradient(circle_at_12%_12%,rgba(255,244,107,0.78)_0_38px,transparent_39px),linear-gradient(125deg,#fff8ae_0%,#fffdf4_45%,#ffe4f5_100%)]">
                  <div className="flex items-start gap-4">
                    <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border-[3px] border-[#2b1239] bg-white text-3xl shadow-[4px_4px_0_#2b1239] transition duration-200 group-hover:scale-105 group-hover:rotate-3" aria-hidden="true">
                      {panel.icon}
                    </span>
                    <h2 className="text-2xl font-black uppercase leading-tight tracking-[-0.03em] text-[#2b1239] sm:text-3xl">
                      {panel.title}
                    </h2>
                  </div>
                  <p className="mt-6 text-base font-extrabold leading-8 text-[#70457b] sm:text-lg">
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
                      className="mt-6 inline-flex w-full items-center justify-center rounded-2xl border-[3px] border-[#2b1239] bg-white px-4 py-3 text-center text-xs font-black uppercase tracking-[0.14em] text-[#2b1239] shadow-[5px_5px_0_#2b1239] transition hover:-translate-y-1 hover:bg-[#31d6ff] hover:shadow-[8px_8px_0_#2b1239]"
                    >
                      View GitHub repo ↗
                    </a>
                  ) : null}
                </div>
              </article>
            ))}
          </div>

          <div className="relative mx-auto mt-10 max-w-4xl rounded-[1.8rem] bg-[#ffe2f3]/80 p-3 shadow-[0_0_28px_rgba(255,255,255,0.44)] transition duration-200 hover:-translate-y-1 hover:bg-[#ffe2f3]">
            <a
              href="https://snackrush.joemidpan.com"
              target="_blank"
              rel="noreferrer"
              onClick={() => playSound("click")}
              onMouseEnter={() => playSound("hover")}
              className="inline-flex w-full items-center justify-center rounded-[1.35rem] border-[5px] border-[#2b1239] bg-[linear-gradient(90deg,#ff4fa4_0%,#ff8769_25%,#ffc93c_55%,#47dfff_100%)] px-6 py-5 text-center text-base font-black uppercase tracking-[0.22em] text-[#2b1239] shadow-[9px_9px_0_#2b1239,0_0_26px_rgba(255,47,145,0.35)] transition hover:-translate-y-1 hover:shadow-[13px_13px_0_#2b1239,0_0_38px_rgba(255,47,145,0.55)] sm:text-lg"
            >
              Visit snackrush.joemidpan.com ↗
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
