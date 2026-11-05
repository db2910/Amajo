# AMAJO — Essence of Africa

Next.js 16 App Router application for the AMAJO public travel website and future administration system. Phases 1–4 provide the foundation, homepage, destination/tour discovery, supporting public pages and validated inquiry interfaces. Start with [the project status](docs/PROJECT_STATUS.md) and [implementation roadmap](docs/IMPLEMENTATION_PLAN.md).

## Run locally

Use Node.js 24 LTS and npm. Exact installed package versions are recorded in `package-lock.json`.

On this Windows workspace, start the app from PowerShell with:

```powershell
.\dev.cmd
```

The launcher finds the provisioned Node installation even when VS Code's terminal has an old PATH. Open **http://localhost:3000/** once the server says it is ready. Keep that terminal running; use Ctrl+C to stop it. Optional Next.js arguments are forwarded, for example `.\dev.cmd --port 3001`.

For a fresh installation, or once Node/npm are available on the terminal PATH, use:

```powershell
npm.cmd ci
npm.cmd run dev
```

Open `http://localhost:3000` for the homepage. `/foundation` is the interactive design reference; `/admin` is an informational layout shell without authentication, private data or management actions. Phase 5 implements auth; Phase 6 implements the protected dashboard. The development website remains noindex.

The homepage includes responsive navigation, accessible menus/drawer, the multilingual greeting with pause/reduced-motion controls, URL-based tour search, editorial sections and the deep cocoa footer. `/destinations` has three country guides and 15 attraction pages; `/tours` searches nine development concepts with combinable filters, sorting and pagination. Individual trip pages provide galleries, ordered itineraries, planning notes and related concepts. `/experiences` links six interests into filtered results. Tours are clearly labelled development concepts with no invented prices or availability. Multi-day tours include accommodation; specific properties and room types require confirmation.

`/services` and its ten detail pages, `/about` and `/contact` are implemented. `/request-a-quote` is a three-step planner with validated tour/service/place prefill, travel preferences, local form checks and preserved step state. Send actions are disabled; nothing is saved or delivered. Forms do not transmit personal details, including when JavaScript is disabled. A direct visit to `/request-a-quote/confirmation` cannot create a receipt. `/privacy`, `/terms` and `/permit-policy` are clearly labelled draft outlines awaiting business approval; verified contacts and team records are unconfigured. Journal is outside the current scope. See [public page/inquiry contracts](docs/PHASE_4_PUBLIC_PAGES.md), [catalog contracts](docs/PHASE_3_CATALOG.md), [historical route contracts](docs/PHASE_2_ROUTE_CONTRACTS.md) and [image credits](docs/IMAGE_CREDITS.md).

No environment file is required for Phase 1. Copy `.env.example` to `.env.local` when configuration is needed. Leave Supabase values blank until real integration begins; a URL and publishable key must be supplied together. Never use a privileged key in any `NEXT_PUBLIC_` variable. Environment errors report variable names, not values.

## Verify

```powershell
npm.cmd run typecheck
npm.cmd run lint
npm.cmd test
npm.cmd run build
npm.cmd run test:e2e
```

Browser tests run against the production build on `127.0.0.1:3000`. Install Chromium once with `npx.cmd playwright install chromium`, or use an installed Edge browser in PowerShell:

```powershell
$env:PLAYWRIGHT_CHANNEL = 'msedge'
npm.cmd run test:e2e
```

Run `npm.cmd run build` again after source changes before browser tests. Do not share port 3000 with a stale or unrelated server. HTML reports are in `playwright-report/` and are ignored by Git.

If your development server is already using port 3000, set `$env:PLAYWRIGHT_PORT = '3100'` before running browser tests. Tests start their own production server and never silently reuse an existing development server.

## Project boundaries

- `src/app`: App Router routes and separate public/admin layouts; root styling and error boundaries.
- `src/components`: reusable shadcn/ui primitives, layout helpers, brand and shell components.
- `src/lib`: shared utilities and explicit public/server environment access.
- `src/features`, `src/data`, `supabase`: documented integration boundaries for later phases.
- `tests`: environment validation and real-browser foundation checks.
- `public/brand`: unaltered copy of the supplied logo. Original Stitch files remain in `stitch_amajo design/`.

Use `@/` imports, strict TypeScript and server components by default. Add client boundaries for interactions only. Store database access in server-only feature repositories when Phase 5 begins; do not place it in UI components.

## Design system

The canonical tokens in `src/app/globals.css` map into Tailwind v4 and shadcn CSS variables. Canvas `#fcf9f4`, cocoa `#2c140e`, action rust `#a43700`, decorative orange `#d95b26`, gold `#d4a359`, sage `#4a5d4e`. Gold and orange are decorative rather than default small-text colors. Body text uses self-hosted Plus Jakarta Sans; headings use self-hosted Playfair Display, with system fallbacks. Fontsource packages include the upstream font licenses and are served locally without runtime Google Fonts requests.

The base spacing unit is Tailwind's 4px; semantic spacing tokens extend from 8px through 128px. Containers cap at 1360px with 20px mobile and 32px desktop gutters. Inputs/buttons have 8px corners, cards 16px and large frames 24px. Warm shadows have soft, lifted and floating levels.

shadcn/ui components are owned source files configured in `components.json` using the New York style and Radix accessibility primitives. A drawer is the shared Sheet component. Keep accessible names, descriptions, focus trapping and focus restoration intact when adapting these components. Motion respects system reduced-motion preferences globally.

## Windows toolchain provisioned for this workspace

Portable tools were installed under `%LOCALAPPDATA%\Amajo\tools` and added to the current user's PATH. An already-running VS Code process can pass its old PATH to new terminals. Fully restart VS Code to pick up the updated user PATH, use `.\dev.cmd` to start directly, or initialize the current terminal session:

```powershell
$env:Path = "$env:LOCALAPPDATA\Amajo\tools\node-v24.22.2-win-x64;$env:LOCALAPPDATA\Amajo\tools\mingit\cmd;$env:Path"
node --version
npm.cmd --version
git --version
```

Official Node release SHA256 checksums and the Git for Windows release digest were verified before extraction. No administrator install or global npm package install was required. Provisioned versions and completed verification results are recorded in `docs/PROJECT_STATUS.md`.
