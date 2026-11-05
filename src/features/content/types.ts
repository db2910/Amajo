import type {
  CountrySlug,
  ExperienceSlug,
  FAQ,
  Media,
} from "@/features/catalog/types";

export type ContentSection = {
  key: string;
  title: string;
  paragraphs: string[];
};
export type Service = {
  slug: string;
  name: string;
  category: "experiences" | "journey-details";
  introduction: string;
  overview: string;
  countries: CountrySlug[];
  experiences: ExperienceSlug[];
  image: Media;
  gallery: Media[];
  benefits: { title: string; description: string }[];
  process: { title: string; description: string }[];
  faqs: FAQ[];
  contentSource: "development-fixture";
};
export type TeamMember = {
  id: string;
  name: string;
  role: string;
  biography: string;
  portrait: Media;
  verified: true;
};
export type AboutContent = {
  introduction: string;
  story: ContentSection;
  mission: ContentSection;
  vision: ContentSection;
  philosophy: ContentSection[];
  team: TeamMember[];
};
export type ContactInformation = {
  email?: string;
  phone?: string;
  whatsapp?: string;
  office?: { address: string; mapHref?: string };
  verified: true;
};
export type BusinessPolicy = {
  slug: "privacy" | "terms" | "permit-policy";
  title: string;
  description: string;
  status: "draft";
  sections: ContentSection[];
  reviewTopics: string[];
};
