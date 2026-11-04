import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Compass, ArrowLeft } from "lucide-react";
import { Container, Section, Stack } from "@/components/layout/primitives";
import { Button } from "@/components/ui/button";
import { getRouteContract } from "@/features/navigation/route-contracts";
import { catalog } from "@/features/catalog/repository";
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
  const query = await searchParams;
  const tour =
    path === "request-a-quote" &&
    typeof query.tour === "string" &&
    query.tour.length <= 100
      ? await catalog.tour(query.tour)
      : undefined;
  const country =
    path === "request-a-quote" && typeof query.country === "string"
      ? await catalog.destination(query.country)
      : undefined;
  const attraction =
    country && typeof query.attraction === "string"
      ? await catalog.attraction(country.slug, query.attraction)
      : undefined;
  const invalid =
    path === "request-a-quote" &&
    ((query.tour !== undefined && !tour) ||
      (query.country !== undefined && !country) ||
      (query.attraction !== undefined && !attraction));
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
          {path === "request-a-quote" && (
            <div className="rounded-lg border bg-card p-6">
              <h2 className="text-2xl">Your journey inspiration</h2>
              {invalid ? (
                <p role="alert" className="mt-4 text-destructive">
                  The selected journey or place is not recognized. Please return
                  to the catalog and choose again.
                </p>
              ) : (
                <p className="mt-4">
                  {tour
                    ? `Selected concept: ${tour.title}`
                    : attraction
                      ? `Selected place: ${attraction.name}, ${country?.name}`
                      : country
                        ? `Selected destination: ${country.name}`
                        : "Explore a journey or destination to bring your inspiration here."}
                </p>
              )}
              <p className="mt-4 text-sm text-muted-foreground">
                Context is carried in the URL only. No inquiry has been
                submitted, saved or sent. The form arrives in Phase 4 and
                durable submission in Phase 5.
              </p>
            </div>
          )}
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/tours">
                <ArrowLeft aria-hidden="true" />
                Explore journey ideas
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/destinations">Discover destinations</Link>
            </Button>
          </div>
        </Stack>
      </Container>
    </Section>
  );
}
