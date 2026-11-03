import type {
  DestinationSummary,
  Testimonial,
  TourSummary,
} from "@/features/catalog/types";

// Development read fixtures only. Replace the adapter with published Supabase reads in Phase 5.
export const destinations: readonly DestinationSummary[] = [
  {
    slug: "rwanda",
    name: "Rwanda",
    eyebrow: "A thousand hills. Endless possibility.",
    introduction:
      "Green hills, forest trails and unhurried moments by Lake Kivu. Discover a different rhythm in Rwanda.",
    image: "/images/rwanda-hills.jpg",
    imageAlt: "Cultivated green hills and countryside in Rwanda",
  },
  {
    slug: "uganda",
    name: "Uganda",
    eyebrow: "Into the heart of the forest",
    introduction:
      "Follow your curiosity into lush forests, remarkable wildlife encounters and the landscapes of the Pearl of Africa.",
    image: "/images/bwindi-gorilla.jpg",
    imageAlt: "Mountain gorilla among the leaves in Uganda’s Bwindi forest",
  },
  {
    slug: "kenya",
    name: "Kenya",
    eyebrow: "Where the wild opens up",
    introduction:
      "Wide horizons, elephant encounters and the timeless pull of the savanna. Let Kenya awaken your sense of wonder.",
    image: "/images/kenya-elephants.jpg",
    imageAlt: "Elephants gathering at a watering hole in Tsavo, Kenya",
  },
];

export const featuredTours: readonly TourSummary[] = [
  {
    slug: "rwanda-hills-and-lakes",
    title: "Rwanda, Beyond the Ordinary",
    countries: ["rwanda"],
    durationDays: 7,
    experience: "adventure-hiking",
    overview:
      "A slower passage through green hills, forest landscapes and the shores of Lake Kivu.",
    image: "/images/rwanda-hills.jpg",
    imageAlt: "Rwanda’s patchwork of green hills",
    contentSource: "development-fixture",
  },
  {
    slug: "uganda-forest-encounters",
    title: "In the Footsteps of Giants",
    countries: ["uganda"],
    durationDays: 8,
    experience: "gorilla-trekking",
    overview:
      "An imagined journey into Uganda’s forests, with space for wildlife, discovery and quiet moments.",
    image: "/images/bwindi-gorilla.jpg",
    imageAlt: "A mountain gorilla in Bwindi, Uganda",
    contentSource: "development-fixture",
  },
  {
    slug: "kenya-wild-horizons",
    title: "Kenya’s Wild Horizons",
    countries: ["kenya"],
    durationDays: 6,
    experience: "wildlife-safaris",
    overview:
      "Dream of savanna mornings, remarkable wildlife and evenings beneath a changing African sky.",
    image: "/images/kenya-elephants.jpg",
    imageAlt: "A herd of elephants at a Kenyan watering hole",
    contentSource: "development-fixture",
  },
];

export const verifiedTestimonials: readonly Testimonial[] = [];

export function getHomepageContent() {
  return { destinations, featuredTours, testimonials: verifiedTestimonials };
}
