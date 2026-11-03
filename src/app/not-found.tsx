import Link from "next/link";
import { PublicShell } from "@/components/public/public-shell";
import { Container, Section, Stack } from "@/components/layout/primitives";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <PublicShell>
      <Section>
        <Container>
          <Stack className="max-w-xl">
            <p className="eyebrow text-primary">404 · A path less travelled</p>
            <h1 className="display-title">This page could not be found.</h1>
            <p className="text-muted-foreground">
              Return to the beginning to find your way.
            </p>
            <div>
              <Button asChild>
                <Link href="/">Back to AMAJO</Link>
              </Button>
            </div>
          </Stack>
        </Container>
      </Section>
    </PublicShell>
  );
}
