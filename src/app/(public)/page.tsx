import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container, Section, Stack } from "@/components/layout/primitives";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <Section>
      <Container>
        <Stack className="max-w-3xl gap-8 py-8 md:py-16">
          <p className="eyebrow text-primary">AMAJO · Essence of Africa</p>
          <h1 className="display-title">
            A thoughtful beginning.
            <br />
            <span className="text-primary">
              An extraordinary journey ahead.
            </span>
          </h1>
          <p className="max-w-xl text-lg text-muted-foreground">
            We are shaping a new home for journeys through East Africa. Our
            travel website is in development.
          </p>
          <div>
            <Button asChild>
              <Link href="/foundation">
                Explore the design foundation{" "}
                <ArrowUpRight aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </Stack>
      </Container>
    </Section>
  );
}
