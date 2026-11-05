import { describe, expect, it, vi } from "vitest";
import {
  contactSchema,
  quoteDefaults,
  quoteSchema,
  quoteTravelSchema,
  type QuoteInput,
} from "@/features/inquiries/schemas";
import {
  validateContactSubmission,
  validateQuoteSubmission,
} from "@/features/inquiries/submission";
import { tourPrefill } from "@/features/inquiries/contracts";
import {
  services,
  aboutContent,
  contactInformation,
  policies,
} from "@/data/public-content";
import { catalogTours } from "@/data/catalog";
import { includesAccommodation } from "@/features/catalog/accommodation";

const today = "2026-11-05";
const validQuote: QuoteInput = {
  ...quoteDefaults,
  countries: ["rwanda"],
  fullName: "Example Traveler",
  email: "traveler@example.com",
  residence: "Rwanda",
  privacyConsent: true,
};
const validContact = {
  fullName: "Example Traveler",
  email: "traveler@example.com",
  phone: "",
  subject: "Journey planning",
  message: "I would like to explore Rwanda.",
  privacyConsent: true,
};
const lookup = {
  tour: vi.fn(async (slug: string) =>
    catalogTours.find((t) => t.slug === slug),
  ),
  service: vi.fn(async (slug: string) => services.find((s) => s.slug === slug)),
};

describe("quote validation", () => {
  it("allows an undecided traveler to ask for a route without dates or phone", () => {
    expect(
      quoteSchema(today).safeParse({
        ...validQuote,
        countries: [],
        recommendRoute: true,
      }).success,
    ).toBe(true);
    expect(
      quoteSchema(today).safeParse({ ...validQuote, countries: [] }).success,
    ).toBe(false);
  });
  it.each([[[]], [["tanzania"]], [["rwanda", "rwanda"]]])(
    "rejects invalid destination selections %j",
    (countries) => {
      expect(
        quoteSchema(today).safeParse({ ...validQuote, countries }).success,
      ).toBe(false);
    },
  );
  it("requires consent and trimmed meaningful contact details", () => {
    for (const invalid of [
      { fullName: " " },
      { email: "wrong" },
      { residence: " " },
      { privacyConsent: false },
      { notes: "<script>bad</script>" },
      { interests: "x".repeat(1001) },
    ])
      expect(
        quoteSchema(today).safeParse({ ...validQuote, ...invalid }).success,
      ).toBe(false);
    expect(
      quoteSchema(today).parse({
        ...validQuote,
        fullName: " Example Traveler ",
      }).fullName,
    ).toBe("Example Traveler");
  });
  it("requires a phone for phone and WhatsApp contact, with sensible syntax", () => {
    for (const contactMethod of ["phone", "whatsapp"]) {
      expect(
        quoteSchema(today).safeParse({ ...validQuote, contactMethod }).success,
      ).toBe(false);
      expect(
        quoteSchema(today).safeParse({
          ...validQuote,
          contactMethod,
          phone: "+250 700 123 456",
        }).success,
      ).toBe(true);
    }
    expect(
      quoteSchema(today).safeParse({ ...validQuote, phone: "not a number" })
        .success,
    ).toBe(false);
  });
  it.each([
    { departureDate: "2026-11-04" },
    { departureDate: today },
    { departureDate: "2027-02-30" },
    { flexibleDates: false },
    { departureDate: "2027-01-05", returnDate: "2027-01-03" },
  ])("rejects invalid/past/fixed missing date combinations %j", (patch) => {
    expect(
      quoteSchema(today).safeParse({ ...validQuote, ...patch }).success,
    ).toBe(false);
  });
  it("allows future same-day trips and optional dates in flexible plans", () => {
    expect(
      quoteSchema(today).safeParse({
        ...validQuote,
        flexibleDates: false,
        departureDate: "2027-01-05",
        returnDate: "2027-01-05",
      }).success,
    ).toBe(true);
    expect(
      quoteSchema(today).safeParse({
        ...validQuote,
        departureDate: "2027-01-05",
      }).success,
    ).toBe(true);
  });
  it.each([
    { adults: 0 },
    { adults: -1 },
    { adults: 1.5 },
    { adults: NaN },
    { adults: 51 },
    { children: -1 },
    { children: 31 },
    { adults: 50, children: 11 },
  ])("bounds traveler counts %j", (patch) => {
    expect(
      quoteTravelSchema(today).safeParse({ ...quoteDefaults, ...patch })
        .success,
    ).toBe(false);
  });
  it("keeps budget optional, in whole units and paired with a supported currency", () => {
    expect(
      quoteSchema(today).safeParse({
        ...validQuote,
        budget: "12000",
        currency: "KES",
      }).success,
    ).toBe(true);
    for (const patch of [
      { budget: "100", currency: "" },
      { budget: "0" },
      { budget: "12.50" },
      { budget: "-1" },
      { budget: "1000000000" },
      { currency: "FAKE" },
    ])
      expect(
        quoteSchema(today).safeParse({ ...validQuote, ...patch }).success,
      ).toBe(false);
  });
});

describe("authoritative submission boundary", () => {
  it("never reports successful persistence or delivery for a valid contact", async () => {
    expect(await validateContactSubmission(validContact)).toMatchObject({
      success: false,
      status: "unavailable",
      fieldErrors: {},
    });
    expect((await validateContactSubmission({})).status).toBe("invalid");
  });
  it("revalidates unknown tour/service references on the server", async () => {
    const tour = await validateQuoteSubmission(
      { ...validQuote, tour: "unrecognized" },
      lookup,
      today,
    );
    expect(tour).toMatchObject({
      success: false,
      status: "invalid",
      fieldErrors: { tour: [expect.any(String)] },
    });
    expect(
      (
        await validateQuoteSubmission(
          { ...validQuote, service: "invented" },
          lookup,
          today,
        )
      ).status,
    ).toBe("invalid");
  });
  it("returns unavailable for recognized context without inventing a receipt", async () => {
    const result = await validateQuoteSubmission(
      { ...validQuote, tour: catalogTours[0].slug, service: services[0].slug },
      lookup,
      today,
    );
    expect(result).toMatchObject({ success: false, status: "unavailable" });
    expect(result).not.toHaveProperty("reference");
  });
  it("does not look up context when the payload fails basic validation", async () => {
    const local = { tour: vi.fn(), service: vi.fn() };
    expect((await validateQuoteSubmission({}, local, today)).status).toBe(
      "invalid",
    );
    expect(local.tour).not.toHaveBeenCalled();
    expect(local.service).not.toHaveBeenCalled();
  });
});

describe("contact form and public content contracts", () => {
  it("requires valid name/email/subject/message/consent and permits an empty phone", () => {
    expect(contactSchema.safeParse(validContact).success).toBe(true);
    for (const patch of [
      { fullName: " " },
      { email: "bad" },
      { subject: " " },
      { message: "short" },
      { privacyConsent: false },
      { phone: "x" },
      { message: "a".repeat(3001) },
    ])
      expect(
        contactSchema.safeParse({ ...validContact, ...patch }).success,
      ).toBe(false);
  });
  it("has ten unique services and no fabricated team/contact identities or approved policies", () => {
    expect(services).toHaveLength(10);
    expect(new Set(services.map((s) => s.slug)).size).toBe(10);
    expect(aboutContent.team).toEqual([]);
    expect(contactInformation).toEqual({ verified: true });
    expect(policies.every((p) => p.status === "draft")).toBe(true);
    expect(
      services.every(
        (s) =>
          s.gallery.length >= 2 &&
          s.countries.length > 0 &&
          s.benefits.length === 3,
      ),
    ).toBe(true);
  });
  it("prefills each catalog concept without mutating it or inventing accommodation bookings", () => {
    for (const tour of catalogTours) {
      const result = tourPrefill({ ...tour, travelStyle: tour.budgetTier });
      expect(result.tour).toBe(tour.slug);
      expect(result.countries).toEqual(tour.countries);
      expect(result.experiences).toEqual(tour.experiences);
      expect(result.countries).not.toBe(tour.countries);
      expect(result).not.toHaveProperty("accommodation");
      expect(includesAccommodation(tour.durationDays)).toBe(true);
    }
    expect(includesAccommodation(1)).toBe(false);
  });
});
