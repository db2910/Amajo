import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

for (const width of [360, 390, 768, 1024, 1440, 1920]) {
  test(`hero composition and accommodation at ${width}px`, async ({
    page,
  }, info) => {
    await page.setViewportSize({ width, height: 1080 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const title = page.locator("#hero-title");
    const hero = page.locator('section[aria-labelledby="hero-title"]');
    await expect(title).toBeVisible();
    await expect(title).toHaveCSS("text-align", "center");
    await page.evaluate(() => document.fonts.ready);
    const box = await title.boundingBox();
    expect(Math.abs(box!.x + box!.width / 2 - width / 2)).toBeLessThan(2);
    expect(await title.evaluate((e) => getComputedStyle(e).textAlign)).toBe(
      "center",
    );
    expect(
      await page
        .getByTestId("greeting")
        .evaluate((e) => parseFloat(getComputedStyle(e).fontSize)),
    ).toBeGreaterThanOrEqual(44);
    await expect(
      hero.getByRole("link", { name: "Explore Tours", exact: true }),
    ).toBeVisible();
    for (const card of await page.locator("#journeys article").all())
      await expect(card).toContainText("Accommodation included");
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1,
      ),
    ).toBe(true);
    if (width === 360 || width === 1440 || width === 1920) {
      await page.evaluate(() => scrollTo(0, 0));
      await page.screenshot({
        path: info.outputPath("home-hero.png"),
        animations: "disabled",
      });
      expect(
        (
          await new AxeBuilder({ page })
            .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
            .analyze()
        ).violations,
      ).toEqual([]);
    }
    await page.goto("/tours");
    const tourTitle = page.locator("main h1");
    const tourHero = tourTitle.locator("xpath=../..");
    await expect(
      tourHero.getByRole("img", {
        name: "Elephants gathering at a watering hole in Tsavo, Kenya",
      }),
    ).toBeVisible();
    await expect
      .poll(() =>
        tourHero
          .locator("img")
          .evaluate((e) => (e as HTMLImageElement).naturalWidth),
      )
      .toBeGreaterThan(0);
    expect(await tourTitle.evaluate((e) => getComputedStyle(e).textAlign)).toBe(
      "center",
    );
    for (const card of await page.locator("main article").all())
      await expect(card).toContainText("Accommodation included");
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1,
      ),
    ).toBe(true);
    if (width === 360 || width === 1440 || width === 1920) {
      await page.screenshot({
        path: info.outputPath("tours-hero.png"),
        animations: "disabled",
      });
      expect(
        (
          await new AxeBuilder({ page })
            .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
            .analyze()
        ).violations,
      ).toEqual([]);
    }
  });
}
test("all trip pages expose included accommodation without promising a booked property", async ({
  page,
}) => {
  const slugs = [
    "rwanda-hills-and-lakes",
    "uganda-forest-encounters",
    "kenya-wild-horizons",
    "kigali-and-kivu",
    "rwanda-forest-and-savanna",
    "jinja-river-days",
    "uganda-river-and-forest",
    "kenya-savanna-and-sea",
    "east-africa-slow-journey",
  ];
  for (const slug of slugs) {
    await page.goto(`/tours/${slug}`);
    await expect(page.locator("#accommodation")).toContainText(
      "Accommodation is included",
    );
    await expect(page.locator("#accommodation")).toContainText(
      "Specific lodges or hotels",
    );
    await expect(page.locator("#inclusions")).toContainText(
      "Accommodation for all overnight stays",
    );
    await expect(page.locator("#itinerary details").first()).toContainText(
      "Included overnight accommodation",
    );
    await page
      .locator("#faqs summary")
      .filter({ hasText: "Is accommodation included?" })
      .click();
    await expect(page.locator("#faqs")).toContainText(
      "Yes. All tours lasting more than one day include accommodation",
    );
  }
});
