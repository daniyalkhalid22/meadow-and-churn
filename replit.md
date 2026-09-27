# Meadow & Churn

A localization-ready marketing website for a fictional boutique dairy supplier, with English and Urdu support.

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

- `artifacts/meadow-churn/src/main.tsx` — Vite/React entry point
- `artifacts/meadow-churn/src/App.tsx` — single-page marketing site and client-only request form
- `artifacts/meadow-churn/src/locales/` — matching English and Urdu JSON catalogs
- `artifacts/meadow-churn/src/js/localization.ts` — locale persistence, fallback, DOM attributes, and RTL handling
- `artifacts/meadow-churn/src/index.css` — Tailwind entry, theme tokens, responsive layout, and motion
- `artifacts/meadow-churn/README.md` — user-facing implementation and localization documentation

## Architecture decisions

- Meadow & Churn remains a standalone Vite artifact with the generated app conventions intact.
- Tailwind CSS is compiled by the installed `@tailwindcss/vite` plugin in `vite.config.ts`; no CDN is used.
- English is the fallback locale; Urdu switches the document to RTL and the user's language choice persists in localStorage.
- The order form is intentionally client-only because the brief describes a demo request flow, not a live checkout.

## Product

- Single-page marketing story for Meadow & Churn
- Product shelf with milk, cheese, yogurt, and ghee
- Farm sourcing practices and customer testimonials
- Responsive navigation and English/Urdu switching without reload
- Client-side validated demo order request flow
- Creator connection section with direct email and LinkedIn links

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
