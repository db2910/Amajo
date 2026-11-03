import { destinationGroups } from "./links";
import { featuredTours } from "@/data/homepage";

type RouteContract = { title: string; phase: 3 | 4; description: string };

const routeContracts: Record<string, RouteContract> = {
  destinations: {
    title: "Discover our destinations",
    phase: 3,
    description:
      "Country guides and attraction details are being prepared. Explore the three destinations on our homepage in the meantime.",
  },
  tours: {
    title: "Find your next adventure",
    phase: 3,
    description:
      "Our tour explorer is being prepared. Your search selections are preserved below; live offers, pricing and availability are not yet published.",
  },
  experiences: {
    title: "Experiences that stay with you",
    phase: 3,
    description:
      "Explore the experience themes on our homepage while the full collection is being prepared.",
  },
  services: {
    title: "Thoughtfully tailored travel",
    phase: 4,
    description:
      "Our services guide is being prepared. Discover the travel philosophy shaping AMAJO on our homepage.",
  },
  about: {
    title: "The story behind AMAJO",
    phase: 4,
    description:
      "The full company story is being prepared. Read our travel philosophy on the homepage.",
  },
  contact: {
    title: "Let’s start a conversation",
    phase: 4,
    description:
      "Our contact page and verified contact details will be available at launch. Online messages are not being collected yet.",
  },
  "request-a-quote": {
    title: "A journey that feels like you",
    phase: 4,
    description:
      "Tailored quote requests will open when our planning experience is ready. This preview does not collect or send requests.",
  },
  privacy: {
    title: "Your privacy matters",
    phase: 4,
    description:
      "The privacy policy will be published following business review, before visitor inquiries are collected.",
  },
  terms: {
    title: "Travel terms",
    phase: 4,
    description:
      "Business-approved travel terms will be published before journeys can be requested or booked.",
  },
};

for (const group of destinationGroups) {
  routeContracts[`destinations/${group.slug}`] = {
    title: `Explore ${group.name}`,
    phase: 3,
    description: `Our ${group.name} destination guide is being prepared. Find a little inspiration in the homepage destination collection.`,
  };
  for (const link of group.links) {
    if (
      link.href.startsWith("/destinations/") &&
      link.href.includes("/attractions/")
    ) {
      routeContracts[link.href.slice(1)] = {
        title: link.label,
        phase: 3,
        description:
          "This attraction guide is being prepared. Current travel advice, permits and arrangements are not yet published.",
      };
    }
  }
}
for (const tour of featuredTours) {
  routeContracts[`tours/${tour.slug}`] = {
    title: tour.title,
    phase: 3,
    description:
      "This is a sample journey concept for the website preview. A full itinerary, pricing and availability have not been published; this is not a bookable offer.",
  };
}

export function getRouteContract(path: string): RouteContract | undefined {
  return Object.hasOwn(routeContracts, path) ? routeContracts[path] : undefined;
}

export function getPreviewPaths() {
  return Object.keys(routeContracts);
}
