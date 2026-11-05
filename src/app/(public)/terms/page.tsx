import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PolicyPage } from "@/components/public/supporting-pages";
import { publicContent } from "@/features/content/repository";
export const metadata: Metadata = {
  title: "Travel terms — Draft for review",
  robots: { index: false, follow: false },
};
export default async function Page() {
  const policy = await publicContent.policy("terms");
  if (!policy) notFound();
  return <PolicyPage policy={policy} />;
}
