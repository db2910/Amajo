# Phase 2 route contracts

The homepage and navigation are implemented in Phase 2. Destination guides, attraction details, tour listing/detail pages and supporting public pages remain in Phases 3–4. The explicit route allowlist in `src/features/navigation/route-contracts.ts` provides labelled preview screens for links exposed in this phase; unknown paths still return 404. Replace the relevant preview with its full route when that phase is implemented; do not mark preview screens as completed content pages.

- Countries: `/destinations/rwanda`, `/destinations/uganda`, `/destinations/kenya` and overview `/destinations`.
- Attractions: `/destinations/[country]/attractions/[slug]`; allowed paths match the navigation constants (Akagera, Lake Kivu, Bwindi, Murchison Falls, Queen Elizabeth, Maasai Mara, Amboseli, Nairobi).
- Tours: `/tours` and `/tours/[slug]` for the three typed sample journey concepts. Query contract: `q`, `country`, `experience`, `minDays`, `maxDays`, `maxBudget`, `sort`, `page`. Budgets are whole USD per person; prices use integer minor units when provided. Invalid values display an error without interpreting a partial filter as valid.
- Experience slugs: `wildlife-safaris`, `gorilla-trekking`, `cultural-experiences`, `adventure-hiking`, `luxury-experiences`, `family-group-travel`.
- Homepage search creates `/tours` URLs, translating selected duration into `minDays`/`maxDays`. Empty selections are omitted. The preview displays validated preferences from the URL; it does not simulate database search, quote submission or a booking.
- `/services`, `/about`, `/contact`, `/request-a-quote`, `/privacy`, `/terms`, `/experiences` have explicit upcoming-content previews. No fake contact/social profile links or unreviewed legal policies are published.
- Company-story/experience/destination homepage anchors provide useful content while detailed pages are prepared. Temporary previews and the website development shell remain noindex.

`src/data/homepage.ts` is the development read adapter. Cards consume typed summaries and support an optional starting price, but fixtures intentionally omit unverified prices. The testimonial renderer accepts only verified records; its current collection is empty and the website explains that guest stories await permission. Phase 5 replaces this adapter with published-only database reads.
