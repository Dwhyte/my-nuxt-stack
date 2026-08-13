# my-nuxt-stack — Agent guidelines

Nuxt 4 starter: Vuetify 4 + Tailwind v4, tRPC, Better Auth, Prisma, Trigger.dev, Pinia.

## Cursor rules

Always follow `.cursor/rules/`:

- **`my-nuxt-stack.mdc`** — stack, conventions, server layout
- **`frontend-ui.mdc`** — Vuetify vs Tailwind, `v-chip` for labels/tags
- **`action-buttons.mdc`** — primary CTAs via `AppActionButton`
- **`trigger-skills.mdc`** — pointer to Trigger.dev skills

## Cursor skills

Load the relevant skill from `.cursor/skills/` when working in that domain:

| Skill | When |
| --- | --- |
| `tailwindcss-development` | Layout, spacing, typography, Tailwind v4 utilities in Vue |
| `vuetify-development` | Vuetify components, variants, overrides |
| `trigger-authoring-tasks` | Background/scheduled tasks in `server/trigger/` |
| `trigger-realtime-and-frontend` | Live run updates, browser triggering |
| `trigger-authoring-chat-agent` | `chat.agent` AI agents |
| `trigger-chat-agent-advanced` | Advanced chat.agent patterns |
| `trigger-cost-savings` | Task compute/cost optimization |
| `trigger-getting-started` | New Trigger.dev setup (before SDK installed) |

## Conventions

- Vue SFC order: `<script setup>` → `<template>` → `<style>`
- Business logic: `server/services/`, not pages or tRPC routers
- Background jobs: `server/trigger/` — dispatch with `tasks.trigger()`
- Mobile overlays: `MobileBottomSheet` + `AdaptiveOverlay`
- Nav config: `app/constants/appNav.ts`
- Design tokens: `app/assets/css/main.css`, `tailwind.css`, `vuetify-overrides.css`

## UI quick reference

| Layer | Tool |
| --- | --- |
| Forms, cards, alerts, nav | Vuetify |
| Contextual labels, tags, pills | `v-chip` (`:ripple="false"` when static) |
| Layout, spacing, typography | Tailwind |
| Primary CTAs | `AppActionButton` |

Combo is normal: Tailwind on wrappers and `class="..."` on Vuetify components.

## Do not

- Create markdown docs unless explicitly requested
- Commit unless explicitly requested
- Use raw `<button>` / `<input>` when Vuetify equivalents exist
- Use scoped `<style>` for repeated Vuetify overrides — use `vuetify-overrides.css`
