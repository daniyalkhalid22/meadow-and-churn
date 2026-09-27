# Meadow & Churn

Frontend scaffold for the Meadow & Churn website; product and marketing UI will be added in later tasks.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/meadow-churn/src/main.tsx` — existing Vite/React entry point
- `artifacts/meadow-churn/src/locales/` — English and Urdu locale placeholders
- `artifacts/meadow-churn/src/js/localization.ts` — reserved localization scaffold (not wired yet)
- `artifacts/meadow-churn/src/index.css` — Tailwind entry and shared CSS variables

## Architecture decisions

- Meadow & Churn remains a standalone Vite artifact with the generated app conventions intact.
- Tailwind CSS is compiled by the installed `@tailwindcss/vite` plugin in `vite.config.ts`; no CDN is used.
- Locale files are JSON placeholders for the later bilingual implementation and are intentionally not imported yet.

## Product

_Describe the high-level user-facing capabilities of this app once they exist._

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
