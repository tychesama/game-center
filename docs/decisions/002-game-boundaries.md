# ADR 002: Game Rule Boundaries

## Decision

Game rules will be isolated from React pages and shared UI components.

## Why

- chess and checkers rule logic become error-prone quickly
- UI code should stay focused on rendering and interaction
- future testing is cleaner when rules are not buried in components

## Consequence

When move logic starts, add dedicated game-domain modules instead of writing rule checks inside route files.
