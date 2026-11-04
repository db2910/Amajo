type RouteContract = { title: string; phase: 4; description: string };
// Only Phase 4 routes remain previews. Explicit catalog pages own Phase 3 routes.
const routeContracts: Record<string, RouteContract> = {
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
export function getRouteContract(path: string): RouteContract | undefined {
  return Object.hasOwn(routeContracts, path) ? routeContracts[path] : undefined;
}
export function getPreviewPaths() {
  return Object.keys(routeContracts);
}
