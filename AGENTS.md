# AGENTS.md

## Workspaces

Monorepo with 4 npm workspaces:

| Package | Purpose |
|---------|---------|
| `types/` | Shared Zod schemas, must build first (`@partchat/types`) |
| `backend/` | Fastify API with Prisma + SQLite |
| `frontend/` | React + Vite + TailwindCSS |
| `test/` | Playwright E2E tests (run against deployed staging) |

## Build order

`types` must be built before `backend` or `frontend` can compile:

```sh
npm run --workspace backend db:generate   # generate Prisma client first
npm run build --workspaces --if-present   # types → backend → frontend
```

## Local development

```sh
# Backend (from backend/)
npm run db:push       # apply schema to SQLite
npm run db:seed       # seed test data
npm run dev           # Fastify on :3000 with hot-reload

# Frontend (from frontend/)
npm run dev           # Vite on :5173
```

## Formatting

Prettier is the only linter. Run from root:

```sh
npm run prettier --workspaces --if-present   # check
npm run prettier:fix --workspaces            # fix
```

Config: 4-space tabs, trailing commas, Tailwind plugin.

## E2E tests

Tests require a running staging environment (CI deploys first). Local runs:

```sh
cd test
npm run install-browsers   # first time only
TEST_BASEURL=http://localhost:3000 npm run test
```

- Single worker, serial execution (not parallel)
- Firefox only

## Prisma

- Schema: `backend/prisma/schema.prisma`
- Generated client: `backend/generated/prisma/` (gitignored, regenerate with `db:generate`)
- After schema changes: `npm run --workspace backend db:generate && npm run --workspace backend db:push`

## CI pipeline

Runs on every push: prettier → build → staging deploy → E2E tests → prod deploy (main only).
