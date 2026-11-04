import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("desktop menus open on hover and support keyboard dismissal", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  const navigation = page.getByRole("navigation", { name: "Main navigation" });
  const destinations = navigation.getByRole("button", { name: "Destinations" });
  await destinations.hover();
  await expect(
    navigation.getByRole("link", { name: "Explore Rwanda", exact: true }),
  ).toBeVisible();
  await navigation
    .getByRole("link", { name: "Explore Uganda", exact: true })
    .hover();
  await expect(destinations).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(destinations).toHaveAttribute("aria-expanded", "false");
  const tours = navigation.getByRole("button", { name: "Tours & Experiences" });
  await tours.focus();
  await page.keyboard.press("Enter");
  await page.keyboard.press("ArrowDown");
  await expect(
    navigation.getByRole("link", { name: "All Tours", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(tours).toBeFocused();
});

test("mobile drawer expands country and experience groups and closes on navigation", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open navigation" }).click();
  const drawer = page.getByRole("dialog", { name: "Explore AMAJO" });
  await expect(drawer).toBeVisible();
  await drawer.getByText("Destinations", { exact: true }).click();
  await drawer.getByText("Rwanda", { exact: true }).click();
  await expect(
    drawer.getByRole("link", { name: "Akagera Safaris" }),
  ).toBeVisible();
  await drawer.getByText("Tours & Experiences", { exact: true }).click();
  await expect(
    drawer.getByRole("link", { name: "Family & Group Travel" }),
  ).toBeVisible();
  await drawer
    .getByRole("link", { name: "Explore Rwanda", exact: true })
    .click();
  await expect(page).toHaveURL("/destinations/rwanda");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "A thousand hills",
  );
});

test("sticky navigation gains a solid background on scroll", async ({
  page,
}) => {
  await page.goto("/");
  const header = page.getByTestId("public-header");
  await expect(header).toHaveAttribute("data-overlay", "true");
  await page.evaluate(() => window.scrollTo(0, 600));
  await expect(header).toHaveAttribute("data-overlay", "false");
  expect(
    await header.evaluate((element) =>
      Math.round(element.getBoundingClientRect().top),
    ),
  ).toBe(0);
});

test("search generates the agreed parameters and the catalog handles unpriced concepts", async ({
  page,
}) => {
  await page.goto("/");
  const search = page.getByRole("form", { name: "Find your adventure" });
  await search
    .getByRole("combobox", { name: "Country", exact: true })
    .selectOption("uganda");
  await search
    .getByRole("combobox", { name: "Experience Type", exact: true })
    .selectOption("gorilla-trekking");
  await search
    .getByRole("combobox", { name: "Duration", exact: true })
    .selectOption("5-9");
  await search
    .getByRole("combobox", { name: "Budget (USD / person)", exact: true })
    .selectOption("5000");
  await search.getByRole("button", { name: "Find My Adventure" }).click();
  await expect(page).toHaveURL(/\/tours\?/);
  const params = new URL(page.url()).searchParams;
  expect(Object.fromEntries(params)).toEqual({
    country: "uganda",
    experience: "gorilla-trekking",
    minDays: "5",
    maxDays: "9",
    maxBudget: "5000",
  });
  await expect(page.locator("main")).toContainText("0 journey concepts");
  await expect(page.locator("main")).toContainText(
    "Unpriced journeys cannot match a maximum price",
  );
  await page.reload();
  await expect(
    page.getByRole("combobox", { name: "Experience", exact: true }).first(),
  ).toHaveValue("gorilla-trekking");
});

test("invalid query parameters are rejected and unknown destination paths return 404", async ({
  page,
}) => {
  await page.goto("/tours?country=unknown&maxBudget=-1");
  await expect(page.locator("main").getByRole("alert")).toContainText(
    "search options are invalid",
  );
  expect((await page.goto("/destinations/unknown-country"))?.status()).toBe(
    404,
  );
});

test("greetings rotate in order and can be paused", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByTestId("greeting")).toContainText("Hello");
  for (const greeting of ["Muraho", "Habari", "Bonjour"]) {
    await expect(page.getByTestId("greeting")).toContainText(greeting, {
      timeout: 6000,
    });
  }
  await page.getByRole("button", { name: "Pause greeting" }).click();
  const paused = await page.getByTestId("greeting").textContent();
  await page.waitForTimeout(3500);
  await expect(page.getByTestId("greeting")).toHaveText(paused!);
  await expect(
    page.getByRole("button", { name: "Resume greeting" }),
  ).toHaveAttribute("aria-pressed", "true");
});

test("reduced motion leaves a stable greeting with no repeating transition", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.getByTestId("greeting")).toContainText("Hello");
  await expect(
    page.getByRole("button", { name: "Pause greeting" }),
  ).toHaveCount(0);
  await page.waitForTimeout(3500);
  await expect(page.getByTestId("greeting")).toContainText("Hello");
});

test("homepage images, sample labels, quote actions and cocoa footer are correct", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Discover theEssence of Africa",
  );
  await expect(
    page.getByRole("link", { name: "Explore Tours", exact: true }),
  ).toHaveAttribute("href", "/tours");
  await expect(page.locator("#journeys")).toContainText(
    "Sample journey concepts",
  );
  await expect(
    page.getByText("Guest stories will appear here", { exact: false }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Request a Custom Quote", exact: true }),
  ).toHaveAttribute("href", "/request-a-quote");
  const footer = page.getByRole("contentinfo");
  expect(
    await footer.evaluate(
      (element) => getComputedStyle(element).backgroundColor,
    ),
  ).toBe("rgb(44, 20, 14)");
  await expect(
    footer.locator('a[href^="tel:"], a[href^="mailto:"]'),
  ).toHaveCount(0);
  for (const image of await page.locator("main img").all()) {
    await image.scrollIntoViewIfNeeded();
    await expect(image).toBeVisible();
    await expect
      .poll(() =>
        image.evaluate((element) => (element as HTMLImageElement).naturalWidth),
      )
      .toBeGreaterThan(0);
  }
});

test("all exposed internal links resolve to a real page, preview or homepage section", async ({
  page,
  request,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  const urls = await page
    .locator('a[href^="/"]')
    .evaluateAll((links) => [
      ...new Set(links.map((link) => link.getAttribute("href")!)),
    ]);
  const nav = page.getByRole("navigation", { name: "Main navigation" });
  for (const label of ["Destinations", "Tours & Experiences"]) {
    await nav.getByRole("button", { name: label, exact: true }).click();
    urls.push(
      ...(await nav
        .locator('a[href^="/"]')
        .evaluateAll((links) =>
          links.map((link) => link.getAttribute("href")!),
        )),
    );
    await page.keyboard.press("Escape");
  }
  for (const url of new Set(urls)) {
    expect((await request.get(url)).status(), url).toBe(200);
  }
});

test("open desktop menus and mobile drawer have no axe A/AA violations", async ({
  page,
}, testInfo) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("button", { name: "Destinations" })
    .click();
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
  await page.screenshot({
    path: testInfo.outputPath("desktop-menu.png"),
    animations: "disabled",
  });
  await page.keyboard.press("Escape");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "Open navigation" }).click();
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
  await page.screenshot({
    path: testInfo.outputPath("mobile-navigation.png"),
    animations: "disabled",
  });
});
