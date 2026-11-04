import { buildTourSearchHref, experiences } from "@/features/catalog/search";

export const destinationGroups = [
  {
    name: "Rwanda",
    slug: "rwanda",
    links: [
      { label: "Explore Rwanda", href: "/destinations/rwanda" },
      {
        label: "Gorilla Trekking",
        href: buildTourSearchHref({
          country: "rwanda",
          experience: "gorilla-trekking",
        }),
      },
      {
        label: "Akagera Safaris",
        href: "/destinations/rwanda/attractions/akagera",
      },
      {
        label: "Lake Kivu",
        href: "/destinations/rwanda/attractions/lake-kivu",
      },
    ],
  },
  {
    name: "Uganda",
    slug: "uganda",
    links: [
      { label: "Explore Uganda", href: "/destinations/uganda" },
      {
        label: "Bwindi Gorilla Trekking",
        href: "/destinations/uganda/attractions/bwindi",
      },
      {
        label: "Murchison Falls",
        href: "/destinations/uganda/attractions/murchison-falls",
      },
      {
        label: "Queen Elizabeth National Park",
        href: "/destinations/uganda/attractions/queen-elizabeth",
      },
    ],
  },
  {
    name: "Kenya",
    slug: "kenya",
    links: [
      { label: "Explore Kenya", href: "/destinations/kenya" },
      {
        label: "Maasai Mara Safaris",
        href: "/destinations/kenya/attractions/maasai-mara",
      },
      {
        label: "Amboseli Safaris",
        href: "/destinations/kenya/attractions/amboseli",
      },
      {
        label: "Nairobi Excursions",
        href: "/destinations/kenya/attractions/nairobi",
      },
    ],
  },
] as const;

export const experienceLinks = [
  { label: "All Tours", href: "/tours" },
  ...experiences.map((item) => ({
    label: item.name,
    href: buildTourSearchHref({ experience: item.slug }),
  })),
];

export const mainLinks = [
  { label: "Services", href: "/services" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;
