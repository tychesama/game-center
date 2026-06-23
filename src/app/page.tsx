import Image from "next/image";

import { GameCard } from "@/components/game-card";
import { games } from "@/lib/games";

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/joem.tyche/",
    icon: <FacebookIcon />,
  },
  {
    label: "My website",
    href: "https://joemidpan.com",
    icon: (
      <Image
        src="/tyche-monorepo-favicon.svg"
        alt=""
        width={20}
        height={20}
        className="h-5 w-5"
        aria-hidden="true"
      />
    ),
  },
  {
    label: "GitHub",
    href: "https://github.com/tychesama",
    icon: <GithubIcon />,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/jose-emmanuel-idpan-0127a5319/",
    icon: <LinkedInIcon />,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@tyche-sama",
    icon: <YouTubeIcon />,
  },
];

export default function Home() {
  return (
    <main className="relative min-h-[calc(100vh-5.5rem)] overflow-x-clip">
      <div className="gc-lobby-glow pointer-events-none absolute inset-0" />
      <section className="relative mx-auto w-full max-w-7xl px-6 py-6 sm:px-10 lg:px-16">
        <div className="grid items-start gap-10 py-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(28rem,1.1fr)]">
          <div className="max-w-3xl lg:sticky lg:top-24 lg:h-fit lg:self-start">
            <p className="gc-chip mb-5 inline-flex">
              Pick a board, start the ritual
            </p>
            <h1 className="gc-lobby-title gc-midnight-stroke text-6xl font-black leading-[0.9] tracking-[-0.08em] sm:text-7xl lg:text-8xl">
              A lobby for random games!
            </h1>
            <p className="mt-7 max-w-2xl text-lg font-semibold leading-8 text-[var(--gc-muted)]">
              GameCenter is my small browser-game lobby for whatever I feel
              like building next. Some games are classic, some are goofy, and
              some are just experiments I wanted to turn into something
              playable.
            </p>
            <p className="mt-8 text-center font-mono text-sm font-bold uppercase tracking-[0.2em] text-[var(--gc-accent-strong)] lg:text-left">
              Made by Joem
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3 lg:justify-start" aria-label="Joem social links">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={link.label}
                  title={link.label}
                  className="gc-social-button"
                >
                  {link.icon}
                </a>
              ))}
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

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <path
        fill="currentColor"
        d="M14.5 8.1h2.2V4.4A28 28 0 0 0 13.5 4c-3.2 0-5.3 1.9-5.3 5.4v3H4.7v4.1h3.5V24h4.3v-7.5h3.4l.5-4.1h-3.9V9.8c0-1.2.3-1.7 2-1.7Z"
      />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <path
        fill="currentColor"
        d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.1c-3.4.7-4.1-1.5-4.1-1.5-.5-1.4-1.3-1.8-1.3-1.8-1.1-.8.1-.8.1-.8 1.2.1 1.9 1.3 1.9 1.3 1.1 1.9 2.9 1.3 3.6 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.3-3.2-.1-.3-.6-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.4 11.4 0 0 1 6 0C17.5 4.6 18.5 5 18.5 5c.7 1.6.2 2.9.1 3.2.8.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1.2.9 2.4v3.6c0 .3.2.7.8.6A12 12 0 0 0 12 .5Z"
      />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <path
        fill="currentColor"
        d="M5.3 7.6H1.4V22h3.9V7.6ZM3.4 1C2.1 1 1.2 1.9 1.2 3.1s.9 2.1 2.1 2.1h.1c1.3 0 2.2-.9 2.2-2.1C5.5 1.9 4.7 1 3.4 1ZM22.8 13.7c0-4.1-2.2-6-5.1-6a4.4 4.4 0 0 0-4 2.2V7.6H9.8c.1 1.4 0 14.4 0 14.4h3.9v-8c0-.4 0-.8.2-1.1.3-.9 1.2-1.8 2.5-1.8 1.8 0 2.5 1.4 2.5 3.4V22h3.9v-8.3Z"
      />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <path
        fill="currentColor"
        d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z"
      />
    </svg>
  );
}
