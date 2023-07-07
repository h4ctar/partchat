import { test, expect, Page } from "@playwright/test";

test("Post, edit and delete comments", async ({ page }) => {
    const commentText = `Test comment ${Math.round(Math.random() * 100)}`;

    // Setup
    await page.goto("/");
    await page.getByText("Log in").click();

    await page
        .getByLabel("Username or email address")
        .fill(process.env.TEST_USERNAME!);
    await page.getByLabel("Password").fill(process.env.TEST_PASSWORD!);
    await page.getByRole("button", { name: "Continue", exact: true }).click();
    await page.waitForURL("/");

    await page.goto("/motorcycles/yamaha-xj650lj-1982-1984");

    // Post comment
    await page.getByRole("textbox").fill(commentText);
    await page.getByText("Post comment").click();

    await expect(
        page.getByRole("listitem").first().getByRole("paragraph"),
    ).toHaveText(commentText);

    // Edit comment

    // Delete comment
    await page
        .getByRole("listitem")
        .filter({
            hasText: commentText,
        })
        .locator('button[name="delete"]')
        // TODO: why doesnt this work? .getByRole("button", { name: "delete" })
        .click();

    await expect(
        page.getByRole("listitem").filter({ hasText: commentText }),
    ).toBeHidden();

    // Clean up
    await page.close();
});
