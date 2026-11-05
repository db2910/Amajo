import type { CountrySlug, ExperienceSlug } from "@/features/catalog/types";
import type { QuoteInput } from "./schemas";

export type QuoteTourOption = {
  slug: string;
  title: string;
  countries: CountrySlug[];
  experiences: ExperienceSlug[];
  durationDays: number;
  travelStyle: "budget" | "mid-range" | "luxury";
  image: string;
  imageAlt: string;
};
export type QuoteServiceOption = {
  slug: string;
  name: string;
  countries: CountrySlug[];
  experiences: ExperienceSlug[];
};
export type QuoteContext = {
  initial: Partial<QuoteInput>;
  selectedPlace?: string;
  error?: string;
};
export type SubmissionFailure = {
  success: false;
  status: "invalid" | "unavailable";
  fieldErrors: Record<string, string[]>;
  formError: string;
};
// Phase 5 may return this only AFTER the durable intake transaction commits.
// Resolve it from protected server session state, never a URL/client assertion.
export type ConfirmedInquiry = { reference: string; acceptedAt: string };

export function tourPrefill(tour: QuoteTourOption): Partial<QuoteInput> {
  return {
    tour: tour.slug,
    countries: [...tour.countries],
    experiences: [...tour.experiences],
    travelStyle: tour.travelStyle,
    recommendRoute: false,
  };
}
