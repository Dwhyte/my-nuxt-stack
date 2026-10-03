# my-nuxt-stack — Agent guidelines

Nuxt 4 starter: Nuxt UI + Tailwind v4, tRPC, Better Auth, Prisma, Trigger.dev, Pinia.

## Cursor rules

Always follow `.cursor/rules/`:

- **`my-nuxt-stack.mdc`** — stack, conventions, server layout
- **`frontend-ui.mdc`** — Nuxt UI vs Tailwind, `UChip` for labels/tags
- **`action-buttons.mdc`** — primary CTAs via `AppActionButton`
- **`trigger-skills.mdc`** — pointer to Trigger.dev skills

## Cursor skills

Load the relevant skill from `.cursor/skills/` when working in that domain:

| Skill | When |
| --- | --- |
| `tailwindcss-development` | Layout, spacing, typography, Tailwind v4 utilities in Vue |
| `trigger-authoring-tasks` | Background/scheduled tasks in `server/trigger/` |
| `trigger-realtime-and-frontend` | Live run updates, browser triggering |
| `trigger-authoring-chat-agent` | `chat.agent` AI agents |
| `trigger-chat-agent-advanced` | Advanced chat.agent patterns |
| `trigger-cost-savings` | Task compute/cost optimization |
| `trigger-getting-started` | New Trigger.dev setup (before SDK installed) |
| `manage-mcp` | MCP server setup, tools/resources/prompts in `server/mcp/` (`.agents/skills/manage-mcp`) |

## MCP

- MCP definitions live in `server/mcp/` (tools, resources, prompts)
- Business logic stays in `server/services/` — MCP tools call services, not raw Prisma
- Local endpoint: `https://localhost:3000/mcp` (see `.cursor/mcp.json`)
- Load `manage-mcp` skill when authoring or troubleshooting MCP code

## Conventions

- Vue SFC order: `<script setup>` → `<template>` → `<style>`
- Business logic: `server/services/`, not pages or tRPC routers
- Background jobs: `server/trigger/` — dispatch with `tasks.trigger()`
- Mobile overlays: `MobileBottomSheet` + `AdaptiveOverlay`
- Nav config: `app/constants/appNav.ts`
- Design tokens: `app/assets/css/main.css`, `tailwind.css`, `ui-overrides.css`

## UI quick reference

| Layer | Tool |
| --- | --- |
| Forms, cards, alerts, nav | Nuxt UI (`UButton`, `UInput`, `UCard`, …) |
| Contextual labels, tags, pills | `UChip` / `UBadge` |
| Layout, spacing, typography | Tailwind |
| Primary CTAs | `AppActionButton` |

Combo is normal: Tailwind on wrappers and `class="..."` / `ui` on Nuxt UI components.

## Do not

- Create markdown docs unless explicitly requested
- Commit unless explicitly requested
- Use raw `<button>` / `<input>` when Nuxt UI equivalents exist
- Use scoped `<style>` for repeated app-wide overrides — use `ui-overrides.css`
