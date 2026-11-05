import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Compass,
  Leaf,
  MapPin,
  MessageCircle,
  Mail,
  Phone,
} from "lucide-react";
import {
  Container,
  Section,
  SectionHeading,
} from "@/components/layout/primitives";
import { Button } from "@/components/ui/button";
import {
  Breadcrumbs,
  CatalogHero,
  FAQSection,
  QuoteCTA,
  TourCollection,
} from "./catalog-primitives";
import { MediaGallery } from "./media-gallery";
import { MediaCredit } from "./media-credit";
import { ContactForm } from "./contact-form";
import { catalog } from "@/features/catalog/repository";
import { publicContent } from "@/features/content/repository";
import type { BusinessPolicy, Service } from "@/features/content/types";
import { media } from "@/data/catalog";
import { planningProcess } from "@/data/public-content";

export function ContentNotice() {
  return (
    <div className="border-y bg-sand/50">
      <Container className="py-3 text-sm text-muted-foreground">
        Development content · Service descriptions and brand copy await business
        publication review. No booking or inquiry delivery is available.
      </Container>
    </div>
  );
}
export function PlanningProcess({
  process = planningProcess,
}: {
  process?: Service["process"];
}) {
  return (
    <Section className="bg-sand/40">
      <Container>
        <SectionHeading
          eyebrow="Thoughtfully, from the start"
          title="From a little inspiration to a considered journey."
        />
        <ol className="mt-10 grid gap-6 md:grid-cols-3">
          {process.map((item, i) => (
            <li
              key={item.title}
              className="rounded-lg border bg-background p-7"
            >
              <span
                className="font-display text-4xl text-primary"
                aria-hidden="true"
              >
                0{i + 1}
              </span>
              <h3 className="mt-6 text-2xl">{item.title}</h3>
              <p className="mt-4 text-sm text-muted-foreground">
                {item.description}
              </p>
            </li>
          ))}
        </ol>
        <p className="mt-6 text-sm text-muted-foreground">
          Our proposed planning approach. Online sending will be connected in
          the next development phase.
        </p>
      </Container>
    </Section>
  );
}
function ServiceCard({
  service,
  featured = false,
}: {
  service: Service;
  featured?: boolean;
}) {
  return (
    <article
      className={`group overflow-hidden rounded-xl border bg-card shadow-soft ${featured ? "grid md:grid-cols-2" : "flex flex-col"}`}
    >
      <div
        className={`relative ${featured ? "min-h-72 md:min-h-96" : "aspect-[16/10]"}`}
      >
        <Image
          src={service.image.src}
          alt={service.image.alt}
          fill
          sizes={
            featured
              ? "(max-width: 767px) 100vw, 50vw"
              : "(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
          }
          className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-105"
        />
        <span className="absolute bottom-4 left-4 rounded-full bg-background px-3 py-1 text-xs font-medium">
          Tailored service
        </span>
      </div>
      <div
        className={`flex flex-1 flex-col ${featured ? "p-7 md:p-10" : "p-6"}`}
      >
        <p className="eyebrow text-primary">{service.countries.join(" · ")}</p>
        <h3
          className={`mt-4 ${featured ? "text-3xl md:text-4xl" : "text-2xl"}`}
        >
          <Link
            href={`/services/${service.slug}`}
            className="hover:text-primary"
          >
            {service.name}
          </Link>
        </h3>
        <p className="mt-5 flex-1 text-muted-foreground">
          {service.introduction}
        </p>
        {featured && (
          <p className="mt-4 text-sm text-muted-foreground">
            {service.overview}
          </p>
        )}
        <Link
          href={`/services/${service.slug}`}
          className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary hover:underline"
        >
          Explore this service<span className="sr-only">: {service.name}</span>
          <ArrowUpRight aria-hidden="true" className="size-4" />
        </Link>
        {service.image.license && (
          <p className="mt-3 text-xs text-muted-foreground">
            <MediaCredit media={service.image} />
          </p>
        )}
      </div>
    </article>
  );
}
export async function ServicesPage() {
  const services = await publicContent.services();
  return (
    <>
      <Section className="bg-sand/30">
        <Container>
          <Breadcrumbs items={[{ name: "Services" }]} />
          <div className="grid items-center gap-10 pt-5 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <p className="eyebrow text-primary">
                A journey, beautifully considered
              </p>
              <h1 className="display-title mt-5">
                Follow your curiosity.
                <br />
                <span className="italic text-primary">
                  We’ll shape the details.
                </span>
              </h1>
              <p className="mt-6 max-w-xl text-lg text-muted-foreground">
                From a first forest encounter to the quiet comfort of your
                overnight stay. Explore the experiences and practical details
                that bring an East African journey together.
              </p>
              <Button asChild className="mt-8">
                <Link href="#services">
                  Discover our services
                  <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
            </div>
            <figure className="relative">
              <div className="relative aspect-[5/4] overflow-hidden rounded-t-[120px] rounded-b-xl sm:rounded-t-[180px]">
                <Image
                  src={media.mara.src}
                  alt={media.mara.alt}
                  fill
                  sizes="(max-width: 1023px) 100vw, 50vw"
                  priority
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 text-xs text-muted-foreground">
                <MediaCredit media={media.mara} />
              </figcaption>
            </figure>
          </div>
        </Container>
      </Section>
      <ContentNotice />
      <Section id="services" className="scroll-mt-24">
        <Container>
          <SectionHeading
            eyebrow="Out there, waiting for you"
            title="The experiences that make it yours."
          >
            <p>
              A service is a way to shape your travels. A journey concept brings
              those interests into a possible route.
            </p>
          </SectionHeading>
          <div className="mt-10 space-y-7">
            {services.slice(0, 2).map((s) => (
              <ServiceCard key={s.slug} service={s} featured />
            ))}
          </div>
          <div className="mt-7 grid gap-7 md:grid-cols-2">
            {services.slice(2, 6).map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </Container>
      </Section>
      <Section className="bg-sage/5">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr_2fr]">
            <div>
              <SectionHeading
                eyebrow="The thoughtful details"
                title="Everything between the highlights."
              />
              <p className="mt-5 text-muted-foreground">
                A considered arrival. A place to rest. Time to reconnect with
                your team. Planning is in the details, too.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {services.slice(6).map((s) => (
                <ServiceCard key={s.slug} service={s} />
              ))}
            </div>
          </div>
        </Container>
      </Section>
      <PlanningProcess />
      <QuoteCTA title="Your next chapter starts with an idea." />
    </>
  );
}
export async function ServicePage({ service }: { service: Service }) {
  const [destinations, tours] = await Promise.all([
    catalog.destinations(),
    publicContent.serviceTours(service),
  ]);
  return (
    <>
      <CatalogHero
        eyebrow="A thoughtfully tailored service"
        title={service.name}
        description={service.introduction}
        image={service.image}
        centered
      >
        <Button asChild className="mt-7">
          <Link href={`/request-a-quote?service=${service.slug}`}>
            Plan with this service
            <ArrowRight aria-hidden="true" />
          </Link>
        </Button>
      </CatalogHero>
      <ContentNotice />
      <Container>
        <Breadcrumbs
          items={[
            { name: "Services", href: "/services" },
            { name: service.name },
          ]}
        />
      </Container>
      <Section>
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr_1.5fr]">
            <SectionHeading
              eyebrow="A little closer"
              title="Considered around you."
            />
            <p className="text-lg text-muted-foreground">{service.overview}</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {service.benefits.map((benefit, i) => (
              <div
                className="border-t border-primary/30 pt-6"
                key={benefit.title}
              >
                <span className="text-sm text-primary">0{i + 1}</span>
                <h3 className="mt-4 text-2xl">{benefit.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>
      <PlanningProcess process={service.process} />
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Find your setting"
            title="Places to bring the idea to life."
          />
          <div className="mt-9 grid gap-5 md:grid-cols-3">
            {destinations
              .filter((d) => service.countries.includes(d.slug))
              .map((d) => (
                <Link
                  key={d.slug}
                  href={`/destinations/${d.slug}`}
                  className="group relative flex min-h-64 items-end overflow-hidden rounded-lg bg-cocoa p-6 text-white"
                >
                  <Image
                    src={d.image}
                    alt={d.imageAlt}
                    fill
                    sizes="(max-width: 767px) 100vw, 33vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cocoa to-transparent" />
                  <span className="relative flex w-full items-center justify-between font-display text-3xl">
                    Explore {d.name}
                    <ArrowUpRight aria-hidden="true" />
                  </span>
                </Link>
              ))}
          </div>
        </Container>
      </Section>
      {tours.length > 0 && (
        <Section className="bg-sand/35">
          <Container>
            <SectionHeading
              eyebrow="From an idea to an outline"
              title="Journeys with this experience."
            />
            <p className="mt-4 mb-9 text-muted-foreground">
              Development concepts for inspiration; arrangements and prices
              require confirmation.
            </p>
            <TourCollection tours={tours} />
          </Container>
        </Section>
      )}
      <Section>
        <Container>
          <div className="mb-9">
            <SectionHeading
              eyebrow="A sense of place"
              title="Picture the possibilities."
            />
          </div>
          <MediaGallery images={service.gallery} title={service.name} />
        </Container>
      </Section>
      <FAQSection faqs={service.faqs} />
      <QuoteCTA
        title="Let’s start with what moves you."
        href={`/request-a-quote?service=${service.slug}`}
      />
    </>
  );
}
export async function AboutPage() {
  const [about, destinations] = await Promise.all([
    publicContent.about(),
    catalog.destinations(),
  ]);
  return (
    <>
      <Section className="pb-10 md:pb-14">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <p className="eyebrow text-primary">The spirit of AMAJO</p>
            <h1 className="display-title mt-6">
              Rooted in curiosity.
              <br />
              <span className="italic text-primary">
                Connected by a journey.
              </span>
            </h1>
            <p className="mx-auto mt-7 max-w-2xl text-lg text-muted-foreground">
              {about.introduction}
            </p>
          </div>
          <figure className="mt-12">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl md:aspect-[21/9]">
              <Image
                src={media.rwanda.src}
                alt={media.rwanda.alt}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 text-xs text-muted-foreground">
              <MediaCredit media={media.rwanda} />
            </figcaption>
          </figure>
        </Container>
      </Section>
      <ContentNotice />
      <Section>
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="eyebrow text-primary">
                Our story · The idea behind AMAJO
              </p>
              <h2 className="section-title mt-5">{about.story.title}</h2>
              {about.story.paragraphs.map((p) => (
                <p className="mt-6 text-muted-foreground" key={p}>
                  {p}
                </p>
              ))}
              <p className="mt-7 font-display text-2xl italic text-primary">
                The essence is in how a place makes you feel.
              </p>
            </div>
            <figure>
              <div className="relative aspect-[4/5] max-h-[520px] overflow-hidden rounded-xl">
                <Image
                  src={media.uganda.src}
                  alt={media.uganda.alt}
                  fill
                  sizes="(max-width: 1023px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 text-xs text-muted-foreground">
                <MediaCredit media={media.uganda} />
              </figcaption>
            </figure>
          </div>
        </Container>
      </Section>
      <Section className="bg-sand/45">
        <Container>
          <div className="grid gap-10 md:grid-cols-2">
            {[about.mission, about.vision].map((section, i) => (
              <div
                className="rounded-xl border bg-background p-8 md:p-10"
                key={section.key}
              >
                {i === 0 ? (
                  <Compass className="size-8 text-primary" aria-hidden="true" />
                ) : (
                  <Leaf className="size-8 text-sage" aria-hidden="true" />
                )}
                <p className="eyebrow mt-6 text-primary">Our {section.key}</p>
                <h2 className="mt-4 text-3xl">{section.title}</h2>
                {section.paragraphs.map((p) => (
                  <p className="mt-5 text-muted-foreground" key={p}>
                    {p}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </Container>
      </Section>
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Our travel philosophy"
            title="A different way to see the journey."
          />
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {about.philosophy.map((section) => (
              <div
                key={section.key}
                className="border-t border-primary/30 pt-7"
              >
                <h3 className="text-2xl">{section.title}</h3>
                {section.paragraphs.map((p) => (
                  <p key={p} className="mt-4 text-muted-foreground">
                    {p}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </Container>
      </Section>
      <Section className="bg-sage/5">
        <Container>
          <SectionHeading
            eyebrow="Three countries. Many ways to feel them."
            title="East Africa, in your own rhythm."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {destinations.map((d) => (
              <article
                key={d.slug}
                className="overflow-hidden rounded-xl border bg-card"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={d.image}
                    alt={d.imageAlt}
                    fill
                    sizes="(max-width: 767px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-3xl">{d.name}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {d.introduction}
                  </p>
                  <Link
                    href={`/destinations/${d.slug}`}
                    className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary"
                  >
                    Explore {d.name}
                    <ArrowRight aria-hidden="true" className="size-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>
      {about.team.length > 0 && (
        <Section>
          <Container>
            <SectionHeading title="The people behind your journey." />
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {about.team.map((member) => (
                <article key={member.id}>
                  <div className="relative aspect-square">
                    <Image
                      src={member.portrait.src}
                      alt={member.portrait.alt}
                      fill
                      sizes="33vw"
                      className="rounded-lg object-cover"
                    />
                  </div>
                  <h3 className="mt-4 text-2xl">{member.name}</h3>
                  <p>{member.role}</p>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {member.biography}
                  </p>
                </article>
              ))}
            </div>
          </Container>
        </Section>
      )}
      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
            <SectionHeading
              eyebrow="Why travel with AMAJO"
              title="Thoughtful choices, from the first idea."
            />
            <div className="space-y-6">
              {[
                [
                  "Room for your interests",
                  "Start with what matters to you, rather than fitting into a fixed departure.",
                ],
                [
                  "Places that belong together",
                  "Consider the route and travel time as carefully as the highlights.",
                ],
                [
                  "Clarity about the details",
                  "Multi-day tours include overnight accommodation; specific arrangements are confirmed in your tailored quote.",
                ],
              ].map(([title, p]) => (
                <div key={title} className="border-b pb-6">
                  <h3 className="text-2xl">{title}</h3>
                  <p className="mt-3 text-muted-foreground">{p}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>
      <QuoteCTA title="What will your East African story be?" />
    </>
  );
}
export async function ContactPage() {
  const { information, faqs } = await publicContent.contact();
  const configured = Boolean(
    information.email ||
    information.phone ||
    information.whatsapp ||
    information.office,
  );
  return (
    <>
      <Section className="bg-sand/35">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <p className="eyebrow text-primary">
                A conversation worth starting
              </p>
              <h1 className="display-title mt-5">
                Every journey begins
                <br />
                <span className="italic text-primary">with a hello.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg text-muted-foreground">
                A question, an idea, a place you’ve always wanted to see. Make
                room for your next East African story.
              </p>
              <Button asChild className="mt-7" variant="outline">
                <Link href="/request-a-quote">
                  Explore the journey planner
                  <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
            </div>
            <figure>
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                <Image
                  src={media.kivu.src}
                  alt={media.kivu.alt}
                  fill
                  priority
                  sizes="(max-width: 1023px) 100vw, 45vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 text-xs text-muted-foreground">
                <MediaCredit media={media.kivu} />
              </figcaption>
            </figure>
          </div>
        </Container>
      </Section>
      <Section>
        <Container>
          <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.6fr]">
            <div>
              <SectionHeading
                eyebrow="Get in touch"
                title="A little closer to your next adventure."
              />
              <div className="mt-7 space-y-4">
                {information.email && (
                  <a
                    href={`mailto:${information.email}`}
                    className="flex min-h-11 items-center gap-3 text-primary underline"
                  >
                    <Mail aria-hidden="true" className="size-5" />
                    {information.email}
                  </a>
                )}
                {information.phone && (
                  <a
                    href={`tel:${information.phone}`}
                    className="flex min-h-11 items-center gap-3 text-primary underline"
                  >
                    <Phone aria-hidden="true" className="size-5" />
                    {information.phone}
                  </a>
                )}
                {information.whatsapp && (
                  <a
                    href={`https://wa.me/${information.whatsapp.replace(/\D/g, "")}`}
                    className="flex min-h-11 items-center gap-3 text-primary underline"
                  >
                    <MessageCircle aria-hidden="true" className="size-5" />
                    Chat on WhatsApp
                  </a>
                )}
                {information.office && (
                  <div className="flex gap-3">
                    <MapPin
                      aria-hidden="true"
                      className="mt-1 size-5 shrink-0"
                    />
                    <div>
                      <p>{information.office.address}</p>
                      {information.office.mapHref && (
                        <a
                          className="inline-flex min-h-11 items-center text-primary underline"
                          href={information.office.mapHref}
                        >
                          View office map
                        </a>
                      )}
                    </div>
                  </div>
                )}
                {!configured && (
                  <div className="rounded-lg border bg-sand/40 p-6">
                    <MessageCircle
                      className="size-6 text-sage"
                      aria-hidden="true"
                    />
                    <h2 className="mt-4 text-2xl">
                      Our contact channels, coming soon.
                    </h2>
                    <p className="mt-3 text-sm text-muted-foreground">
                      Verified email, telephone, WhatsApp and office details are
                      awaiting business approval. Sending through this form is
                      not yet available.
                    </p>
                  </div>
                )}
              </div>
              <p className="mt-7 text-sm text-muted-foreground">
                Planning a whole journey? The three-step planner brings
                destinations, dates and travel preferences together.
              </p>
              <Link
                href="/request-a-quote"
                className="mt-4 inline-flex min-h-11 items-center gap-2 font-semibold text-primary"
              >
                Plan a tailored journey
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="min-w-0 rounded-xl border bg-card p-5 shadow-soft sm:p-8">
              <h2 className="mb-6 text-3xl">What’s on your mind?</h2>
              <ContactForm />
            </div>
          </div>
        </Container>
      </Section>
      <FAQSection faqs={faqs} />
    </>
  );
}
export function PolicyPage({ policy }: { policy: BusinessPolicy }) {
  return (
    <Section>
      <Container>
        <div className="mx-auto max-w-3xl">
          <Breadcrumbs items={[{ name: policy.title }]} />
          <p className="eyebrow mt-7 text-primary">Policy preparation</p>
          <h1 className="display-title mt-5">{policy.title}</h1>
          <p className="mt-6 text-lg text-muted-foreground">
            {policy.description}
          </p>
          <div className="mt-8 rounded-lg border border-primary/30 bg-primary/5 p-6">
            <h2 className="font-sans text-base font-semibold">
              Draft · Awaiting business review
            </h2>
            <p className="mt-3 text-sm">
              This is a development disclosure and a policy outline, not final
              approved policy. No approved booking, refund or permit terms are
              published here. Inquiry sending remains disabled.
            </p>
          </div>
          <div className="mt-10 space-y-10">
            {policy.sections.map((s) => (
              <section key={s.key}>
                <h2 className="text-2xl">{s.title}</h2>
                {s.paragraphs.map((p) => (
                  <p className="mt-4 leading-8 text-muted-foreground" key={p}>
                    {p}
                  </p>
                ))}
              </section>
            ))}
            <section className="border-t pt-8">
              <h2 className="text-2xl">To be approved before publication</h2>
              <ul className="mt-5 list-disc space-y-3 pl-5 text-muted-foreground">
                {policy.reviewTopics.map((topic) => (
                  <li key={topic}>{topic}</li>
                ))}
              </ul>
            </section>
          </div>
          <nav
            aria-label="Policy pages"
            className="mt-10 flex flex-wrap gap-5 border-t pt-5"
          >
            {[
              { slug: "privacy", label: "Privacy" },
              { slug: "terms", label: "Travel terms" },
              { slug: "permit-policy", label: "Permit planning" },
            ].map((p) => (
              <Link
                key={p.slug}
                href={`/${p.slug}`}
                aria-current={policy.slug === p.slug ? "page" : undefined}
                className="inline-flex min-h-11 items-center text-sm text-primary underline"
              >
                {p.label}
              </Link>
            ))}
          </nav>
        </div>
      </Container>
    </Section>
  );
}
