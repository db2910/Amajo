"use client";
import { useId, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SlidersHorizontal, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import {
  buildTourSearchHref,
  countries,
  experiences,
  parseTourSearch,
  type TourSearch,
} from "@/features/catalog/search";

const control =
  "min-h-12 w-full rounded-md border border-input bg-background px-3 text-sm";
const ranges = [
  { value: "1-3", label: "1–3 days", min: 1, max: 3 },
  { value: "4-7", label: "4–7 days", min: 4, max: 7 },
  { value: "8-14", label: "8–14 days", min: 8, max: 14 },
  { value: "15-60", label: "15+ days", min: 15, max: 60 },
];
function FilterForm({
  filters,
  close,
}: {
  filters: TourSearch;
  close?: () => void;
}) {
  const id = useId();
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const matchingRange = ranges.find(
    (r) => r.min === filters.minDays && r.max === filters.maxDays,
  );
  const custom =
    !matchingRange &&
    (filters.minDays !== undefined || filters.maxDays !== undefined);
  return (
    <form
      aria-label="Filter journeys"
      action="/tours"
      className="space-y-6"
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const values = Object.fromEntries(data.entries()) as Record<
          string,
          string
        >;
        const range = ranges.find((r) => r.value === values.duration);
        delete values.duration;
        if (range) {
          values.minDays = String(range.min);
          values.maxDays = String(range.max);
        } else if (data.get("duration") === "custom") {
          if (filters.minDays) values.minDays = String(filters.minDays);
          if (filters.maxDays) values.maxDays = String(filters.maxDays);
        }
        const result = parseTourSearch(values);
        if (!result.success) {
          setError(
            "Check your search options. Maximum price must be a positive whole USD amount.",
          );
          return;
        }
        setError("");
        startTransition(() => {
          router.push(buildTourSearchHref(result.data));
          close?.();
        });
      }}
    >
      <label className="grid gap-2 text-sm font-semibold" htmlFor={`${id}-q`}>
        Search journeys
        <input
          id={`${id}-q`}
          className={control}
          name="q"
          type="search"
          placeholder="A place, a feeling…"
          maxLength={100}
          defaultValue={filters.q}
        />
      </label>
      <label
        className="grid gap-2 text-sm font-semibold"
        htmlFor={`${id}-country`}
      >
        Country
        <select
          id={`${id}-country`}
          name="country"
          className={control}
          defaultValue={filters.country ?? ""}
        >
          <option value="">All countries</option>
          {countries.map((c) => (
            <option key={c} value={c}>
              {c[0].toUpperCase() + c.slice(1)}
            </option>
          ))}
        </select>
      </label>
      <label
        className="grid gap-2 text-sm font-semibold"
        htmlFor={`${id}-experience`}
      >
        Experience
        <select
          id={`${id}-experience`}
          name="experience"
          className={control}
          defaultValue={filters.experience ?? ""}
        >
          <option value="">All experiences</option>
          {experiences.map((e) => (
            <option key={e.slug} value={e.slug}>
              {e.name}
            </option>
          ))}
        </select>
      </label>
      <label
        className="grid gap-2 text-sm font-semibold"
        htmlFor={`${id}-duration`}
      >
        Duration
        <select
          id={`${id}-duration`}
          name="duration"
          className={control}
          defaultValue={matchingRange?.value ?? (custom ? "custom" : "")}
        >
          <option value="">Any duration</option>
          {ranges.map((r) => (
            <option key={r.value} value={r.value}>
              {r.label}
            </option>
          ))}
          {custom && (
            <option value="custom">
              Selected range: {filters.minDays ?? 1}–{filters.maxDays ?? 60}{" "}
              days
            </option>
          )}
        </select>
      </label>
      <label
        className="grid gap-2 text-sm font-semibold"
        htmlFor={`${id}-budget`}
      >
        Travel budget style
        <select
          id={`${id}-budget`}
          name="budget"
          className={control}
          defaultValue={filters.budget ?? ""}
        >
          <option value="">Any style</option>
          <option value="budget">Budget</option>
          <option value="mid-range">Mid-range</option>
          <option value="luxury">Luxury</option>
        </select>
      </label>
      <p className="-mt-3 text-xs text-muted-foreground">
        Illustrative preferences, not confirmed price bands.
      </p>
      <label
        className="grid gap-2 text-sm font-semibold"
        htmlFor={`${id}-price`}
      >
        Maximum price (USD / person)
        <input
          id={`${id}-price`}
          name="maxBudget"
          className={control}
          type="number"
          min={1}
          max={1000000}
          step={1}
          placeholder="No limit"
          aria-describedby={`${id}-price-note`}
          defaultValue={filters.maxBudget}
        />
      </label>
      <p
        id={`${id}-price-note`}
        className="-mt-3 text-xs text-muted-foreground"
      >
        Only journeys with configured prices can match a price limit. Current
        development concepts are unpriced.
      </p>
      {filters.sort && <input type="hidden" name="sort" value={filters.sort} />}
      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}
      <Button type="submit" className="w-full" disabled={pending}>
        <Search aria-hidden="true" />
        {pending ? "Finding journeys…" : "Apply filters"}
      </Button>
      <Link
        href="/tours"
        onClick={close}
        className="flex min-h-11 items-center justify-center text-sm font-semibold text-primary underline"
      >
        Clear all filters
      </Link>
    </form>
  );
}
export function DesktopFilters({ filters }: { filters: TourSearch }) {
  return (
    <aside
      aria-label="Journey filters"
      className="hidden self-start rounded-lg border bg-card p-6 lg:block"
    >
      <h2 className="mb-6 text-2xl">Make it yours.</h2>
      <FilterForm key={JSON.stringify(filters)} filters={filters} />
    </aside>
  );
}
export function MobileFilters({ filters }: { filters: TourSearch }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="lg:hidden">
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button variant="outline">
            <SlidersHorizontal aria-hidden="true" />
            Filters
          </Button>
        </DrawerTrigger>
        <DrawerContent className="w-[calc(100%-1rem)] sm:max-w-md">
          <DrawerHeader>
            <DrawerTitle>Find your journey</DrawerTitle>
            <DrawerDescription>
              Combine preferences, then apply them to your results.
            </DrawerDescription>
          </DrawerHeader>
          <div className="px-5 pb-8">
            <FilterForm
              key={JSON.stringify(filters)}
              filters={filters}
              close={() => setOpen(false)}
            />
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
export function ResultsControls({
  filters,
  hasPrices,
}: {
  filters: TourSearch;
  hasPrices: boolean;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  return (
    <form
      aria-label="Search and sort journeys"
      action="/tours"
      className="flex flex-col gap-3 sm:flex-row"
      aria-busy={pending}
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const result = parseTourSearch({
          ...Object.fromEntries(
            Object.entries(filters)
              .filter(([key]) => key !== "page")
              .map(([k, v]) => [k, String(v)]),
          ),
          q: String(data.get("q") ?? ""),
          sort: String(data.get("sort") ?? "recommended"),
        });
        if (result.success)
          startTransition(() => router.push(buildTourSearchHref(result.data)));
      }}
    >
      <div className="flex min-w-0 flex-1 gap-2">
        <label className="sr-only" htmlFor="results-search">
          Search catalog
        </label>
        <input
          key={filters.q ?? ""}
          id="results-search"
          className={control}
          name="q"
          type="search"
          maxLength={100}
          placeholder="Search places or journey ideas"
          defaultValue={filters.q}
        />
        <Button type="submit" variant="outline" aria-label="Search catalog">
          <Search aria-hidden="true" />
        </Button>
      </div>
      <label className="sr-only" htmlFor="results-sort">
        Sort journeys
      </label>
      <select
        id="results-sort"
        className={`${control} sm:max-w-48`}
        name="sort"
        value={
          hasPrices || !filters.sort?.startsWith("price")
            ? filters.sort === "price"
              ? "price-asc"
              : (filters.sort ?? "recommended")
            : "recommended"
        }
        onChange={(event) => event.currentTarget.form?.requestSubmit()}
      >
        <option value="recommended">Recommended</option>
        <option value="newest">Newest</option>
        <option value="duration">Duration: shortest first</option>
        {hasPrices && (
          <>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
          </>
        )}
      </select>
    </form>
  );
}
