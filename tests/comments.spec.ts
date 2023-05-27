import { test, expect } from "@playwright/test";

test.describe("Comments", () => {
    test("post comment", async ({ page }) => {
        await page.goto("/");
        await page.getByText("Log in").click();

        await page
            .getByLabel("Username or email address")
            .fill(process.env.TEST_USERNAME!);
        await page.getByLabel("Password").fill(process.env.TEST_PASSWORD!);
        await page
            .getByRole("button", { name: "Continue", exact: true })
            .click();
        await page.waitForURL("/");

        await page.goto("/motorcycles/yamaha-xj650lj-1982-1984");

        const commentText = `Test comment ${Math.random()}`;
        await page.getByRole("textbox").fill(commentText);
        await page.getByText("Post comment").click();

        await expect(page.getByRole("paragraph")).toHaveText(commentText);
    });
});
