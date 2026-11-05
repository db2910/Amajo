import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { catalog } from "@/features/catalog/repository";
import { AttractionPage } from "@/components/public/destination-pages";
type Props = { params: Promise<{ country: string; slug: string }> };
export async function generateStaticParams() {
  return (
    await Promise.all(
      (await catalog.destinations()).map((d) => catalog.attractions(d.slug)),
    )
  )
    .flat()
    .map((a) => ({ country: a.country, slug: a.slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country, slug } = await params;
  const attraction = await catalog.attraction(country, slug);
  if (!attraction) notFound();
  return {
    title: `${attraction.name} — ${country}`,
    description: attraction.introduction,
  };
}
export default async function Page({ params }: Props) {
  const { country, slug } = await params;
  const attraction = await catalog.attraction(country, slug);
  if (!attraction) notFound();
  return <AttractionPage attraction={attraction} />;
}
