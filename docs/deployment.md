# Deployment

## Target

Primary target is Vercel with preview deployments on pull requests.

## Pre-deploy checks

- `npm run lint`
- `npm run test`
- `npm run build`

## Vercel setup

1. Import `game-center` repository in Vercel.
2. Framework preset should auto-detect Next.js.
3. Build command: `npm run build`
4. Install command: `npm ci`
5. Output directory: default Next.js output.

## Notes

- The app is currently frontend-first and static-compatible by design.
- Keep game state local until multiplayer or persistence is scoped.
