# Phase 3 catalog contracts

The server-only `CatalogRepository` in `src/features/catalog/repository.ts` supplies destinations, country-owned attractions, experiences, search, individual tours and relation reads. Its asynchronous interface is the replacement boundary for Phase 5 published Supabase reads. No Supabase dependency, database, authentication or mutation is added here.

`src/data/catalog.ts` provides three destinations, 15 attractions, six experiences and nine clearly labelled development journey concepts. It extends the existing homepage summaries so original country/tour links stay stable. Tours support many countries, attractions and experiences, integer-day duration, optional USD minor-unit pricing, ordered itinerary days/activities, media, lodging/meal notes, FAQs and recommendation relationships. Fixtures intentionally omit all prices, booked lodges and meals. Travel style indicates a concept preference rather than a real price band. Sample daily outlines, inclusions and exclusions describe planning ideas rather than contracted package terms.

Business policy confirmed by the user on 2026-11-05: every tour longer than one day includes accommodation for its overnight stays. `includesAccommodation` supplies the shared duration rule for homepage/catalog cards and detail summaries; all nine concepts also include accommodation in their inclusions, descriptions, FAQs and overnight notes. Specific properties, room types, rates and availability remain to be confirmed in the tailored quote; this policy does not imply a booked property or working online booking. A one-day tour does not automatically receive an overnight-inclusion label.

## Routes

- `/destinations`; `/destinations/{rwanda,uganda,kenya}`.
- `/destinations/[country]/attractions/[slug]`: country-owned lookup; mismatched and unknown slugs return 404.
- Rwanda: `volcanoes`, `akagera`, `nyungwe`, `lake-kivu`, `kigali`.
- Uganda: `bwindi`, `murchison-falls`, `queen-elizabeth`, `kibale`, `jinja`.
- Kenya: `maasai-mara`, `amboseli`, `tsavo`, `nairobi`, `kenyan-coast`.
- `/tours`; `/tours/[slug]`: nine concepts; unknown slugs return 404.
- `/experiences`: all six taxonomy values link into filtered tours.
- `/request-a-quote?tour=[slug]`: validates the selected concept against the repository and displays its title in the remaining preview. Country/attraction CTAs likewise validate associated records. Invalid or repeated identifiers show an error; nothing is submitted, saved or sent.

## Search

Existing parameters remain supported: `q`, `country`, `experience`, `minDays`, `maxDays`, `maxBudget`, `sort`, `page`. The additive optional `budget=budget|mid-range|luxury` supports the requested categorical travel style independently of the existing numeric USD ceiling. No original key is renamed or reinterpreted.

- `q`: trimmed, at most 100 characters; literal, case-insensitive matching against title, overview, highlights, countries and attraction keys (including spaced slug words).
- Country and experience: known enums; match all selected dimensions, including secondary countries/experiences.
- Duration: inclusive day limits from 1–60; listing choices 1–3, 4–7, 8–14, 15+ days. Existing homepage ranges such as 5–9 remain valid and appear as custom selections.
- `maxBudget`: positive whole USD/person, maximum 1,000,000; compares to integer minor-unit starting prices. Unpriced journeys never pass a ceiling. Current unpriced data therefore produces an explicit empty/recovery state when a ceiling is selected.
- Sorting: `recommended` retains curated fixture order; `newest` uses development creation dates; `duration` is ascending. `price-asc`, `price-desc` and legacy `price` operate on configured prices with unknown prices last. Price choices appear only when meaningful matching prices exist. An explicitly requested price sort with no matching price data explains the recommended fallback. Unit-only synthetic prices verify comparison/order without exposing invented offers to visitors.
- Page: 1–1000, six results per page, count and deterministic pagination. An excessive but valid page uses the final available result page with an explanation. Empty results show page 1. Pagination preserves all filters and sorting; changing filters/search/sort resets pagination. Refresh and browser history restore URL state.
- Known repeated parameters, invalid enums/ranges/number bounds are rejected together: no partial query executes. Unknown keys are stripped. Clear actions link to `/tours`.

## Interaction and content boundaries

Native disclosures implement itineraries and FAQs. The Radix gallery and mobile filter drawer preserve labelled dialogs, keyboard access, Escape dismissal and focus restoration. Images use local Next.js optimization, responsive sizes and actual-location captions. Regional photographs are explicitly editorial illustrations. No geographic map is shown without verified coordinates; the route section supplies linked ordered stops instead.

Country and attraction introductions were checked against [Visit Rwanda](https://visitrwanda.com/tourism/destinations/), [Uganda Wildlife Authority](https://ugandawildlife.org/national-parks/), [Explore Uganda](https://exploreuganda.com/) and [Kenya Wildlife Service](https://kws.go.ke/parks/) on 2026-11-04. Weather, sightings, access, permits, prices and border/health requirements are not guaranteed. General planning prompts are not current legal or medical advice; no such detailed advice is published. Revalidate business content, rights and activity arrangements before production release.

The development website remains noindex. Phase 4 supporting pages/forms and Phase 5 durable intake/published reads retain their scheduled acceptance gates.
