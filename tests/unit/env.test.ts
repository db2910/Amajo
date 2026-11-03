import { describe, expect, it } from "vitest";
import {
  parseEnv,
  publicEnvSchema,
  serverEnvSchema,
} from "../../src/lib/env/schema";

describe("environment validation", () => {
  it("allows a credential-free Phase 1 build and normalizes blank optional values", () => {
    expect(
      parseEnv(publicEnvSchema, {
        NEXT_PUBLIC_SUPABASE_URL: "",
        NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: "",
      }),
    ).toEqual({
      NEXT_PUBLIC_SUPABASE_URL: undefined,
      NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: undefined,
    });
    expect(parseEnv(serverEnvSchema, {})).toEqual({});
  });
  it.each(["not-a-url", "javascript:alert(1)", "ftp://example.com"])(
    "rejects an invalid site URL: %s",
    (url) => {
      expect(() =>
        parseEnv(publicEnvSchema, { NEXT_PUBLIC_SITE_URL: url }),
      ).toThrow("NEXT_PUBLIC_SITE_URL");
    },
  );
  it("requires both Supabase public settings together", () => {
    expect(() =>
      parseEnv(publicEnvSchema, {
        NEXT_PUBLIC_SUPABASE_URL: "https://example.supabase.co",
      }),
    ).toThrow();
    expect(() =>
      parseEnv(publicEnvSchema, {
        NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: "public-test-value",
      }),
    ).toThrow();
  });
  it("accepts a complete public configuration", () => {
    expect(
      parseEnv(publicEnvSchema, {
        NEXT_PUBLIC_SITE_URL: "https://example.com",
        NEXT_PUBLIC_SUPABASE_URL: "https://example.supabase.co",
        NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: "public-test-value",
      }).NEXT_PUBLIC_SITE_URL,
    ).toBe("https://example.com");
  });
  it("reports field names without leaking supplied values", () => {
    expect(() =>
      parseEnv(serverEnvSchema, {
        SUPABASE_SERVICE_ROLE_KEY: { sensitive: "never-log-this" },
      }),
    ).toThrow(/^Invalid environment configuration: SUPABASE_SERVICE_ROLE_KEY$/);
  });
  it("excludes private keys from parsed public values", () => {
    expect(
      parseEnv(publicEnvSchema, {
        SUPABASE_SERVICE_ROLE_KEY: "server-only-example",
      }),
    ).not.toHaveProperty("SUPABASE_SERVICE_ROLE_KEY");
  });
});
