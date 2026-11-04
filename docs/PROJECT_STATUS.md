# AMAJO project status

Updated: 2026-11-04 (Africa/Johannesburg).

## Current phase

**Phase 3: implementation complete and verified on `feat/phase-3-destinations-tours`, awaiting user review. Phase 4 has not started.** Phases 1–2 are merged; PR #1 was confirmed merged on 2026-11-04 at `9565cf2`, local main fast-forwarded safely, then the Phase 3 branch created. Read `IMPLEMENTATION_PLAN.md` and this file before resuming. Later phase checklists remain unchecked.

## GitHub and version control

- Repository: `https://github.com/db2910/Amajo.git`, remote `origin`; existing authenticated Git workflow retained, with credentials outside the repository.
- Current branch: `feat/phase-3-destinations-tours`, created from synchronized `main`/`origin/main` at `9565cf20a6585093f6432c02255014da318aa0d7`. The initial working tree was clean. Fetch, switch to main and fast-forward-only integration succeeded without conflicts or discarding work.
- Phase 2 [PR #1](https://github.com/db2910/Amajo/pull/1) was confirmed merged on 2026-11-04 before any Phase 3 implementation. No force-push or history rewrite was used.
- Phase 1 foundation: `c223deb`; Phase 2 implementation: `7549b3a`, with documentation follow-ups through `f325a70` and merge `9565cf2`.
- Phase 3 implementation is verified and staged for `feat: implement destinations and tour discovery`. Push and PR synchronization are the final delivery step; their verified result is recorded below after completion. Use `git log -1` for the documentation-inclusive HEAD.
- Pre-commit review: 42 intended files; zero credential-pattern matches and zero sensitive paths. Original Stitch references and package manifests/lockfile are unchanged. Dependencies, environment secrets, build output, temporary files and test reports remain ignored; `.env.example` remains tracked with placeholders only.
- Standing workflow: after each verified phase, review staged content for secrets, update both progress documents, commit, push and verify. Use feature branches/reviewed PRs for substantial changes; never force-push, overwrite remote history or automatically merge the Phase 3 PR.

## Phase 3 completed work — 2026-11-04

- Added `/destinations`, shared country guides for Rwanda/Uganda/Kenya, 15 correctly associated attraction pages, `/tours`, nine detailed journey concepts and `/experiences`. Only the corresponding Phase 3 previews were replaced; Phase 4 pages remain clearly labelled previews.
- Implemented composable text/country/experience/duration/budget-style/maximum-price filters, sorting, counts, six-result pagination, URL persistence, browser history, clear/recovery states and strict invalid-input handling. Added optional categorical `budget` without changing numeric USD `maxBudget`; price ordering is offered only where configured prices exist. Current concepts intentionally have no prices.
- Added a server-only asynchronous catalog repository boundary and typed country/attraction/experience/tour/media/itinerary contracts. Supports multi-country and multi-experience tours, attraction joins, ordered itinerary days/activities, optional meals/lodging notes and related tours. Supabase replacement remains Phase 5.
- Added reusable cards, breadcrumb/hero/FAQ/CTA primitives, gallery, filter drawer and itinerary timeline. Quote links validate the selected concept/place in the remaining preview; no inquiry is submitted or fake success shown.
- Added ten local editorial photos with documented sources/licenses. Public Creative Commons credits include source, license and resizing/cropping notices. Improved repeated images during screenshot review and corrected the Jinja concept to use actual Jinja imagery.
- Files: six explicit catalog route modules, public catalog components, `src/data/catalog.ts`, `src/features/catalog/{types,search,query,repository,quote}.ts`, catalog unit/browser tests, Vitest alias configuration, updated homepage regression expectations, README/boundary docs and `docs/PHASE_3_CATALOG.md`/image credits.
- Packages installed in Phase 3: none. Existing pinned stack and lockfile retained; Prettier 3 used ephemerally for formatting.

## Phase 3 verification — 2026-11-04

- `npm.cmd run typecheck`: passed; final production builds also passed strict TypeScript and route checks. An early concurrent dev-generated validator race cleared on regeneration; no application type error remains.
- `npm.cmd run lint`: final source passed with zero warnings.
- `npm.cmd test`: 38 passed. Tests cover relations/ordered days, combined filters, full attraction names, secondary countries/experiences, inclusive money comparisons with test-only prices, deterministic sorting/pagination, invalid input and quote URLs. Initial missing Vitest alias resolved in configuration.
- `npm.cmd run build`: final source passed. Generated all three countries and 15 attraction pages; destination/experience overviews are static, search and tour details server-rendered.
- `PLAYWRIGHT_CHANNEL=msedge`, `PLAYWRIGHT_PORT=3100`, `npm.cmd run test:e2e`: full 33 passed in 4.4m. After the final Jinja image/credit refinement, `npm.cmd run test:e2e -- catalog.spec.ts`: 12 passed in 1.5m. The first full run had one whitespace-sensitive link locator failure; corrected and rerun successfully.
- Browser coverage: eight representative catalog pages at 360/390/768/1024/1440px; no horizontal overflow or page errors in those journeys; all 15 attraction/nine tour HTTP responses; correct 404s for unknown/mismatched records; combined filters, refresh/back/forward, sorting, pagination and recovery; keyboard itinerary, gallery and filter drawer, Escape/focus restoration; related links and quote context. Axe A/AA scans passed on tested mobile/desktop pages and gallery/drawer states, including public license credits. This is not a complete accessibility certification.
- Visual review: desktop/mobile country, tour listing and trip detail screenshots plus all ten new source photos inspected against the country/trip Stitch references. Current captures: ignored `test-results/catalog-catalog-layouts-and-accessibility-at-{360,1440}px-chromium/` with `-destinations-rwanda.png`, `-tours.png` and `-tours-kenya-savanna-and-sea.png`. Browser runs replace previous artifacts.
- `npm.cmd audit --omit=dev --json`: zero production dependency vulnerabilities. No dependency inputs changed. Existing development-only lint advisory remains below.
- Existing user dev server on 3000 preserved; test-owned production servers on 3100 shut down after verification. No production deployment, Supabase/authentication, business submission, Firefox/Safari or manual screen-reader result is claimed.

## Earlier phase work (historical)

- Phase 2 completed: responsive desktop/mobile navigation, cycling/pauseable greeting, optimized local photography, typed search URLs and sample journey data, homepage editorial sections and cocoa footer. Later-page routes use explicit, noindex preview contracts; no database, quote submission, prices or reviews are fabricated.
- Phase 2 verification: 19 unit tests, strict type checks, zero-warning ESLint, production build and all 22 Edge/Chromium browser tests passed. The final full browser run took 1.2 minutes. Follow-up screenshot capture waits for lazy images and disables transient CSS animations for useful visual evidence.

- Provisioned checksum-verified portable Node 24.22.2, npm 11.19.1 and Git 2.56.0.windows.4 under `%LOCALAPPDATA%\Amajo\tools`; added their paths to the current user's PATH. Existing terminals may need restarting; `README.md` supplies a session initialization command.
- Initialized Git on `main`; no commit or remote created. Manually scaffolded the application at the workspace root to preserve the existing docs and original Stitch exports.
- Installed and pinned Next.js 16.4.4, React 19, strict TypeScript, Tailwind v4, shadcn/ui source components, Lucide, Motion, Zod and React Hook Form. Verified clean installation from the npm lockfile.
- Established canonical colors, spacing, radii, warm shadows, self-hosted Playfair Display/Plus Jakarta Sans and fallbacks. Copied the original logo with identical SHA256 hash and no crop or artwork changes; supplied font licenses are served locally.
- Added buttons, labelled inputs/selects/textareas, checkbox/radio controls, cards, badges, dialogs, Sheet-based drawers, separators, skeletons, toast, empty state, field/error summary, containers, sections, grids and stacks. Motion respects reduced-motion preferences.
- Added a minimal public starting page, interactive `/foundation` reference and distinct `/admin` shell. No Phase 2 navigation/hero/search, private records, fake dashboard metrics, simulated login or business submission actions.
- Added environment validation, placeholder-only `.env.example`, ignored credentials/build artifacts, error/not-found boundaries, setup docs and meaningful unit/browser checks.
- Fixed malformed-URL validation after a failing test and corrected field alignment after screenshot review; final build/browser checks passed afterward.
- Follow-up startup fix: confirmed npm exists and the saved user PATH is correct, while the existing IDE terminal retains an older process PATH. Added root `dev.cmd` to find the provisioned Node runtime and start development without refreshing the IDE environment; updated README startup instructions.
- Verified the follow-up from the stale-PATH shell using `.\dev.cmd --hostname 127.0.0.1 --port 3001`: Next.js started and `/foundation` returned HTTP 200 with the expected page content. No application source changed; full application suites were not repeated for this launcher/documentation-only fix.
- Applied the requested public footer background `#2c140e` with ivory text, contrasting hover/focus treatment, and no fabricated contact information. Expanded temporary-file ignore rules and made browser test ports configurable so verification does not reuse or stop the user's running development server.
- Footer/Git preparation verification: production build and all 12 Edge browser tests passed (26.9s), including axe checks, using a dedicated production server on port 3100. The user's existing server on port 3000 was left running. Original export whitespace was left untouched; staged whitespace checks exclude those original reference files.

## Architectural decisions

- Preserve the roadmap's Next.js App Router/Supabase architecture. Tailwind v4, shadcn/ui and Motion were explicit additions in the Phase 1 request.
- Server components by default; client components for interactions. Separate public/admin shells share design primitives. Tailwind scans application source, excluding reference exports.
- Supabase integration remains in Phase 5. Public URL/publishable-key variables are optional together; invalid or partial settings fail clearly without logging values. Privileged keys are accessed only through the server environment accessor and never exposed by public parsing.
- `/admin` is currently an informational shell accessible without sign-in and contains no private data/actions. Authentication is not implemented or claimed. Protected dashboard behavior remains in Phases 5–6.
- Root metadata marks the development foundation noindex. No canonical production domain, live content or public release is configured.
- shadcn 4.23.0 generated the owned New York/Radix primitives. The generator, unused `cn` package and unused theme provider were removed from dependencies afterward. Shared styling uses the local `cn` utility. Prettier 3 was used once for source formatting without becoming a project dependency.
- Fonts are served from Fontsource packages with SIL OFL licenses and no browser Google Fonts requests. Original Stitch files remain unchanged.
- `next dev` generated the root `AGENTS.md`; retain its managed Next.js instructions and read bundled framework docs before future code changes.

## Installed packages

All exact versions are in `package.json` and `package-lock.json`.

| Packages | Versions |
| --- | --- |
| Next.js / React / React DOM | 16.4.4 / 19.3.1 / 19.3.1 |
| TypeScript / ESLint / eslint-config-next | 6.0.3 / 9.39.5 / 16.4.4 |
| Tailwind / Tailwind PostCSS | 4.3.4 / 4.3.4 |
| Lucide / Motion | 1.67.0 / 14.9.0 |
| Zod / React Hook Form / hookform resolvers | 4.6.7 / 7.91.0 / 7.0.1 |
| Radix UI / Sonner | 1.8.1 / 2.0.8 |
| Playfair Display / Plus Jakarta Sans Fontsource Variable | 5.3.0 / 5.3.0 |
| CVA / clsx / tailwind-merge / tw-animate-css | 0.7.1 / 2.1.1 / 3.7.0 / 1.4.0 |
| Vitest / Playwright / axe Playwright | 5.1.0 / 1.64.1 / 4.14.0 |
| Node / React / React DOM type definitions | 24.19.2 / 19.3.0 / 19.3.0 |

## Files created and modules modified

- Phase 2: public header/footer, greeting/search and editorial section components; typed catalog/search contracts, navigation/route contracts and homepage read fixtures; explicit catch-all preview allowlist; five locally served photos; image-credit and route-contract docs; search unit tests and homepage browser tests. Brand ratio/focus and primary hover contrast were improved during testing. No dependencies were added.

- Root configuration: package manifest/lockfile, strict TypeScript, Next, PostCSS, ESLint, shadcn aliases, Vitest/Playwright configs, npm settings, Node version, `.gitignore`, `.gitattributes`, `.env.example`, `AGENTS.md` and `README.md`.
- `src/app`: global design tokens, root/public/admin layouts, minimal public/admin pages, `/foundation`, root error/global-error and not-found handlers.
- `src/components`: owned UI primitives, foundation preview, public/admin shells, brand, Motion provider and layout primitives.
- `src/lib`: utilities and public/server environment validation; `src/features`, `src/data` and `supabase` document future feature boundaries without fake implementations.
- `public/brand/amajo-logo.png` and `public/fonts/*-LICENSE.txt`: approved original artwork copy and font license notices.
- `tests/unit/env.test.ts` and `tests/e2e/foundation.spec.ts`: configuration and browser behavior checks.
- Both roadmap/status documents updated. Generated `.next`, test artifacts and dependencies remain ignored; no real environment credentials were written.

## Verification — 2026-11-03

Commands ran with the provisioned Node/npm on PATH.

| Check | Result |
| --- | --- |
| `node --version`, `npm.cmd --version`, `git --version` | Verified 24.22.2, 11.19.1, 2.56.0.windows.4. |
| `npm.cmd ci --no-audit --no-fund` | Passed; clean lockfile installation, 487 packages. |
| `npm.cmd run typecheck` | Passed route type generation and strict TypeScript. Final production builds also passed TypeScript after subsequent UI adjustments. |
| `npm.cmd run lint` | Passed with zero warnings; final source checked. |
| `npm.cmd test` | 8 environment validation tests passed after fixing the invalid-URL throw. |
| `npm.cmd run build` | Passed; `/`, `/foundation`, `/admin` and not-found output generated. |
| `$env:PLAYWRIGHT_CHANNEL='msedge'; npm.cmd run test:e2e` | Final run: 12 passed in 25.7s against production build, Microsoft Edge 156.0.4314.50 (Chromium). |
| Browser coverage | No horizontal overflow at 360/390/768/1024/1440px; visible, loaded logos with correct 747:731 proportions; keyboard-operated controls; dialog/drawer focus trap, Escape close and focus restoration; skip link; reduced motion; 404 status/recovery; local fonts; no page errors in font-loading journey; 200% text sizing. |
| axe scans | Zero WCAG A/AA findings for tested public/foundation/admin/404 pages and open dialog/drawer states. This is not a complete accessibility certification. |
| Visual review | Reviewed six captured desktop/mobile screenshots; fixed inconsistent field alignment and reran build/browser suite. Artifacts: ignored `test-results/` and `playwright-report/`. |
| Development smoke | `npm.cmd run dev -- --hostname 127.0.0.1 --port 3001` started; `/` and `/foundation` returned HTTP 200. Owned server stopped after verification. |
| `npm.cmd audit --omit=dev --json` | Zero production dependency vulnerabilities. |
| `npm.cmd audit --json` | 16 moderate development-only findings; no high/critical findings. See below. |
| Ignore/logo checks | `.env.local`, `.next` and `node_modules` ignored; `.env.example` retained; source/copy logo hashes identical. |

Not performed: Firefox/Safari, screen-reader testing, full browser zoom, induced runtime crash/retry testing, live Supabase/RLS/authentication or production deployment/security checks. These are not Phase 1 features or are later QA coverage; no results are claimed for them.

## Phase 2 verification — 2026-11-03

- `npm.cmd run typecheck`: passed. Subsequent production builds also checked the final application TypeScript.
- `npm.cmd run lint`: passed with zero warnings on the final source.
- `npm.cmd test`: 19 passed across environment and search contracts. Empty/encoded/valid filters, invalid ranges, repeated/unknown values and query serialization covered.
- `npm.cmd run build`: passed. Homepage/foundation/admin are static; the explicitly allowlisted later-page previews render validated query context on the server.
- `PLAYWRIGHT_CHANNEL=msedge`, `PLAYWRIGHT_PORT=3100`, `npm.cmd run test:e2e`: 22 passed. Covers all roadmap widths, real desktop hover/click/keyboard menus, mobile groups/route closure, sticky background transition, greeting sequence/pause/reduced motion, full search URL/reload, rejected invalid queries, working internal navigation, local images/logo ratio, actual cocoa footer, 404 recovery, and axe A/AA scans including open menus/dialogs/drawer.
- After the final copy/formatting and screenshot timing refinement, lint/build passed again and 3 targeted viewport/navigation visual checks passed (43.2s). Final production dependency audit returned zero vulnerabilities. The staged review covered 29 Phase 2 files with zero credential-pattern matches, no sensitive paths, no dependency changes and no original reference modifications.
- Visual artifacts: `test-results/foundation-public-and-admin-foundations-fit-360px-chromium/public.png`, corresponding `1440px` file, and `test-results/homepage-open-desktop-menu-22590-have-no-axe-A-AA-violations-chromium/{desktop-menu,mobile-navigation}.png`. Reports/screenshots remain ignored; source and image credits are committed instead. Desktop/mobile captures were compared with the original Stitch homepage and all section imagery reviewed.
- Fixed findings: compact-logo optimizer rounding, low-contrast translucent primary hover, overly broad test selectors, and early screenshot captures of unloaded lazy images. No current Phase 2 application failure remains in tested paths.
- The existing user development server on port 3000 was preserved. Test-owned production servers use 3100 and shut down after checks.

## Outstanding issues and later dependencies

- Development tooling: Next's ESLint dependency chain includes the minimatch glob-amplification advisory [GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249). npm reports 16 moderate findings through that chain. ESLint 9.39.5 also emits an upstream deprecation notice. ESLint 10 was tested for installation compatibility and reverted because the selected Next configuration's React/import/accessibility plugins do not accept it. Avoid forced audit downgrades or incompatible minimatch major overrides. Reassess compatible upstream releases before production readiness. This does not affect the zero-finding production dependency audit or passing Phase 1 acceptance checks.
- Framework-generated instructions and temporary browser color-environment warnings are not application failures. No unresolved application defect was observed in the checked Phase 1 flows.
- Supabase/auth needed in Phase 5, protected staff dashboard in Phase 6, email provider in Phase 8, hosting/domain/operations in Phase 10.
- Business contacts, prices, claims, image rights, policy wording, testimonials and conditional journal scope still require validation before publication. Do not promote reference content as verified data.

## Exact next steps

1. Review and accept the Phase 3 feature PR, then merge through the reviewed GitHub workflow. Do not automatically merge it.
2. Run `.\dev.cmd` on this feature branch and review `/destinations`, the country/attraction guides, `/tours`, individual concepts and `/experiences`.
3. Begin Phase 4 supporting pages and validated form UI only after Phase 3 is reviewed and accepted; durable inquiry delivery stays in Phase 5.
4. Replace only the relevant remaining previews as real behavior is implemented. Keep auth, dashboard and CMS work in their scheduled phases.
5. Continue review, secret scan, documentation, commit, push and synchronization checks at every completed phase.
