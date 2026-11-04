import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Compass,
  Footprints,
  HeartHandshake,
  Leaf,
  Map,
  Mountain,
  Quote,
  Sparkles,
  Sunrise,
  Users,
} from "lucide-react";
import { Container, Section } from "@/components/layout/primitives";
import { Button } from "@/components/ui/button";
import { Greeting } from "@/components/public/greeting";
import { TourSearch } from "@/components/public/tour-search";
import { buildTourSearchHref, experiences } from "@/features/catalog/search";
import type {
  DestinationSummary,
  Testimonial,
  TourSummary,
} from "@/features/catalog/types";

export function HomeHero() {
  return (
    <>
      <section
        aria-labelledby="hero-title"
        className="relative isolate overflow-hidden bg-cocoa text-white"
      >
        <Image
          src="/images/mara-landscape.jpg"
          alt="Open savanna and acacia trees under an evening sky in Kenya’s Maasai Mara"
          fill
          sizes="100vw"
          loading="eager"
          fetchPriority="high"
          className="-z-20 object-cover object-[60%_55%]"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/80 via-black/55 to-black/25" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-cocoa/75 to-transparent" />
        <Container className="pt-40 pb-32 md:pt-48 md:pb-40">
          <div className="max-w-3xl">
            <p className="eyebrow mb-6 text-white/90">
              Journeys with a sense of place
            </p>
            <Greeting />
            <h1
              id="hero-title"
              className="mt-5 font-display text-[clamp(2.75rem,5.5vw,5.5rem)] leading-[1.08] font-medium tracking-tight"
            >
              Discover the
              <br />
              <span className="italic text-[#efd4a8]">Essence of Africa</span>
            </h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-white/90 md:text-lg">
              Explore unforgettable journeys across Rwanda, Uganda, and Kenya.
              Discover extraordinary wildlife, breathtaking landscapes, and
              authentic experiences crafted around you.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/tours">
                  Explore Tours <ArrowUpRight aria-hidden="true" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white/60 bg-transparent text-white hover:bg-white hover:text-cocoa"
              >
                <Link href="/request-a-quote">
                  Plan Your Journey <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-4 border-t border-white/25 pt-6 text-xs text-white/90">
            <span className="inline-flex items-center gap-2">
              <Compass aria-hidden="true" className="size-4 text-[#efd4a8]" />{" "}
              Three extraordinary countries
            </span>
            <span className="inline-flex items-center gap-2">
              <HeartHandshake
                aria-hidden="true"
                className="size-4 text-[#efd4a8]"
              />{" "}
              A journey shaped around you
            </span>
            <span className="inline-flex items-center gap-2">
              <Leaf aria-hidden="true" className="size-4 text-[#efd4a8]" /> A
              thoughtful way to explore
            </span>
          </div>
        </Container>
      </section>
      <Container className="relative -mt-16">
        <div id="tour-search" className="scroll-mt-28">
          <TourSearch />
        </div>
      </Container>
    </>
  );
}

export function FeaturedDestinations({
  items,
}: {
  items: readonly DestinationSummary[];
}) {
  return (
    <Section id="destinations" aria-labelledby="destinations-title">
      <Container>
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="eyebrow text-primary">
              East Africa, intimately discovered
            </p>
            <h2 id="destinations-title" className="section-title mt-4">
              Three countries.
              <br />
              <span className="italic">Countless ways to feel alive.</span>
            </h2>
            <p className="mt-5 max-w-lg text-muted-foreground">
              From the first forest light to the last glow over the savanna.
              Find the place that speaks to you.
            </p>
          </div>
          <Link
            href="/destinations"
            className="inline-flex min-h-11 w-fit items-center gap-2 border-b border-cocoa py-2 text-sm font-semibold"
          >
            Explore our destinations{" "}
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr]">
          {items.map((item, index) => (
            <article
              key={item.slug}
              className={
                index === 0 ? "group md:col-span-2 lg:col-span-1" : "group"
              }
            >
              <Link
                href={`/destinations/${item.slug}`}
                className="block overflow-hidden rounded-lg"
              >
                <div className="relative aspect-[4/4.5] overflow-hidden bg-sand md:aspect-[4/3] lg:aspect-[4/5]">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 40vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03] motion-reduce:transform-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-7 text-white">
                    <p className="mb-2 text-[11px] font-semibold tracking-[0.1em] uppercase">
                      {item.eyebrow}
                    </p>
                    <div className="flex items-center justify-between">
                      <h3 className="text-4xl">{item.name}</h3>
                      <ArrowUpRight aria-hidden="true" className="size-7" />
                    </div>
                  </div>
                </div>
              </Link>
              <p className="mt-5 text-sm leading-6 text-muted-foreground">
                {item.introduction}
              </p>
              <Link
                href={`/destinations/${item.slug}`}
                className="mt-3 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary"
              >
                Explore {item.name}{" "}
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export function TourCard({ tour }: { tour: TourSummary }) {
  const category = experiences.find(
    (item) => item.slug === tour.experience,
  )?.name;
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border bg-card shadow-soft">
      <Link
        href={`/tours/${tour.slug}`}
        className="relative block aspect-[4/3] overflow-hidden"
      >
        <Image
          src={tour.image}
          alt={tour.imageAlt}
          fill
          sizes="(max-width: 767px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03] motion-reduce:transform-none"
        />
        <span className="absolute top-4 left-4 rounded-full bg-background px-3 py-1.5 text-[10px] font-semibold tracking-wide uppercase">
          Journey inspiration
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <p className="eyebrow text-primary">
          {tour.countries.join(" + ")} · {tour.durationDays} days
        </p>
        <h3 className="mt-3 text-2xl leading-tight">
          <Link href={`/tours/${tour.slug}`}>{tour.title}</Link>
        </h3>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          {tour.overview}
        </p>
        <p className="mt-4 text-xs text-muted-foreground">{category}</p>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t pt-5">
          <p className="text-sm">
            {tour.startingPrice
              ? `From ${new Intl.NumberFormat("en", { style: "currency", currency: tour.startingPrice.currency, maximumFractionDigits: 0 }).format(tour.startingPrice.amountMinor / 100)}`
              : "Tailored to your journey"}
          </p>
          <Link
            href={`/tours/${tour.slug}`}
            className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary"
          >
            View Details <ArrowUpRight aria-hidden="true" className="size-4" />
            <span className="sr-only">: {tour.title}</span>
          </Link>
        </div>
      </div>
    </article>
  );
}

export function FeaturedTours({ items }: { items: readonly TourSummary[] }) {
  return (
    <Section
      id="journeys"
      aria-labelledby="journeys-title"
      className="bg-[#f2ede5]"
    >
      <Container>
        <div className="mb-9 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="eyebrow text-primary">
              The journey is just the beginning
            </p>
            <h2 id="journeys-title" className="section-title mt-4">
              A little inspiration.
              <br />
              <span className="italic">A world of possibility.</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              An invitation to imagine the journey you could make your own.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/tours">
              Explore all tours <ArrowUpRight aria-hidden="true" />
            </Link>
          </Button>
        </div>
        <p className="mb-6 flex items-start gap-2 text-sm text-muted-foreground">
          <Compass aria-hidden="true" className="mt-1 size-4 shrink-0" />
          <span>
            Sample journey concepts for this website preview. These are not
            confirmed offers; pricing and availability are not yet published.
          </span>
        </p>
        <div className="grid gap-6 md:grid-cols-3">
          {items.map((tour) => (
            <TourCard key={tour.slug} tour={tour} />
          ))}
        </div>
      </Container>
    </Section>
  );
}

const experienceCards = [
  {
    slug: "wildlife-safaris",
    title: "Wildlife Safaris",
    text: "Let the wild set the pace.",
    icon: Sunrise,
  },
  {
    slug: "gorilla-trekking",
    title: "Gorilla Trekking",
    text: "A quieter kind of extraordinary.",
    icon: Footprints,
  },
  {
    slug: "cultural-experiences",
    title: "Cultural Experiences",
    text: "Discover through connection.",
    icon: HeartHandshake,
  },
  {
    slug: "adventure-hiking",
    title: "Adventure Travel",
    text: "Take the path that calls to you.",
    icon: Mountain,
  },
  {
    slug: "luxury-experiences",
    title: "Luxury Travel",
    text: "Find your own kind of comfort.",
    icon: Sparkles,
  },
  {
    slug: undefined,
    title: "Customized Journeys",
    text: "Start with a dream. Make it yours.",
    icon: Map,
  },
] as const;

export function ExperiencesAndStory() {
  return (
    <>
      <Section id="experiences" aria-labelledby="experiences-title">
        <Container>
          <div className="mb-10 text-center">
            <p className="eyebrow text-primary">Follow your curiosity</p>
            <h2 id="experiences-title" className="section-title mt-4">
              What will move you?
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {experienceCards.map(({ title, text, icon: Icon, slug }) => (
              <Link
                key={title}
                href={
                  slug
                    ? buildTourSearchHref({ experience: slug })
                    : "/request-a-quote"
                }
                className="group flex items-start gap-4 rounded-lg border p-6 transition-colors hover:bg-sand"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-sand text-primary">
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <div>
                  <h3 className="text-xl">{title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{text}</p>
                </div>
                <ArrowUpRight
                  aria-hidden="true"
                  className="ml-auto size-4 shrink-0 text-primary"
                />
              </Link>
            ))}
          </div>
        </Container>
      </Section>
      <Section
        id="our-story"
        aria-labelledby="story-title"
        className="bg-sand/55"
      >
        <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative">
            <div className="relative aspect-[4/4.3] overflow-hidden rounded-xl">
              <Image
                src="/images/bwindi-gorilla.jpg"
                alt="A quiet moment with a mountain gorilla in Uganda’s Bwindi forest"
                fill
                sizes="(max-width: 1023px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="absolute right-4 bottom-4 left-4 rounded-lg bg-background/95 p-5 backdrop-blur-sm sm:right-6 sm:bottom-6 sm:left-auto sm:max-w-64">
              <p className="eyebrow text-primary">A different perspective</p>
              <p className="mt-2 font-display text-xl">
                The best journeys bring you closer.
              </p>
            </div>
          </div>
          <div>
            <p className="eyebrow text-primary">The AMAJO philosophy</p>
            <h2 id="story-title" className="section-title mt-4">
              More than a place.
              <br />
              <span className="italic">A feeling that stays.</span>
            </h2>
            <p className="mt-6 text-muted-foreground">
              We believe a journey should feel personal. A conversation, a
              landscape, a moment of stillness—these are the things that make a
              place part of your story.
            </p>
            <p className="mt-4 text-muted-foreground">
              AMAJO is an invitation to discover East Africa with curiosity and
              care. Our vision brings wildlife, cultural discovery and
              thoughtful travel planning together, with room for the unexpected.
            </p>
            <Link
              href="/about"
              className="mt-7 inline-flex min-h-11 items-center gap-2 border-b border-cocoa py-2 text-sm font-semibold"
            >
              Discover the AMAJO story{" "}
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}

export function WhyAmajo() {
  const values = [
    {
      icon: Compass,
      title: "Personal by design",
      text: "We start with the kind of journey you want to remember, and the little details that make it yours.",
    },
    {
      icon: Map,
      title: "A sense of place",
      text: "An approach inspired by the landscapes, communities and rhythms that make each destination distinct.",
    },
    {
      icon: HeartHandshake,
      title: "Meaningful connections",
      text: "Space for cultural discovery, meaningful moments and the joy of seeing something differently.",
    },
    {
      icon: Users,
      title: "Thoughtfully brought together",
      text: "A vision of travel where the details work in harmony, so you can be present for the experience.",
    },
  ];
  return (
    <Section aria-labelledby="why-title">
      <Container>
        <div className="mb-10">
          <p className="eyebrow text-primary">Why travel the AMAJO way?</p>
          <h2 id="why-title" className="section-title mt-4">
            The difference is in the details.
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            The principles shaping our approach to every future journey.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {values.map(({ title, text, icon: Icon }, index) => (
            <article key={title} className="border-t border-cocoa/20 pt-6">
              <div className="flex items-center justify-between">
                <span className="font-display text-3xl text-primary/70">
                  0{index + 1}
                </span>
                <Icon aria-hidden="true" className="size-5 text-primary" />
              </div>
              <h3 className="mt-6 text-2xl">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {text}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export function Testimonials({ items }: { items: readonly Testimonial[] }) {
  return (
    <section aria-labelledby="guest-stories-title" className="pb-16">
      <Container>
        <div className="rounded-xl border bg-card p-8 md:p-12">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-10">
            <Quote
              aria-hidden="true"
              className="size-10 shrink-0 text-primary"
            />
            <div>
              <p className="eyebrow text-primary">Stories worth sharing</p>
              <h2
                id="guest-stories-title"
                className="mt-3 font-display text-3xl"
              >
                The journeys. The people. The memories.
              </h2>
              {items.length ? (
                <div className="mt-6 grid gap-6 md:grid-cols-3">
                  {items.map((item) => (
                    <figure key={item.id}>
                      <blockquote className="font-display text-xl">
                        “{item.quote}”
                      </blockquote>
                      <figcaption className="mt-3 text-sm text-muted-foreground">
                        {item.attribution}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              ) : (
                <p className="mt-4 max-w-2xl text-muted-foreground">
                  Guest stories will appear here once they have been shared with
                  permission. We look forward to the stories still to come.
                </p>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function FinalCallToAction() {
  return (
    <section
      aria-labelledby="final-cta-title"
      className="relative isolate overflow-hidden bg-cocoa py-20 text-white md:py-28"
    >
      <Image
        src="/images/mara-sunrise.jpg"
        alt=""
        fill
        sizes="100vw"
        className="-z-20 object-cover object-[50%_35%]"
      />
      <div className="absolute inset-0 -z-10 bg-black/70" />
      <Container className="text-center">
        <p className="eyebrow text-white/90">Your story is waiting</p>
        <h2
          id="final-cta-title"
          className="mx-auto mt-5 max-w-3xl font-display text-4xl leading-tight md:text-5xl"
        >
          Your African Adventure
          <br />
          <span className="italic text-[#efd4a8]">Begins Here</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-white/90">
          A forest encounter. A wide-open horizon. A journey that feels like
          you. Let your imagination take the first step.
        </p>
        <Button asChild size="lg" className="mt-8">
          <Link href="/request-a-quote">
            Request a Custom Quote <ArrowUpRight aria-hidden="true" />
          </Link>
        </Button>
      </Container>
    </section>
  );
}
