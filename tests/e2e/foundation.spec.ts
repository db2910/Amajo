import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

for (const width of [360, 390, 768, 1024, 1440]) {
  test(`public and admin foundations fit ${width}px`, async ({
    page,
  }, testInfo) => {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ["/", "/foundation", "/admin"]) {
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
      await expect(page.locator("main h1")).toBeVisible();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      ).toBe(true);
      const logo = page
        .getByRole("link", { name: "AMAJO — Essence of Africa, home" })
        .first()
        .locator("img");
      await expect(logo).toBeVisible();
      expect(
        await logo.evaluate(
          (image) => (image as HTMLImageElement).naturalWidth > 0,
        ),
      ).toBe(true);
      const ratio = await logo.evaluate(
        (image) =>
          image.getBoundingClientRect().width /
          image.getBoundingClientRect().height,
      );
      expect(ratio).toBeCloseTo(747 / 731, 2);
      if (width === 360 || width === 1440) {
        if (route === "/") {
          for (const image of await page.locator("main img").all()) {
            await image.scrollIntoViewIfNeeded();
            await expect
              .poll(() =>
                image.evaluate(
                  (element) => (element as HTMLImageElement).naturalWidth,
                ),
              )
              .toBeGreaterThan(0);
          }
          await page.evaluate(() => window.scrollTo(0, 0));
          await expect(page.getByTestId("public-header")).toHaveAttribute(
            "data-overlay",
            "true",
          );
        }
        await page.screenshot({
          path: testInfo.outputPath(
            `${route === "/" ? "public" : route.slice(1)}.png`,
          ),
          fullPage: true,
          animations: "disabled",
        });
      }
    }
  });
}

test("dialog and drawer support keyboard dismissal and restore focus", async ({
  page,
}) => {
  await page.goto("/foundation");
  for (const label of ["Preview dialog", "Preview drawer"]) {
    const trigger = page.getByRole("button", { name: label, exact: true });
    await trigger.focus();
    await page.keyboard.press("Enter");
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog).toHaveAccessibleName(/foundation/i);
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press("Tab");
      expect(
        await dialog.evaluate((element) =>
          element.contains(document.activeElement),
        ),
      ).toBe(true);
    }
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();
  }
});

test("controls are labelled, operable and explicitly do not submit data", async ({
  page,
}) => {
  await page.goto("/foundation");
  await page
    .getByLabel("Full name", { exact: true })
    .fill("Foundation preview");
  await page
    .getByLabel("Travel notes", { exact: true })
    .fill("No data is sent");
  await page
    .getByRole("checkbox", { name: "Include forest experiences" })
    .check();
  await expect(
    page.getByRole("checkbox", { name: "Include forest experiences" }),
  ).toBeChecked();
  await page.getByRole("radio", { name: "Unhurried" }).check();
  await expect(page.getByRole("radio", { name: "Unhurried" })).toBeChecked();
  await page.getByRole("combobox", { name: "Region" }).click();
  await page.getByRole("option", { name: "Uganda" }).click();
  await expect(page.getByRole("combobox", { name: "Region" })).toContainText(
    "Uganda",
  );
  await expect(
    page.getByText(
      "Component examples only. These controls do not save or send information.",
    ),
  ).toBeVisible();
});

test("skip link and reduced motion work", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/foundation");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main-content")).toBeFocused();
  await page
    .getByRole("button", { name: "Preview dialog", exact: true })
    .click();
  await expect(page.getByRole("dialog")).toBeVisible();
});

test("foundations and overlays have no WCAG A/AA axe violations", async ({
  page,
}) => {
  for (const route of ["/", "/foundation", "/admin", "/missing-page"]) {
    await page.goto(route);
    expect(
      (
        await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
          .analyze()
      ).violations,
    ).toEqual([]);
  }
  await page.goto("/foundation");
  for (const label of ["Preview dialog", "Preview drawer"]) {
    await page.getByRole("button", { name: label, exact: true }).click();
    await expect(page.getByRole("dialog")).toHaveCSS("opacity", "1");
    expect(
      (
        await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
          .analyze()
      ).violations,
    ).toEqual([]);
    await page.keyboard.press("Escape");
  }
});

test("unknown routes return 404 with a working recovery link", async ({
  page,
}) => {
  const response = await page.goto("/missing-page");
  expect(response?.status()).toBe(404);
  await page.getByRole("link", { name: "Back to AMAJO", exact: true }).click();
  await expect(page).toHaveURL("/");
});

test("self-hosted typography loads without browser errors", async ({
  page,
}) => {
  const errors: string[] = [];
  const externalFonts: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("request", (request) => {
    if (/fonts\.(googleapis|gstatic)\.com/.test(request.url()))
      externalFonts.push(request.url());
  });
  await page.goto("/foundation");
  await page.evaluate(() => document.fonts.ready);
  expect(
    await page.evaluate(() =>
      document.fonts.check('400 16px "Plus Jakarta Sans Variable"'),
    ),
  ).toBe(true);
  expect(
    await page.evaluate(() =>
      document.fonts.check('600 38px "Playfair Display Variable"'),
    ),
  ).toBe(true);
  expect(errors).toEqual([]);
  expect(externalFonts).toEqual([]);
});

test("foundation supports 200% text sizing", async ({ page }) => {
  await page.setViewportSize({ width: 768, height: 1000 });
  await page.goto("/foundation");
  await page.evaluate(() => {
    document.documentElement.style.fontSize = "200%";
  });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  await page
    .getByRole("button", { name: "Preview dialog", exact: true })
    .click();
  await expect(page.getByRole("dialog")).toBeInViewport();
});
