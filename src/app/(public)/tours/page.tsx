import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Compass, BedDouble } from "lucide-react";
import { Container, Section } from "@/components/layout/primitives";
import {
  Breadcrumbs,
  DevelopmentNotice,
  TourCollection,
  CatalogHero,
} from "@/components/public/catalog-primitives";
import {
  DesktopFilters,
  MobileFilters,
  ResultsControls,
} from "@/components/public/catalog-filters";
import { Button } from "@/components/ui/button";
import { catalog } from "@/features/catalog/repository";
import {
  buildTourSearchHref,
  parseTourSearch,
} from "@/features/catalog/search";
export const metadata: Metadata = {
  title: "Find Your Journey — Tours & Experiences",
  description:
    "Explore development journey concepts across Rwanda, Uganda and Kenya. Filter by country, experience, duration and travel style.",
  robots: { index: false, follow: false },
};
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const parsed = parseTourSearch(await searchParams);
  const filters = parsed.success ? parsed.data : {};
  const result = parsed.success ? await catalog.search(filters) : undefined;
  return (
    <>
      <Container>
        <Breadcrumbs items={[{ name: "Journeys" }]} />
      </Container>
      <CatalogHero
        centered
        eyebrow="Rwanda · Uganda · Kenya"
        title={
          <>
            Find your next
            <br />
            <span className="italic text-[#efd4a8]">African adventure.</span>
          </>
        }
        description="A forest encounter. A wide-open horizon. A slower day by the lake. Find a journey that feels like you, with time to take it all in."
        image={{
          src: "/images/kenya-elephants.jpg",
          alt: "Elephants gathering at a watering hole in Tsavo, Kenya",
          caption: "Tsavo, Kenya · Evans Dims",
        }}
      >
        <div className="mt-7 flex flex-col items-center gap-5">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-cocoa/30 px-4 py-2 text-sm">
            <BedDouble aria-hidden="true" className="size-4" />
            Accommodation included on multi-day tours
          </p>
          <Button asChild size="lg">
            <a href="#journey-results">
              Find your journey
              <ArrowRight aria-hidden="true" />
            </a>
          </Button>
        </div>
      </CatalogHero>
      <DevelopmentNotice />
      <Section id="journey-results" className="scroll-mt-28 pt-10">
        <Container>
          {!parsed.success ? (
            <div className="mx-auto max-w-2xl rounded-lg border border-destructive bg-card p-8">
              <h2 className="text-2xl">
                Let’s choose those preferences again.
              </h2>
              <p role="alert" className="mt-4 text-destructive">
                Some search options are invalid. No partial search has been run.
                Choose valid countries, experiences, positive whole-number
                limits and a minimum duration that does not exceed the maximum.
              </p>
              <Button asChild className="mt-6">
                <Link href="/tours">Reset search</Link>
              </Button>
            </div>
          ) : (
            result && (
              <div className="grid items-start gap-8 lg:grid-cols-[270px_minmax(0,1fr)] xl:gap-10">
                <DesktopFilters filters={filters} />
                <div className="min-w-0">
                  <ResultsControls
                    key={JSON.stringify(filters)}
                    filters={filters}
                    hasPrices={result.hasPrices}
                  />
                  <div className="my-6 flex flex-wrap items-center justify-between gap-4 border-b pb-5">
                    <h2 className="text-xl" aria-live="polite">
                      {result.total} journey{" "}
                      {result.total === 1 ? "concept" : "concepts"}
                    </h2>
                    <MobileFilters filters={filters} />
                    <Link
                      href="/tours"
                      className="inline-flex min-h-11 items-center text-sm text-primary underline"
                    >
                      Clear all filters
                    </Link>
                  </div>
                  {Object.entries(filters).filter(
                    ([key]) => !["page", "sort"].includes(key),
                  ).length > 0 && (
                    <div
                      aria-label="Selected preferences"
                      className="mb-6 flex flex-wrap gap-2"
                    >
                      {Object.entries(filters)
                        .filter(([key]) => !["page", "sort"].includes(key))
                        .map(([key, value]) => (
                          <span
                            key={key}
                            className="break-all rounded-md bg-sand px-3 py-2 text-xs"
                          >
                            {
                              (
                                {
                                  q: "Search",
                                  country: "Country",
                                  experience: "Experience",
                                  minDays: "Minimum days",
                                  maxDays: "Maximum days",
                                  maxBudget: "Maximum USD",
                                  budget: "Travel style",
                                } as Record<string, string>
                              )[key]
                            }
                            : {String(value).replaceAll("-", " ")}
                          </span>
                        ))}
                    </div>
                  )}
                  {result.priceSortUnavailable && (
                    <p className="mb-6 rounded-md border p-4 text-sm text-muted-foreground">
                      No configured prices match this search. Showing
                      recommended order; price sorting becomes available when
                      priced journeys exist.
                    </p>
                  )}
                  {result.total > 0 ? (
                    <>
                      <TourCollection tours={result.items} />
                      <nav
                        aria-label="Journey result pages"
                        className="mt-10 flex flex-wrap items-center justify-center gap-3"
                      >
                        {result.page > 1 && (
                          <Button asChild variant="outline">
                            <Link
                              href={buildTourSearchHref({
                                ...filters,
                                page: result.page - 1,
                              })}
                            >
                              <ArrowLeft aria-hidden="true" />
                              Previous
                            </Link>
                          </Button>
                        )}
                        {Array.from(
                          { length: result.pages },
                          (_, i) => i + 1,
                        ).map((page) => (
                          <Button
                            key={page}
                            asChild
                            variant={
                              page === result.page ? "default" : "outline"
                            }
                          >
                            <Link
                              aria-label={`Page ${page}`}
                              aria-current={
                                page === result.page ? "page" : undefined
                              }
                              href={buildTourSearchHref({ ...filters, page })}
                            >
                              {page}
                            </Link>
                          </Button>
                        ))}
                        {result.page < result.pages && (
                          <Button asChild variant="outline">
                            <Link
                              href={buildTourSearchHref({
                                ...filters,
                                page: result.page + 1,
                              })}
                            >
                              Next
                              <ArrowRight aria-hidden="true" />
                            </Link>
                          </Button>
                        )}
                      </nav>
                      <p className="mt-4 text-center text-xs text-muted-foreground">
                        Page {result.page} of {result.pages}
                        {filters.page && filters.page > result.pages
                          ? " · Requested page exceeds the results; showing the final available page."
                          : ""}
                      </p>
                    </>
                  ) : (
                    <div className="rounded-lg border bg-card px-6 py-16 text-center">
                      <Compass
                        aria-hidden="true"
                        className="mx-auto size-10 text-primary"
                      />
                      <h3 className="mt-5 text-3xl">
                        A different path might be waiting.
                      </h3>
                      <p className="mx-auto mt-5 max-w-lg text-muted-foreground">
                        No development concepts match all your preferences. Try
                        a broader duration, another country or remove the price
                        limit. Unpriced journeys cannot match a maximum price.
                      </p>
                      <Button asChild className="mt-7">
                        <Link href="/tours">Explore all journey ideas</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )
          )}
        </Container>
      </Section>
    </>
  );
}
