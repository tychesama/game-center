# Architecture

## Goal

Keep GameCenter easy to expand without mixing UI glue, theme logic, and game rules into one mess.

## Frontend Boundaries

- \`src/app\`: routes and page composition
- \`src/components\`: shared presentation and UI shell components
- \`src/lib\`: static data, theme presets, shared board helpers, and game domain rules

## Theme System

The global theme switcher controls:

- page colors and surfaces
- board styling
- piece styling
- button styling
- font selection
- radius and shadow mood

Implementation rule:

- global theme presets live in \`src/lib/themes.ts\`
- route-specific game flavor can still override local tokens for the page shell
- future theme expansion should add tokens first, not random component-specific overrides

## Game Boundaries

Phase 2 moves playable rules into dedicated modules:

- \`src/lib/games/chess.ts\`: wraps \`chess.js\` for legal chess movement and game state
- \`src/lib/games/checkers.ts\`: standard American checkers rules, forced captures, kinging, and win detection
- \`src/components/board-game\`: reusable board, drag/drop, click selection, and clock presentation

Implementation rules:

- keep chess and checkers rules in isolated domain modules
- keep board rendering reusable across games
- do not place move validation inside page components
- do not let theme logic know game rules

## Routing

- \`/\`: lobby
- \`/chess\`: chess page shell
- \`/checkers\`: checkers page shell

Future games should follow the same route model unless a shared dynamic route becomes justified.
