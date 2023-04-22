import { test, expect } from "@playwright/test";

test.describe("Home", () => {
    test("has title", async ({ page }) => {
        await page.goto("/");

        await expect(page).toHaveTitle("Part Chat");
    });
});
