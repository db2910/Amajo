export type CountrySlug = "rwanda" | "uganda" | "kenya";
export type ExperienceSlug =
  | "wildlife-safaris"
  | "gorilla-trekking"
  | "cultural-experiences"
  | "adventure-hiking"
  | "luxury-experiences"
  | "family-group-travel";

export type DestinationSummary = {
  slug: CountrySlug;
  name: string;
  eyebrow: string;
  introduction: string;
  image: string;
  imageAlt: string;
};

export type TourSummary = {
  slug: string;
  title: string;
  countries: CountrySlug[];
  durationDays: number;
  experience: ExperienceSlug;
  overview: string;
  image: string;
  imageAlt: string;
  startingPrice?: { amountMinor: number; currency: "USD" };
  contentSource: "development-fixture";
};

export type Testimonial = {
  id: string;
  quote: string;
  attribution: string;
  verified: true;
};
