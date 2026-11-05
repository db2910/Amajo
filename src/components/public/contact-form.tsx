"use client";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, LockKeyhole } from "lucide-react";
import { contactSchema, type ContactInput } from "@/features/inquiries/schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ErrorSummary } from "@/components/ui/field";
import {
  checkboxClass,
  DeliveryNotice,
  InquiryField,
  useInquiryReady,
} from "./inquiry-controls";

export function ContactForm() {
  const ready = useInquiryReady();
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    shouldFocusError: false,
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      privacyConsent: false,
    },
  });
  const [checked, setChecked] = useState(false);
  const summary = Object.entries(errors).map(([key, value]) => ({
    id: `contact-${key}`,
    message: value.message ?? "Check this field.",
  }));
  return (
    <form
      onChange={() => setChecked(false)}
      noValidate
      onSubmit={handleSubmit(
        () => setChecked(true),
        (invalid) => {
          setChecked(false);
          const first = (
            [
              "fullName",
              "email",
              "phone",
              "subject",
              "message",
              "privacyConsent",
            ] as const
          ).find((key) => invalid[key]);
          if (first) setFocus(first);
        },
      )}
      className="space-y-6"
      aria-label="Contact AMAJO"
    >
      <fieldset disabled={!ready} className="min-w-0 space-y-6">
        <legend className="sr-only">Contact details</legend>
        <DeliveryNotice />
        <ErrorSummary errors={summary} />
        <div className="grid gap-6 sm:grid-cols-2">
          <InquiryField
            id="contact-fullName"
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
            id="contact-email"
            label="Email (required)"
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
        </div>
        <InquiryField
          id="contact-phone"
          label="Phone (optional)"
          description="Include the country code."
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
          id="contact-subject"
          label="Subject (required)"
          error={errors.subject?.message}
        >
          {(a) => <Input {...register("subject")} {...a} maxLength={160} />}
        </InquiryField>
        <InquiryField
          id="contact-message"
          label="Message (required)"
          description="Please leave out passport, payment and medical details."
          error={errors.message?.message}
        >
          {(a) => (
            <Textarea
              {...register("message")}
              {...a}
              rows={5}
              maxLength={3000}
            />
          )}
        </InquiryField>
        <div>
          <label
            className="flex min-h-11 cursor-pointer items-start gap-3 py-2 text-sm"
            htmlFor="contact-privacyConsent"
          >
            <input
              id="contact-privacyConsent"
              type="checkbox"
              className={checkboxClass}
              {...register("privacyConsent")}
              aria-invalid={Boolean(errors.privacyConsent)}
              aria-describedby={
                errors.privacyConsent
                  ? "contact-privacyConsent-error"
                  : undefined
              }
            />
            <span>
              I consent to AMAJO using my details to respond when inquiry
              delivery is available. Read the{" "}
              <Link href="/privacy" className="text-primary underline">
                draft privacy notice
              </Link>
              .
            </span>
          </label>
          {errors.privacyConsent && (
            <p
              id="contact-privacyConsent-error"
              className="text-sm text-destructive"
            >
              {errors.privacyConsent.message}
            </p>
          )}
        </div>
        <div className="flex flex-wrap gap-3">
          <Button type="submit" variant="outline" disabled={isSubmitting}>
            {isSubmitting ? "Checking…" : "Check my details"}
            <ArrowRight aria-hidden="true" />
          </Button>
          <Button type="button" disabled aria-describedby="contact-send-state">
            <LockKeyhole aria-hidden="true" />
            Send message
          </Button>
        </div>
        <p id="contact-send-state" className="text-sm text-muted-foreground">
          Sending is unavailable until the inquiry service is connected.
        </p>
        <p role="status" className="text-sm font-medium text-sage">
          {checked &&
            "Your details pass the form checks. Nothing has been sent or saved."}
        </p>
        <div hidden={ready}>
          <p>
            Enable JavaScript to explore validation. Sending is unavailable in
            this version.
          </p>
        </div>
      </fieldset>
    </form>
  );
}
