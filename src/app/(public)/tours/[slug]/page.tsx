import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { catalog } from "@/features/catalog/repository";
import { TourDetail } from "@/components/public/tour-detail";
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tour = await catalog.tour((await params).slug);
  if (!tour) notFound();
  return {
    title: `${tour.title} — Journey Inspiration`,
    description: tour.overview,
  };
}
export default async function Page({ params }: Props) {
  const tour = await catalog.tour((await params).slug);
  if (!tour) notFound();
  return <TourDetail tour={tour} />;
}
