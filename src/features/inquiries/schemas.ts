import { z } from "zod";

const text = (max: number) =>
  z
    .string()
    .trim()
    .max(max, `Use ${max} characters or fewer.`)
    .refine(
      (v) => !/[\u0000-\u0008\u000b\u000c\u000e-\u001f<>]/.test(v),
      "Use plain text without markup or control characters.",
    );
const name = text(100).min(2, "Enter your full name.");
const email = z.string().trim().max(254).email("Enter a valid email address.");
const phone = text(40).refine(
  (v) =>
    !v ||
    (/^\+?[\d\s().-]+$/.test(v) &&
      v.replace(/\D/g, "").length >= 7 &&
      v.replace(/\D/g, "").length <= 20),
  "Enter a phone number with 7–20 digits, including the country code.",
);
const consent = z
  .boolean()
  .refine((v) => v, "Confirm the privacy consent to continue.");
const slug = z
  .string()
  .max(100)
  .regex(/^(?:[a-z0-9]+(?:-[a-z0-9]+)*)?$/, "Choose a recognized item.");
export const countryValues = ["rwanda", "uganda", "kenya"] as const;
export const experienceValues = [
  "wildlife-safaris",
  "gorilla-trekking",
  "cultural-experiences",
  "adventure-hiking",
  "luxury-experiences",
  "family-group-travel",
] as const;
export const travelStyles = ["open", "budget", "mid-range", "luxury"] as const;
export const accommodationOptions = [
  "open",
  "lodge",
  "hotel",
  "tented",
  "family",
] as const;
export const currencyValues = [
  "USD",
  "EUR",
  "GBP",
  "RWF",
  "UGX",
  "KES",
] as const;
export const quoteDestinationSchema = z
  .object({
    countries: z
      .array(z.enum(countryValues))
      .max(3)
      .refine(
        (a) => new Set(a).size === a.length,
        "Choose each destination once.",
      ),
    recommendRoute: z.boolean(),
    tour: slug,
    service: slug,
    experiences: z
      .array(z.enum(experienceValues))
      .max(6)
      .refine(
        (a) => new Set(a).size === a.length,
        "Choose each experience once.",
      ),
    interests: text(1000),
  })
  .superRefine((v, ctx) => {
    if (!v.countries.length && !v.recommendRoute)
      ctx.addIssue({
        code: "custom",
        path: ["countries"],
        message:
          "Choose at least one destination or ask for a route recommendation.",
      });
  });
export function todayISO(now = new Date()) {
  return now.toISOString().slice(0, 10);
}
function isDate(v: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(v)) return false;
  const d = new Date(`${v}T12:00:00Z`);
  return Number.isFinite(d.getTime()) && d.toISOString().slice(0, 10) === v;
}
export function quoteTravelSchema(today = todayISO()) {
  return z
    .object({
      departureDate: z.string().max(10),
      returnDate: z.string().max(10),
      flexibleDates: z.boolean(),
      adults: z
        .number({ error: "Enter the number of adults." })
        .int("Use a whole number of adults.")
        .min(1, "At least one adult must travel.")
        .max(50, "For this form, use up to 50 adults."),
      children: z
        .number({ error: "Enter the number of children (zero if none)." })
        .int("Use a whole number of children.")
        .min(0, "Children cannot be negative.")
        .max(30, "For this form, use up to 30 children."),
      travelStyle: z.enum(travelStyles),
      accommodation: z.enum(accommodationOptions),
      budget: z
        .string()
        .trim()
        .refine(
          (v) => !v || /^[1-9]\d{0,8}$/.test(v),
          "Enter a positive whole budget of up to 999,999,999, or leave it blank.",
        ),
      currency: z.enum(["", ...currencyValues]),
    })
    .superRefine((v, ctx) => {
      for (const field of ["departureDate", "returnDate"] as const) {
        if (!v[field] && !v.flexibleDates)
          ctx.addIssue({
            code: "custom",
            path: [field],
            message: "Choose a date or select flexible dates.",
          });
        else if (v[field] && !isDate(v[field]))
          ctx.addIssue({
            code: "custom",
            path: [field],
            message: "Enter a real calendar date.",
          });
        else if (v[field] && v[field] <= today)
          ctx.addIssue({
            code: "custom",
            path: [field],
            message: "Choose a future travel date.",
          });
      }
      if (
        isDate(v.departureDate) &&
        isDate(v.returnDate) &&
        v.returnDate < v.departureDate
      )
        ctx.addIssue({
          code: "custom",
          path: ["returnDate"],
          message: "Return must be on or after departure.",
        });
      if (v.adults + v.children > 60)
        ctx.addIssue({
          code: "custom",
          path: ["adults"],
          message: "Use a group of 60 travelers or fewer in this form.",
        });
      if (v.budget && !v.currency)
        ctx.addIssue({
          code: "custom",
          path: ["currency"],
          message: "Choose the currency for your budget.",
        });
    });
}
export const quoteContactSchema = z
  .object({
    fullName: name,
    email,
    phone,
    residence: text(80).min(2, "Enter your country of residence."),
    contactMethod: z.enum(["email", "phone", "whatsapp"]),
    notes: text(3000),
    privacyConsent: consent,
  })
  .superRefine((v, ctx) => {
    if (v.contactMethod !== "email" && !v.phone)
      ctx.addIssue({
        code: "custom",
        path: ["phone"],
        message: "A phone number is required for your chosen contact method.",
      });
  });
export function quoteSchema(today = todayISO()) {
  return z
    .object({
      ...quoteDestinationSchema.shape,
      ...quoteTravelSchema(today).shape,
      ...quoteContactSchema.shape,
    })
    .superRefine((value, ctx) => {
      for (const schema of [
        quoteDestinationSchema,
        quoteTravelSchema(today),
        quoteContactSchema,
      ]) {
        const result = schema.safeParse(value);
        if (!result.success)
          for (const issue of result.error.issues)
            ctx.addIssue({
              code: "custom",
              path: issue.path,
              message: issue.message,
            });
      }
    });
}
export const contactSchema = z.object({
  fullName: name,
  email,
  phone,
  subject: text(160).min(3, "Enter a subject of at least 3 characters."),
  message: text(3000).min(
    10,
    "Tell us a little more (at least 10 characters).",
  ),
  privacyConsent: consent,
});
export type QuoteInput = z.infer<ReturnType<typeof quoteSchema>>;
export type ContactInput = z.infer<typeof contactSchema>;
export const quoteDefaults: QuoteInput = {
  countries: [],
  recommendRoute: false,
  tour: "",
  service: "",
  experiences: [],
  interests: "",
  departureDate: "",
  returnDate: "",
  flexibleDates: true,
  adults: 2,
  children: 0,
  travelStyle: "open",
  accommodation: "open",
  budget: "",
  currency: "USD",
  fullName: "",
  email: "",
  phone: "",
  residence: "",
  contactMethod: "email",
  notes: "",
  privacyConsent: false,
};
