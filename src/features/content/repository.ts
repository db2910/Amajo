import "server-only";
import {
  services,
  aboutContent,
  contactInformation,
  contactFAQs,
  policies,
} from "@/data/public-content";
import type {
  AboutContent,
  BusinessPolicy,
  ContactInformation,
  Service,
} from "./types";
import type { FAQ, Tour } from "@/features/catalog/types";
import { catalog } from "@/features/catalog/repository";

export interface PublicContentRepository {
  services(): Promise<Service[]>;
  service(slug: string): Promise<Service | undefined>;
  about(): Promise<AboutContent>;
  contact(): Promise<{ information: ContactInformation; faqs: FAQ[] }>;
  policy(slug: string): Promise<BusinessPolicy | undefined>;
  serviceTours(service: Service): Promise<Tour[]>;
}
export const publicContent: PublicContentRepository = {
  services: async () => services,
  service: async (slug) => services.find((s) => s.slug === slug),
  about: async () => aboutContent,
  contact: async () => ({ information: contactInformation, faqs: contactFAQs }),
  policy: async (slug) => policies.find((p) => p.slug === slug),
  serviceTours: async (service) => {
    if (!service.experiences.length) return [];
    const candidates = (
      await Promise.all(
        service.countries.map((c) => catalog.toursForCountry(c)),
      )
    ).flat();
    return [...new Map(candidates.map((t) => [t.slug, t])).values()]
      .filter((t) => t.experiences.some((e) => service.experiences.includes(e)))
      .slice(0, 3);
  },
};
