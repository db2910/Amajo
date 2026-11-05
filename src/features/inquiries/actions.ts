"use server";
import { catalog } from "@/features/catalog/repository";
import { publicContent } from "@/features/content/repository";
import {
  validateContactSubmission,
  validateQuoteSubmission,
} from "./submission";

// Reserved server-side boundaries. The UI does not transmit PII while delivery is disabled.
export async function submitQuote(input: unknown) {
  return validateQuoteSubmission(input, {
    tour: catalog.tour,
    service: publicContent.service,
  });
}
export async function submitContact(input: unknown) {
  return validateContactSubmission(input);
}
