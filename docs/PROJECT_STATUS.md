# AMAJO project status

Updated: 2026-11-05 (Africa/Johannesburg).

## Current phase

**Phase 4: supporting public pages and inquiry interfaces complete and verified on `feat/phase-4-public-pages`; [PR #3](https://github.com/db2910/Amajo/pull/3) is open for review, not merged. Phase 5 has not started.** Phases 1–3 are merged. Phase 3 [PR #2](https://github.com/db2910/Amajo/pull/2) was confirmed merged on 2026-11-05 at `542bb2f`, local main fast-forwarded safely, then the Phase 4 branch created. Read `IMPLEMENTATION_PLAN.md` and this file before resuming. Later phase checklists remain unchecked.

## GitHub and version control

- Repository: `https://github.com/db2910/Amajo.git`, remote `origin`; existing authenticated Git workflow retained, with credentials outside the repository.
- Current branch: `feat/phase-4-public-pages`, created from synchronized `main`/`origin/main` at `542bb2f63df451a8c5dcc072b486588c70494bb0`. The initial working tree was clean. Fetch, switch to main and fast-forward-only integration succeeded without conflicts or discarding work.
- Phase 2 [PR #1](https://github.com/db2910/Amajo/pull/1) was confirmed merged on 2026-11-04 before any Phase 3 implementation. No force-push or history rewrite was used.
- Phase 1 foundation: `c223deb`; Phase 2 implementation: `7549b3a`, with documentation follow-ups through `f325a70` and merge `9565cf2`.
- Phase 3 baseline implementation commit: `efa7c3897da9dae06b64a734fd0e01305308819d` — `feat: implement destinations and tour discovery`. Push succeeded with matching local/remote feature branch hashes and upstream `origin/feat/phase-3-destinations-tours` verified. A documentation-only synchronization commit follows; use `git log -1` for the current documentation-inclusive HEAD.
- Phase 3 review work: `ae2d69d` — `feat: center heroes and include multi-day accommodation`, following baseline synchronization commit `20dda34`. These verified refinements were committed/pushed on the Phase 3 branch and are included in merge `542bb2f`.
- Phase 3 review: [PR #2](https://github.com/db2910/Amajo/pull/2) was merged by the user on 2026-11-05 at `542bb2f63df451a8c5dcc072b486588c70494bb0`; verified through authenticated GitHub tooling before Phase 4.
- Phase 4 implementation commit: `409d64d2aa8644aa2a2278b25ff18216f2aa95af` — `feat: implement public services and inquiry pages`. Push succeeded; local/remote hashes matched and upstream `origin/feat/phase-4-public-pages` was verified. A documentation-only synchronization commit follows; use `git log -1` for the current documentation-inclusive HEAD.
- Phase 4 review: [PR #3](https://github.com/db2910/Amajo/pull/3), open against `main`, not merged. PR head and final local/remote synchronization are rechecked after the documentation commit. No force-push, history rewrite or automatic merge was used.
- Phase 4 staged review: 38 intended files; zero credential-pattern matches or sensitive paths; staged whitespace check passed. Original Stitch references, approved assets, package manifest/lockfile and placeholder-only `.env.example` are unchanged. Secret/build/report/temp ignore rules verified. Documentation-only follow-up receives the same staged review.
- Phase 3 pre-commit review: 42 intended files; zero credential-pattern matches and zero sensitive paths. Original Stitch references and package manifests/lockfile are unchanged. Dependencies, environment secrets, build output, temporary files and test reports remain ignored; `.env.example` remains tracked with placeholders only.
- Standing workflow: after each verified phase, review staged content for secrets, update both progress documents, commit, push and verify. Use feature branches/reviewed PRs for substantial changes; never force-push, overwrite remote history or automatically merge a phase PR.

## Phase 4 implementation — 2026-11-05

- Review refinement: reduced the Services intro's desktop top padding from 96px to 24px at 1024px and above. Direct Edge measurements at 390/768/1024/1440/1920px confirmed the new desktop navbar-to-breadcrumb gap, unchanged smaller layouts and no horizontal overflow. Desktop screenshot reviewed (`test-results/services-spacing-1440.png`, ignored). Scoped `npm.cmd exec -- eslint src/components/public/supporting-pages.tsx --max-warnings=0` and `npm.cmd run build` passed, including strict TypeScript. Full unit/form suites were not repeated for this padding-only change. Only the Services section's padding class changes; no shared layout token or reference asset is modified. The refinement is committed/pushed on the existing Phase 4 branch at task completion; use `git log -1` for its exact revision.

- Replaced every remaining preview with explicit routes: `/services`, ten `/services/[slug]` pages, `/about`, `/contact`, `/request-a-quote`, guarded `/request-a-quote/confirmation`, `/privacy`, `/terms` and `/permit-policy`. Removed the obsolete preview catch-all/allowlist; unknown services/paths still return 404. Updated shared CTA wording, nested service navigation styling and permit-policy footer navigation while preserving the catalog menus and cocoa footer.
- Reviewed Services, public About `_2`, public Contact `_1` and quote-planner Stitch screenshots/HTML structures. Added mixed editorial service compositions, shared service detail/process layouts, credited galleries, related concepts and quote links. About uses brand-purpose storytelling and typed sections; no company history, biographies, accreditations, partnerships or statistics were invented. All original references and existing assets are unchanged.
- Added asynchronous server-only public-content reads, service/About/team/contact/FAQ/policy contracts and read fixtures. Verified team and contact slots are empty; no fabricated phone/email/WhatsApp, office or map is published. Conditional verified contact actions are ready for approved configuration. Policy outlines are clearly draft/noindex and require business/legal approval. Journal remains excluded from the current scope without explicit opt-in; its routes correctly return 404.
- Added React Hook Form/Zod contact and three-step quote interfaces. Validates destination/recommendation choices, dates, party size, budget/currency, bounded plain text, email, conditional phone and consent. Recognized tour/service/place context is resolved server-side; unknown/repeated/mismatched context rejects all supplied prefill. A selected tour fills its countries, experiences and travel style. Back/Next and error recovery preserve entries; page reload clears form memory. No local/session storage or personal data in URLs.
- Multi-day accommodation inclusion remains consistent in the planner/summary and accommodation service; specific properties, room types, rates and availability require a tailored quote. No property or activity is reserved.
- Send buttons stay disabled. Local “Check my details” reports validation only and clears when edited. Fieldsets are disabled in initial HTML until scripts are ready, with a visible readiness notice while scripts are unavailable. No entered personal details are sent by these interfaces. Future Server Actions revalidate untrusted payloads and recognized records but return only invalid/unavailable, without persistence, logging, emails, references or redirects. The confirmation route resolves no receipt until Phase 5 supplies protected durable-submission state; URL claims cannot forge one.
- Created: nine public route modules; `supporting-pages.tsx`, `contact-form.tsx`, `quote-form.tsx`, `inquiry-controls.tsx`; `src/features/content/{types,repository}.ts`; `src/features/inquiries/{schemas,contracts,context,submission,actions,confirmation}.ts`; `src/data/public-content.ts`; unit/browser checks and `docs/PHASE_4_PUBLIC_PAGES.md`. Updated README, read-boundary/route/media docs and both progress records. Packages installed: none; existing pinned dependencies and lockfile retained. Prettier 3 used from the existing ephemeral cache.

## Phase 4 verification — 2026-11-05

- `npm.cmd run typecheck`: passed; final production build also passed strict TypeScript and route checks.
- `npm.cmd run lint`: passed with zero warnings. Corrected a React ref-handling finding by deferring final validation-handler creation to submission.
- `npm.cmd test`: 67 passed (28 new inquiry/content cases plus 39 existing cases). Includes future/real date rules, fixed/flexible dates, party bounds, optional budget/currency, conditional phone, consent, text limits, all tour prefill mappings, invalid authoritative context and unavailable server results without receipts.
- `npm.cmd run build`: final source passed; 44 static outputs including all ten service details, with query-aware quote rendering on demand. Root noindex retained; no production deployment claimed.
- Initial full browser run: 55/56 passed in 4.4m, including all 41 existing regression checks. The remaining no-JavaScript notice assertion exposed inconsistent `noscript` handling; replaced it with explicit readiness-based text while retaining server-disabled controls. After that correction and touched-date revalidation improvements, `PLAYWRIGHT_CHANNEL=msedge`, `PLAYWRIGHT_PORT=3100`, `npm.cmd run test:e2e -- public-pages.spec.ts` passed all 15 Phase 4 checks on the final source in 1.2m. No unresolved failure remains in the tested paths. Prettier checks pass on all added feature/form/test modules.
- Covered paths include 360/390/768/1024/1440px layouts, no overflow/page errors, all ten service HTTP routes, unknown-service/journal 404s, keyboard galleries and restored focus, every tour prefill, invalid/repeated/ownership context, form progression/state preservation, dates/counts, phone/consent, disabled Send/no POST, forged confirmation URLs, policy draft/noindex and tested axe A/AA scans. Screenshots include all major pages and form steps; viewed desktop/mobile compositions against the original references. Corrected country accessible-name capitalization and first-invalid contact focus after browser findings. Screenshot helpers now await lazy images, avoid waiting on nonexistent images and reset transient focus/scroll.
- Existing user development server on 3000 preserved. Test-owned production servers use 3100 and stop after verification. Firefox/Safari, manual screen-reader testing, real storage/delivery, RLS/authentication, CMS and deployment remain later checks; no such result is claimed.
- Outstanding publication/backend dependencies: approved service/brand content, verified business contacts and team, venue/property imagery, approved policies; published Supabase reads, durable intake/receipt session, anti-abuse/idempotency and private access in Phase 5; email delivery in Phase 8. Existing development-only lint advisory remains recorded below. No package upgrade was attempted in Phase 4.

## Phase 3 review refinements — 2026-11-05

- Centered the homepage hero heading, description, actions and brand-value strip; enlarged the greeting from 30px to 44px mobile/60px desktop, retaining pause/resume and reduced-motion behavior.
- Added an optional centered composition to the shared catalog hero. `/tours` now uses the existing locally served Tsavo elephant photograph, a contrasting overlay, centered editorial typography, an accommodation highlight and a working link to the search/results area. Country/attraction hero layouts retain their existing composition.
- Recorded the user's confirmed policy: all tours longer than one day include accommodation. Added a shared duration rule and consistent labels on homepage/catalog cards, trip summaries/sidebar, inclusions, overnight notes and FAQs across all nine concepts. Removed accommodation from exclusions. Property names, room categories and rates remain subject to the tailored quote; no booking is simulated.
- Fixed a navigation accessibility finding exposed during regression: Radix's hidden keyboard focus proxy now has zero dimensions and no pointer target, while retaining Tab/Shift+Tab focus redirection. The targeted keyboard/menu/drawer axe check passes without disabling a rule or excluding elements.
- Verification: `npm.cmd run typecheck`, production build (including final strict TypeScript), full ESLint plus final changed-file lint, and 39 unit tests passed. The final full Edge/Chromium suite passed all 41 tests in 2.5m on port 3100. It covers 360/390/768/1024/1440px plus the new 1920px hero checks, greeting controls/reduced motion, both hero images/composition, all nine accommodation pages, keyboard focus and tested axe A/AA scans. Screenshots at 360/1440/1920px were visually inspected. Early test measurement races were fixed with render/font readiness; the exposed navigation focus-proxy finding was corrected and keyboard-tested before the final passing run.
- Changed modules: homepage/greeting, shared catalog hero/cards, tours page, trip detail, catalog fixture copy, new `src/features/catalog/accommodation.ts`, scoped focus-proxy CSS/header class, unit and browser checks, and both progress records/catalog/photo-credit docs. No packages or image assets added; original Stitch files are unchanged. Phase 4 was unstarted at that review milestone.
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

- Phase 3 implementation has no unresolved failure in tested paths; business confirmation and publication review remain required. Some attraction images are clearly captioned regional illustrations; confirm approved place-specific assets before publication. Lake Kivu provenance/tool limits and all image licenses are documented in `IMAGE_CREDITS.md`.

- Development tooling: Next's ESLint dependency chain includes the minimatch glob-amplification advisory [GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249). npm reports 16 moderate findings through that chain. ESLint 9.39.5 also emits an upstream deprecation notice. ESLint 10 was tested for installation compatibility and reverted because the selected Next configuration's React/import/accessibility plugins do not accept it. Avoid forced audit downgrades or incompatible minimatch major overrides. Reassess compatible upstream releases before production readiness. This does not affect the zero-finding production dependency audit or passing Phase 1 acceptance checks.
- Framework-generated instructions and temporary browser color-environment warnings are not application failures. No unresolved application defect was observed in the checked Phase 1 flows.
- Supabase/auth needed in Phase 5, protected staff dashboard in Phase 6, email provider in Phase 8, hosting/domain/operations in Phase 10.
- Business contacts, prices, claims, image rights, policy wording, testimonials and conditional journal scope still require validation before publication. Do not promote reference content as verified data.

## Exact next steps

1. Review and accept [Phase 4 PR #3](https://github.com/db2910/Amajo/pull/3) against main; do not automatically merge it. Commit/push/PR synchronization is recorded in the GitHub section above.
2. Run `.\dev.cmd` on this feature branch and review `/services`, service details, `/about`, `/contact`, `/request-a-quote`, draft policies and confirmation guard. Existing catalog/homepage remain available.
3. Review and accept the Phase 4 PR before starting Phase 5. Obtain an isolated Supabase development project and approved configuration for the next phase; no credentials belong in tracked files or documentation.
4. Phase 5 connects published reads and durable inquiry intake/receipt state. Keep protected dashboards, CMS and notification delivery in their scheduled phases.
5. Continue review, secret scan, documentation, commit, push and synchronization checks at every completed phase.
