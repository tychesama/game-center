# Architecture

## Goal

Keep GameCenter easy to expand without mixing UI glue, theme logic, and game rules into one mess.

## Frontend Boundaries

- \`src/app\`: routes and page composition
- \`src/components\`: shared presentation and UI shell components
- \`src/lib\`: static data, theme presets, and future domain helpers

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

Phase 1 uses preview boards only. When game logic begins:

- keep chess and checkers rules in isolated domain modules
- keep board rendering reusable
- do not place move validation inside page components
- do not let theme logic know game rules

## Routing

- \`/\`: lobby
- \`/chess\`: chess page shell
- \`/checkers\`: checkers page shell

Future games should follow the same route model unless a shared dynamic route becomes justified.
