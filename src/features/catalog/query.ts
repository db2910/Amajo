import type { TourSearch } from "./search";
import type { Tour } from "./types";

export const TOUR_PAGE_SIZE = 6;
export function searchTours(tours: readonly Tour[], filters: TourSearch) {
  const text = filters.q?.toLocaleLowerCase();
  const matched = tours.filter(
    (tour) =>
      (!text ||
        `${tour.title} ${tour.overview} ${tour.highlights.join(" ")} ${tour.countries.join(" ")} ${tour.attractionKeys.join(" ").replaceAll("-", " ")}`
          .toLocaleLowerCase()
          .includes(text)) &&
      (!filters.country || tour.countries.includes(filters.country)) &&
      (!filters.experience || tour.experiences.includes(filters.experience)) &&
      (!filters.budget || tour.budgetTier === filters.budget) &&
      (!filters.minDays || tour.durationDays >= filters.minDays) &&
      (!filters.maxDays || tour.durationDays <= filters.maxDays) &&
      (!filters.maxBudget ||
        (tour.startingPrice?.currency === "USD" &&
          tour.startingPrice.amountMinor <= filters.maxBudget * 100)),
  );
  const hasPrices = matched.some(
    (tour) => tour.startingPrice?.currency === "USD",
  );
  const priceSort =
    filters.sort === "price" ||
    filters.sort === "price-asc" ||
    filters.sort === "price-desc";
  matched.sort((a, b) => {
    let result = 0;
    if (filters.sort === "newest")
      result = b.createdAt.localeCompare(a.createdAt);
    if (filters.sort === "duration") result = a.durationDays - b.durationDays;
    if (priceSort && hasPrices) {
      const ap = a.startingPrice?.amountMinor;
      const bp = b.startingPrice?.amountMinor;
      // Unknown prices always follow known prices in either direction.
      result =
        ap === undefined
          ? bp === undefined
            ? 0
            : 1
          : bp === undefined
            ? -1
            : (ap - bp) * (filters.sort === "price-desc" ? -1 : 1);
    }
    if (
      !filters.sort ||
      filters.sort === "recommended" ||
      (priceSort && !hasPrices)
    )
      return 0;
    return result || a.slug.localeCompare(b.slug);
  });
  const total = matched.length;
  const pages = Math.max(1, Math.ceil(total / TOUR_PAGE_SIZE));
  const page = Math.min(filters.page ?? 1, pages);
  return {
    items: matched.slice((page - 1) * TOUR_PAGE_SIZE, page * TOUR_PAGE_SIZE),
    total,
    pages,
    page,
    hasPrices,
    priceSortUnavailable: priceSort && !hasPrices,
  };
}
