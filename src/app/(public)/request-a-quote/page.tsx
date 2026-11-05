import type { Metadata } from "next";
import { Container, Section } from "@/components/layout/primitives";
import { QuoteForm } from "@/components/public/quote-form";
import { DeliveryNotice } from "@/components/public/inquiry-controls";
import {
  quoteOptions,
  resolveQuoteContext,
} from "@/features/inquiries/context";
import { todayISO } from "@/features/inquiries/schemas";
export const metadata: Metadata = {
  title: "Plan a journey that feels like you",
  description:
    "Explore destinations, travel preferences and a tailored quote planning interface. Sending is not available yet.",
  robots: { index: false, follow: false },
};
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const query = await searchParams;
  const [context, options] = await Promise.all([
    resolveQuoteContext(query),
    quoteOptions(),
  ]);
  const key = [query.tour, query.service, query.country, query.attraction]
    .map((v) => (Array.isArray(v) ? v.join(",") : (v ?? "")))
    .join("|");
  return (
    <Section className="bg-sand/25">
      <Container>
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="eyebrow text-primary">
            Your next chapter, thoughtfully imagined
          </p>
          <h1 className="display-title mt-5">
            A journey that feels
            <br />
            <span className="italic text-primary">like you.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            A forest encounter. A wide-open horizon. A few days to simply be.
            Let’s bring your inspiration into focus.
          </p>
        </div>
        <div className="mb-8">
          <DeliveryNotice />
        </div>
        {context.error && (
          <p
            role="alert"
            className="mb-8 rounded-lg border border-destructive p-5 text-destructive"
          >
            {context.error}
          </p>
        )}
        <QuoteForm
          key={key}
          context={context}
          {...options}
          today={todayISO()}
        />
      </Container>
    </Section>
  );
}
