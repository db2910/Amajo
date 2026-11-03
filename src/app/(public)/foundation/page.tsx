import type { Metadata } from "next";
import { ComponentPreview } from "@/components/foundation/component-preview";
import { Container, Section, Stack } from "@/components/layout/primitives";

export const metadata: Metadata = {
  title: "Design foundation",
  robots: { index: false, follow: false },
};

const palette = [
  ["Warm ivory", "#fcf9f4"],
  ["Deep cocoa", "#2c140e"],
  ["Action rust", "#a43700"],
  ["Burnt orange", "#d95b26"],
  ["Savannah gold", "#d4a359"],
  ["Sage canopy", "#4a5d4e"],
] as const;

export default function FoundationPage() {
  return (
    <Section>
      <Container>
        <Stack className="gap-16">
          <Stack className="max-w-3xl gap-4">
            <p className="eyebrow text-primary">
              Phase 1 · Component reference
            </p>
            <h1 className="display-title">
              Rooted in the earth.
              <br />
              Refined in the details.
            </h1>
            <p className="text-lg text-muted-foreground">
              The building blocks of AMAJO: warm African earth tones, editorial
              typography and thoughtful, accessible interactions.
            </p>
          </Stack>
          <section aria-labelledby="palette-heading">
            <h2 id="palette-heading" className="section-title mb-6">
              A palette with a sense of place
            </h2>
            <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {palette.map(([name, hex]) => (
                <li
                  key={hex}
                  className="overflow-hidden rounded-lg border bg-card"
                >
                  <div
                    style={{ backgroundColor: hex }}
                    className="h-24 border-b"
                  />
                  <div className="p-4">
                    <p className="text-sm font-medium">{name}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{hex}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
          <section
            aria-labelledby="type-heading"
            className="grid gap-8 border-y py-10 md:grid-cols-2"
          >
            <Stack className="gap-3">
              <p className="eyebrow text-primary">Playfair Display</p>
              <h2 id="type-heading" className="section-title">
                Stories worth
                <br />
                taking your time over.
              </h2>
            </Stack>
            <Stack className="justify-center gap-3">
              <p className="eyebrow text-primary">Plus Jakarta Sans</p>
              <p className="max-w-md">
                An expressive editorial voice, paired with a clear, welcoming
                interface. Room to breathe, and a natural rhythm for every
                screen.
              </p>
              <p className="text-sm text-muted-foreground">
                16px body · 26px line height · 1360px container
              </p>
            </Stack>
          </section>
          <ComponentPreview />
        </Stack>
      </Container>
    </Section>
  );
}
