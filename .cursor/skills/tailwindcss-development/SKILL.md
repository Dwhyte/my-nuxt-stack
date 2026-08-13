---
name: tailwindcss-development
description: >-
  Invoke when the user mentions Tailwind, layout, spacing, typography, responsive
  grids, dark mode variants, or utility-class styling in Vue templates. Also for
  flex/grid page structure, token classes (bg-muted, text-foreground), and
  Tailwind v4 work. Skip for Vuetify component props/API, tRPC, Prisma, auth,
  Trigger.dev tasks, and server-only TypeScript with no template/CSS.
---

# Tailwind CSS Development (my-nuxt-stack)

Nuxt 4 + Vue 3 + Tailwind v4 alongside Vuetify 4. For the Vuetify vs Tailwind split, also follow `.cursor/rules/frontend-ui.mdc`.

## Project paths

| Path | Role |
| --- | --- |
| `app/assets/css/tailwind.css` | `@import "tailwindcss"`, `@theme inline`, breakpoints |
| `app/assets/css/tokens/` | Semantic color tokens (`shadcn-vars.css`, etc.) |
| `app/assets/css/main.css` | Base styles, auth/shell tokens |
| `app/**/*.vue` | Apply utilities in `<template>`; SFC order: script → template → style |

## Basic usage

- Prefer **semantic tokens**: `bg-muted`, `text-foreground`, `text-muted-foreground`, `border-border` — not raw hex in components.
- Use Tailwind for **layout and typography** on wrappers and on Vuetify via `class="..."`.
- Use **Vuetify** for interactive controls (`v-btn`, `v-text-field`, `v-card`, `v-chip`) — see `vuetify-development` skill and `frontend-ui.mdc`.
- Extract repeated utility clusters into Vue components when the same pattern appears 3+ times.
- Use `gap-*` between siblings instead of margin stacking.

## Tailwind v4 specifics

- Config is CSS-first via `@theme` in `tailwind.css` — no `tailwind.config.js`.
- Import with `@import "tailwindcss"`, not `@tailwind` directives.
- `corePlugins` is not supported in v4.

### Deprecated → replacement

| Deprecated | Replacement |
| --- | --- |
| `bg-opacity-*` | `bg-black/50` style |
| `flex-shrink-*` | `shrink-*` |
| `flex-grow-*` | `grow-*` |
| `overflow-ellipsis` | `text-ellipsis` |

## Dark mode

This project syncs theme with Vuetify via custom variants in `tailwind.css`:

```css
@custom-variant dark (&:where(.v-theme--dark, .v-theme--dark *));
```

Use `dark:` variants when adding styles that must respond to theme toggles.

## Vue patterns

```vue
<!-- Page shell -->
<div class="mx-auto max-w-2xl px-4 py-8 md:px-6">
  <div class="space-y-3 text-center">
    <h1 class="font-display text-3xl font-extrabold tracking-tight text-foreground">
      Title
    </h1>
  </div>
</div>

<!-- Vuetify + Tailwind combo -->
<v-card class="mt-8 rounded-2xl" variant="outlined">
  <v-card-text class="flex flex-col gap-3">...</v-card-text>
</v-card>
```

## Common pitfalls

- Styling forms/buttons with raw Tailwind when a Vuetify component exists.
- Hardcoding hex colors instead of token classes.
- Scoped `<style>` blocks for one-off layout — use utilities first.
- Repeated Vuetify internal overrides in SFCs — move to `app/assets/css/vuetify-overrides.css`.
