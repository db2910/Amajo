"use client";

import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  buildTourSearchHref,
  countries,
  durationOptions,
  experiences,
} from "@/features/catalog/search";
import type { CountrySlug, ExperienceSlug } from "@/features/catalog/types";

const selectClass =
  "min-h-12 w-full cursor-pointer rounded-md border border-input bg-background px-3 pr-6 text-sm text-cocoa focus-visible:outline-primary";

export function TourSearch() {
  const router = useRouter();
  return (
    <form
      action="/tours"
      aria-label="Find your adventure"
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const duration = durationOptions.find(
          (item) => item.value === data.get("duration"),
        );
        const country = String(data.get("country") || "") as CountrySlug | "";
        const experience = String(data.get("experience") || "") as
          ExperienceSlug | "";
        router.push(
          buildTourSearchHref({
            country: country || undefined,
            experience: experience || undefined,
            ...(duration && "minDays" in duration
              ? { minDays: duration.minDays, maxDays: duration.maxDays }
              : {}),
            maxBudget: data.get("maxBudget")
              ? Number(data.get("maxBudget"))
              : undefined,
          }),
        );
      }}
      className="relative z-10 rounded-xl border bg-card p-5 shadow-lifted md:p-7"
    >
      <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
        <p className="eyebrow text-primary">Your journey, your way</p>
        <p className="text-xs text-muted-foreground">
          A little inspiration is all it takes.
        </p>
      </div>
      <div className="grid items-end gap-4 sm:grid-cols-2 xl:grid-cols-[1fr_1.25fr_1fr_1fr_auto]">
        <label
          className="grid gap-2 text-xs font-semibold"
          htmlFor="search-country"
        >
          Country
          <select
            id="search-country"
            name="country"
            className={selectClass}
            defaultValue=""
          >
            <option value="">Any destination</option>
            {countries.map((country) => (
              <option value={country} key={country}>
                {country[0].toUpperCase() + country.slice(1)}
              </option>
            ))}
          </select>
        </label>
        <label
          className="grid gap-2 text-xs font-semibold"
          htmlFor="search-experience"
        >
          Experience Type
          <select
            id="search-experience"
            name="experience"
            className={selectClass}
            defaultValue=""
          >
            <option value="">Any experience</option>
            {experiences.map((experience) => (
              <option value={experience.slug} key={experience.slug}>
                {experience.name}
              </option>
            ))}
          </select>
        </label>
        <label
          className="grid gap-2 text-xs font-semibold"
          htmlFor="search-duration"
        >
          Duration
          <select
            id="search-duration"
            name="duration"
            className={selectClass}
            defaultValue=""
          >
            {durationOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <label
          className="grid gap-2 text-xs font-semibold"
          htmlFor="search-budget"
        >
          Budget (USD / person)
          <select
            id="search-budget"
            name="maxBudget"
            className={selectClass}
            defaultValue=""
          >
            <option value="">Any budget</option>
            <option value="2500">Up to $2,500</option>
            <option value="5000">Up to $5,000</option>
            <option value="10000">Up to $10,000</option>
          </select>
        </label>
        <Button type="submit" className="min-h-12 sm:col-span-2 xl:col-span-1">
          <Search aria-hidden="true" /> Find My Adventure
        </Button>
      </div>
    </form>
  );
}
