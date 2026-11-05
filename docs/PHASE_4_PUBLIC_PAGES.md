# Phase 4 public content and inquiry contracts

Phase 3 PR #2 was confirmed merged at `542bb2f63df451a8c5dcc072b486588c70494bb0` on 2026-11-05. Local `main` was synchronized with a fast-forward-only merge before creating `feat/phase-4-public-pages`. Original Stitch exports remain unchanged.

## Routes and read boundaries

Explicit App Router pages replace the remaining preview allowlist and catch-all. Unknown paths and unknown service slugs return 404, including prototype-property names. Public navigation retains the existing destination and experience menus; Services, About, Contact and Quote link to implemented pages. The footer also links permit planning.

- `/services`: editorial portfolio of ten services, distinguished from journey concepts.
- `/services/[slug]`: immersive hero, overview, benefits, proposed planning process, relevant countries, related concepts where applicable, credited gallery, FAQs and service-prefilled quote link.
- Service slugs: `wildlife-safari-planning`, `gorilla-and-primate-trekking`, `cultural-experiences`, `adventure-and-hiking`, `luxury-travel`, `family-and-group-travel`, `corporate-retreats`, `airport-transfers`, `accommodation-arrangements`, `custom-itinerary-planning`.
- `/about`: brand-purpose story, mission, vision, philosophy, countries, travel approach and CTA. No invented founding history, staff, statistics, certifications or partnerships. Team rendering requires verified records; the collection is empty.
- `/contact`: contact introduction, conditional verified channels, validated interface and FAQs. No contact channel or office/map is currently configured. No reference-export phone, email, office or map is treated as approved.
- `/request-a-quote`: three planning steps and a live travel summary.
- `/request-a-quote/confirmation`: server-resolved receipt gate. Direct navigation and fabricated query parameters cannot create a successful receipt.
- `/privacy`, `/terms`, `/permit-policy`: clearly marked, noindex policy outlines awaiting business approval, plus accurate disclosures about this development version. They are not final legal policies.

`src/features/content/types.ts` defines services, page sections, verified team/contact records and draft policies. The asynchronous server-only `PublicContentRepository` is backed by `src/data/public-content.ts` for this phase; Phase 5 replaces it with published database reads. Catalog associations reuse the existing repository. Services are planning capabilities, not online inventory. The site remains noindex and fixture content requires approval before release.

Journal remains excluded from the current phase: no article content, explicit business opt-in or publishing scope has been supplied. `/journal` and nested paths return 404 and navigation contains no journal link. Enable it only through a separately confirmed scope decision; reserved database/CMS slots remain in the existing roadmap.

## Quote prefill and form state

The server validates optional `tour`, `service`, `country` and country-owned `attraction` identifiers. Repeated, empty, malformed, unknown or mismatched identifiers reject the supplied context together and show an accessible warning; no partial context is applied. Unknown unrelated query keys are ignored. User-entered personal details never enter query strings.

A recognized tour prefills countries, experiences and travel style, and displays its title and duration. A selected service suggests relevant countries/experiences; an explicit tour takes precedence. Place context suggests a destination and attraction interest. Client tour selection uses the same typed prefill helper and allows travelers to adjust their preferences.

React Hook Form retains values when a step unmounts, including Back/Next navigation and validation errors. State lives only in current page memory; no local/session storage, cookie, database or analytics payload stores form entries. Reloading/leaving clears this form state; browser autofill remains browser-controlled. Changing recognized URL context remounts the form. Form controls are disabled in server HTML until JavaScript hydration, preventing accidental native form fallback with personal details in a URL.

Steps:

1. Destination(s) or route-recommendation preference, optional recognized tour/service, experiences and plain-text interests.
2. Future departure/return dates, flexible-date option, adults/children, style, accommodation preference, optional whole-unit total group budget and currency.
3. Name, email, optional/conditionally required phone, residence, preferred contact method, additional notes and required consent to the draft notice.

Validation is shared in `src/features/inquiries/schemas.ts`: known country/experience/currency/style enums; unique selections; real future calendar dates; return on/after departure; dates optional while flexible, both required when fixed; 1–50 adults, 0–30 children and total at most 60; whole positive optional budget up to 999,999,999 with an explicit currency; trimmed bounded text without markup/control characters; email syntax; phone 7–20 digits if supplied, required for phone/WhatsApp preference; consent required. No conversion or price is invented. Budget describes the whole group, not a per-person offer.

The confirmed business rule is preserved: every tour longer than one day includes accommodation for its scheduled overnight stays. Preferences do not reserve a property or promise a named room, rate or availability. Standalone service descriptions do not automatically add an overnight stay.

Each step validates before advancing. Errors link to controls, expose `aria-invalid`/descriptions and receive keyboard focus; successful step changes focus the heading. The progress indicator identifies the current step. A local “Check my details” action validates the completed payload and explicitly states nothing was saved or sent. Editing clears that validation status.

## Submission and confirmation boundary

The Send buttons are disabled with visible explanations. The UI never calls a server action with entered personal details in this phase. There is no simulated request, reference, reservation, email or success redirect.

`submitQuote` and `submitContact` define the future Server Action boundaries. Their shared submission validators accept untrusted payloads, revalidate schemas and resolve nonempty tour/service identifiers against authoritative repositories. They return only `{ success: false, status: 'invalid' | 'unavailable', fieldErrors, formError }`. They do not persist, log payloads, deliver notifications or return receipts. Unused actions are not presented as a working backend.

`ConfirmedInquiry` reserves a minimal server-held receipt (`reference`, `acceptedAt`). `confirmedInquiry()` currently returns `null`; it ignores URL claims. Phase 5 must connect it to protected, refresh-safe server session state established only after a durable intake transaction. No anonymous inquiry lookup or personal details in confirmation URLs.

Before enabling real sending, Phase 5 must add durable transactional storage, server-side origin/abuse validation, idempotency and failure recovery, private access policies, approved consent/policy versions and published-only read adapters. Notification outbox infrastructure belongs to Phase 5; provider delivery/customer acknowledgment remains in Phase 8. No email-delivery guarantee is made by Phase 4.

## Design references and content approval

Reviewed the Services, preferred public About `_2`, preferred public Contact `_1` and quote-planner Stitch screenshots and HTML section structures. Reused ivory/cocoa/rust tokens, serif editorial headings, landscape photography, mixed feature/card compositions, quiet forms and shared process/gallery/FAQ/CTA components. Discarded the exports' fabricated offices, staff, metrics, accreditations, permit guarantees and receipt simulation. Existing local credited photography is reused; no new image, dependency or external font request was added.

Pending business review: final brand/service copy, real service availability and supplier arrangements, verified business channels, team biographies, approved properties and imagery, legal/policy content and any later journal scope. These are publication dependencies, not implemented backend features.
