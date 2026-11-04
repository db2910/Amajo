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
  coverMedia?: Media;
  contentSource: "development-fixture";
};

export type Testimonial = {
  id: string;
  quote: string;
  attribution: string;
  verified: true;
};

export type Media = {
  src: string;
  alt: string;
  caption: string;
  sourceHref?: string;
  license?: { name: string; href: string };
};
export type FAQ = { question: string; answer: string };
export type BudgetTier = "budget" | "mid-range" | "luxury";
export type Experience = {
  slug: ExperienceSlug;
  name: string;
  description: string;
  image: Media;
};
export type Destination = DestinationSummary & {
  headline: string;
  story: string[];
  experiences: ExperienceSlug[];
  practical: { title: string; text: string }[];
  seasons: { title: string; text: string }[];
  faqs: FAQ[];
  sources: { title: string; href: string }[];
};
export type Attraction = {
  slug: string;
  country: CountrySlug;
  name: string;
  location: string;
  introduction: string;
  description: string;
  special: string[];
  activities: string[];
  guidance: string[];
  gallery: Media[];
  faqs: FAQ[];
  source: { title: string; href: string };
};
export type ItineraryDay = {
  day: number;
  title: string;
  description: string;
  activities: string[];
  attractionKey?: string;
  image?: Media;
  accommodation: string;
  meals?: string[];
};
export type Tour = TourSummary & {
  id: string;
  experiences: ExperienceSlug[];
  attractionKeys: string[];
  budgetTier: BudgetTier;
  createdAt: string;
  story: string;
  highlights: string[];
  gallery: Media[];
  itinerary: ItineraryDay[];
  inclusions: string[];
  exclusions: string[];
  accommodation: string;
  difficulty: string;
  recommendations: string[];
  packing: string[];
  notes: string[];
  faqs: FAQ[];
};
