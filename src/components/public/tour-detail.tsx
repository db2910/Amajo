import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Minus,
  MapPin,
  Clock3,
  Route,
  BedDouble,
} from "lucide-react";
import { includesAccommodation } from "@/features/catalog/accommodation";
import {
  Container,
  Section,
  SectionHeading,
} from "@/components/layout/primitives";
import { Button } from "@/components/ui/button";
import {
  Breadcrumbs,
  DevelopmentNotice,
  FAQList,
  QuoteCTA,
  TourCollection,
} from "./catalog-primitives";
import { MediaGallery } from "./media-gallery";
import { MediaCredit } from "./media-credit";
import { catalog, attractionHref } from "@/features/catalog/repository";
import { experiences } from "@/features/catalog/search";
import { tourQuoteHref } from "@/features/catalog/quote";
import type { ItineraryDay, Tour } from "@/features/catalog/types";

export function ItineraryTimeline({ days }: { days: ItineraryDay[] }) {
  return (
    <ol className="space-y-4">
      {[...days]
        .sort((a, b) => a.day - b.day)
        .map((day) => (
          <li key={day.day}>
            <details
              open={day.day === 1}
              className="group overflow-hidden rounded-lg border bg-card"
            >
              <summary className="flex min-h-20 cursor-pointer list-none items-center gap-4 p-5 [&::-webkit-details-marker]:hidden">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                  {String(day.day).padStart(2, "0")}
                </span>
                <span className="flex-1">
                  <span className="eyebrow text-primary">Day {day.day}</span>
                  <span className="mt-1 block font-display text-xl">
                    {day.title}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="text-xl text-primary group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <div className="border-t p-5 md:p-7">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {day.description}
                </p>
                <ul className="my-5 space-y-2 text-sm">
                  {day.activities.map((activity) => (
                    <li className="flex gap-3" key={activity}>
                      <span aria-hidden="true" className="text-primary">
                        —
                      </span>
                      {activity}
                    </li>
                  ))}
                </ul>
                {day.image && (
                  <figure>
                    <div className="relative aspect-[16/7] overflow-hidden rounded-md">
                      <Image
                        src={day.image.src}
                        alt={day.image.alt}
                        fill
                        sizes="(max-width: 1023px) 100vw, 60vw"
                        className="object-cover"
                      />
                    </div>
                    <figcaption className="mt-2 text-xs text-muted-foreground">
                      <MediaCredit media={day.image} />
                    </figcaption>
                  </figure>
                )}
                <dl className="mt-5 grid gap-3 rounded-md bg-sand/50 p-4 text-xs">
                  <div>
                    <dt className="font-semibold">Accommodation notes</dt>
                    <dd className="mt-1">{day.accommodation}</dd>
                  </div>
                  {day.meals?.length ? (
                    <div>
                      <dt className="font-semibold">Meals</dt>
                      <dd>{day.meals.join(", ")}</dd>
                    </div>
                  ) : (
                    <div>
                      <dt className="font-semibold">Meals</dt>
                      <dd className="mt-1">
                        No meal plan confirmed for this concept.
                      </dd>
                    </div>
                  )}
                </dl>
              </div>
            </details>
          </li>
        ))}
    </ol>
  );
}
export async function TourDetail({ tour }: { tour: Tour }) {
  const related = await catalog.related(tour);
  const stops = (
    await Promise.all(
      tour.countries.map((country) => catalog.attractions(country)),
    )
  )
    .flat()
    .filter((a) => tour.attractionKeys.includes(`${a.country}/${a.slug}`))
    .sort(
      (a, b) =>
        tour.attractionKeys.indexOf(`${a.country}/${a.slug}`) -
        tour.attractionKeys.indexOf(`${b.country}/${b.slug}`),
    );
  const quote = tourQuoteHref(tour);
  return (
    <>
      <Container>
        <Breadcrumbs
          items={[{ name: "Journeys", href: "/tours" }, { name: tour.title }]}
        />
        <div className="pb-8 pt-5">
          <p className="eyebrow text-primary">
            Journey inspiration · {tour.countries.join(" & ")}
          </p>
          <h1 className="display-title mt-4 max-w-4xl">{tour.title}</h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            {tour.overview}
          </p>
          <div className="mt-7 flex flex-wrap gap-x-7 gap-y-3 text-sm">
            <span className="flex items-center gap-2">
              <Clock3 aria-hidden="true" className="size-4 text-primary" />
              {tour.durationDays} days
            </span>
            <span className="flex items-center gap-2 capitalize">
              <MapPin aria-hidden="true" className="size-4 text-primary" />
              {tour.countries.join(" · ")}
            </span>
            <span>
              {experiences.find((e) => e.slug === tour.experience)?.name}
            </span>
            {includesAccommodation(tour.durationDays) && (
              <span className="flex items-center gap-2 font-medium text-sage">
                <BedDouble aria-hidden="true" className="size-4" />
                Accommodation included
              </span>
            )}
          </div>
        </div>
        <MediaGallery images={tour.gallery} title={tour.title} />
        <nav
          aria-label="Trip sections"
          className="mt-6 flex flex-wrap gap-2 border-b pb-4 text-sm"
        >
          {["Overview", "Itinerary", "Accommodation", "Inclusions", "FAQs"].map(
            (label) => (
              <a
                key={label}
                href={`#${label.toLowerCase()}`}
                className="inline-flex min-h-11 items-center rounded-md px-4 hover:bg-sand"
              >
                {label}
              </a>
            ),
          )}
        </nav>
      </Container>
      <div className="mt-6">
        <DevelopmentNotice />
      </div>
      <Section className="pt-12">
        <Container>
          <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[minmax(0,1fr)_360px]">
            <div className="min-w-0 space-y-16">
              <section id="overview" className="scroll-mt-28">
                <SectionHeading
                  eyebrow="The idea behind the journey"
                  title="A little closer. A little deeper."
                />
                <p className="mt-6 text-muted-foreground">{tour.story}</p>
                <div className="mt-8 rounded-lg border bg-card p-6">
                  <h3 className="text-2xl">Moments to imagine</h3>
                  <ul className="mt-5 grid gap-4 sm:grid-cols-2">
                    {tour.highlights.map((h) => (
                      <li className="flex gap-3 text-sm" key={h}>
                        <CompassMark />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
              <section id="itinerary" className="scroll-mt-28">
                <SectionHeading
                  eyebrow="The journey, day by day"
                  title="Time to follow your curiosity."
                />
                <p className="mb-8 mt-5 text-sm text-muted-foreground">
                  Open each day to explore its suggested rhythm, activities and
                  overnight notes. All arrangements remain unconfirmed.
                </p>
                <ItineraryTimeline days={tour.itinerary} />
              </section>
              <section
                id="accommodation"
                className="scroll-mt-28 rounded-lg bg-sand/50 p-7"
              >
                <p className="eyebrow text-primary">Space to unwind</p>
                <h2 className="mt-3 text-3xl">
                  A stay that suits your rhythm.
                </h2>
                <p className="mt-5 text-muted-foreground">
                  {tour.accommodation}
                </p>
              </section>
              <section>
                <SectionHeading
                  eyebrow="Connecting the places"
                  title="Your route, at a glance."
                />
                <p className="mt-4 text-sm text-muted-foreground">
                  A suggested sequence of places. Exact routing and transfer
                  arrangements are still to be confirmed.
                </p>
                <ol className="mt-7 space-y-3 border-l border-primary/30 pl-6">
                  {stops.map((stop, i) => (
                    <li
                      key={stop.slug}
                      className="flex items-start gap-4 rounded-lg border bg-card p-4"
                    >
                      <span className="eyebrow mt-1 text-primary">
                        0{i + 1}
                      </span>
                      <div>
                        <Link
                          href={attractionHref(stop)}
                          className="font-semibold text-primary hover:underline"
                        >
                          {stop.name}
                        </Link>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {stop.location}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
                <p className="mt-5 text-xs text-muted-foreground">
                  A geographic map is omitted until verified stop coordinates
                  and transfer routing are available.
                </p>
              </section>
              <section id="inclusions" className="scroll-mt-28">
                <SectionHeading
                  eyebrow="Clear expectations"
                  title="What this concept includes."
                />
                <p className="mt-4 text-sm text-muted-foreground">
                  Accommodation is included on multi-day tours. Specific
                  properties and other arrangements will be confirmed in your
                  final itinerary and quote; this preview does not make a
                  reservation.
                </p>
                <div className="mt-7 grid gap-5 sm:grid-cols-2">
                  {[
                    {
                      title: "Included in your journey",
                      items: tour.inclusions,
                      included: true,
                    },
                    {
                      title: "Not included or reserved",
                      items: tour.exclusions,
                      included: false,
                    },
                  ].map((list) => (
                    <div
                      key={list.title}
                      className="rounded-lg border bg-card p-6"
                    >
                      <h3 className="text-xl">{list.title}</h3>
                      <ul className="mt-5 space-y-4">
                        {list.items.map((item) => (
                          <li
                            className="flex gap-3 text-sm text-muted-foreground"
                            key={item}
                          >
                            {list.included ? (
                              <Check
                                className="mt-1 size-4 shrink-0 text-sage"
                                aria-hidden="true"
                              />
                            ) : (
                              <Minus
                                className="mt-1 size-4 shrink-0 text-primary"
                                aria-hidden="true"
                              />
                            )}
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
              <section>
                <SectionHeading
                  eyebrow="Prepared for discovery"
                  title="Travel with a little forethought."
                />
                <p className="mt-5 font-semibold">{tour.difficulty}</p>
                <div className="mt-7 grid gap-7 sm:grid-cols-2">
                  <InfoList
                    title="Travel recommendations"
                    items={tour.recommendations}
                  />
                  <InfoList title="What to bring" items={tour.packing} />
                </div>
                <div className="mt-7 rounded-lg bg-sand/60 p-6">
                  <InfoList title="Important notes" items={tour.notes} />
                </div>
              </section>
              <section id="faqs" className="scroll-mt-28">
                <h2 className="section-title mb-7">
                  Your questions, considered.
                </h2>
                <FAQList faqs={tour.faqs} />
              </section>
            </div>
            <aside
              aria-label="Plan this journey"
              className="rounded-lg border bg-card p-7 shadow-soft lg:sticky lg:top-28"
            >
              <p className="eyebrow text-primary">Make the idea your own</p>
              <h2 className="mt-4 text-3xl">
                A journey starts with curiosity.
              </h2>
              <p className="mt-5 text-muted-foreground">
                {tour.startingPrice
                  ? `Indicative starting price: ${new Intl.NumberFormat("en-US", { style: "currency", currency: tour.startingPrice.currency }).format(tour.startingPrice.amountMinor / 100)} per person.`
                  : "No starting price is configured for this development concept."}
              </p>
              <dl className="mt-6 space-y-4 border-y py-5 text-sm">
                <div className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">Time to explore</dt>
                  <dd>{tour.durationDays} days</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">
                    Travel style preference
                  </dt>
                  <dd className="mt-1 capitalize">{tour.budgetTier}</dd>
                </div>
                {includesAccommodation(tour.durationDays) && (
                  <div>
                    <dt className="text-muted-foreground">Accommodation</dt>
                    <dd className="mt-1 font-medium text-sage">
                      Included for overnight stays
                    </dd>
                  </div>
                )}
              </dl>
              <Button asChild className="mt-6 w-full">
                <Link href={quote}>
                  Request a Quote
                  <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
              <p className="mt-4 text-xs text-muted-foreground">
                Continues to the upcoming planning form with this concept
                selected. No inquiry is submitted.
              </p>
              <Link
                className="mt-5 inline-flex min-h-11 items-center text-sm text-primary underline"
                href="/tours"
              >
                Keep exploring journey ideas
              </Link>
            </aside>
          </div>
        </Container>
      </Section>
      <Section className="bg-sand/35">
        <Container>
          <div className="mb-10">
            <SectionHeading
              eyebrow="Keep the inspiration flowing"
              title="Another way to see the world."
            />
          </div>
          <TourCollection tours={related} />
        </Container>
      </Section>
      <QuoteCTA title="Where will this idea take you?" href={quote} />
    </>
  );
}
function InfoList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="text-2xl">{title}</h3>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm text-muted-foreground">
            <span aria-hidden="true" className="text-primary">
              —
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
function CompassMark() {
  return (
    <Route aria-hidden="true" className="mt-1 size-4 shrink-0 text-primary" />
  );
}
