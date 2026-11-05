import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { catalog } from "@/features/catalog/repository";
import { DestinationPage } from "@/components/public/destination-pages";
type Props = { params: Promise<{ country: string }> };
export async function generateStaticParams() {
  return (await catalog.destinations()).map((d) => ({ country: d.slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const destination = await catalog.destination((await params).country);
  if (!destination) notFound();
  return {
    title: `${destination.name} — Destinations`,
    description: destination.introduction,
  };
}
export default async function Page({ params }: Props) {
  const destination = await catalog.destination((await params).country);
  if (!destination) notFound();
  return <DestinationPage destination={destination} />;
}
