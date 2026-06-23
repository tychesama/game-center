# GameCenter

GameCenter is a playful browser-based board game hub built to grow in phases. Phase 2 establishes playable local board-game foundations while keeping the app frontend-first and modular.

## Current Scope

- Landing page with cards for available games and reserved future cabinet slots
- Dedicated playable routes for `chess`, `checkers`, `tictactoe`, and `rps`
- Snack Rush GameCenter slot shell with candy-shop preview styling
- Global theme switcher that affects layout, colors, fonts, buttons, board styling, and piece styling
- Shared board interaction components for click-to-move and drag-and-drop
- Chess powered by \`chess.js\` for standard legal movement and game states
- American checkers rules with forced captures, multi-jumps, kinging, timers, and win detection
- Planning and tracking files for stable execution across phases

## Stack

- \`Next.js\`
- \`React\`
- \`TypeScript\`
- \`Tailwind CSS v4\`
- \`chess.js\`

## Scripts

- \`npm run dev\`
- \`npm run build\`
- \`npm run lint\`

## Project Structure

- \`src/app\`
- \`src/components\`
- \`src/lib\`
- \`src/lib/games\`
- \`docs/decisions\`

## Phase Model

- \`Phase 1\`: app shell, playful UI, theme engine, route foundations
- \`Phase 2\`: playable chess/checkers, shared board framework, stronger tests
- \`Phase 3+\`: more games, persistence, AI or multiplayer, deployment hardening

Detailed planning lives in [docs/roadmap.md](./docs/roadmap.md) and [docs/architecture.md](./docs/architecture.md).

## Git Conventions

Use conventional commits with readable intent:

- \`feat: add landing page animations\`
- \`feat: add checkers board shell\`
- \`chore: fix vercel config\`
- \`docs: add phase roadmap\`

## Deployment Direction

The repo is being shaped for later deployment on Vercel. Keep Phase 1 static-first and avoid backend assumptions until there is a real need.
