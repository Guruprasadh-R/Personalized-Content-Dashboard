import { test, expect } from "@playwright/test";

test.describe("Personalized Content Dashboard E2E", () => {
  test("should load home page and navigate to sidebar links", async ({ page }) => {
    // 1. Go to the dashboard root home page
    await page.goto("http://localhost:3000");

    // 2. Expect the main heading to be visible
    const homeHeader = page.locator("h1", { hasText: "Personalized Dashboard" });
    await expect(homeHeader).toBeVisible();

    // 3. Click on the Favorites sidebar nav link
    const favoritesLink = page.locator("aside nav a", { hasText: "Favorites" });
    await expect(favoritesLink).toBeVisible();
    await favoritesLink.click();

    // 4. Verify we navigated to the Favorites page
    await expect(page).toHaveURL(/.*favorites/);
    const favoritesHeader = page.locator("h1", { hasText: "My Favorites" });
    await expect(favoritesHeader).toBeVisible();

    // 5. Click on the Settings sidebar nav link
    const settingsLink = page.locator("aside nav a", { hasText: "Settings" });
    await expect(settingsLink).toBeVisible();
    await settingsLink.click();

    // 6. Verify we navigated to the Settings page
    await expect(page).toHaveURL(/.*settings/);
    const settingsHeader = page.locator("h1", { hasText: "Preferences & Settings" });
    await expect(settingsHeader).toBeVisible();
  });
});
