import { describe, expect, it } from "vitest";
import {
  catalogTours,
  catalogDestinations,
  catalogAttractions,
  catalogExperiences,
  attractionKey,
} from "../../src/data/catalog";
import { searchTours, TOUR_PAGE_SIZE } from "../../src/features/catalog/query";
import {
  buildTourSearchHref,
  parseTourSearch,
} from "../../src/features/catalog/search";
import { tourQuoteHref } from "../../src/features/catalog/quote";

describe("development catalog relationships", () => {
  it("has unique country, attraction, experience and tour identifiers", () => {
    for (const ids of [
      catalogDestinations.map((d) => d.slug),
      catalogAttractions.map(attractionKey),
      catalogExperiences.map((e) => e.slug),
      catalogTours.map((t) => t.slug),
      catalogTours.map((t) => t.id),
    ])
      expect(new Set(ids).size).toBe(ids.length);
    expect(catalogDestinations).toHaveLength(3);
    expect(catalogAttractions).toHaveLength(15);
  });
  it("preserves valid country/attraction/experience relationships and complete ordered days", () => {
    for (const tour of catalogTours) {
      expect(tour.itinerary.map((day) => day.day)).toEqual(
        Array.from({ length: tour.durationDays }, (_, index) => index + 1),
      );
      for (const country of tour.countries)
        expect(catalogDestinations.some((d) => d.slug === country)).toBe(true);
      for (const key of tour.attractionKeys) {
        const a = catalogAttractions.find((a) => attractionKey(a) === key);
        expect(a).toBeDefined();
        expect(tour.countries).toContain(a!.country);
      }
      for (const slug of tour.experiences)
        expect(catalogExperiences.some((e) => e.slug === slug)).toBe(true);
      for (const day of tour.itinerary) {
        expect(day.title).toBeTruthy();
        expect(day.activities.length).toBeGreaterThan(0);
        expect(day.accommodation).toBeTruthy();
        expect(tour.attractionKeys).toContain(day.attractionKey);
      }
    }
  });
  it("does not invent pricing or confirmed operation", () => {
    for (const tour of catalogTours) {
      expect(tour.startingPrice).toBeUndefined();
      expect(tour.contentSource).toBe("development-fixture");
    }
  });
  it("creates a stable tour prefill URL", () => {
    const url = new URL(tourQuoteHref(catalogTours[0]), "https://example.com");
    expect(url.pathname).toBe("/request-a-quote");
    expect(url.searchParams.get("tour")).toBe(catalogTours[0].slug);
  });
});
describe("tour discovery", () => {
  it("finds full attraction names and spaced slugs", () => {
    expect(
      searchTours(catalogTours, { q: "Lake Kivu" }).items.map((t) => t.slug),
    ).toContain("east-africa-slow-journey");
    expect(
      searchTours(catalogTours, { q: "Murchison Falls National Park" }).total,
    ).toBe(1);
  });
  it("paginates deterministically without duplicate or missing records", () => {
    const first = searchTours(catalogTours, {});
    const second = searchTours(catalogTours, { page: 2 });
    expect(first.total).toBe(9);
    expect(first.items).toHaveLength(TOUR_PAGE_SIZE);
    expect(
      new Set([...first.items, ...second.items].map((t) => t.slug)).size,
    ).toBe(9);
  });
  it("combines country, experience, duration, text and budget style", () => {
    const result = searchTours(catalogTours, {
      country: "rwanda",
      experience: "cultural-experiences",
      minDays: 4,
      maxDays: 7,
      budget: "budget",
      q: "Kivu",
    });
    expect(result.items.map((t) => t.slug)).toEqual(["kigali-and-kivu"]);
  });
  it("finds cross-country and secondary-experience relations", () => {
    expect(
      searchTours(catalogTours, {
        country: "uganda",
        experience: "cultural-experiences",
      }).items.map((t) => t.slug),
    ).toContain("east-africa-slow-journey");
  });
  it("sorts newest and duration consistently", () => {
    expect(searchTours(catalogTours, { sort: "newest" }).items[0].slug).toBe(
      "east-africa-slow-journey",
    );
    expect(
      searchTours(catalogTours, { sort: "duration" }).items[0].durationDays,
    ).toBe(3);
  });
  it("keeps unpriced concepts out of price ceilings", () => {
    expect(searchTours(catalogTours, { maxBudget: 5000 }).total).toBe(0);
  });
  it("compares whole-USD ceilings to minor-unit prices and includes the boundary", () => {
    const priced = [
      {
        ...catalogTours[0],
        startingPrice: { amountMinor: 250000, currency: "USD" as const },
      },
      {
        ...catalogTours[1],
        startingPrice: { amountMinor: 500001, currency: "USD" as const },
      },
      catalogTours[2],
    ];
    expect(
      searchTours(priced, { maxBudget: 2500 }).items.map((t) => t.slug),
    ).toEqual([priced[0].slug]);
    expect(searchTours(priced, { maxBudget: 2499 }).total).toBe(0);
    expect(searchTours(priced, { maxBudget: 5000 }).total).toBe(1);
  });
  it("sorts configured prices in both directions with unknown prices last", () => {
    const data = [
      {
        ...catalogTours[0],
        startingPrice: { amountMinor: 500000, currency: "USD" as const },
      },
      catalogTours[1],
      {
        ...catalogTours[2],
        startingPrice: { amountMinor: 250000, currency: "USD" as const },
      },
    ];
    expect(
      searchTours(data, { sort: "price-asc" }).items.map((t) => t.slug),
    ).toEqual([data[2].slug, data[0].slug, data[1].slug]);
    expect(
      searchTours(data, { sort: "price-desc" }).items.map((t) => t.slug),
    ).toEqual([data[0].slug, data[2].slug, data[1].slug]);
  });
  it("reports unsupported price sorting and keeps a deterministic fallback", () => {
    const result = searchTours(catalogTours, { sort: "price" });
    expect(result.priceSortUnavailable).toBe(true);
    expect(result.items).toEqual(searchTours(catalogTours, {}).items);
  });
  it("returns useful empty and bounded final pages", () => {
    const result = searchTours(catalogTours, { q: "no such journey" });
    expect(result.total).toBe(0);
    expect(result.page).toBe(1);
    expect(searchTours(catalogTours, { page: 999 }).page).toBe(2);
  });
  it("round trips the additive budget style and newer sort values", () => {
    const values = {
      country: "kenya" as const,
      budget: "luxury" as const,
      sort: "price-desc" as const,
      page: 2,
    };
    expect(
      parseTourSearch(
        Object.fromEntries(
          new URL(buildTourSearchHref(values), "https://example.com")
            .searchParams,
        ),
      ),
    ).toEqual({ success: true, data: values });
  });
  it.each([
    { budget: "cheap" },
    { sort: "random" },
    { budget: ["budget", "luxury"] },
    { maxBudget: "1.5" },
  ])("rejects invalid filters %j", (input) =>
    expect(parseTourSearch(input).success).toBe(false),
  );
});
