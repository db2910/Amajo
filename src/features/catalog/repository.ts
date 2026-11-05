import "server-only";
import {
  catalogAttractions,
  catalogDestinations,
  catalogExperiences,
  catalogTours,
  attractionKey,
} from "@/data/catalog";
import { searchTours } from "./query";
import type { TourSearch } from "./search";
import type { Attraction, Destination, Experience, Tour } from "./types";

// Components consume this boundary; Phase 5 replaces the implementation with published reads.
export interface CatalogRepository {
  destinations(): Promise<Destination[]>;
  destination(slug: string): Promise<Destination | undefined>;
  attractions(country: string): Promise<Attraction[]>;
  attraction(country: string, slug: string): Promise<Attraction | undefined>;
  experiences(): Promise<Experience[]>;
  search(filters: TourSearch): Promise<ReturnType<typeof searchTours>>;
  tour(slug: string): Promise<Tour | undefined>;
  toursForCountry(country: string): Promise<Tour[]>;
  toursForAttraction(key: string): Promise<Tour[]>;
  related(tour: Tour): Promise<Tour[]>;
}
export const catalog: CatalogRepository = {
  destinations: async () => catalogDestinations,
  destination: async (slug) => catalogDestinations.find((d) => d.slug === slug),
  attractions: async (country) =>
    catalogAttractions.filter((a) => a.country === country),
  attraction: async (country, slug) =>
    catalogAttractions.find((a) => a.country === country && a.slug === slug),
  experiences: async () => catalogExperiences,
  search: async (filters) => searchTours(catalogTours, filters),
  tour: async (slug) => catalogTours.find((t) => t.slug === slug),
  toursForCountry: async (country) =>
    catalogTours.filter((t) => t.countries.some((c) => c === country)),
  toursForAttraction: async (key) =>
    catalogTours.filter((t) => t.attractionKeys.includes(key)),
  related: async (tour) =>
    catalogTours
      .filter(
        (t) =>
          t.slug !== tour.slug &&
          (t.countries.some((c) => tour.countries.includes(c)) ||
            t.experiences.some((e) => tour.experiences.includes(e))),
      )
      .sort((a, b) => {
        const score = (t: Tour) =>
          t.countries.filter((c) => tour.countries.includes(c)).length * 2 +
          t.experiences.filter((e) => tour.experiences.includes(e)).length;
        return score(b) - score(a) || a.slug.localeCompare(b.slug);
      })
      .slice(0, 3),
};
export function attractionHref(a: Pick<Attraction, "country" | "slug">) {
  return `/destinations/${attractionKey(a).replace("/", "/attractions/")}`;
}
