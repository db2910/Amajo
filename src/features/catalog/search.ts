import { z } from "zod";

export const countries = ["rwanda", "uganda", "kenya"] as const;
export const experiences = [
  { slug: "wildlife-safaris", name: "Wildlife Safaris" },
  { slug: "gorilla-trekking", name: "Gorilla Trekking" },
  { slug: "cultural-experiences", name: "Cultural Experiences" },
  { slug: "adventure-hiking", name: "Adventure & Hiking" },
  { slug: "luxury-experiences", name: "Luxury Experiences" },
  { slug: "family-group-travel", name: "Family & Group Travel" },
] as const;

export const searchSchema = z
  .object({
    q: z.string().trim().max(100).optional(),
    country: z.enum(countries).optional(),
    experience: z.enum(experiences.map((item) => item.slug)).optional(),
    minDays: z.coerce.number().int().min(1).max(60).optional(),
    maxDays: z.coerce.number().int().min(1).max(60).optional(),
    maxBudget: z.coerce.number().int().min(1).max(1000000).optional(),
    sort: z.enum(["recommended", "duration", "price"]).optional(),
    page: z.coerce.number().int().min(1).max(1000).optional(),
  })
  .refine(
    (value) =>
      !value.minDays || !value.maxDays || value.minDays <= value.maxDays,
    {
      message: "Minimum duration must not exceed maximum duration",
      path: ["minDays"],
    },
  );

export type TourSearch = z.infer<typeof searchSchema>;
export const durationOptions = [
  { value: "", label: "Any duration" },
  { value: "1-4", label: "1–4 days", minDays: 1, maxDays: 4 },
  { value: "5-9", label: "5–9 days", minDays: 5, maxDays: 9 },
  { value: "10-14", label: "10–14 days", minDays: 10, maxDays: 14 },
  { value: "15-60", label: "15+ days", minDays: 15, maxDays: 60 },
] as const;

export function buildTourSearchHref(input: TourSearch): string {
  const values = searchSchema.parse(input);
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(values)) {
    if (value !== undefined && value !== "") query.set(key, String(value));
  }
  return `/tours${query.size ? `?${query.toString()}` : ""}`;
}

export function parseTourSearch(
  input: Record<string, string | string[] | undefined>,
) {
  const values = Object.fromEntries(
    Object.entries(input).filter(
      ([, value]) => value !== undefined && value !== "",
    ),
  );
  return searchSchema.safeParse(values);
}
