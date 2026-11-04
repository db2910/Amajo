import type { Metadata } from "next";
import { getHomepageContent } from "@/data/homepage";
import {
  HomeHero,
  FeaturedDestinations,
  FeaturedTours,
  ExperiencesAndStory,
  WhyAmajo,
  Testimonials,
  FinalCallToAction,
} from "@/components/public/homepage-sections";

export const metadata: Metadata = {
  title: "AMAJO — Discover the Essence of Africa",
  description:
    "Discover journeys through Rwanda, Uganda and Kenya. Wildlife, landscapes and cultural experiences, thoughtfully imagined around you.",
};

export default function Home() {
  const content = getHomepageContent();
  return (
    <>
      <HomeHero />
      <FeaturedDestinations items={content.destinations} />
      <FeaturedTours items={content.featuredTours} />
      <ExperiencesAndStory />
      <WhyAmajo />
      <Testimonials items={content.testimonials} />
      <FinalCallToAction />
    </>
  );
}
