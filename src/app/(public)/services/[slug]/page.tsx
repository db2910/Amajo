import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePage } from "@/components/public/supporting-pages";
import { publicContent } from "@/features/content/repository";
type Props = { params: Promise<{ slug: string }> };
export async function generateStaticParams() {
  return (await publicContent.services()).map((s) => ({ slug: s.slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = await publicContent.service((await params).slug);
  if (!service) notFound();
  return { title: service.name, description: service.introduction };
}
export default async function Page({ params }: Props) {
  const service = await publicContent.service((await params).slug);
  if (!service) notFound();
  return <ServicePage service={service} />;
}
