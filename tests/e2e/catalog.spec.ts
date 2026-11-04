import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const routes = [
  "/destinations",
  "/destinations/rwanda",
  "/destinations/uganda",
  "/destinations/kenya",
  "/destinations/rwanda/attractions/lake-kivu",
  "/tours",
  "/tours/kenya-savanna-and-sea",
  "/experiences",
];
test("Jinja imagery and public license credits are correct", async ({
  page,
}) => {
  await page.goto("/tours/jinja-river-days");
  await expect(
    page
      .locator(
        'main img[alt="The source-of-the-Nile sign beside the river at Jinja"]',
      )
      .first(),
  ).toBeVisible();
  await expect(
    page
      .locator('main a[href="https://creativecommons.org/licenses/by-sa/3.0/"]')
      .first(),
  ).toContainText("CC BY-SA 3.0");
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
});
for (const width of [360, 390, 768, 1024, 1440]) {
  test(`catalog layouts and accessibility at ${width}px`, async ({
    page,
  }, info) => {
    test.setTimeout(120000);
    await page.setViewportSize({ width, height: 960 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    for (const route of routes) {
      expect((await page.goto(route))?.status(), route).toBe(200);
      await expect(page.locator("main h1")).toBeVisible();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth + 1,
        ),
        route,
      ).toBe(true);
      if (width === 360 || width === 1440) {
        expect(
          (
            await new AxeBuilder({ page })
              .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
              .analyze()
          ).violations,
          route,
        ).toEqual([]);
        if (
          [
            "/destinations/rwanda",
            "/tours",
            "/tours/kenya-savanna-and-sea",
          ].includes(route)
        ) {
          for (const img of await page.locator("main img").all()) {
            if (await img.isVisible()) {
              await img.scrollIntoViewIfNeeded();
              await expect
                .poll(() =>
                  img.evaluate((e) => (e as HTMLImageElement).naturalWidth),
                )
                .toBeGreaterThan(0);
            }
          }
          await page.evaluate(() => window.scrollTo(0, 0));
          await page.screenshot({
            path: info.outputPath(route.replaceAll("/", "-") + ".png"),
            fullPage: true,
            animations: "disabled",
          });
        }
      }
    }
    expect(errors).toEqual([]);
  });
}
test("all countries and attractions resolve with correct ownership and unknown slugs fail", async ({
  request,
}) => {
  const countries: Record<string, string[]> = {
    rwanda: ["volcanoes", "akagera", "nyungwe", "lake-kivu", "kigali"],
    uganda: ["bwindi", "murchison-falls", "queen-elizabeth", "kibale", "jinja"],
    kenya: ["maasai-mara", "amboseli", "tsavo", "nairobi", "kenyan-coast"],
  };
  for (const [country, slugs] of Object.entries(countries))
    for (const slug of slugs)
      expect(
        (
          await request.get(`/destinations/${country}/attractions/${slug}`)
        ).status(),
      ).toBe(200);
  for (const slug of [
    "rwanda-hills-and-lakes",
    "uganda-forest-encounters",
    "kenya-wild-horizons",
    "kigali-and-kivu",
    "rwanda-forest-and-savanna",
    "jinja-river-days",
    "uganda-river-and-forest",
    "kenya-savanna-and-sea",
    "east-africa-slow-journey",
  ]) {
    const response = await request.get(`/tours/${slug}`);
    expect(response.status(), slug).toBe(200);
    expect(await response.text()).toContain('id="itinerary"');
  }
  for (const route of [
    "/destinations/unknown",
    "/destinations/kenya/attractions/bwindi",
    "/destinations/rwanda/attractions/unknown",
    "/tours/unknown",
    "/destinations/rwanda/extra",
  ])
    expect((await request.get(route)).status(), route).toBe(404);
});
test("combined desktop filters, refresh, history, sort and reset work", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/tours");
  const filters = page.getByRole("form", { name: "Filter journeys" });
  await filters
    .getByRole("combobox", { name: "Country", exact: true })
    .selectOption("rwanda");
  await filters
    .getByRole("combobox", { name: "Experience", exact: true })
    .selectOption("cultural-experiences");
  await filters
    .getByRole("combobox", { name: "Duration", exact: true })
    .selectOption("4-7");
  await filters
    .getByRole("combobox", { name: "Travel budget style" })
    .selectOption("budget");
  await filters.getByRole("button", { name: "Apply filters" }).click();
  await expect(page.locator("main")).toContainText("1 journey concept");
  await expect(page.locator("main article h3")).toHaveText([
    "City Light & Lakeside Days",
  ]);
  const params = new URL(page.url()).searchParams;
  expect(params.get("minDays")).toBe("4");
  expect(params.get("budget")).toBe("budget");
  await page.reload();
  await expect(
    filters.getByRole("combobox", { name: "Country", exact: true }),
  ).toHaveValue("rwanda");
  await page
    .getByRole("combobox", { name: "Sort journeys" })
    .selectOption("newest");
  await expect(page).toHaveURL(/sort=newest/);
  await page.goBack();
  await expect(page).not.toHaveURL(/sort=newest/);
  await page.goForward();
  await expect(page).toHaveURL(/sort=newest/);
  await page
    .locator("main")
    .getByRole("link", { name: "Clear all filters", exact: true })
    .first()
    .click();
  await expect(page).toHaveURL("/tours");
  await expect(page.locator("main")).toContainText("9 journey concepts");
  await expect(
    page.getByRole("combobox", { name: "Sort journeys" }).locator("option"),
  ).toHaveCount(3);
});
test("pagination keeps query context and searches recover from empty and invalid input", async ({
  page,
}) => {
  await page.goto("/tours?sort=newest");
  const firstTitle = await page
    .locator("main article h3")
    .first()
    .textContent();
  await page.getByRole("link", { name: "Next", exact: true }).click();
  await expect(page).toHaveURL(/sort=newest.*page=2/);
  await expect(page.locator("main article")).toHaveCount(3);
  expect(await page.locator("main article h3").first().textContent()).not.toBe(
    firstTitle,
  );
  await page.getByRole("link", { name: "Previous", exact: true }).click();
  await expect(page.locator("main article h3").first()).toHaveText(firstTitle!);
  await page
    .getByRole("searchbox", { name: "Search catalog" })
    .fill("no such journey");
  await page.getByRole("button", { name: "Search catalog" }).click();
  await expect(page.locator("main")).toContainText("0 journey concepts");
  await page
    .getByRole("link", { name: "Explore all journey ideas", exact: true })
    .click();
  await expect(page.locator("main article")).toHaveCount(6);
  await page.goto("/tours?minDays=10&maxDays=2");
  await expect(page.locator("main").getByRole("alert")).toContainText(
    "search options are invalid",
  );
  await expect(page.locator("main article")).toHaveCount(0);
  await page.goto("/tours?page=999");
  await expect(page.locator("main")).toContainText("Page 2 of 2");
  await page.goto("/tours?maxBudget=5000");
  await expect(page.locator("main")).toContainText("0 journey concepts");
});
test("mobile filter drawer is keyboard accessible, applies and restores focus on dismissal", async ({
  page,
}) => {
  await page.setViewportSize({ width: 360, height: 900 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/tours");
  const trigger = page.getByRole("button", { name: "Filters", exact: true });
  await trigger.focus();
  await page.keyboard.press("Enter");
  const dialog = page.getByRole("dialog", { name: "Find your journey" });
  await expect(dialog).toBeVisible();
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
  await trigger.click();
  await dialog
    .getByRole("combobox", { name: "Country", exact: true })
    .selectOption("kenya");
  await dialog.getByRole("button", { name: "Apply filters" }).click();
  await expect(dialog).toHaveCount(0);
  await expect(page).toHaveURL(/country=kenya/);
  await expect(page.locator("main")).toContainText("3 journey concepts");
});
test("trip itinerary, gallery, related links and validated quote context work", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/tours/kenya-savanna-and-sea");
  const itinerary = page.locator("#itinerary");
  await expect(itinerary.locator("details")).toHaveCount(12);
  const day = itinerary.locator("details").nth(1);
  await day.locator("summary").focus();
  await page.keyboard.press("Enter");
  await expect(day).toHaveAttribute("open", "");
  await expect(day).toContainText("Accommodation notes");
  const galleryTrigger = page.getByRole("button", { name: /View gallery/ });
  await galleryTrigger.click();
  const gallery = page.getByRole("dialog", {
    name: "Savanna to the Sea gallery",
  });
  await expect(gallery).toContainText("Image 1 of");
  await gallery.getByRole("button", { name: "Next image" }).click();
  await expect(gallery).toContainText("Image 2 of");
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
  await gallery.getByRole("button", { name: "Previous image" }).click();
  await expect(gallery).toContainText("Image 1 of");
  await page.keyboard.press("Escape");
  await expect(galleryTrigger).toBeFocused();
  await expect(page.locator("main article")).toHaveCount(3);
  const quote = page
    .getByRole("complementary", { name: "Plan this journey" })
    .getByRole("link", { name: "Request a Quote" });
  await expect(quote).toHaveAttribute(
    "href",
    "/request-a-quote?tour=kenya-savanna-and-sea",
  );
  await quote.click();
  await expect(page.locator("main")).toContainText(
    "Selected concept: Savanna to the Sea",
  );
  await expect(page.locator("main")).toContainText(
    "No inquiry has been submitted",
  );
  await page.goto("/request-a-quote?tour=unknown");
  await expect(page.locator("main").getByRole("alert")).toContainText(
    "not recognized",
  );
});
test("experience categories and country cards navigate into working catalog pages", async ({
  page,
}) => {
  await page.goto("/destinations");
  await page
    .locator("main")
    .getByRole("link", { name: "Explore Rwanda", exact: true })
    .click();
  await expect(page).toHaveURL("/destinations/rwanda");
  await page
    .locator("main")
    .getByRole("link", { name: /Explore this place\s*:\s*Lake Kivu/ })
    .click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Lake Kivu");
  await page.goto("/experiences");
  await page
    .getByRole("link", { name: "Explore Gorilla Trekking", exact: true })
    .click();
  await expect(page).toHaveURL(/experience=gorilla-trekking/);
  await expect(page.locator("main")).toContainText("3 journey concepts");
});
