# my-nuxt-stack

A Nuxt 4 starter with Vouch's app shell — sidebar, floating bottom nav, auth, tRPC, and a single-step onboarding gate.

## Quick start

**Requirements:** Node 22+, pnpm 10+, PostgreSQL

```bash
cp .env.example .env
pnpm install
pnpm db:migrate
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment

### Tier 1 — required

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | PostgreSQL connection string |
| `BETTER_AUTH_SECRET` | Session signing secret (use a long random string in production) |
| `BETTER_AUTH_URL` | App URL for auth callbacks (default `http://localhost:3000`) |
| `NUXT_PUBLIC_SITE_URL` | Public site URL (same as above for local dev) |
| `NUXT_PUBLIC_APP_NAME` | App name shown in shell chrome |

### Tier 2 — optional

| Variable | Purpose |
| --- | --- |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | Google OAuth sign-in |
| `RESEND_API_KEY` / `RESEND_FROM_EMAIL` | Production magic link emails (dev logs links to console) |
| `TRIGGER_SECRET_KEY` / `TRIGGER_PROJECT_REF` | Trigger.dev background jobs (see below) |

### Trigger.dev setup

1. Create a project at [trigger.dev](https://trigger.dev) and copy your project ref + secret key
2. Add to `.env`:
   ```bash
   TRIGGER_SECRET_KEY=tr_dev_...
   TRIGGER_PROJECT_REF=proj_...
   ```
3. Run `pnpm dev` — starts Nuxt and the Trigger dev worker concurrently
4. On the Example page, click **Queue health-check task** to dispatch the demo task

Tasks live in `server/trigger/`. Add new tasks there and dispatch via `tasks.trigger('task-id', payload)` from tRPC routers or services.

## Project structure

```
app/
  components/shell/   # Sidebar, bottom nav, desktop header
  components/adaptive/ # MobileBottomSheet, AdaptiveOverlay
  constants/appNav.ts # Configure sidebar + bottom nav items
  features/auth/      # Auth queries/mutations
  features/onboarding/ # Landing route resolver + gate helpers
  layouts/app.vue     # Authenticated app shell
  pages/(app)/        # Protected pages (dashboard, example, settings)
  pages/(app)/onboarding/ # Onboarding steps
server/
  trpc/routers/       # tRPC API (auth, user, account, demo)
  services/           # Business logic
prisma/schema/        # Database schema
```

## Navigation

Edit [`app/constants/appNav.ts`](app/constants/appNav.ts) to customize sidebar and bottom nav links. Bottom nav uses icon-only buttons with desktop tooltips.

## Onboarding

First-time users (magic link or Google) are redirected to `/onboarding/name` before accessing the app. The global `onboarding-gate` middleware enforces this.

To add more steps:

1. Add pages under `app/pages/(app)/onboarding/`
2. Extend `resolveLandingRoute` in `app/features/onboarding/resolveLandingRoute.ts`
3. Add tRPC mutations in `server/trpc/routers/account.ts` as needed

## Extension guides

- **File uploads (R2):** Add presigned upload flow with S3-compatible storage when your app needs media

## Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start Nuxt + Trigger.dev dev worker |
| `pnpm build` | Production build |
| `pnpm type-check` | TypeScript check |
| `pnpm db:migrate` | Run Prisma migrations |
| `pnpm db:studio` | Open Prisma Studio |
