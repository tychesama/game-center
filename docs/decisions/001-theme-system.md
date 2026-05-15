# ADR 001: Theme System Foundation

## Decision

GameCenter uses a token-driven global theme preset model backed by CSS custom properties and a client-side theme provider.

## Why

- theme changes affect more than colors
- fonts, buttons, board treatment, and piece shapes must switch together
- presets are easier to extend than scattered class toggles

## Consequence

New themes should be added in \`src/lib/themes.ts\` first. Components should consume tokens and data attributes rather than hardcoded visual values.
