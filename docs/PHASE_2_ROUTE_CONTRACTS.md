# Phase 2 route contracts

## Phase 4 replacement — 2026-11-05

Every remaining preview is now replaced by explicit Services/detail, About, Contact, Quote, confirmation and policy routes. The preview catch-all and allowlist module have been removed; unknown paths still return 404. Quote/contact interfaces validate locally while sending remains unavailable until Phase 5. Policy pages are visibly draft and noindex. Journal remains excluded without a business scope opt-in. Current boundaries are in [Phase 4 public pages](PHASE_4_PUBLIC_PAGES.md); the contracts below are historical records.

## Phase 3 replacement — 2026-11-04

At Phase 3 completion, explicit App Router pages replaced `/destinations`, the three countries and their 15 attractions, `/tours`, all nine development journey detail pages, and `/experiences`. Unknown records and country/attraction mismatches return 404. Supporting pages were still previews at that milestone; see the Phase 4 replacement above for current behavior. No business form delivery is implemented.

The original contract is retained below as history. Current behavior and the backward-compatible query additions are documented in [Phase 3 catalog](PHASE_3_CATALOG.md). Homepage links and the three original journey slugs remain valid.

## Original Phase 2 boundary

The homepage and navigation are implemented in Phase 2. Destination guides, attraction details, tour listing/detail pages and supporting public pages remain in Phases 3–4. The explicit route allowlist in `src/features/navigation/route-contracts.ts` provides labelled preview screens for links exposed in this phase; unknown paths still return 404. Replace the relevant preview with its full route when that phase is implemented; do not mark preview screens as completed content pages.

- Countries: `/destinations/rwanda`, `/destinations/uganda`, `/destinations/kenya` and overview `/destinations`.
- Attractions: `/destinations/[country]/attractions/[slug]`; allowed paths match the navigation constants (Akagera, Lake Kivu, Bwindi, Murchison Falls, Queen Elizabeth, Maasai Mara, Amboseli, Nairobi).
- Tours: `/tours` and `/tours/[slug]` for the three typed sample journey concepts. Query contract: `q`, `country`, `experience`, `minDays`, `maxDays`, `maxBudget`, `sort`, `page`. Budgets are whole USD per person; prices use integer minor units when provided. Invalid values display an error without interpreting a partial filter as valid.
- Experience slugs: `wildlife-safaris`, `gorilla-trekking`, `cultural-experiences`, `adventure-hiking`, `luxury-experiences`, `family-group-travel`.
- Homepage search creates `/tours` URLs, translating selected duration into `minDays`/`maxDays`. Empty selections are omitted. The preview displays validated preferences from the URL; it does not simulate database search, quote submission or a booking.
- `/services`, `/about`, `/contact`, `/request-a-quote`, `/privacy`, `/terms`, `/experiences` have explicit upcoming-content previews. No fake contact/social profile links or unreviewed legal policies are published.
- Company-story/experience/destination homepage anchors provide useful content while detailed pages are prepared. Temporary previews and the website development shell remain noindex.

`src/data/homepage.ts` is the development read adapter. Cards consume typed summaries and support an optional starting price, but fixtures intentionally omit unverified prices. The testimonial renderer accepts only verified records; its current collection is empty and the website explains that guest stories await permission. Phase 5 replaces this adapter with published-only database reads.
