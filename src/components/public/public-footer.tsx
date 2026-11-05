import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Brand } from "@/components/brand";
import { Container } from "@/components/layout/primitives";
import { experiences, buildTourSearchHref } from "@/features/catalog/search";

const footerLink =
  "inline-flex min-h-11 items-center gap-1 rounded-sm py-2 text-sm text-background/85 transition-colors hover:text-gold focus-visible:outline-background";

export function PublicFooter() {
  return (
    <footer className="border-t border-white/10 bg-cocoa pt-14 pb-7 text-background">
      <Container>
        <div className="grid gap-10 border-b border-background/20 pb-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_1fr_1fr]">
          <div>
            <Brand compact />
            <p className="mt-6 max-w-xs text-sm leading-7 text-background/85">
              Extraordinary places. Thoughtfully imagined journeys. Discover the
              essence of East Africa with AMAJO.
            </p>
            <p className="mt-6 text-xs tracking-widest uppercase">
              Rwanda · Uganda · Kenya
            </p>
          </div>
          <div>
            <h2 className="font-sans text-sm font-semibold">Destinations</h2>
            <ul className="mt-4">
              {["Rwanda", "Uganda", "Kenya"].map((country) => (
                <li key={country}>
                  <Link
                    className={footerLink}
                    href={`/destinations/${country.toLowerCase()}`}
                  >
                    {country}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/destinations" className={footerLink}>
                  All destinations
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-sans text-sm font-semibold">
              Tours &amp; Experiences
            </h2>
            <ul className="mt-4">
              <li>
                <Link href="/tours" className={footerLink}>
                  All tours
                </Link>
              </li>
              {experiences.slice(0, 4).map((item) => (
                <li key={item.slug}>
                  <Link
                    href={buildTourSearchHref({ experience: item.slug })}
                    className={footerLink}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-sans text-sm font-semibold">
              Let’s make it personal
            </h2>
            <ul className="mt-4">
              {[
                { label: "Our services", href: "/services" },
                { label: "About AMAJO", href: "/about" },
                { label: "Contact", href: "/contact" },
                { label: "Request a Quote", href: "/request-a-quote" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={footerLink}>
                    {item.label}
                    {item.href === "/request-a-quote" && (
                      <ArrowUpRight aria-hidden="true" className="size-4" />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs leading-5 text-background/80">
              Official contact details and social profiles will be shared at
              launch.
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-5 pt-7 text-xs text-background/80 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} AMAJO · Essence of Africa</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link
              href="/privacy"
              className="inline-flex min-h-11 items-center hover:text-gold focus-visible:outline-background"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="inline-flex min-h-11 items-center hover:text-gold focus-visible:outline-background"
            >
              Terms
            </Link>
            <Link
              href="/permit-policy"
              className="inline-flex min-h-11 items-center hover:text-gold focus-visible:outline-background"
            >
              Permit planning
            </Link>
            <Link
              href="/foundation"
              className="inline-flex min-h-11 items-center hover:text-gold focus-visible:outline-background"
            >
              Design foundation
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
