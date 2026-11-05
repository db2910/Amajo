import "server-only";
import { catalog } from "@/features/catalog/repository";
import { publicContent } from "@/features/content/repository";
import {
  tourPrefill,
  type QuoteContext,
  type QuoteTourOption,
} from "./contracts";
import { countryValues } from "./schemas";

export async function quoteOptions() {
  const [groups, services] = await Promise.all([
    Promise.all(countryValues.map((c) => catalog.toursForCountry(c))),
    publicContent.services(),
  ]);
  const tours: QuoteTourOption[] = [
    ...new Map(groups.flat().map((t) => [t.slug, t])).values(),
  ].map((t) => ({
    slug: t.slug,
    title: t.title,
    countries: t.countries,
    experiences: t.experiences,
    durationDays: t.durationDays,
    travelStyle: t.budgetTier,
    image: t.image,
    imageAlt: t.imageAlt,
  }));
  return {
    tours,
    services: services.map((s) => ({
      slug: s.slug,
      name: s.name,
      countries: s.countries,
      experiences: s.experiences,
    })),
  };
}
export async function resolveQuoteContext(
  query: Record<string, string | string[] | undefined>,
): Promise<QuoteContext> {
  const invalid = {
    initial: {},
    error:
      "The selected journey, service or place is not recognized. Please choose again; no unrecognized context has been applied.",
  };
  for (const key of ["tour", "service", "country", "attraction"]) {
    const value = query[key];
    if (
      value !== undefined &&
      (typeof value !== "string" ||
        !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value) ||
        value.length > 100)
    )
      return invalid;
  }
  const [tour, service, country] = await Promise.all([
    query.tour ? catalog.tour(query.tour as string) : undefined,
    query.service ? publicContent.service(query.service as string) : undefined,
    query.country ? catalog.destination(query.country as string) : undefined,
  ]);
  const attraction =
    country && query.attraction
      ? await catalog.attraction(country.slug, query.attraction as string)
      : undefined;
  if (
    (query.tour && !tour) ||
    (query.service && !service) ||
    (query.country && !country) ||
    (query.attraction && !attraction)
  )
    return invalid;
  // Explicit tour context takes precedence over a country/service's suggested countries.
  return {
    initial: {
      ...(service
        ? {
            service: service.slug,
            countries: service.countries,
            experiences: service.experiences,
          }
        : {}),
      ...(country ? { countries: [country.slug] } : {}),
      ...(tour ? tourPrefill({ ...tour, travelStyle: tour.budgetTier }) : {}),
      ...(attraction ? { interests: `Interested in ${attraction.name}.` } : {}),
    },
    selectedPlace: attraction
      ? `${attraction.name}, ${country?.name}`
      : country?.name,
  };
}
