import { expect, test, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const widths = [360, 390, 768, 1024, 1440];
const pages = [
  "/services",
  "/services/gorilla-and-primate-trekking",
  "/about",
  "/contact",
  "/request-a-quote",
  "/privacy",
  "/permit-policy",
];
async function noOverflow(page: Page) {
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth + 1,
    ),
  ).toBe(true);
}
async function axe(page: Page) {
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
}
const future = (days: number) => {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
};

for (const width of widths)
  test(`supporting pages fit and remain accessible at ${width}px`, async ({
    page,
  }, testInfo) => {
    test.setTimeout(150_000);
    await page.setViewportSize({ width, height: 1000 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    for (const path of pages) {
      expect((await page.goto(path))?.status()).toBe(200);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await noOverflow(page);
      if (width === 360 || width === 1440) {
        await axe(page);
        await page.evaluate(() => document.fonts.ready);
        await page.locator("main img").evaluateAll(async (images) => {
          await Promise.all(
            images.map((item) => {
              const image = item as HTMLImageElement;
              image.loading = "eager";
              return image.decode();
            }),
          );
        });
        await page.evaluate(() => {
          (document.activeElement as HTMLElement)?.blur();
          window.scrollTo(0, 0);
        });
        await page.screenshot({
          path: testInfo.outputPath(path.replaceAll("/", "-") + ".png"),
          fullPage: true,
          animations: "disabled",
        });
      }
    }
    expect(errors).toEqual([]);
  });

test("all ten service routes, associated journeys and 404s are real pages", async ({
  page,
  request,
}) => {
  test.setTimeout(90_000);
  await page.goto("/services");
  const links = await page
    .locator('main a[href^="/services/"]')
    .evaluateAll((items) => [
      ...new Set(items.map((a) => a.getAttribute("href")!)),
    ]);
  expect(links).toHaveLength(10);
  for (const href of links) {
    const response = await request.get(href);
    expect(response.status()).toBe(200);
    expect(await response.text()).toContain("Plan with this service");
  }
  for (const href of [
    "/services/unknown",
    "/services/toString",
    "/services/constructor",
    "/journal",
    "/journal/unknown",
    "/unknown",
  ])
    expect((await request.get(href)).status()).toBe(404);
  await page.goto("/services/gorilla-and-primate-trekking");
  await expect(page.locator("main article")).toHaveCount(3);
  const gallery = page.getByRole("button", { name: /View gallery/ });
  await gallery.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("dialog")).toBeVisible();
  await axe(page);
  await page.keyboard.press("Escape");
  await expect(gallery).toBeFocused();
  await page.getByRole("link", { name: "Plan with this service" }).click();
  await expect(page.getByLabel("Service interest (optional)")).toHaveValue(
    "gorilla-and-primate-trekking",
  );
  await expect(page.getByLabel("Rwanda", { exact: true })).toBeChecked();
  await expect(page.getByLabel("Uganda", { exact: true })).toBeChecked();
  await expect(page.getByLabel("Kenya", { exact: true })).not.toBeChecked();
});

test("contact validation preserves input, announces errors and never sends data", async ({
  page,
}) => {
  await page.goto("/contact");
  const form = page.getByRole("form", { name: "Contact AMAJO" });
  const posts: string[] = [];
  page.on("request", (r) => {
    if (r.method() === "POST") posts.push(r.url());
  });
  await form.getByRole("button", { name: "Check my details" }).click();
  await expect(form.getByRole("alert")).toContainText("Enter your full name");
  await expect(form.getByLabel("Full name (required)")).toBeFocused();
  await axe(page);
  await form.getByLabel("Full name (required)").fill("Example Traveler");
  await form.getByLabel("Email (required)").fill("bad-email");
  await form.getByLabel("Subject (required)").fill("Planning a journey");
  await form
    .getByLabel("Message (required)")
    .fill("I would like to explore Rwanda.");
  await form.getByRole("checkbox").check();
  await form.getByRole("button", { name: "Check my details" }).click();
  await expect(form.getByRole("alert")).toContainText("valid email");
  await expect(form.getByLabel("Message (required)")).toHaveValue(
    "I would like to explore Rwanda.",
  );
  await form.getByLabel("Email (required)").fill("traveler@example.com");
  await form.getByRole("button", { name: "Check my details" }).click();
  await expect(form.getByRole("status")).toContainText(
    "Nothing has been sent or saved",
  );
  await expect(
    form.getByRole("button", { name: "Send message", exact: true }),
  ).toBeDisabled();
  expect(posts).toEqual([]);
  await expect(page).toHaveURL("/contact");
  await expect(
    page.locator(
      'main a[href^="tel:"], main a[href^="mailto:"], main a[href*="wa.me"], main iframe',
    ),
  ).toHaveCount(0);
});

for (const width of widths)
  test(`quote progression, validation and preserved state at ${width}px`, async ({
    page,
  }, testInfo) => {
    test.setTimeout(120_000);
    await page.setViewportSize({ width, height: 1000 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/request-a-quote");
    const form = page.getByRole("form", { name: "Plan your journey" });
    const posts: string[] = [];
    page.on("request", (r) => {
      if (r.method() === "POST") posts.push(r.url());
    });
    await form.getByRole("button", { name: "Next", exact: true }).click();
    await expect(form.getByRole("alert")).toContainText(
      "Choose at least one destination",
    );
    await page.getByLabel("Rwanda", { exact: true }).focus();
    await page.keyboard.press("Space");
    await page
      .getByLabel("What would you love to discover? (optional)")
      .fill("Quiet days by Lake Kivu");
    await form.getByRole("button", { name: "Next", exact: true }).click();
    await expect(
      page.getByRole("heading", { name: "Make the journey your own." }),
    ).toBeFocused();
    await page.getByLabel("My dates are flexible").uncheck();
    await page.getByLabel("Adults (required)").fill("0");
    await form.getByRole("button", { name: "Next", exact: true }).click();
    await expect(form.getByRole("alert")).toContainText("At least one adult");
    await page.getByLabel("Adults (required)").fill("3");
    await page.getByLabel("Children", { exact: true }).fill("2");
    await page.getByLabel("Departure date (required)").fill(future(40));
    await page.getByLabel("Return date (required)").fill(future(30));
    await form.getByRole("button", { name: "Next", exact: true }).click();
    await expect(form.getByRole("alert")).toContainText(
      "Return must be on or after",
    );
    await page.getByLabel("Return date (required)").fill(future(47));
    await page.getByLabel("Accommodation preference").selectOption("family");
    await page
      .getByLabel("Approximate total trip budget (optional)")
      .fill("12000");
    await page.getByLabel("Currency", { exact: true }).selectOption("EUR");
    await expect(page.getByLabel("Return date (required)")).toHaveAttribute(
      "aria-invalid",
      "false",
    );
    await expect(form).toContainText(
      "Accommodation included on all tours longer than one day",
    );
    if (width === 360 || width === 1440) {
      await axe(page);
      await page.evaluate(() => {
        (document.activeElement as HTMLElement)?.blur();
        window.scrollTo(0, 0);
      });
      await page.screenshot({
        path: testInfo.outputPath("quote-step-2.png"),
        fullPage: true,
      });
    }
    await form.getByRole("button", { name: "Next", exact: true }).click();
    await expect(
      page.getByRole("heading", { name: "A few details about you." }),
    ).toBeFocused();
    await page.getByLabel("Full name (required)").fill("Example Traveler");
    await page
      .getByLabel("Email address (required)")
      .fill("traveler@example.com");
    await page.getByLabel("Country of residence (required)").fill("Rwanda");
    await page.getByLabel("Preferred contact method").selectOption("whatsapp");
    await form.getByRole("button", { name: "Check my details" }).click();
    await expect(form.getByRole("alert")).toContainText(
      "phone number is required",
    );
    await page.getByLabel("Phone number (required)").fill("+250 700 123 456");
    await page.getByLabel("I consent to AMAJO").check();
    await page
      .getByLabel("Additional notes (optional)")
      .fill("A relaxed pace, please.");
    await form.getByRole("button", { name: "Back", exact: true }).click();
    await expect(page.getByLabel("Adults (required)")).toHaveValue("3");
    await expect(page.getByLabel("Accommodation preference")).toHaveValue(
      "family",
    );
    await expect(page.getByLabel("Currency", { exact: true })).toHaveValue(
      "EUR",
    );
    await form.getByRole("button", { name: "Back", exact: true }).click();
    await expect(page.getByLabel("Rwanda", { exact: true })).toBeChecked();
    await expect(
      page.getByLabel("What would you love to discover? (optional)"),
    ).toHaveValue("Quiet days by Lake Kivu");
    await form.getByRole("button", { name: "Next", exact: true }).click();
    await form.getByRole("button", { name: "Next", exact: true }).click();
    await expect(page.getByLabel("Full name (required)")).toHaveValue(
      "Example Traveler",
    );
    await expect(page.getByLabel("Additional notes (optional)")).toHaveValue(
      "A relaxed pace, please.",
    );
    await form.getByRole("button", { name: "Check my details" }).click();
    await expect(form.getByRole("status")).toContainText(
      "Nothing has been sent or saved",
    );
    await expect(
      form.getByRole("button", { name: "Send quote request" }),
    ).toBeDisabled();
    await noOverflow(page);
    if (width === 360 || width === 1440) {
      await axe(page);
      await page.evaluate(() => {
        (document.activeElement as HTMLElement)?.blur();
        window.scrollTo(0, 0);
      });
      await page.screenshot({
        path: testInfo.outputPath("quote-step-3.png"),
        fullPage: true,
      });
    }
    expect(posts).toEqual([]);
    await page.reload();
    await expect(page.getByLabel("Rwanda", { exact: true })).not.toBeChecked();
  });

test("all tour prefills and country-owned place context are validated", async ({
  page,
}) => {
  test.setTimeout(90_000);
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
    await page.goto(`/request-a-quote?tour=${slug}`);
    await expect(page.getByLabel("Journey inspiration (optional)")).toHaveValue(
      slug,
    );
    await expect(
      page.getByRole("complementary", { name: "Your travel summary" }),
    ).toContainText("Accommodation included");
  }
  await page.goto("/request-a-quote?tour=east-africa-slow-journey");
  for (const name of ["Rwanda", "Uganda", "Kenya"])
    await expect(page.getByLabel(name, { exact: true })).toBeChecked();
  await page
    .getByLabel("Journey inspiration (optional)")
    .selectOption("jinja-river-days");
  await expect(page.getByLabel("Rwanda", { exact: true })).not.toBeChecked();
  await expect(page.getByLabel("Uganda", { exact: true })).toBeChecked();
  await page.goto("/request-a-quote?country=rwanda&attraction=lake-kivu");
  await expect(
    page.getByLabel("What would you love to discover? (optional)"),
  ).toHaveValue("Interested in Lake Kivu.");
  for (const query of [
    "tour=unknown",
    "tour=jinja-river-days&tour=kenya-wild-horizons",
    "service=unknown",
    "country=unknown",
    "country=kenya&attraction=bwindi",
    "attraction=bwindi",
    "tour=unknown&country=rwanda",
  ]) {
    await page.goto(`/request-a-quote?${query}`);
    await expect(page.locator("main").getByRole("alert")).toContainText(
      "not recognized",
    );
    await expect(page.getByLabel("Journey inspiration (optional)")).toHaveValue(
      "",
    );
    await expect(page.getByLabel("Rwanda", { exact: true })).not.toBeChecked();
  }
});

test("confirmation cannot be forged and policy drafts cannot look approved", async ({
  page,
  request,
}) => {
  await page.goto(
    "/request-a-quote/confirmation?success=true&reference=FAKE-123&email=forged@example.com",
  );
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "No submitted inquiry to confirm.",
  );
  await expect(page.locator("main")).not.toContainText("FAKE-123");
  await expect(page.locator("main")).not.toContainText("forged@example.com");
  for (const path of ["/privacy", "/terms", "/permit-policy"]) {
    const response = await request.get(path);
    expect(response.status()).toBe(200);
    const html = await response.text();
    expect(html).toContain("Draft · Awaiting business review");
    expect(html).toContain('content="noindex, nofollow"');
  }
});

test("without JavaScript inquiry forms cannot accidentally transmit entered data", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    baseURL,
  });
  const page = await context.newPage();
  for (const route of ["/contact", "/request-a-quote"]) {
    await page.goto(route);
    await expect(page.locator("form")).toContainText("Enable JavaScript");
    await expect(page.locator("form input").first()).toBeDisabled();
    await expect(
      page.locator('form button[type="submit"]').first(),
    ).toBeDisabled();
  }
  await context.close();
});
