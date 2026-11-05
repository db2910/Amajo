"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { useForm, useWatch, type FieldPath } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  ArrowRight,
  BedDouble,
  Check,
  Compass,
  LockKeyhole,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ErrorSummary } from "@/components/ui/field";
import { experiences } from "@/features/catalog/search";
import { includesAccommodation } from "@/features/catalog/accommodation";
import {
  tourPrefill,
  type QuoteContext,
  type QuoteServiceOption,
  type QuoteTourOption,
} from "@/features/inquiries/contracts";
import {
  accommodationOptions,
  countryValues,
  currencyValues,
  quoteDefaults,
  quoteSchema,
  type QuoteInput,
} from "@/features/inquiries/schemas";
import {
  checkboxClass,
  InquiryField,
  InquirySelect,
  useInquiryReady,
} from "./inquiry-controls";

const steps = ["Destination & experience", "Travel details", "Your details"];
const stepFields: FieldPath<QuoteInput>[][] = [
  [
    "countries",
    "recommendRoute",
    "tour",
    "service",
    "experiences",
    "interests",
  ],
  [
    "departureDate",
    "returnDate",
    "flexibleDates",
    "adults",
    "children",
    "travelStyle",
    "accommodation",
    "budget",
    "currency",
  ],
  [
    "fullName",
    "email",
    "phone",
    "residence",
    "contactMethod",
    "notes",
    "privacyConsent",
  ],
];
const accommodationNames = {
  open: "Help me choose",
  lodge: "Safari lodge",
  hotel: "Hotel or boutique stay",
  tented: "Tented camp",
  family: "Family or connected rooms",
};

export function QuoteForm({
  context,
  tours,
  services,
  today,
}: {
  context: QuoteContext;
  tours: QuoteTourOption[];
  services: QuoteServiceOption[];
  today: string;
}) {
  const ready = useInquiryReady();
  const form = useForm<QuoteInput>({
    resolver: zodResolver(quoteSchema(today)),
    defaultValues: { ...quoteDefaults, ...context.initial },
    shouldUnregister: false,
    shouldFocusError: false,
    mode: "onTouched",
  });
  const {
    register,
    control,
    trigger,
    setValue,
    handleSubmit,
    setFocus,
    formState: { errors, isSubmitting },
  } = form;
  const values = useWatch({ control });
  const [step, setStep] = useState(0);
  const [checked, setChecked] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const focusStep = useRef(false);
  useEffect(() => {
    if (focusStep.current) {
      heading.current?.focus();
      focusStep.current = false;
    }
  }, [step]);
  const selectedTour = tours.find((t) => t.slug === values.tour);
  const selectedService = services.find((s) => s.slug === values.service);
  const summary = Object.entries(errors)
    .filter(([key]) => stepFields[step].includes(key as FieldPath<QuoteInput>))
    .map(([key, error]) => ({
      id: `quote-${key}`,
      message: error?.message ?? "Check this field.",
    }));
  const go = (value: number) => {
    focusStep.current = true;
    setStep(value);
    setChecked(false);
  };
  async function next() {
    if (await trigger(stepFields[step], { shouldFocus: true })) go(step + 1);
  }
  const applyTour = (slug: string) => {
    setValue("tour", slug);
    const tour = tours.find((t) => t.slug === slug);
    if (tour) {
      const prefill = tourPrefill(tour);
      setValue("countries", prefill.countries!);
      setValue("experiences", prefill.experiences!);
      setValue("travelStyle", tour.travelStyle);
      setValue("recommendRoute", false);
    }
    setChecked(false);
  };
  const submit = (event: FormEvent<HTMLFormElement>) =>
    handleSubmit(
      () => setChecked(true),
      (allErrors) => {
        const invalidStep = stepFields.findIndex((fields) =>
          fields.some((key) => key in allErrors),
        );
        if (invalidStep >= 0 && invalidStep !== step) go(invalidStep);
        else {
          const first = stepFields[step].find((key) => key in allErrors);
          if (first) setFocus(first);
        }
        setChecked(false);
      },
    )(event);

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_340px] xl:gap-14">
      <form
        onChange={() => setChecked(false)}
        noValidate
        aria-label="Plan your journey"
        className="min-w-0 rounded-xl border bg-card p-5 shadow-soft sm:p-8"
        onSubmit={(event) => {
          if (step < 2) {
            event.preventDefault();
            void next();
          } else void submit(event);
        }}
      >
        <fieldset disabled={!ready} className="min-w-0">
          <legend className="sr-only">Journey preferences</legend>
          <ol
            aria-label="Quote planning progress"
            className="mb-8 grid grid-cols-3 gap-2 border-b pb-7"
          >
            {steps.map((label, i) => (
              <li
                key={label}
                aria-current={step === i ? "step" : undefined}
                className={`min-w-0 text-xs leading-5 ${step === i ? "font-semibold text-primary" : "text-muted-foreground"}`}
              >
                <span
                  className={`mb-2 flex size-9 items-center justify-center rounded-full border font-sans text-sm ${step >= i ? "border-primary bg-primary text-white" : "border-border"}`}
                >
                  {step > i ? (
                    <Check aria-hidden="true" className="size-4" />
                  ) : (
                    i + 1
                  )}
                </span>
                <span className="block">{label}</span>
              </li>
            ))}
          </ol>
          <h2
            ref={heading}
            tabIndex={-1}
            className="mb-2 scroll-mt-32 text-3xl focus-visible:outline-primary"
          >
            {
              [
                "Where does your curiosity lead?",
                "Make the journey your own.",
                "A few details about you.",
              ][step]
            }
          </h2>
          <p className="mb-7 text-sm text-muted-foreground">
            Step {step + 1} of 3 ·{" "}
            {step === 0
              ? "Choose your starting inspiration."
              : step === 1
                ? "Preferences guide the proposal; they do not reserve anything."
                : "Check your details locally. Sending is not available yet."}
          </p>
          <ErrorSummary errors={summary} />
          <div className="mt-6 space-y-6">
            {step === 0 && (
              <>
                <fieldset
                  aria-describedby={
                    errors.countries ? "quote-countries-error" : undefined
                  }
                >
                  <legend className="mb-3 text-sm font-semibold">
                    Destinations (choose one or ask for recommendations)
                  </legend>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {countryValues.map((country, i) => (
                      <label
                        key={country}
                        className="flex min-h-14 cursor-pointer items-center gap-3 rounded-md border bg-background px-4 py-3 capitalize has-[:checked]:border-primary has-[:checked]:bg-primary/5"
                      >
                        <input
                          className={checkboxClass}
                          type="checkbox"
                          id={
                            i === 0
                              ? "quote-countries"
                              : `quote-country-${country}`
                          }
                          value={country}
                          {...register("countries")}
                          aria-invalid={Boolean(errors.countries)}
                        />
                        {country[0].toUpperCase() + country.slice(1)}
                      </label>
                    ))}
                  </div>
                  {errors.countries && (
                    <p
                      id="quote-countries-error"
                      className="mt-2 text-sm text-destructive"
                    >
                      {errors.countries.message}
                    </p>
                  )}
                  <label className="mt-3 flex min-h-11 cursor-pointer items-center gap-3 text-sm">
                    <input
                      className={checkboxClass}
                      type="checkbox"
                      {...register("recommendRoute")}
                    />
                    Help me choose the route
                  </label>
                </fieldset>
                <InquiryField
                  id="quote-tour"
                  label="Journey inspiration (optional)"
                  description="Choosing a concept prefills its countries, experiences and travel style. You can adjust them."
                  error={errors.tour?.message}
                >
                  {(a) => (
                    <InquirySelect
                      {...register("tour")}
                      {...a}
                      onChange={(e) => applyTour(e.target.value)}
                    >
                      <option value="">Create my own itinerary</option>
                      {tours.map((t) => (
                        <option value={t.slug} key={t.slug}>
                          {t.title} · {t.durationDays} days
                        </option>
                      ))}
                    </InquirySelect>
                  )}
                </InquiryField>
                <InquiryField
                  id="quote-service"
                  label="Service interest (optional)"
                  error={errors.service?.message}
                >
                  {(a) => (
                    <InquirySelect
                      {...register("service")}
                      {...a}
                      onChange={(e) => {
                        const slug = e.target.value;
                        setValue("service", slug);
                        const service = services.find((s) => s.slug === slug);
                        if (service && !values.tour) {
                          setValue("countries", [...service.countries]);
                          setValue("experiences", [...service.experiences]);
                        }
                      }}
                    >
                      <option value="">No particular service</option>
                      {services.map((s) => (
                        <option key={s.slug} value={s.slug}>
                          {s.name}
                        </option>
                      ))}
                    </InquirySelect>
                  )}
                </InquiryField>
                <fieldset>
                  <legend className="mb-3 text-sm font-semibold">
                    Preferred experiences (optional)
                  </legend>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {experiences.map((experience) => (
                      <label
                        key={experience.slug}
                        className="flex min-h-12 cursor-pointer items-center gap-3 rounded-md border px-3 py-2 text-sm has-[:checked]:border-primary"
                      >
                        <input
                          className={checkboxClass}
                          type="checkbox"
                          value={experience.slug}
                          {...register("experiences")}
                        />
                        {experience.name}
                      </label>
                    ))}
                  </div>
                </fieldset>
                <InquiryField
                  id="quote-interests"
                  label="What would you love to discover? (optional)"
                  error={errors.interests?.message}
                >
                  {(a) => (
                    <Textarea
                      {...register("interests")}
                      {...a}
                      rows={3}
                      maxLength={1000}
                      placeholder="A slower safari, time by the lake, local food…"
                    />
                  )}
                </InquiryField>
              </>
            )}
            {step === 1 && (
              <>
                <label className="flex min-h-11 cursor-pointer items-center gap-3 text-sm">
                  <input
                    className={checkboxClass}
                    type="checkbox"
                    {...register("flexibleDates")}
                  />
                  My dates are flexible / I have not decided yet
                </label>
                <div className="grid gap-6 sm:grid-cols-2">
                  <InquiryField
                    id="quote-departureDate"
                    label={`Departure date (${values.flexibleDates ? "optional" : "required"})`}
                    error={errors.departureDate?.message}
                  >
                    {(a) => (
                      <Input
                        {...register("departureDate")}
                        {...a}
                        type="date"
                        min={today}
                      />
                    )}
                  </InquiryField>
                  <InquiryField
                    id="quote-returnDate"
                    label={`Return date (${values.flexibleDates ? "optional" : "required"})`}
                    error={errors.returnDate?.message}
                  >
                    {(a) => (
                      <Input
                        {...register("returnDate")}
                        {...a}
                        type="date"
                        min={values.departureDate || today}
                      />
                    )}
                  </InquiryField>
                  <InquiryField
                    id="quote-adults"
                    label="Adults (required)"
                    description="At least one; maximum 50."
                    error={errors.adults?.message}
                  >
                    {(a) => (
                      <Input
                        {...register("adults", { valueAsNumber: true })}
                        {...a}
                        type="number"
                        inputMode="numeric"
                        min={1}
                        max={50}
                        step={1}
                      />
                    )}
                  </InquiryField>
                  <InquiryField
                    id="quote-children"
                    label="Children"
                    description="Maximum 30; no names or birth dates needed."
                    error={errors.children?.message}
                  >
                    {(a) => (
                      <Input
                        {...register("children", { valueAsNumber: true })}
                        {...a}
                        type="number"
                        inputMode="numeric"
                        min={0}
                        max={30}
                        step={1}
                      />
                    )}
                  </InquiryField>
                </div>
                <InquiryField
                  id="quote-travelStyle"
                  label="Preferred travel style"
                  error={errors.travelStyle?.message}
                >
                  {(a) => (
                    <InquirySelect {...register("travelStyle")} {...a}>
                      <option value="open">Help me choose</option>
                      <option value="budget">Budget conscious</option>
                      <option value="mid-range">Mid-range comfort</option>
                      <option value="luxury">Luxury</option>
                    </InquirySelect>
                  )}
                </InquiryField>
                <div className="rounded-lg bg-sage/5 p-5 text-sm">
                  <p className="flex items-start gap-2 font-semibold text-sage">
                    <BedDouble
                      aria-hidden="true"
                      className="mt-0.5 size-5 shrink-0"
                    />
                    Accommodation included on all tours longer than one day.
                  </p>
                  <p className="mt-2 text-muted-foreground">
                    Share your preference below. Specific properties, room
                    types, rates and availability are confirmed in the tailored
                    quote; no property is reserved here.
                  </p>
                </div>
                <InquiryField
                  id="quote-accommodation"
                  label="Accommodation preference"
                  error={errors.accommodation?.message}
                >
                  {(a) => (
                    <InquirySelect {...register("accommodation")} {...a}>
                      {accommodationOptions.map((key) => (
                        <option key={key} value={key}>
                          {accommodationNames[key]}
                        </option>
                      ))}
                    </InquirySelect>
                  )}
                </InquiryField>
                <div className="grid gap-6 sm:grid-cols-[1fr_130px]">
                  <InquiryField
                    id="quote-budget"
                    label="Approximate total trip budget (optional)"
                    description="Whole currency units for your group. No currency conversion or price guarantee."
                    error={errors.budget?.message}
                  >
                    {(a) => (
                      <Input
                        {...register("budget")}
                        {...a}
                        inputMode="numeric"
                        maxLength={9}
                        placeholder="e.g. 12000"
                      />
                    )}
                  </InquiryField>
                  <InquiryField
                    id="quote-currency"
                    label="Currency"
                    error={errors.currency?.message}
                  >
                    {(a) => (
                      <InquirySelect {...register("currency")} {...a}>
                        <option value="">Choose</option>
                        {currencyValues.map((c) => (
                          <option key={c}>{c}</option>
                        ))}
                      </InquirySelect>
                    )}
                  </InquiryField>
                </div>
              </>
            )}
            {step === 2 && (
              <>
                <div className="grid gap-6 sm:grid-cols-2">
                  <InquiryField
                    id="quote-fullName"
                    label="Full name (required)"
                    error={errors.fullName?.message}
                  >
                    {(a) => (
                      <Input
                        {...register("fullName")}
                        {...a}
                        autoComplete="name"
                        maxLength={100}
                      />
                    )}
                  </InquiryField>
                  <InquiryField
                    id="quote-email"
                    label="Email address (required)"
                    error={errors.email?.message}
                  >
                    {(a) => (
                      <Input
                        {...register("email")}
                        {...a}
                        type="email"
                        autoComplete="email"
                        maxLength={254}
                      />
                    )}
                  </InquiryField>
                  <InquiryField
                    id="quote-residence"
                    label="Country of residence (required)"
                    error={errors.residence?.message}
                  >
                    {(a) => (
                      <Input
                        {...register("residence")}
                        {...a}
                        autoComplete="country-name"
                        maxLength={80}
                      />
                    )}
                  </InquiryField>
                  <InquiryField
                    id="quote-contactMethod"
                    label="Preferred contact method"
                    error={errors.contactMethod?.message}
                  >
                    {(a) => (
                      <InquirySelect {...register("contactMethod")} {...a}>
                        <option value="email">Email</option>
                        <option value="phone">Phone call</option>
                        <option value="whatsapp">WhatsApp</option>
                      </InquirySelect>
                    )}
                  </InquiryField>
                </div>
                <InquiryField
                  id="quote-phone"
                  label={`Phone number (${values.contactMethod === "email" ? "optional" : "required"})`}
                  description="Include the country code. Required for phone or WhatsApp contact."
                  error={errors.phone?.message}
                >
                  {(a) => (
                    <Input
                      {...register("phone")}
                      {...a}
                      type="tel"
                      autoComplete="tel"
                      maxLength={40}
                    />
                  )}
                </InquiryField>
                <InquiryField
                  id="quote-notes"
                  label="Additional notes (optional)"
                  description="Share general preferences only. Leave out medical, passport, payment and children’s personal details."
                  error={errors.notes?.message}
                >
                  {(a) => (
                    <Textarea
                      {...register("notes")}
                      {...a}
                      rows={4}
                      maxLength={3000}
                    />
                  )}
                </InquiryField>
                <div>
                  <label className="flex min-h-11 cursor-pointer items-start gap-3 py-2 text-sm">
                    <input
                      id="quote-privacyConsent"
                      className={checkboxClass}
                      type="checkbox"
                      {...register("privacyConsent")}
                      aria-invalid={Boolean(errors.privacyConsent)}
                      aria-describedby={
                        errors.privacyConsent
                          ? "quote-privacyConsent-error"
                          : undefined
                      }
                    />
                    <span>
                      I consent to AMAJO using my details to respond to my
                      inquiry when delivery is available. Read the{" "}
                      <Link href="/privacy" className="text-primary underline">
                        draft privacy notice
                      </Link>
                      .
                    </span>
                  </label>
                  {errors.privacyConsent && (
                    <p
                      id="quote-privacyConsent-error"
                      className="text-sm text-destructive"
                    >
                      {errors.privacyConsent.message}
                    </p>
                  )}
                </div>
              </>
            )}
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t pt-6">
            {step > 0 ? (
              <Button
                type="button"
                variant="ghost"
                onClick={() => go(step - 1)}
              >
                <ArrowLeft aria-hidden="true" />
                Back
              </Button>
            ) : (
              <span className="text-xs text-muted-foreground">
                Made around you.
              </span>
            )}
            {step < 2 ? (
              <Button type="submit">
                Next
                <ArrowRight aria-hidden="true" />
              </Button>
            ) : (
              <Button type="submit" variant="outline" disabled={isSubmitting}>
                {isSubmitting ? "Checking…" : "Check my details"}
                <Check aria-hidden="true" />
              </Button>
            )}
          </div>
          {step === 2 && (
            <div className="mt-6 space-y-3">
              <Button
                type="button"
                className="w-full"
                disabled
                aria-describedby="quote-send-state"
              >
                <LockKeyhole aria-hidden="true" />
                Send quote request
              </Button>
              <p
                id="quote-send-state"
                className="text-sm text-muted-foreground"
              >
                Sending is unavailable until the inquiry service is connected.
              </p>
              <p role="status" className="text-sm font-medium text-sage">
                {checked &&
                  "Your details pass the form checks. Nothing has been sent or saved."}
              </p>
            </div>
          )}
          <div hidden={ready}>
            <p>
              Enable JavaScript to explore the three planning steps. Sending is
              unavailable.
            </p>
          </div>
        </fieldset>
      </form>
      <aside
        aria-label="Your travel summary"
        className="min-w-0 space-y-6 lg:sticky lg:top-32"
      >
        <div className="overflow-hidden rounded-xl border bg-card shadow-soft">
          <div className="relative aspect-[16/10]">
            <Image
              src={selectedTour?.image ?? "/images/mara-landscape.jpg"}
              alt={
                selectedTour?.imageAlt ??
                "Open landscape in the Maasai Mara, Kenya"
              }
              fill
              sizes="(max-width: 1023px) 100vw, 340px"
              className="object-cover"
            />
          </div>
          <div className="p-6">
            <p className="eyebrow text-primary">Your journey, taking shape</p>
            <h2 className="mt-3 text-2xl">
              A little inspiration.
              <br />A world of possibility.
            </h2>
            <dl className="mt-6 space-y-4 text-sm">
              <div>
                <dt className="text-muted-foreground">Destination</dt>
                <dd className="mt-1 capitalize">
                  {values.countries?.length
                    ? values.countries.join(" · ")
                    : "Open to recommendations"}
                </dd>
              </div>
              {selectedTour && (
                <div>
                  <dt className="text-muted-foreground">Selected concept</dt>
                  <dd className="mt-1">
                    Selected concept: {selectedTour.title}
                    <span className="mt-1 block text-muted-foreground">
                      {selectedTour.durationDays} days · Development concept
                    </span>
                  </dd>
                </div>
              )}
              {selectedService && (
                <div>
                  <dt className="text-muted-foreground">Service</dt>
                  <dd>{selectedService.name}</dd>
                </div>
              )}
              {context.selectedPlace && (
                <div>
                  <dt className="text-muted-foreground">Place inspiration</dt>
                  <dd>{context.selectedPlace}</dd>
                </div>
              )}
              <div>
                <dt className="text-muted-foreground">Travelers</dt>
                <dd>
                  {Number.isFinite(values.adults) ? values.adults : "—"} adults
                  · {Number.isFinite(values.children) ? values.children : "—"}{" "}
                  children
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Timing</dt>
                <dd>
                  {values.departureDate || "Dates to decide"}
                  {values.returnDate ? ` to ${values.returnDate}` : ""}
                  {values.flexibleDates ? " · Flexible" : ""}
                </dd>
              </div>
              {values.budget && (
                <div>
                  <dt className="text-muted-foreground">
                    Group budget preference
                  </dt>
                  <dd>
                    {values.currency} {values.budget}
                  </dd>
                </div>
              )}
            </dl>
            {selectedTour &&
              includesAccommodation(selectedTour.durationDays) && (
                <p className="mt-5 flex items-center gap-2 text-sm font-medium text-sage">
                  <BedDouble aria-hidden="true" className="size-5" />
                  Accommodation included
                </p>
              )}
            <p className="mt-5 border-t pt-4 text-xs text-muted-foreground">
              A planning outline, not a booking or price commitment. Landscape
              photography does not promise a particular property.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3 px-1 text-sm text-muted-foreground">
          <Compass
            aria-hidden="true"
            className="mt-1 size-6 shrink-0 text-primary"
          />
          <p>
            Choose a place. Follow a feeling. Leave room for something
            unexpected.
          </p>
        </div>
      </aside>
    </div>
  );
}
