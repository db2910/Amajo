import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Compass, ArrowLeft } from "lucide-react";
import { Container, Section, Stack } from "@/components/layout/primitives";
import { Button } from "@/components/ui/button";
import { getRouteContract } from "@/features/navigation/route-contracts";
import { parseTourSearch, experiences } from "@/features/catalog/search";

type Props = {
  params: Promise<{ path: string[] }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const route = getRouteContract((await params).path.join("/"));
  return {
    title: route ? `${route.title} — Preview` : "Page not found",
    robots: { index: false, follow: false },
  };
}

export default async function FutureRoutePreview({
  params,
  searchParams,
}: Props) {
  const path = (await params).path.join("/");
  const contract = getRouteContract(path);
  if (!contract) notFound();
  const query = path === "tours" ? parseTourSearch(await searchParams) : null;
  const filters = query?.success ? query.data : null;
  const selected = filters
    ? Object.entries(filters).filter(
        ([, value]) => value !== undefined && value !== "",
      )
    : [];
  const labels: Record<string, string> = {
    q: "Search",
    country: "Country",
    experience: "Experience",
    minDays: "Minimum days",
    maxDays: "Maximum days",
    maxBudget: "Maximum budget (USD / person)",
    sort: "Sort",
    page: "Page",
  };
  return (
    <Section>
      <Container>
        <Stack className="mx-auto max-w-2xl py-4">
          <Compass aria-hidden="true" className="size-9 text-primary" />
          <p className="eyebrow text-primary">Website preview · Coming next</p>
          <h1 className="display-title">{contract.title}</h1>
          <p className="text-lg text-muted-foreground">
            {contract.description}
          </p>
          {query && !query.success && (
            <p
              role="alert"
              className="rounded-lg border border-destructive p-4 text-destructive"
            >
              Some search options are invalid. Please return to the homepage and
              choose your preferences again.
            </p>
          )}
          {selected.length > 0 && (
            <div className="rounded-lg border bg-card p-6">
              <h2 className="text-2xl">Your search preferences</h2>
              <dl className="mt-5 grid gap-4 sm:grid-cols-2">
                {selected.map(([key, value]) => (
                  <div key={key}>
                    <dt className="text-xs text-muted-foreground">
                      {labels[key]}
                    </dt>
                    <dd className="mt-1 break-words font-medium capitalize">
                      {key === "experience"
                        ? experiences.find((item) => item.slug === value)?.name
                        : String(value)}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-5 border-t pt-4 text-sm text-muted-foreground">
                These preferences are in the page URL only. No inquiry has been
                submitted.
              </p>
            </div>
          )}
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/#destinations">
                <ArrowLeft aria-hidden="true" /> Explore the homepage
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/#tour-search">Choose your journey</Link>
            </Button>
          </div>
        </Stack>
      </Container>
    </Section>
  );
}
