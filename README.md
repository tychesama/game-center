# GameCenter

GameCenter is a playful browser-based board game hub built to grow in phases. Phase 1 establishes the lobby, game routes, shared theme system, and project structure. The current scope is intentionally frontend-first so deployment stays simple while the game foundations harden.

## Current Scope

- Landing page with cards for available games
- Dedicated routes for \`chess\` and \`checkers\`
- Global theme switcher that affects layout, colors, fonts, buttons, board styling, and piece styling
- Shared board preview components for future game logic
- Planning and tracking files for stable execution across phases

## Stack

- \`Next.js\`
- \`React\`
- \`TypeScript\`
- \`Tailwind CSS v4\`

## Scripts

- \`npm run dev\`
- \`npm run build\`
- \`npm run lint\`

## Project Structure

- \`src/app\`
- \`src/components\`
- \`src/lib\`
- \`docs/decisions\`

## Phase Model

- \`Phase 1\`: app shell, playful UI, theme engine, route foundations
- \`Phase 2\`: first playable game, shared board framework, stronger tests
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
