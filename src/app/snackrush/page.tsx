import { getGame } from "@/lib/games";
import { themeStyle } from "@/lib/themes";

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

  if (!game) {
    return null;
  }

  return (
    <main
      style={themeStyle(game.theme)}
      className="relative min-h-[calc(100vh-5.5rem)] overflow-hidden bg-[var(--gc-background)] text-[var(--gc-ink)]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_9%_17%,rgba(255,47,145,0.55)_0_12%,transparent_13%),radial-gradient(circle_at_91%_13%,rgba(49,214,255,0.62)_0_13%,transparent_14%),linear-gradient(135deg,#ff6dd5_0%,#ffc56d_26%,#fff46b_43%,#5ff4ff_70%,#9a6dff_100%)]" />
      <div className="pointer-events-none absolute left-[3%] top-[8rem] text-8xl opacity-25 blur-[1px] drop-shadow-[0_18px_2px_rgba(43,18,57,0.18)]">
        🍬
      </div>
      <div className="pointer-events-none absolute bottom-10 right-[6%] text-8xl opacity-25 blur-[1px] drop-shadow-[0_18px_2px_rgba(43,18,57,0.18)]">
        🍭
      </div>

      <section className="relative mx-auto flex min-h-[calc(100vh-5.5rem)] w-full max-w-[1500px] flex-col justify-center px-5 py-8 sm:px-8 lg:px-12">
        <div className="relative overflow-hidden rounded-[2.4rem] border-[8px] border-[#2b1239] bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(255,237,252,0.96))] px-5 py-8 shadow-[0_24px_0_#2b1239,0_38px_44px_rgba(43,18,57,0.35)] sm:px-8 lg:px-12 lg:py-11">
          <div className="pointer-events-none absolute inset-5 rounded-[1.7rem] border-4 border-dashed border-[#ffb6d8]/80" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-[repeating-linear-gradient(90deg,rgba(255,91,189,0.32)_0_36px,rgba(255,244,107,0.32)_36px_72px,rgba(49,214,255,0.32)_72px_108px,rgba(154,109,255,0.32)_108px_144px)]" />
          <div className="pointer-events-none absolute left-10 top-10 text-4xl text-[#fff46b] drop-shadow-[3px_3px_0_#2b1239]">
            ✦
          </div>
          <div className="pointer-events-none absolute right-12 top-16 text-4xl text-[#fff46b] drop-shadow-[3px_3px_0_#2b1239]">
            ✦
          </div>

          <div className="relative mx-auto flex w-fit items-center justify-center gap-4">
            <span className="hidden rounded-full border-[5px] border-[#2b1239] bg-[#fff46b] p-3 text-4xl shadow-[0_8px_0_#2b1239] sm:inline-grid">
              🍭
            </span>
            <h1 className="text-center text-6xl font-black leading-[0.85] tracking-[-0.08em] text-[#ffb000] [text-shadow:5px_5px_0_#ff2f91,10px_10px_0_#31d6ff,14px_14px_0_#2b1239] sm:text-7xl lg:text-8xl">
              SnackRush
            </h1>
            <span className="hidden rounded-full border-[5px] border-[#2b1239] bg-[#31d6ff] p-3 text-4xl shadow-[0_8px_0_#2b1239] sm:inline-grid">
              🍬
            </span>
          </div>

          <div className="relative mt-10 grid gap-6 lg:grid-cols-3 lg:items-stretch">
            {showcasePanels.map((panel) => (
              <article
                key={panel.title}
                className="rounded-[1.7rem] border-[5px] border-[#2b1239] bg-[linear-gradient(135deg,rgba(255,255,255,0.94),rgba(255,237,252,0.94))] p-4 shadow-[9px_9px_0_#2b1239]"
              >
                <div className="min-h-full overflow-hidden rounded-[1.15rem] border-[3px] border-[#2b1239] bg-[radial-gradient(circle_at_12%_12%,rgba(255,244,107,0.9)_0_44px,transparent_45px),linear-gradient(125deg,#ffffa9_0%,#fff9e8_42%,#ffe6f6_100%)] p-6 shadow-[5px_5px_0_#2b1239]">
                  <div className="flex items-start gap-4">
                    <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border-[3px] border-[#2b1239] bg-white text-3xl shadow-[4px_4px_0_#2b1239]" aria-hidden="true">
                      {panel.icon}
                    </span>
                    <h2 className="text-2xl font-black uppercase leading-tight tracking-[-0.03em] text-[#2b1239] sm:text-3xl">
                      {panel.title}
                    </h2>
                  </div>
                  <p className="mt-6 text-base font-black leading-8 text-[#70457b] sm:text-lg">
                    {panel.body}
                  </p>
                  {panel.link ? (
                    <a
                      href={panel.link}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-6 inline-flex w-full items-center justify-center rounded-2xl border-[3px] border-[#2b1239] bg-white px-4 py-3 text-center text-xs font-black uppercase tracking-[0.14em] text-[#2b1239] shadow-[5px_5px_0_#2b1239] transition hover:-translate-y-1 hover:bg-[#31d6ff] hover:shadow-[8px_8px_0_#2b1239]"
                    >
                      View GitHub repo ↗
                    </a>
                  ) : null}
                </div>
              </article>
            ))}
          </div>

          <div className="relative mx-auto mt-10 max-w-4xl rounded-[1.8rem] bg-[#ffe2f3] p-3">
            <a
              href="https://snackrush.joemidpan.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full items-center justify-center rounded-[1.35rem] border-[5px] border-[#2b1239] bg-[linear-gradient(90deg,#ff2f91_0%,#ff5b6f_22%,#ffb000_52%,#31d6ff_100%)] px-6 py-5 text-center text-base font-black uppercase tracking-[0.22em] text-[#2b1239] shadow-[10px_10px_0_#2b1239,0_0_34px_rgba(255,47,145,0.55)] transition hover:-translate-y-1 hover:shadow-[14px_14px_0_#2b1239,0_0_46px_rgba(255,47,145,0.75)] sm:text-lg"
            >
              Visit snackrush.joemidpan.com ↗
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
