# AMAJO implementation plan

Last updated: 2026-11-05 (Africa/Johannesburg).

## 1. Purpose and working rules

Build a secure, responsive East African tours website and administrative CMS for AMAJO — Essence of Africa. Visitors discover Rwanda, Uganda, and Kenya, compare tours, read itineraries, and request a tailored quote. Staff manage published content and customer inquiries through authenticated, role-controlled tools.

This document is the implementation roadmap. Read it with `PROJECT_STATUS.md` before every resumed session. Preserve the original Stitch exports. Review the relevant screenshot and HTML before each visual implementation. Execute phases in order, verify behavior, then update both documents. A rendered screen is not a completed feature. Check a task only when its acceptance criteria are met; describe partial work separately.

Checklist convention: `- [ ]` means not started or incomplete; `- [x]` means verified completed. Phases 1–2 are complete and merged into `main`. PR #1 merge was verified on 2026-11-04 at `9565cf2`; local main fast-forwarded and `feat/phase-3-destinations-tours` created. Phase 3 implementation and acceptance checks are complete and pushed; [PR #2](https://github.com/db2910/Amajo/pull/2) awaits user review, not merged. Phase 4 has not started.

Launch scope: three countries, tours and experiences, attractions, services, company information, quote/contact intake, and a complete CMS and inquiry workflow. No customer accounts, checkout, payments, live booking inventory, permit procurement, aviation integrations, satellite tracking, currency conversion, or newsletter delivery in the baseline. These appear in reference artwork but are separate products. Journal/blog routes are conditional on business scope confirmation; their schema and implementation slot are reserved below. Greeting animation does not imply a translated website.

## 2. Discovery and existing codebase assessment

### Evidence reviewed

The workspace initially contained only `stitch_amajo design/`: 11 `code.html` exports, 10 corresponding `screen.png` files, one `DESIGN.md`, and `logo.png`. All HTML exports were inspected for headings, scripts, images, and placeholder links; all ten screenshots and the logo were viewed. No application source, package manifest, lockfile, framework configuration, tests, database migrations, authentication setup, environment configuration, deployment configuration, or project-level `AGENTS.md` was found. No Git metadata was present in the root listing. Node, npm, and Git were not discoverable on PATH; the common Program Files Node/Git paths and roaming npm directory also did not exist. These checks do not prove the tools are absent from every location on this machine.

| Reference directory | Assessment and intended use |
| --- | --- |
| `east_african_luxury_safari_expeditions` | `DESIGN.md`: typography, tokens, spacing, components; no implementation or screenshot. |
| `amajo_discover_the_essence_of_africa_luxury_expeditions` | Canonical homepage composition: landscape hero, search, three countries, featured tours, brand values, testimonials, quote CTA, footer. |
| `amajo_essence_of_africa_luxury_safaris` | Alternate homepage HTML, no matching screenshot; compare details rather than create another homepage. |
| `rwanda_primates_volcanoes_mist_amajo_expeditions` | Country template: hero, introduction, attractions, seasons, tours, experiences and practical FAQs. Create researched Uganda/Kenya content using the same template. |
| `the_great_primate_savannah_odyssey_amajo_expeditions` | Tour template: gallery, summary, itinerary, lodging, inclusions/exclusions, FAQs, related tours and inquiry sidebar. |
| `our_signature_services_bespoke_expeditions_amajo` | Services portfolio, six capabilities, consultation process and inquiry CTA. |
| `about_us_heritage_amajo_luxury_expeditions_2` | Preferred public About shell and storytelling sections. |
| `about_us_heritage_amajo_luxury_expeditions_1` | Same public content inside admin sidebar; use content composition only. |
| `private_concierge_desks_regional_studios_amajo_1` | Preferred public Contact layout: regional offices, form, contact actions, FAQ. |
| `private_concierge_desks_regional_studios_amajo_2` | Public Contact content inside admin shell; do not reproduce shell mismatch. |
| `design_your_bespoke_african_journey_private_concierge_planning` | Quote form sections: regions, interests, party, timing, budget and traveler details; confirmation concept. |
| `amajo_operations_safari_studio_executive_cms_dashboard` | Admin visual reference: sidebar, overview cards, inquiry table and content shortcuts. Statistics, bookings and tracking are illustrative, not existing functionality. |
| `logo.png` | Actual supplied square raster mark, elephant and wordmark on ivory, 747 × 731 pixels. Preserve artwork and aspect ratio; obtain vector/transparent variants if needed. |

### Reuse, improve, build

- Reuse supplied logo, visual hierarchy, section concepts, country/tour presentation patterns and design intent. Keep exports as read-only references.
- Rebuild semantic, reusable application components rather than copying entire HTML exports. Exports depend on runtime Tailwind CDN, remote fonts/icons/images, placeholder `href="#"` links (10–32 per export), and isolated scripts. They provide no durable storage or authorization.
- Improve very small text, overlong labels, crowded navigation, weak contrast (notably the About closing CTA), broken/blank map areas, and footer density. Do not hide scrollbars globally or disable normal scrolling.
- Normalize public navigation across pages; isolate the admin shell. Replace sample contact details, 2025 dates, profile identities, prices, accreditations, permit guarantees, impact percentages and testimonials with verified business content before publishing.
- Audit remote image usage rights and availability; migrate approved assets to owned storage with attribution metadata where needed. Do not treat Google-hosted reference image URLs as production assets.
- Build application architecture, public routes, search, forms, database, CMS, storage, auth, authorization, tests and deployment from scratch. There is no working application behavior to preserve.

## 3. Architecture and dependencies

Local repository stack: Next.js 16 App Router with strict TypeScript, React, Tailwind CSS v4 with canonical CSS design tokens, shadcn/ui, Lucide React, Motion for React, Zod, and React Hook Form for complex administrative and quote forms. Supabase Postgres/Auth/Storage remains scheduled for Phase 5. Vitest covers domain/unit tests and Playwright with axe covers workflow/accessibility tests. Use compiled styling rather than the exported Tailwind CDN. Dependencies are pinned in the package manifest and lockfile. The Phase 1 request explicitly selected Tailwind v4, shadcn/ui and Motion without changing the established architecture.

Server-render public content and isolate interactive controls into client components. Put database access in server-only repositories. During phases 2–4, typed local fixtures implement the same read contracts as phase 5 repositories. Fixtures must be visibly documented as development data; forms must not report delivery until durable storage is available. Keep tests independent of repository implementations where possible.

Use Next Server Actions for same-origin form submissions and authenticated mutations. Use Route Handlers only for external boundaries such as health checks and signed provider webhooks. Public reads use published queries; never serialize private CMS records into client payloads. Backend credentials remain server-only. Deployment target is a compatible Node hosting platform with managed Supabase; final provider selection occurs in phase 10. If Sites hosting is selected later, assess its Vinext/Workers compatibility before changing this architecture.

Proposed structure:

```text
src/app/(public)/       public routes and shared public layout
src/app/admin/          login/recovery and protected admin route groups
src/components/ui/     buttons, fields, dialogs, tables, pagination
src/components/public/ header, footer, cards, galleries, timelines
src/components/admin/  sidebar, editors, filters, media picker
src/features/          catalog, content, inquiries, auth, media
src/lib/               env, validation, authorization, Supabase clients
src/data/              typed development fixtures, removed from production reads
public/brand/          approved local brand assets
supabase/migrations/   versioned DDL, policies, indexes and functions
supabase/seed.sql      development content only; no real personal data
tests/                 domain, integration, RLS and browser tests
docs/                  plan, status, setup, architecture and operations
```

## 4. Complete public sitemap

| Route | Purpose and behavior |
| --- | --- |
| `/` | Homepage; greeting, hero, URL-based tour search, destinations, featured tours, values, testimonials and quote CTA. |
| `/destinations` | Rwanda, Uganda and Kenya overview. |
| `/destinations/[country]` | Country introduction, attractions, seasonal guidance, tours, FAQs and quote links; only approved country slugs. |
| `/destinations/[country]/attractions/[slug]` | Attraction details, gallery, practical guidance and related tours. |
| `/tours` | Search and filters for country, experience, duration and budget; sorting, pagination and empty states. |
| `/tours/[slug]` | Gallery, highlights, day-by-day itinerary, lodging notes, terms, FAQs, related tours and prefilled quote action. |
| `/experiences` | Curated experience taxonomy; cards link to `/tours?experience=...`. |
| `/services` | Service overview. |
| `/services/[slug]` | Service details, process and quote CTA. |
| `/about` | Verified story, team, values and conservation information. |
| `/contact` | Verified offices/contact details, accessible contact form and FAQ. |
| `/request-a-quote` | Tailored journey form; accepts validated tour/service prefill. |
| `/request-a-quote/confirmation` | Generic successful submission state, no customer data in URL; refresh-safe receipt behavior. |
| `/privacy`, `/terms`, `/permit-policy` | Business-reviewed policies and consent disclosures. |
| `/journal`, `/journal/[slug]` | Conditional blog listing/article scope; omit routes and navigation until enabled. |
| `/sitemap.xml`, `/robots.txt` | Published public routes only; exclude admin, confirmations and drafts. |
| Not-found/error states | Useful recovery links; unknown, unpublished and archived slugs return appropriate not-found responses. |

Public navigation: logo/Home, Destinations dropdown (overview, Rwanda, Uganda, Kenya), Tours & Experiences dropdown (all tours, experiences, relevant filters), Services, About, Contact and Request a Quote. Journal appears only when enabled. All navigation must work with keyboard, pointer and touch; active state reflects the actual route.

## 5. Complete admin sitemap

| Route | Access and purpose |
| --- | --- |
| `/admin/login`, `/admin/forgot-password`, `/admin/reset-password` | Auth-only screens; invitation or recovery flow, no public staff registration. |
| `/admin` | Protected overview with real published counts, new inquiries, messages and content shortcuts; no invented revenue. |
| `/admin/tours`, `/admin/tours/new`, `/admin/tours/[id]` | List/create/edit/archive tours, pricing notes, relationships and gallery. |
| `/admin/tours/[id]/itinerary` | Ordered days and activities, add/remove/reorder and validation. |
| `/admin/destinations`, `/admin/destinations/new`, `/admin/destinations/[id]` | Country content and seasonal guidance. |
| `/admin/attractions`, `/admin/attractions/new`, `/admin/attractions/[id]` | Country-linked attraction management. |
| `/admin/services`, `/admin/services/new`, `/admin/services/[id]` | Services management. |
| `/admin/homepage` | Typed homepage sections, featured records and order. |
| `/admin/media`, `/admin/media/[id]` | Upload, alt text, attribution, usage and safe removal. |
| `/admin/testimonials`, `/admin/testimonials/new`, `/admin/testimonials/[id]` | Verified testimonials and publication consent. |
| `/admin/team`, `/admin/team/new`, `/admin/team/[id]` | Public staff biographies, distinct from admin accounts. |
| `/admin/pages`, `/admin/pages/[key]` | About/contact/policy content using predefined sections. |
| `/admin/journal`, `/admin/journal/new`, `/admin/journal/[id]` | Conditional blog management, disabled with public journal. |
| `/admin/quotes`, `/admin/quotes/[id]` | Filters, assigned agent, status history, internal notes and contact actions. |
| `/admin/messages`, `/admin/messages/[id]` | Contact intake and status/assignment/notes. |
| `/admin/notifications` | In-app unread notifications linked to authorized records. |
| `/admin/settings` | Verified business identity, contact details, SEO defaults and feature flags. |
| `/admin/users` | Administrator-only invitation, roles, deactivation and access review. |
| `/admin/audit-log` | Administrator-only mutation/security history with redacted metadata. |
| `/admin/profile` | Staff profile, password/MFA settings and logout. |

Bookings, permits, lodge inventory, flight charters and field tracking shown in Stitch are excluded modules. Tour accommodation text and approved lodge imagery remain part of tour content.

Business policy confirmed by the user on 2026-11-05: all tours longer than one day include accommodation for the scheduled overnight stays. Show this consistently on cards, trip summaries, inclusions, FAQs and itinerary notes. Specific properties, room categories, rates and availability require confirmation in the tailored quote; the policy does not imply a booked property or online booking functionality.

## 6. Design and responsive strategy

Use the homepage reference as the public visual baseline and the dashboard reference only for administration. Preserve immersive landscape photography, ivory backgrounds, cocoa typography, serif headings, rust actions, quiet dividers, editorial spacing and warm shadows.

`DESIGN.md` has conflicting frontmatter and prose tokens: primary `#a43700` versus `#D95B26`, canvas `#fcf9f4` versus `#FBF8F3`, and differing radii in exports. Initial canonical decisions: canvas `#fcf9f4`, dark cocoa `#2C140E`, primary action `#a43700`, decorative orange `#D95B26`, gold `#D4A359`, sand `#EFE8DE`, sage `#4A5D4E`. Validate contrast for each actual text/background pair; decorative orange/gold must not become small text without a passing check. Document token changes centrally.

Playfair Display for display/headings, Plus Jakarta Sans for body/UI, licensed self-hosted font files when acquired and system fallbacks until then. Base body text 16px/26px; do not inherit the reference's tiny metadata everywhere. Hero headings scale from 38px/44px on mobile to 56px/64px desktop. Container maximum 1360px; mobile gutters 20px, desktop 32px; major sections 64–128px apart. Inputs/buttons 8px radius, cards 16px, hero imagery 24px. Preserve the supplied logo without cropping; provide a readable brand lockup for narrow headers.

Mobile-first layouts: under 768px single-column forms and cards; 768–1023px two-column content where readable; 1024px+ full navigation and editorial grids. Collapse admin sidebar to a drawer and tables to scrollable, labelled regions or key-field cards. Sticky quote CTA cannot obscure content, browser zoom, or keyboard focus. Images use deliberate aspect ratios, responsive sizes and focal points. Galleries have accessible controls and textual alternatives. Itineraries and FAQs use accessible disclosure controls. Target WCAG 2.2 AA, 44px touch controls, visible focus, skip link, semantic landmarks, field labels and announced errors. Greetings cycle Hello, Muraho, Habari, Bonjour; respect reduced motion and keep a stable accessible name without repetitive live announcements.

## 7. Reusable component and content architecture

- Foundation: Container, Stack/Grid, SectionHeading, Eyebrow, Button/LinkButton, Field, Input, Select, Checkbox, RadioGroup, Textarea, ErrorSummary, Badge, Dialog, Drawer, Toast, Skeleton and EmptyState.
- Public: Brand, PublicHeader, DestinationMenu, ToursMenu, MobileNavigation, PublicFooter, Greeting, Hero, TourSearch, DestinationCard, TourCard, ExperienceCard, ServiceCard, TestimonialCard, MediaGallery, ItineraryTimeline, FAQList, RelatedTours, QuoteCTA, ContactForm and QuoteForm.
- Admin: AdminShell, Sidebar, Breadcrumbs, DataTable, FilterToolbar, Pagination, ConfirmDialog, PublishControls, RecordForm, MediaPicker, GalleryEditor, SlugField, OrderedListEditor, RichTextEditor, StatusHistory, NotesPanel and PermissionBoundary. PermissionBoundary improves UI only; it is never the authorization boundary.
- Typed feature modules own domain schemas, repositories, queries, mutations and tests. Pages orchestrate these; components do not embed unrelated database logic.
- CMS uses predefined, versioned section types rather than arbitrary HTML or executable page scripts. Store sanitized structured rich text, normalized relationships and SEO fields. Validate references and mandatory fields before publication. Distinguish draft, published and archived; show accurate empty/error/loading states.
- Separate working drafts from immutable published snapshots using content revisions. Public queries read the active published revision only, including related records. Draft edits to a previously published record must not leak. A publish transaction validates references, creates a revision, switches the active revision and records an audit event. Preview uses authenticated, non-indexable routes; no anonymous draft endpoints.

## 8. Database schema and relationships

Use UUID primary keys, `timestamptz` timestamps, foreign keys and indexed relationship/filter fields. CMS entities share unique slug where relevant, title, status, SEO title/description, author/updater, version and publication metadata. Store money as integer minor units plus ISO currency; duration as positive integer days. Prices are indicative, never a booking guarantee. Avoid floating point money and undocumented exchange rates.

| Table | Important fields / relationships |
| --- | --- |
| `admin_profiles` | `user_id -> auth.users`, display name, role (`administrator`, `editor`, `agent`), active. Role writes restricted to administrator/provisioning path. |
| `destinations` | Country code/unique slug, introduction, hero media, seasonal sections and FAQs; draft working content. |
| `attractions` | `destination_id`, title/slug, body, practical guidance, hero media. |
| `experiences` | Unique slug, label and description for tour taxonomy. |
| `tours` | Title/slug, overview, duration, starting price/currency, inclusions/exclusions, highlights, FAQs, featured order, hero media. |
| `tour_destinations`, `tour_attractions`, `tour_experiences` | Composite unique pairs linking tours to countries, attractions and experiences. |
| `itinerary_days` | `tour_id`, day number/order, title, description, overnight/accommodation and meals; unique `(tour_id, day_number)`. |
| `itinerary_activities` | `day_id`, order, title, body, optional time/location. |
| `services` | Slug, introduction, structured sections, benefits, process and hero media. |
| `media_assets` | Unique storage path, MIME type, dimensions, size, alt text, caption, attribution/license, uploader and visibility. |
| `tour_media`, `destination_media`, `attraction_media`, `service_media` | Explicit entity-to-media FKs, display order and caption overrides. |
| `testimonials` | Quote, approved attribution, rating if verified, consent evidence metadata and publication fields. |
| `team_members` | Name, role, bio, portrait media, sort order; not an auth account. |
| `pages` | Unique page key, versioned structured sections for About, Contact and policy pages. |
| `homepage_sections` | Stable section key, type, order and validated configuration; featured entities referenced by IDs. |
| `site_settings` | Singleton validated business/contact/SEO configuration; no credentials. |
| `posts`, `post_categories`, `post_category_links` | Conditional journal schema: slug, author/team reference, rich text, excerpt, hero and categories. |
| `content_revisions` | Entity type/id, revision number, sanitized immutable published payload, referenced asset IDs, publisher, timestamp. Unique revision number per entity; active revision reference owned by entity. Enforce valid entity references through typed publish functions/triggers. |
| `quote_requests` | Internal UUID, unguessable reference, name/email/optional phone, contact preference, origin, optional tour/service FK, dates/flexibility, adults/children counts, budget/currency, duration, pace, transport/lodging preferences, message, consent/version/timestamp, status and assigned staff. |
| `quote_destinations`, `quote_experiences` | Requested country and experience links. Do not collect children's names or birthdates. |
| `contact_messages` | Name/email/optional phone, subject/body, consent/version/time, status and assigned staff. |
| `inquiry_notes` | Exactly one quote or contact FK, author FK, internal body, timestamps; check constraint enforces one parent. |
| `inquiry_status_events` | Exactly one inquiry FK, previous/new status, actor and timestamp. |
| `notifications` | Staff recipient FK, inquiry reference, type, read time; private. |
| `notification_outbox` | Durable delivery jobs, attempt count, next retry, provider ID, idempotency key and redacted error. |
| `audit_events` | Actor, action, entity, timestamp and redacted change metadata; append-only through trusted functions. |
| `submission_keys` / rate-limit storage | Server-managed expiring deduplication and rate limit records; no anonymous reads. |

Relationships: countries have many attractions; tours span many countries/attractions/experiences; tours own ordered days and activities; media is reusable through explicit join tables; staff have many assignments, notes and events; inquiries own notes/status history. Quote references to tours are nullable on archive but retain a submission-time title/slug snapshot. Prefer archival for referenced content. Restrict destructive deletes; block media deletion while draft or published revisions reference it. Index slugs, status/publication, join FKs, sort fields, inquiry status/created time and assignee. Constrain positive duration, nonnegative price/budget, reasonable party bounds and valid date ordering.

Migrations must include tables, constraints, indexes, RLS, grants, storage policies and publish/intake functions. Regenerate database TypeScript types after schema changes. Seeds are deterministic and development-only. Establish backup, restoration and retention procedures before launch.

## 9. Authentication, authorization and storage

Use Supabase email/password staff sign-in with invitation-only onboarding, recovery, secure server-managed session cookies and a documented first-administrator provisioning procedure. Require administrator MFA for launch. No hardcoded demo credentials, public role selection or client-stored privilege flags. Validate identity and active membership on every protected server operation; route protection is supplementary. Validate redirects against an allowlist and handle expired/revoked sessions consistently. Role changes/deactivation must take effect without trusting stale client metadata.

| Capability | Administrator | Editor | Agent | Anonymous |
| --- | --- | --- | --- | --- |
| Read published public content | Yes | Yes | Yes | Yes |
| Draft/edit/publish CMS content and upload media | Yes | Yes | No | No |
| Read/manage all inquiries | Yes | No | Assigned records only | No |
| Assign inquiries across agents | Yes | No | No | No |
| Staff roles, settings, audit log | Yes | No | No | No |
| Submit quote/contact | Yes | Yes | Yes | Validated intake only |

RLS enforces equivalent database access for direct API calls. Anonymous users may read only active published snapshots and approved public settings; no raw drafts or personal data. No anonymous SELECT on inquiry tables. Intake uses a narrow server-only insert path or constrained security-definer RPC, never a general public insert policy accepting status/assignee. Privileged functions set a safe search path, explicitly check permissions and restrict execute grants. Service-role credentials are restricted to server tasks and must never bypass staff authorization accidentally.

Storage: private originals/staging bucket, public bucket for approved published derivatives only. Validate magic bytes/MIME, dimensions, file sizes and allowed image formats; reject active SVG/HTML by default. Use generated paths, prevent overwrite/path traversal and remove EXIF personal metadata. Private originals require signed URLs after authorization. Public image publication is explicit; removing a draft must not delete a live published asset.

## 10. Server Actions and API contracts

All mutations validate server-side with shared schemas, explicit allowed fields, permission checks and structured `{ success, fieldErrors, formError, reference? }` results. Do not expose stack traces, raw SQL errors, secrets or customer details in logs. Use transactions for related writes and optimistic version checks for concurrent CMS edits. Revalidate affected public pages/tags only after a successful commit.

| Boundary | Required operations |
| --- | --- |
| Public read repositories | Home content, country/attraction details, published tour search/detail, experiences, services, team/testimonials and pages. |
| Public Server Actions | `submitQuote`, `submitContact`; validation, spam protection, deduplication and durable insert. |
| Auth actions | Sign in/out, invitation completion, recovery/reset; validated callback and redirect handling. |
| CMS actions | List/filter, create, update with version, reorder, publish/unpublish, archive and validated relation management for every entity. |
| Media actions | Authorized upload initiation/finalization, metadata editing, usage lookup and safe deletion. |
| Inquiry actions | Paginated list/detail, permitted assignment, status transition, notes, notification reads and authorized contact links. |
| Administration | Invite/deactivate staff, set allowed role, update validated settings, read audit events. |
| Route Handlers | Minimal non-sensitive health response; signed provider webhooks and protected scheduled outbox processing only when a provider is configured. |

Search query contract: `q`, `country`, `experience`, `minDays`, `maxDays`, `maxBudget`, `sort`, `page`. Validate length, enum values, ranges and maximum page size. Preserve valid filters in the URL, use deterministic ordering and return result count/empty state. Never interpolate search text into SQL. Homepage search maps directly to these parameters.

## 11. Quote and contact workflows

Quote: tour/service CTA supplies a validated ID or slug; visitor chooses countries/interests, party, travel dates or flexibility, duration, budget/currency, travel preferences and contact details. Validate step progression and the final payload. Name/email/at least one destination or recommendation preference/party size/consent are required; exact travel dates and phone remain optional unless the chosen contact method requires phone. Enforce future date rules, numeric bounds, email syntax, trimmed text limits and sanitized content. Do not collect medical diagnoses, passport data or unnecessary sensitive information.

Submission flow: browser pending state prevents repeated clicks; server checks origin, rate limit, honeypot and adaptive anti-bot verification; idempotency key deduplicates retries; a transaction stores the request, relationship rows, initial status event and outbox jobs. Only a successful durable commit allows redirect to confirmation. A generic receipt reference may be shown using protected session state, never PII in query strings or an anonymous inquiry lookup. Database failure leaves inputs available and shows a retryable error. Notification failure does not discard the saved inquiry or tell the visitor submission failed.

Contact uses the same durable intake infrastructure with fewer fields and an inline accessible success state. No mock success while offline/backend missing. Confirmation copy promises only a business-approved response timeframe. Staff notification and customer acknowledgment use a configured transactional email provider and verified sender domain; queued delivery supports backoff/retry and monitored failures. Use escaped templates, validated recipients and no user-controlled mail headers. Email/WhatsApp buttons open user-initiated links to verified addresses/numbers; do not automatically send messages through external tools.

Inquiry statuses: `new -> contacted -> qualified -> proposal_sent -> won/lost`, with `spam` and `archived` terminal options and administrator-controlled reopen. Contact statuses: `new -> in_progress -> resolved`, plus `spam/archived`. Enforce permitted transitions on the server and record actor/time. Notes remain internal. Agent lists, aggregates and detail access obey assignment rules. No dashboard financial metric until an actual booking/revenue model exists.

## 12. Security, SEO and performance requirements

Security: server validation, least-privilege RLS/grants, session verification, role escalation prevention, sanitized rich text, safe links, CSRF/origin protection, rate limits, restrictive upload policies, HTTPS, security headers/CSP, dependency review and secrets excluded from source. Protect previews and nonproduction deployments from indexing and access leakage. Avoid logging form bodies or storing raw IPs unnecessarily; define retention and deletion with the business. Review policy wording with the responsible business/legal owner rather than copying compliance claims from artwork.

SEO: route-specific title/description, canonical URL from configured origin, Open Graph images, semantic headings, alt text, breadcrumbs, sitemap of published pages and correct 404s. Use Organization/BreadcrumbList and relevant tour structured data only when supported by verified content; no fabricated ratings or availability. Noindex admin, drafts, confirmation and search/filter permutations where appropriate. Plan redirects for published slug changes.

Performance: server render primary content, cache only published reads, invalidate on publication, paginate queries, index filters, minimize client bundles and defer heavy galleries. Optimize owned photography to modern responsive formats, declare dimensions and prioritize only the hero. Self-host/subset approved fonts with swap/fallback behavior. Targets at production-like mobile conditions: LCP <= 2.5s, INP <= 200ms, CLS <= 0.1 at the 75th percentile when field data becomes available. Record lab measurements separately; do not claim field targets from a local test.

## 13. Quality assurance and verification strategy

After each phase run relevant TypeScript, ESLint and production build checks once a toolchain exists. Add tests for meaningful behavior: search parsing/results, quote validation/idempotency/failure recovery, itinerary persistence/reorder, publication isolation, permissions and inquiry transitions. Avoid tests that merely repeat markup or implementation details.

Integration/RLS tests use an isolated Supabase environment and anonymous/editor/agent/administrator identities. Prove anonymous draft/inquiry denial, editor inquiry denial, agent assignment isolation, forged role rejection, deactivation, upload restrictions and published revision consistency. Test direct database API access as well as server actions. Never use real customer data in tests.

Browser journeys: navigate dropdowns/mobile menus, filter and open a tour, request a quote, receive confirmation after real storage, sign in, publish content, see public updates, assign an inquiry and manage it as an agent. Cover empty/error states, duplicate submits, expired sessions, back navigation, invalid URLs, inaccessible records and provider outage. Check keyboard-only interaction, axe findings, contrast, focus restoration and reduced motion. Viewports: 360, 390, 768, 1024 and 1440px, plus 200% zoom and long content. Check current supported Chromium, Firefox and Safari where available.

For every check record the command, result, date and relevant limitation in the status file. A skipped browser/database/security check remains pending. Do not mark a phase complete with required unverified acceptance criteria.

## 14. Phase dependencies and execution order

`Discovery/planning -> P1 -> P2 -> P3 -> P4 -> P5 -> P6 -> P7 -> P8 -> P9 -> P10`.

Data contracts, schema, publication rules and permissions are defined in this plan before UI work. P2–P4 may use typed development read fixtures; their delivery/backend acceptance remains pending until P5 integration. P5 replaces fixtures and connects quote/contact before P6. P7 publication requires P5 schema/auth and P6 shared admin controls. P8 requires durable intake and staff identity. Security/accessibility checks begin in each phase and are consolidated in P9. No launch before P10 acceptance.

### Phase 1 — Project Foundation

Dependencies satisfied: planning complete; checksum-verified user-local Node 24.22.2/npm 11.19.1 and Git 2.56.0.windows.4 provisioned. Git was initialized on `main` during scaffolding and subsequently connected and pushed to GitHub as recorded below.

- [x] Review existing directory, reference exports, screenshots and logo.
- [x] Define proposed architecture, domain contracts and design direction in this plan.
- [x] Scaffold application, install/pin dependencies and configure scripts, TypeScript and ESLint.
- [x] Establish folder boundaries, environment schema, `.env.example` placeholders and ignored secrets/build artifacts.
- [x] Implement canonical design tokens, font fallbacks, brand asset and foundational UI primitives.
- [x] Establish separate public/admin layout foundations, error/not-found handling and setup documentation.
- [x] Run typecheck, lint and production build; verify primitives at mobile/desktop sizes and with keyboard.

Files/modules: package/configuration files, `src/app`, `src/components/ui`, `src/lib/env`, `public/brand`, setup docs. Deliverable: runnable documented foundation with no CDN Tailwind dependence. Acceptance: clean installation from lockfile, successful checks, usable brand/typography/components, no exposed secrets. Next: navigation/homepage.

Verified 2026-11-03: `npm.cmd ci --no-audit --no-fund`, `npm.cmd run typecheck`, `npm.cmd run lint`, `npm.cmd test` (8 passed), `npm.cmd run build`, and `npm.cmd run test:e2e` with `PLAYWRIGHT_CHANNEL=msedge` (12 passed). Browser evidence covers 360/390/768/1024/1440px, keyboard controls, dialog/drawer focus trapping and restoration, reduced motion, 200% text sizing, 404 recovery, local font loading and zero axe WCAG A/AA violations on the tested pages/overlays. Six desktop/mobile screenshots were visually reviewed. Development server smoke requests returned HTTP 200 for `/` and `/foundation`; owned preview servers were stopped afterward. Full browser zoom, Firefox/Safari, screen-reader, live database and authorization checks are not claimed. See `PROJECT_STATUS.md` for precise limits and the remaining development-only dependency advisory.

### Phase 2 — Navigation and Homepage

Dependencies: P1; typed published-content fixture contracts.

User-added prerequisite: push the verified Phase 1 baseline to `origin/main` at `https://github.com/db2910/Amajo.git` before Phase 2 implementation. The public footer must use deep cocoa `#2c140e`. After every verified phase, review for secrets, update both planning records, commit, push and verify synchronization; use feature branches and reviewed PRs for substantial work where practical and never force-push.

- [x] Responsive navbar, country dropdown, Tours & Experiences dropdown and mobile navigation.
- [x] Reduced-motion-aware Hello/Muraho/Habari/Bonjour greeting.
- [x] Hero and URL-based tour search.
- [x] Featured destination/tour cards, brand values, verified-or-clearly-development testimonials and quote CTA.
- [x] Footer with functional routes and verified contact placeholders isolated from production.
- [x] Check navigation/focus, search parameters, responsive layout, image sizing, typecheck/lint/build.

Files/modules: public layout/header/footer, homepage sections, cards, catalog contracts/fixtures. Deliverable: cohesive homepage and navigation. Acceptance: no dead controls, valid search URLs, accessible menus, no horizontal overflow. Full catalog results are verified in P3; live content read acceptance follows P5. Next: catalog pages.

Verified 2026-11-03: 19 unit tests, zero-warning ESLint, strict route/type checks, production build, and 22 Edge/Chromium browser tests passed. Browser coverage includes all five roadmap widths, desktop hover/click/keyboard menus, mobile expandable groups/navigation, scroll transition, greeting order/pause/reduced motion, query generation/reload/invalid input, valid internal route contracts, all homepage images, logo proportions, cocoa footer, 404 recovery and axe A/AA checks including open navigation/dialogs. Placeholder routes are explicitly described in `docs/PHASE_2_ROUTE_CONTRACTS.md`; they are not Phase 3/4 completion. Testimonials stay empty pending verified consent; missing contacts/social accounts remain honest launch placeholders. Original design exports are unchanged. Photography is locally served with source/license attribution in `docs/IMAGE_CREDITS.md`. No dependency was added for Phase 2.

### Phase 3 — Destinations and Tours

Dependencies: P2; country/tour/experience/attraction contracts.

- [x] Destinations overview and Rwanda/Uganda/Kenya template pages.
- [x] Attraction listing sections and detail pages.
- [x] Tours listing, query parsing, filters, sorting, pagination and empty states.
- [x] Tour details, ordered itinerary, gallery, inclusions/exclusions, FAQs and related tours.
- [x] Experiences overview and consistent filtered-tour links.
- [x] Test query behavior, relation rendering, unknown slugs, gallery/disclosures and responsive layouts; run checks.

Files/modules: public catalog routes, catalog repositories, search schema, gallery/timeline components. Deliverable: complete discovery journey with typed fixture adapter pending P5. Acceptance: shareable filters produce correct results; relations/itineraries work; unavailable records fail safely; quote prefill carries valid context. Next: supporting pages.

Verified 2026-11-04: strict typecheck, zero-warning ESLint, final production build, 38 unit tests, a full 33-test Edge browser run (4.4m), and 12 final catalog tests (1.5m) after the Jinja media/credit refinement passed. Coverage includes eight representative catalog routes at 360/390/768/1024/1440px, all 15 attractions and nine tour detail responses, invalid/mismatched 404s, combined filters, refresh/history/sort/reset, pagination/empty states, keyboard itinerary/gallery/drawer controls, related tours, validated quote context, public image credits and axe A/AA scans. Ten local editorial photos added; original exports and dependencies unchanged. The only initial browser failure was a whitespace-sensitive link locator, corrected and rerun. See `PHASE_3_CATALOG.md` for repository relationships and the additive categorical `budget` query key; numeric `maxBudget` keeps its original meaning. No prices, operated departures, lodges or successful submissions are fabricated. Phase 4 requires review and acceptance of Phase 3 first.

### Phase 4 — Supporting Public Pages

Dependencies: P3; quote/contact schemas, approved content structure.

- [ ] Services overview and detail pages, About and Contact.
- [ ] Quote form sections, progressive validation, prefill and confirmation route.
- [ ] Contact form, privacy/terms/permit pages and verified contact actions.
- [ ] Resolve journal scope; implement public articles only if included.
- [ ] Verify form validation/keyboard behavior; keep submission unavailable until durable P5 integration.
- [ ] Run checks and responsive review against references.

Files/modules: supporting routes, quote/contact components, validation schemas, policy templates. Deliverable: public page structure and validated form UI. Acceptance: forms preserve input on error, show accurate delivery state, and contain no invented policies/business claims. Production form acceptance is explicitly deferred to P5. Next: backend.

### Phase 5 — Database and Backend

Dependencies: P4; Supabase development project access and approved environment values. Schema contracts are already defined above.

- [ ] Configure isolated Supabase environments and server/browser client boundaries.
- [ ] Create migrations, constraints, indexes, RLS and grants; generate types and dev seed.
- [ ] Configure staging/public media storage and validation.
- [ ] Implement typed published-read repositories and replace production fixture reads.
- [ ] Implement transactional publication, validated Server Actions and cache invalidation.
- [ ] Connect quote/contact durable intake, idempotency, anti-spam and outbox infrastructure.
- [ ] Implement invitation-only staff authentication and server authorization.
- [ ] Test clean migration/reset, real form storage, failure recovery, published-only reads and role isolation.
- [ ] Recheck P2–P4 against live data; run typecheck/lint/build/integration checks.

Files/modules: migrations, seed, generated types, Supabase clients, repositories/actions/auth. Deliverable: real persistent backend and connected public website. Acceptance: no mock submission success or production fixture reads; drafts/PII inaccessible anonymously; migrations reproducible; forms survive notification outages. Next: admin foundation.

### Phase 6 — Admin Dashboard Foundation

Dependencies: P5 auth, membership policies and data.

- [ ] Login, recovery, logout, protected routes and expired-session behavior.
- [ ] Responsive admin layout, sidebar and role-aware navigation.
- [ ] Real authorized overview counts and useful shortcuts.
- [ ] Shared tables, filters, pagination, forms, confirmation and notification patterns.
- [ ] Administrator staff invitation, roles/deactivation and own profile/MFA handling.
- [ ] Test direct URL access, role restrictions, session expiry and dashboard aggregate privacy; run checks.

Files/modules: admin layouts/routes, shared admin controls, permission/auth modules. Deliverable: secure usable administrative workspace. Acceptance: unauthenticated access denied server-side; role mutation cannot be forged; all metrics derive from authorized real records. Next: CMS.

### Phase 7 — Content Management

Dependencies: P6 shared controls; P5 storage and revision/publish infrastructure.

- [ ] Tour CRUD, relations, gallery and publication controls.
- [ ] Persisted itinerary day/activity builder and ordering.
- [ ] Destination and attraction CRUD.
- [ ] Services and typed homepage section management.
- [ ] Media library with metadata, usage checks and safe removal.
- [ ] Testimonials and public team management.
- [ ] About/contact/policy page management and website settings.
- [ ] Conditional blog CRUD and publication if scope enabled.
- [ ] Draft preview, revision isolation, optimistic conflict handling and archive behavior.
- [ ] Test real CRUD -> publish -> public update for each entity; test authorization and failure cases; run checks.

Files/modules: content feature actions/repositories, admin editors, media/publish components. Deliverable: complete database-backed CMS. Acceptance: staff can maintain all in-scope public content without code edits; draft changes stay private, publication updates intended routes, invalid relationships block publication and archives disappear safely. Next: customer inquiry management.

### Phase 8 — Customer Inquiry Management

Dependencies: P7/P6, P5 intake; configured email provider and verified business contacts for delivery.

- [ ] Quote list/detail, filters, pagination and safe assignment.
- [ ] Status transitions, history, internal notes and contact-message management.
- [ ] In-app notifications and durable outbox processing/retry visibility.
- [ ] Configured customer acknowledgment/staff email notifications with idempotency.
- [ ] User-initiated email and WhatsApp actions using verified recipients.
- [ ] Test visitor submission -> database -> authorized dashboard -> assignment/status/notes -> notification; run checks.

Files/modules: inquiry admin routes, workflows, outbox/notification adapter, templates. Deliverable: working intake-to-follow-up process. Acceptance: agents see assigned inquiries only, notes never leak, duplicate retries do not duplicate inquiries/emails, delivery failure remains recoverable and saved inquiries remain usable. Next: system refinement.

### Phase 9 — Testing and Refinement

Dependencies: P1–P8 implemented with representative approved content.

- [ ] Responsive and cross-browser journeys; accessibility, keyboard, zoom and reduced motion.
- [ ] Validation, route checks, error states, stale sessions, concurrency and submission retries.
- [ ] Direct RLS/storage/authorization and privilege-escalation tests.
- [ ] SEO, published sitemap, metadata, canonical/404 behavior and structured data checks.
- [ ] Performance measurements and targeted optimization.
- [ ] Compare implemented pages to relevant Stitch references and fix observed UI issues.
- [ ] Run complete typecheck/lint/build and required automated suites; record residual risks.

Files/modules: test suites and targeted fixes. Deliverable: documented QA evidence and resolved launch defects. Acceptance: no unresolved critical/high security issue or broken core journey; required checks pass; any lower-priority deferral has explicit impact/owner. Next: production readiness.

### Phase 10 — Production Readiness

Dependencies: P9 acceptance; hosting/domain/Supabase/email access, approved copy/assets/policies and operational owner.

- [ ] Select compatible hosting, configure production environment/secrets and preview separation.
- [ ] Apply/rehearse migrations with backup/rollback and restore verification.
- [ ] Provision first administrator securely; verify invitations, recovery, MFA and redirect allowlists.
- [ ] Configure domain/TLS, sender DNS, email delivery, storage, cache and security headers.
- [ ] Configure redacted error monitoring, uptime/outbox alerts and responsible recipients.
- [ ] Verify final production role isolation, intake, CMS publish/cache refresh and asset delivery.
- [ ] Complete runbooks, admin guide, environment inventory and maintenance/retention procedures.
- [ ] Run production smoke checks and document release/rollback outcome.

Deliverable: deployed, monitored site and handed-over CMS. Acceptance: production public and staff workflows pass; no development content, sample claims, credentials or debug data; backup/recovery and operational ownership established. A passing build alone does not satisfy launch readiness.

## 15. Production checklist and operational deliverables

- [ ] Verified business identity, addresses, phone/WhatsApp/email, prices and policies.
- [ ] Approved imagery/licenses, staff bios, testimonial consent and accreditation evidence.
- [ ] Reproducible install/build and deployment configuration with secrets managed externally.
- [ ] Separate development/production Supabase projects and restricted production access.
- [ ] Versioned migrations, rollback/recovery plan and tested restore.
- [ ] Secure staff onboarding, recovery, MFA and deactivation.
- [ ] Validated anonymous forms, abuse limits, private CRM and monitored notification retries.
- [ ] Working SEO, redirects, public cache invalidation and optimized assets.
- [ ] Security/accessibility/browser checks with recorded evidence.
- [ ] Administrator content guide and operator runbook with incident/backup/retention ownership.

## 16. Current progress, known issues and next work

Current phase: Phase 3 destinations and tour discovery complete, including verified 2026-11-05 centered heroes, enlarged greeting, photographic tours hero and included multi-day accommodation, on `feat/phase-3-destinations-tours`; [PR #2](https://github.com/db2910/Amajo/pull/2) is open for review and has not been merged. Phase 2 PR #1 is merged at `9565cf2`; local main was safely synchronized first. Completed functionality includes country/attraction discovery, typed catalog relationships, working URL search/filter/sort/pagination, individual itineraries/galleries/FAQs/related tours, validated quote-context links and experiences. Phase 4 has not started. Live data, submitted inquiries and staff management remain later dependencies.

Known issues: npm audit reports 16 moderate development-only findings in the Next/ESLint lint dependency chain, rooted in the minimatch glob-amplification advisory. Production dependency audit reports zero vulnerabilities. ESLint 9.39.5 is deprecated upstream but retained because the selected Next configuration's React/import/accessibility plugins reject ESLint 10; an attempted upgrade was reverted rather than leaving invalid peers. Do not force npm audit's proposed incompatible downgrades or a cross-major minimatch override. Track compatible upstream updates before production readiness. Backend/authentication remain intentionally unimplemented; `/admin` contains only an informational layout shell, no private data or management actions. Original reference defects and unverified business content still need resolution in their corresponding phases.

Dependencies/blockers:

1. No remaining Phase 1 environment blocker. Existing IDE processes can retain the old PATH: run `.\dev.cmd` from the project root to use the provisioned runtime immediately, fully restart VS Code, or use the session PATH initialization command in `README.md`.
2. Supabase project access is needed before P5 integration; it does not block fixture-based Phase 3.
3. Business-approved contacts/content, image rights and conditional journal scope are needed before content publication.
4. Email provider/domain verification is needed for P8 delivery; hosting/domain/secrets and operational owner are needed for P10.

Exact next task: review and accept [Phase 3 PR #2](https://github.com/db2910/Amajo/pull/2). Do not automatically merge. Only after Phase 3 review and acceptance may Phase 4 supporting pages and validated form UI begin. Keep durable submissions and protected dashboards in their scheduled phases.

GitHub gate satisfied: Phase 1 was pushed and verified before Phase 2; Phase 2 PR #1 merge was confirmed on 2026-11-04 before Phase 3. Local main fast-forwarded to `9565cf2`, then the dedicated Phase 3 branch was created. Final Phase 3 push/PR verification is recorded in PROJECT_STATUS.md.

## 17. Progress report format and history

For each completed phase record: Phase Completed; Implemented; Verification (actual commands/results); Outstanding Issues; Next Step. Update this plan and `PROJECT_STATUS.md` together after meaningful changes. If acceptance is incomplete, report the phase as in progress.

2026-11-03 — Discovery/planning milestone completed. Inspected source inventory, all HTML export structures, ten screenshots, design system and logo. Created this plan and initial status. PowerShell file/tool availability checks ran; no application checks were possible because no application/toolchain exists in the assessed setup. Next task: P1 toolchain and scaffold.

2026-11-03 — **Phase Completed:** Phase 1 — Project Foundation. **Implemented:** pinned local Next.js 16/TypeScript/Tailwind v4/shadcn application, reusable design system, self-hosted fonts and original logo copy, public/admin layout foundations, environment validation, error boundaries, setup documentation and meaningful foundation tests. **Verification:** clean lockfile install, typecheck, zero-warning ESLint, 8 unit tests, production build and 12 Edge/Chromium browser tests passed. Fixed malformed-URL validation and field alignment during verification. **Outstanding Issues:** development-only lint dependency advisory/deprecation; no claims of database/auth, Firefox/Safari, screen-reader or complete production security verification. **Next Step:** Phase 2 navigation and homepage; not started.

2026-11-03 — Phase 1 startup follow-up: reproduced missing npm command in an existing process PATH despite a valid installed runtime and persisted user PATH. Added `dev.cmd` and clearer README instructions; verified launcher startup without a manual PATH prefix and HTTP 200 for `/foundation`. Phase 2 remains unstarted.

2026-11-03 — **Phase Completed:** Phase 2 — Navigation and Homepage. **Implemented:** responsive desktop menus/mobile drawer, sticky overlay header, accessible cycling greeting with pause/reduced motion, photo hero, typed search URL contract, editorial destinations/sample tours, six experiences, company philosophy/values, verified-only testimonial renderer, closing CTA and cocoa footer. **Verification:** 19 unit tests, strict type checks, ESLint/build and 22 browser tests passed; fixed optimized-logo rounding, primary hover contrast and overly broad test selectors. Visual evidence includes desktop/mobile homepage and navigation captures. **Outstanding Issues:** detailed content pages remain explicitly labelled previews until Phases 3–4; no fake offers, contact details, reviews or live submission behavior. Existing lint dependency advisory remains. **Next Step:** push and review this feature branch, then Phase 3 in a subsequent task.

2026-11-03 — Phase 2 synchronization: `7549b3a` pushed with local/remote feature hashes and upstream tracking verified. PR #1 opened against main for review, without merging or rewriting history. Final production dependency audit is clear; final copy/visual refinement passed build/lint and three targeted screenshot/navigation checks. Review/merge is the next task; Phase 3 remains unstarted.

2026-11-04 — **Phase Completed:** Phase 3 — Destinations and Tours implementation. **Implemented:** three country guides, 15 attractions, nine journey concepts, complete discovery/filter/pagination interactions, galleries/ordered itineraries/FAQs/related concepts, quote-context links and six experiences behind typed read boundaries. **Verification:** typecheck, final build, zero-warning lint, 38 unit tests, full 33-test browser run plus 12 final catalog tests passed. Original references and dependencies unchanged; ten credited local photos added. **Outstanding Issues:** development content/approved business arrangements and later backend remain explicit; existing lint advisory and broader browser/manual QA remain. **Next Step:** feature-branch push and PR review; Phase 4 requires acceptance first.

2026-11-04 — Phase 3 synchronization: implementation commit `efa7c38` pushed to `origin/feat/phase-3-destinations-tours`, matching local/remote hashes and upstream verified. [PR #2](https://github.com/db2910/Amajo/pull/2) opened against main, not merged. This documentation-only synchronization record follows the implementation commit; final HEAD is rechecked after push. Next: user review/acceptance before Phase 4.

2026-11-05 — Phase 3 review refinements: centered homepage hero text/actions/value strip, enlarged greeting with accessible pause/resume, photographic centered tours hero and confirmed multi-day accommodation across all tour cards/details/inclusions/overnight notes/FAQs. Specific properties and rates remain for the tailored quote. Fixed the navigation library's hidden focus-helper dimensions/pointer hit area while preserving Tab/Shift+Tab. Verification: strict typecheck, final production build, ESLint and changed-file lint, 39 unit tests and all 41 Edge/Chromium browser tests passed (2.5m); screenshots reviewed at 360/1440/1920px. No new packages/assets or original reference changes. Commit/push these revisions to the existing Phase 3 PR #2 and verify synchronization; Phase 4 remains unstarted.
