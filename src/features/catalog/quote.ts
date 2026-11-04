import type { Tour } from "./types";

export function tourQuoteHref(tour: Pick<Tour, "id" | "slug">) {
  return `/request-a-quote?${new URLSearchParams({ tour: tour.slug })}`;
}
