import { describe, expect, it } from "vitest";
import {
  buildTourSearchHref,
  parseTourSearch,
} from "../../src/features/catalog/search";

describe("tour search route contract", () => {
  it("omits empty choices", () => {
    expect(buildTourSearchHref({})).toBe("/tours");
  });
  it("preserves country, experience, day range and USD budget", () => {
    const href = buildTourSearchHref({
      country: "uganda",
      experience: "gorilla-trekking",
      minDays: 5,
      maxDays: 9,
      maxBudget: 5000,
    });
    const values = Object.fromEntries(
      new URL(href, "https://example.com").searchParams,
    );
    expect(parseTourSearch(values)).toEqual({
      success: true,
      data: {
        country: "uganda",
        experience: "gorilla-trekking",
        minDays: 5,
        maxDays: 9,
        maxBudget: 5000,
      },
    });
  });
  it("encodes a text query without altering the route", () => {
    const href = buildTourSearchHref({ q: "forest & hills" });
    expect(new URL(href, "https://example.com").pathname).toBe("/tours");
    expect(new URL(href, "https://example.com").searchParams.get("q")).toBe(
      "forest & hills",
    );
  });
  it.each([
    { country: "unknown" },
    { experience: "unknown" },
    { maxBudget: "-1" },
    { minDays: "20", maxDays: "5" },
    { minDays: "NaN" },
    { country: ["rwanda", "kenya"] },
    { page: "1000000" },
  ])("rejects invalid or ambiguous search options: %j", (input) => {
    expect(parseTourSearch(input).success).toBe(false);
  });
  it("does not carry unknown input into future search or rendering", () => {
    expect(
      parseTourSearch({ country: "rwanda", token: "unrecognized-value" }),
    ).toEqual({ success: true, data: { country: "rwanda" } });
  });
});
