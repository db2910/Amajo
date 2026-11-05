import { z } from "zod";
import { contactSchema, quoteSchema } from "./schemas";
import type { SubmissionFailure } from "./contracts";

export const deliveryUnavailable =
  "Sending is not available yet. Nothing has been submitted, saved or sent.";
function invalid(error: z.ZodError): SubmissionFailure {
  const fieldErrors: Record<string, string[]> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    (fieldErrors[key] ??= []).push(issue.message);
  }
  return {
    success: false,
    status: "invalid",
    fieldErrors,
    formError: "Please check the highlighted fields.",
  };
}
const unavailable = (): SubmissionFailure => ({
  success: false,
  status: "unavailable",
  fieldErrors: {},
  formError: deliveryUnavailable,
});
export async function validateQuoteSubmission(
  input: unknown,
  lookup: {
    tour(slug: string): Promise<unknown>;
    service(slug: string): Promise<unknown>;
  },
  today?: string,
): Promise<SubmissionFailure> {
  const result = quoteSchema(today).safeParse(input);
  if (!result.success) return invalid(result.error);
  const errors: Record<string, string[]> = {};
  if (result.data.tour && !(await lookup.tour(result.data.tour)))
    errors.tour = ["Choose a recognized journey."];
  if (result.data.service && !(await lookup.service(result.data.service)))
    errors.service = ["Choose a recognized service."];
  if (Object.keys(errors).length)
    return {
      success: false,
      status: "invalid",
      fieldErrors: errors,
      formError: "Please choose recognized journey context.",
    };
  return unavailable(); // No persistence, logging, delivery or fabricated receipt in Phase 4.
}
export async function validateContactSubmission(
  input: unknown,
): Promise<SubmissionFailure> {
  const result = contactSchema.safeParse(input);
  return result.success ? unavailable() : invalid(result.error);
}
