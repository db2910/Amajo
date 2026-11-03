import { z } from "zod";

const optionalText = z.preprocess(
  (value) =>
    typeof value === "string" && value.trim() === "" ? undefined : value,
  z.string().trim().min(1).optional(),
);
const httpUrl = z
  .string()
  .url()
  .refine((value) => {
    try {
      return ["http:", "https:"].includes(new URL(value).protocol);
    } catch {
      return false;
    }
  }, "Use an HTTP(S) URL");
const optionalUrl = z.preprocess(
  (value) => (value === "" ? undefined : value),
  httpUrl.optional(),
);

export const publicEnvSchema = z
  .object({
    NEXT_PUBLIC_SITE_URL: optionalUrl,
    NEXT_PUBLIC_SUPABASE_URL: optionalUrl,
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: optionalText,
  })
  .superRefine((value, context) => {
    if (
      Boolean(value.NEXT_PUBLIC_SUPABASE_URL) !==
      Boolean(value.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY)
    ) {
      context.addIssue({
        code: "custom",
        path: ["NEXT_PUBLIC_SUPABASE_URL"],
        message:
          "Configure both Supabase URL and publishable key, or leave both blank",
      });
    }
  });

export const serverEnvSchema = z.object({
  SUPABASE_SERVICE_ROLE_KEY: optionalText,
});

export function parseEnv<T>(
  schema: z.ZodType<T>,
  values: Record<string, unknown>,
): T {
  const result = schema.safeParse(values);
  if (!result.success) {
    // Only field names are reported. Environment values must never enter logs.
    throw new Error(
      `Invalid environment configuration: ${[...new Set(result.error.issues.map((issue) => issue.path.join(".")))].join(", ")}`,
    );
  }
  return result.data;
}
