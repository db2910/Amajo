import type { Metadata } from "next";
import { catalog } from "@/features/catalog/repository";
import { ExperiencesPage } from "@/components/public/destination-pages";
export const metadata: Metadata = {
  title: "Experiences — Follow Your Curiosity",
  description:
    "Find journey inspiration through wildlife, forest, cultural, adventure, luxury and family travel themes.",
};
export default async function Page() {
  return <ExperiencesPage experiences={await catalog.experiences()} />;
}
