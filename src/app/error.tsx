"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container, Section, Stack } from "@/components/layout/primitives";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main id="main-content">
      <Section>
        <Container>
          <Stack className="max-w-xl">
            <p className="eyebrow text-primary">An unexpected interruption</p>
            <h1 className="display-title">Let’s find our way back.</h1>
            <p>We couldn’t load this page. Please try again.</p>
            <div className="flex flex-wrap gap-3">
              <Button onClick={reset}>Try again</Button>
              <Button variant="outline" asChild>
                <Link href="/">Return home</Link>
              </Button>
            </div>
          </Stack>
        </Container>
      </Section>
    </main>
  );
}
