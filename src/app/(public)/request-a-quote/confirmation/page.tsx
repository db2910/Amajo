import type { Metadata } from "next";
import Link from "next/link";
import { Compass } from "lucide-react";
import { Container, Section } from "@/components/layout/primitives";
import { Button } from "@/components/ui/button";
import { confirmedInquiry } from "@/features/inquiries/confirmation";
export const metadata: Metadata = {
  title: "Inquiry status",
  robots: { index: false, follow: false },
};
export default async function Page() {
  const receipt = await confirmedInquiry();
  return (
    <Section>
      <Container>
        <div className="mx-auto max-w-2xl rounded-xl border bg-card p-8 md:p-12">
          <Compass className="size-9 text-primary" aria-hidden="true" />
          <p className="eyebrow mt-6 text-primary">Your journey planning</p>
          <h1 className="mt-4 text-4xl">
            {receipt
              ? "Your inquiry has been received."
              : "No submitted inquiry to confirm."}
          </h1>
          {receipt ? (
            <>
              <p className="mt-6 text-muted-foreground">
                Your request has been saved. Keep this reference for your
                records.
              </p>
              <p className="mt-4 font-medium">Reference: {receipt.reference}</p>
            </>
          ) : (
            <p className="mt-6 text-muted-foreground">
              Sending is not available in this development website. Visiting
              this page does not submit a request, create a reference or reserve
              a journey.
            </p>
          )}
          <Button asChild className="mt-8">
            <Link href="/request-a-quote">Return to journey planning</Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
