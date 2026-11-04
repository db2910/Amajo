import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Compass, Leaf, Mountain, Route } from "lucide-react";
import {
  Container,
  Section,
  SectionHeading,
} from "@/components/layout/primitives";
import { Button } from "@/components/ui/button";
import {
  AttractionCard,
  Breadcrumbs,
  CatalogHero,
  DevelopmentNotice,
  FAQSection,
  QuoteCTA,
  TourCollection,
} from "./catalog-primitives";
import { MediaGallery } from "./media-gallery";
import { catalog } from "@/features/catalog/repository";
import { buildTourSearchHref, experiences } from "@/features/catalog/search";
import type {
  Attraction,
  Destination,
  Experience,
} from "@/features/catalog/types";

export async function DestinationsOverview() {
  const destinations = await catalog.destinations();
  const attractions = (
    await Promise.all(destinations.map((d) => catalog.attractions(d.slug)))
  ).flat();
  return (
    <>
      <Container>
        <Breadcrumbs items={[{ name: "Destinations" }]} />
      </Container>
      <Section className="pt-8 md:pt-12">
        <Container>
          <div className="grid items-end gap-8 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <p className="eyebrow text-primary">
                Three countries. Countless connections.
              </p>
              <h1 className="display-title mt-5">
                Find your own
                <br />
                <span className="italic text-primary">sense of Africa.</span>
              </h1>
            </div>
            <p className="max-w-lg text-lg text-muted-foreground">
              From Rwanda’s green hills to Uganda’s forest and Kenya’s wide
              horizons. Begin with a place that speaks to you, and let the
              journey grow from there.
            </p>
          </div>
          <div className="mt-14 space-y-12">
            {destinations.map((destination, index) => (
              <article
                key={destination.slug}
                className="grid overflow-hidden rounded-xl border bg-card lg:grid-cols-2"
              >
                <div
                  className={`relative min-h-80 lg:min-h-[460px] ${index % 2 ? "lg:order-2" : ""}`}
                >
                  <Image
                    src={destination.image}
                    alt={destination.imageAlt}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 1023px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <span className="absolute top-6 left-6 text-5xl font-light text-white/90">
                    0{index + 1}
                  </span>
                </div>
                <div className="flex flex-col justify-center p-7 md:p-12">
                  <p className="eyebrow text-primary">{destination.eyebrow}</p>
                  <h2 className="mt-4 text-4xl md:text-5xl">
                    {destination.name}
                  </h2>
                  <p className="mt-5 text-muted-foreground">
                    {destination.introduction}
                  </p>
                  <p className="mt-7 text-xs font-semibold uppercase tracking-wider">
                    Places to get to know
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
                    {attractions
                      .filter((a) => a.country === destination.slug)
                      .slice(0, 4)
                      .map((a) => (
                        <li key={a.slug}>
                          <Link
                            className="inline-flex min-h-9 items-center text-primary underline decoration-primary/25 underline-offset-4"
                            href={`/destinations/${a.country}/attractions/${a.slug}`}
                          >
                            {a.name}
                          </Link>
                        </li>
                      ))}
                  </ul>
                  <p className="mt-5 text-sm text-muted-foreground">
                    {destination.experiences
                      .map(
                        (slug) =>
                          experiences.find((e) => e.slug === slug)?.name,
                      )
                      .join(" · ")}
                  </p>
                  <Button asChild className="mt-8 self-start">
                    <Link href={`/destinations/${destination.slug}`}>
                      Explore {destination.name}
                      <ArrowRight aria-hidden="true" />
                    </Link>
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>
      <QuoteCTA />
    </>
  );
}

export async function DestinationPage({
  destination: d,
}: {
  destination: Destination;
}) {
  const [attractions, tours] = await Promise.all([
    catalog.attractions(d.slug),
    catalog.toursForCountry(d.slug),
  ]);
  return (
    <>
      <Container>
        <Breadcrumbs
          items={[
            { name: "Destinations", href: "/destinations" },
            { name: d.name },
          ]}
        />
      </Container>
      <CatalogHero
        eyebrow={`Discover ${d.name}`}
        title={d.headline}
        description={d.introduction}
        image={{
          src: d.image,
          alt: d.imageAlt,
          caption: `${d.name} · regional editorial illustration`,
        }}
      >
        <div className="mt-7 flex flex-wrap gap-3">
          <Button asChild>
            <a href="#attractions">
              Explore the places
              <ArrowRight aria-hidden="true" />
            </a>
          </Button>
          <Button asChild variant="secondary">
            <a href="#country-journeys">Journey ideas</a>
          </Button>
        </div>
      </CatalogHero>
      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-2">
            <SectionHeading
              eyebrow={`A closer look at ${d.name}`}
              title="A place to feel, as much as see."
            />
            <div className="space-y-5 text-muted-foreground">
              {d.story.map((text) => (
                <p key={text}>{text}</p>
              ))}
              <div className="flex flex-wrap gap-6 border-t pt-6 text-sm text-sage">
                <span className="flex gap-2">
                  <Leaf aria-hidden="true" className="size-5" />
                  Thoughtful travel
                </span>
                <span className="flex gap-2">
                  <Compass aria-hidden="true" className="size-5" />
                  Your own pace
                </span>
              </div>
            </div>
          </div>
        </Container>
      </Section>
      <Section id="attractions" className="scroll-mt-28 bg-sand/35">
        <Container>
          <SectionHeading
            eyebrow="Remarkable places"
            title={`Discover the many sides of ${d.name}.`}
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {attractions.map((a) => (
              <AttractionCard key={a.slug} attraction={a} />
            ))}
          </div>
        </Container>
      </Section>
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Find your rhythm"
            title="Every season has its own story."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {d.seasons.map((season, index) => (
              <article
                className="rounded-lg border bg-card p-7"
                key={season.title}
              >
                <p className="eyebrow text-primary">0{index + 1}</p>
                <h3 className="mt-4 text-2xl">{season.title}</h3>
                <p className="mt-4 text-sm text-muted-foreground">
                  {season.text}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </Section>
      <DevelopmentNotice />
      <Section id="country-journeys" className="scroll-mt-28">
        <Container>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
            <SectionHeading
              eyebrow="A little inspiration"
              title={`Imagine your journey through ${d.name}.`}
            />
            <Link
              className="inline-flex min-h-11 items-center gap-2 font-semibold text-primary hover:underline"
              href={buildTourSearchHref({ country: d.slug })}
            >
              All {d.name} concepts
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
          <TourCollection tours={tours} />
        </Container>
      </Section>
      <Section className="bg-sage text-background">
        <Container>
          <p className="eyebrow text-background">Follow your curiosity</p>
          <h2 className="section-title mt-4">What will draw you here?</h2>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {d.experiences.map((slug) => (
              <Link
                key={slug}
                href={buildTourSearchHref({
                  country: d.slug,
                  experience: slug,
                })}
                className="flex min-h-24 items-center justify-between gap-4 rounded-lg border border-background/30 p-5 hover:bg-background/10 focus-visible:outline-background"
              >
                {experiences.find((e) => e.slug === slug)?.name}
                <ArrowUpRightIcon />
              </Link>
            ))}
          </div>
        </Container>
      </Section>
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Thoughtful preparation"
            title="Make space for a smoother journey."
          />
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {d.practical.map((info, index) => (
              <article key={info.title}>
                <span className="flex size-12 items-center justify-center rounded-full bg-sand text-primary">
                  {index === 0 ? (
                    <Route aria-hidden="true" />
                  ) : index === 1 ? (
                    <Compass aria-hidden="true" />
                  ) : (
                    <Mountain aria-hidden="true" />
                  )}
                </span>
                <h3 className="mt-5 text-2xl">{info.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">
                  {info.text}
                </p>
              </article>
            ))}
          </div>
          <div className="mt-8 border-t pt-5 text-xs text-muted-foreground">
            Destination references:{" "}
            {d.sources.map((s) => (
              <a
                className="inline-flex min-h-9 items-center text-primary underline"
                key={s.href}
                href={s.href}
              >
                {s.title}
              </a>
            ))}
            . Checked 4 November 2026; confirm current arrangements before
            travel.
          </div>
        </Container>
      </Section>
      <FAQSection faqs={d.faqs} />
      <QuoteCTA
        title={`Let ${d.name} become part of your story.`}
        href={`/request-a-quote?country=${d.slug}`}
      />
    </>
  );
}
function ArrowUpRightIcon() {
  return (
    <ArrowRight aria-hidden="true" className="size-4 shrink-0 -rotate-45" />
  );
}

export async function AttractionPage({
  attraction: a,
}: {
  attraction: Attraction;
}) {
  const d = (await catalog.destination(a.country))!;
  const tours = await catalog.toursForAttraction(`${a.country}/${a.slug}`);
  return (
    <>
      <Container>
        <Breadcrumbs
          items={[
            { name: "Destinations", href: "/destinations" },
            { name: d.name, href: `/destinations/${d.slug}` },
            { name: a.name },
          ]}
        />
      </Container>
      <CatalogHero
        eyebrow={a.location}
        title={a.name}
        description={a.introduction}
        image={a.gallery[0]}
      />
      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <p className="eyebrow text-primary">A closer encounter</p>
              <h2 className="section-title mt-4">Take time to discover.</h2>
              <p className="mt-6 text-lg text-muted-foreground">
                {a.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {a.special.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border bg-sand/50 px-4 py-2 text-sm"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <aside className="rounded-lg border bg-card p-7">
              <h2 className="text-2xl">Ways to explore</h2>
              <ul className="mt-5 space-y-3">
                {a.activities.map((activity) => (
                  <li key={activity} className="flex items-start gap-3 text-sm">
                    <Compass
                      aria-hidden="true"
                      className="mt-1 size-4 shrink-0 text-primary"
                    />
                    {activity}
                  </li>
                ))}
              </ul>
              <p className="mt-5 border-t pt-4 text-xs text-muted-foreground">
                Activity ideas require local confirmation. No access or activity
                is reserved.
              </p>
            </aside>
          </div>
        </Container>
      </Section>
      <Section className="bg-sand/35">
        <Container>
          <SectionHeading
            eyebrow="In pictures"
            title="A window into the landscape."
          />
          <p className="my-6 text-sm text-muted-foreground">
            Editorial photographs are captioned with their actual location.
            Regional illustrations may show another part of {d.name}.
          </p>
          <MediaGallery images={a.gallery} title={a.name} />
        </Container>
      </Section>
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Before you set out"
            title="A little preparation goes a long way."
          />
          <ul className="mt-8 grid gap-5 md:grid-cols-3">
            {a.guidance.map((text, index) => (
              <li key={text} className="rounded-lg border p-6">
                <span className="eyebrow text-primary">0{index + 1}</span>
                <p className="mt-4 text-sm text-muted-foreground">{text}</p>
              </li>
            ))}
          </ul>
          <p className="mt-7 text-sm text-muted-foreground">
            Learn more:{" "}
            <a
              className="inline-flex min-h-11 items-center text-primary underline"
              href={a.source.href}
            >
              {a.source.title}
            </a>
          </p>
        </Container>
      </Section>
      <DevelopmentNotice />
      <Section>
        <Container>
          <div className="mb-10">
            <SectionHeading
              eyebrow="Connect the places"
              title="A journey with this place in mind."
            />
          </div>
          <TourCollection tours={tours} />
        </Container>
      </Section>
      <FAQSection faqs={a.faqs} />
      <QuoteCTA
        title={`Imagine your own encounter with ${a.name}.`}
        href={`/request-a-quote?country=${a.country}&attraction=${a.slug}`}
      />
    </>
  );
}

export function ExperiencesPage({
  experiences,
}: {
  experiences: Experience[];
}) {
  return (
    <>
      <Container>
        <Breadcrumbs items={[{ name: "Experiences" }]} />
      </Container>
      <Section className="pt-8">
        <Container>
          <p className="eyebrow text-primary">Follow what moves you</p>
          <h1 className="display-title mt-5 max-w-3xl">
            The moments that
            <br />
            <span className="italic text-primary">make a journey yours.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Choose an interest to explore matching development journeys. A
            starting point for your imagination, with room to find your own way.
          </p>
          <div className="mt-12 grid gap-7 md:grid-cols-2 xl:grid-cols-3">
            {experiences.map((e, i) => (
              <article
                key={e.slug}
                className="overflow-hidden rounded-lg border bg-card"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={e.image.src}
                    alt={e.image.alt}
                    fill
                    priority={i === 0}
                    sizes="(max-width: 767px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-7">
                  <p className="eyebrow text-primary">
                    0{i + 1} / Your interests
                  </p>
                  <h2 className="mt-3 text-3xl">{e.name}</h2>
                  <p className="mt-4 text-sm text-muted-foreground">
                    {e.description}
                  </p>
                  <Link
                    className="mt-5 inline-flex min-h-11 items-center gap-2 font-semibold text-primary hover:underline"
                    href={buildTourSearchHref({ experience: e.slug })}
                  >
                    Explore {e.name}
                    <ArrowRight aria-hidden="true" className="size-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>
      <QuoteCTA />
    </>
  );
}
