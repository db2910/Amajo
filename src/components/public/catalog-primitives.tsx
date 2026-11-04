import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock3, MapPin, Plus, ArrowUpRight } from "lucide-react";
import {
  Container,
  Section,
  SectionHeading,
} from "@/components/layout/primitives";
import { Button } from "@/components/ui/button";
import { experiences } from "@/features/catalog/search";
import type {
  Attraction,
  FAQ,
  Media,
  TourSummary,
} from "@/features/catalog/types";
import { attractionHref } from "@/features/catalog/repository";
import { MediaCredit } from "./media-credit";

export function Breadcrumbs({
  items,
}: {
  items: { name: string; href?: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="py-5 text-xs text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-3">
        <li>
          <Link
            className="inline-flex min-h-8 items-center hover:underline"
            href="/"
          >
            Home
          </Link>
        </li>
        {items.map((item) => (
          <li className="flex items-center gap-2" key={item.name}>
            <span aria-hidden="true">/</span>
            {item.href ? (
              <Link
                className="inline-flex min-h-8 items-center hover:underline"
                href={item.href}
              >
                {item.name}
              </Link>
            ) : (
              <span aria-current="page">{item.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
export function CatalogHero({
  eyebrow,
  title,
  description,
  image,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  image: Media;
  children?: React.ReactNode;
}) {
  return (
    <div className="relative isolate flex min-h-[540px] items-end overflow-hidden bg-cocoa text-background md:min-h-[640px]">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="100vw"
        className="-z-20 object-cover"
        priority
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-cocoa via-cocoa/60 to-cocoa/10" />
      <Container className="py-12 md:py-20">
        <p className="eyebrow mb-5 text-background">{eyebrow}</p>
        <h1 className="display-title max-w-3xl">{title}</h1>
        <p className="mt-6 max-w-xl text-lg text-background/90">
          {description}
        </p>
        {children}
        <p className="mt-8 text-xs text-background/80">
          <MediaCredit media={image} />
        </p>
      </Container>
    </div>
  );
}
export function DevelopmentNotice() {
  return (
    <div className="border-y bg-sand/60">
      <Container className="py-4 text-sm">
        <strong>Journey inspiration · Development catalog.</strong> Sample
        itineraries and travel styles are unconfirmed. No prices, permits,
        accommodation or departures are offered for booking.
      </Container>
    </div>
  );
}
export function TourCard({ tour }: { tour: TourSummary }) {
  const label = experiences.find((e) => e.slug === tour.experience)?.name;
  return (
    <article className="group flex min-w-0 flex-col overflow-hidden rounded-lg border bg-card shadow-soft">
      <Link
        href={`/tours/${tour.slug}`}
        tabIndex={-1}
        aria-hidden="true"
        className="relative block aspect-[4/3] overflow-hidden"
      >
        <Image
          src={tour.image}
          alt=""
          fill
          sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-105"
        />
        <span className="absolute top-4 left-4 rounded-full bg-background px-3 py-1 text-xs font-semibold text-cocoa">
          Journey concept
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-6">
        {tour.coverMedia?.license && (
          <p className="mb-4 text-xs text-muted-foreground">
            <MediaCredit media={tour.coverMedia} />
          </p>
        )}
        <p className="eyebrow text-primary">{label}</p>
        <h3 className="mt-3 text-2xl leading-tight">
          <Link className="hover:text-primary" href={`/tours/${tour.slug}`}>
            {tour.title}
          </Link>
        </h3>
        <div className="mt-4 flex flex-wrap gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <MapPin aria-hidden="true" className="size-4" />
            <span className="capitalize">{tour.countries.join(" · ")}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Clock3 aria-hidden="true" className="size-4" />
            {tour.durationDays} days
          </span>
        </div>
        <p className="mt-4 flex-1 text-sm text-muted-foreground">
          {tour.overview}
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t pt-4">
          <p className="text-xs text-muted-foreground">
            {tour.startingPrice
              ? `From ${new Intl.NumberFormat("en-US", { style: "currency", currency: tour.startingPrice.currency, maximumFractionDigits: 0 }).format(tour.startingPrice.amountMinor / 100)} / person`
              : "Price to be confirmed"}
          </p>
          <Link
            className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary hover:underline"
            href={`/tours/${tour.slug}`}
          >
            View Details<span className="sr-only">: {tour.title}</span>
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
export function TourCollection({ tours }: { tours: TourSummary[] }) {
  return tours.length ? (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {tours.map((tour) => (
        <TourCard key={tour.slug} tour={tour} />
      ))}
    </div>
  ) : (
    <p className="rounded-lg border bg-card p-6 text-muted-foreground">
      No related concepts yet.{" "}
      <Link className="text-primary underline" href="/tours">
        Explore all journey ideas
      </Link>
      .
    </p>
  );
}
export function AttractionCard({ attraction }: { attraction: Attraction }) {
  const image = attraction.gallery[0];
  return (
    <article className="overflow-hidden rounded-lg border bg-card">
      <div className="relative aspect-[16/10]">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(max-width: 767px) 100vw, 50vw"
          className="object-cover"
        />
        <span className="absolute right-3 bottom-3 rounded bg-cocoa/90 px-3 py-1 text-xs text-background">
          {image.caption.includes("regional")
            ? "Regional illustration"
            : image.caption.split(" · ")[0]}
        </span>
      </div>
      <div className="p-6">
        {image.license && (
          <p className="mb-4 text-xs text-muted-foreground">
            <MediaCredit media={image} />
          </p>
        )}
        <p className="eyebrow text-primary">{attraction.location}</p>
        <h3 className="mt-3 text-2xl">
          <Link
            href={attractionHref(attraction)}
            className="hover:text-primary"
          >
            {attraction.name}
          </Link>
        </h3>
        <p className="mt-3 text-sm text-muted-foreground">
          {attraction.introduction}
        </p>
        <Link
          className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary hover:underline"
          href={attractionHref(attraction)}
        >
          Explore this place<span className="sr-only">: {attraction.name}</span>
          <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      </div>
    </article>
  );
}
export function FAQList({ faqs }: { faqs: FAQ[] }) {
  return (
    <div className="divide-y rounded-lg border bg-card px-5 md:px-7">
      {faqs.map((faq) => (
        <details key={faq.question} className="group py-2">
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-5 py-3 font-medium [&::-webkit-details-marker]:hidden">
            {faq.question}
            <Plus
              className="size-5 shrink-0 text-primary transition-transform group-open:rotate-45"
              aria-hidden="true"
            />
          </summary>
          <p className="max-w-3xl pb-5 pr-4 text-sm leading-relaxed text-muted-foreground">
            {faq.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
export function QuoteCTA({
  title = "Let your curiosity lead the way.",
  href = "/request-a-quote",
}: {
  title?: string;
  href?: string;
}) {
  return (
    <Section>
      <Container>
        <div className="relative overflow-hidden rounded-xl bg-cocoa px-7 py-12 text-background md:p-16">
          <p className="eyebrow text-gold">A journey shaped around you</p>
          <h2 className="section-title mt-4 max-w-2xl">{title}</h2>
          <p className="mt-5 max-w-xl text-background/85">
            Save a little inspiration for your own adventure. Our quote planning
            form is being prepared; this link carries your selected context
            without submitting a request.
          </p>
          <Button asChild className="mt-7">
            <Link href={href}>
              Request a Quote <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
export function FAQSection({ faqs }: { faqs: FAQ[] }) {
  return (
    <Section className="bg-sand/35">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr]">
          <SectionHeading
            eyebrow="Before you go"
            title="A little more to know."
          />
          <FAQList faqs={faqs} />
        </div>
      </Container>
    </Section>
  );
}
