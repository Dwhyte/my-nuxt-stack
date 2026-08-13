---
name: vuetify-development
description: >-
  Invoke when working with Vuetify components (v-btn, v-card, v-chip, v-text-field,
  v-alert, v-navigation-drawer, dialogs, forms), Vuetify props/variants, theme
  integration, or vuetify-overrides.css. Skip for pure Tailwind layout-only work,
  tRPC routers, Prisma schema, and server-side code.
---

# Vuetify Development (my-nuxt-stack)

Vuetify 4 with Tailwind v4 and semantic design tokens. UI split rules live in `.cursor/rules/frontend-ui.mdc`.

## When to use Vuetify vs Tailwind

| Use Vuetify | Use Tailwind |
| --- | --- |
| Forms, buttons, cards, alerts, nav drawers | Page layout, flex/grid, spacing |
| `v-chip` for labels, tags, pills | Typography (`font-display`, `text-muted-foreground`) |
| Dialogs, progress, data display | Static decorative elements (list dots, inline code) |

**Combo is normal:** Tailwind on wrappers and `class="..."` on Vuetify components.

## Project paths

| Path | Role |
| --- | --- |
| `app/assets/css/vuetify-overrides.css` | Global Vuetify shape/density overrides |
| `app/assets/css/main.css` | Theme tokens synced with Vuetify light/dark |
| `app/components/AppActionButton.vue` | Primary CTA — see `action-buttons.mdc` |

## Component conventions

1. Reach for Vuetify primitives before raw `<button>` / `<input>`.
2. **`v-chip`** for contextual labels and tag UI — `:ripple="false"` when non-interactive.
3. Primary CTAs → **`AppActionButton`**, not `v-btn color="primary"`.
4. Secondary actions → `v-btn variant="outlined"` or `variant="text"`.
5. Avoid scoped `<style>` for repeated Vuetify tweaks — use `@layer vuetify-overrides`.

## Examples

```vue
<!-- Static eyebrow -->
<v-chip variant="flat" size="small" label :ripple="false" class="bg-muted font-medium text-foreground">
  my-nuxt-stack
</v-chip>

<!-- Status pill -->
<v-chip variant="tonal" color="success" size="small" label :ripple="false" class="font-medium">
  Server data loaded
</v-chip>

<!-- Card with Tailwind layout inside -->
<v-card variant="outlined" class="rounded-2xl">
  <v-card-text class="flex flex-col gap-3">...</v-card-text>
</v-card>
```

## MCP

Use the **Vuetify MCP** (`user-vuetify-mcp`) for version-specific component API, upgrade guides, and breaking changes when unsure about props or v4 behavior.

## Mobile overlays

Use `MobileBottomSheet` with `AdaptiveOverlay` for mobile-first sheets — not raw `v-dialog` for app-shell patterns.

## Common pitfalls

- `v-chip` or raw div for primary CTAs — use `AppActionButton`.
- Purple `color="primary"` flat buttons for main actions — use auth CTA styling.
- Duplicating override CSS across SFCs instead of centralizing in `vuetify-overrides.css`.
