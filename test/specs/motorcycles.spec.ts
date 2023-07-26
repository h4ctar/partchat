import { expect, test } from "@playwright/test";
import { login } from "./util";

test.describe("Motorcycles", () => {
    test("Create, edit and delete motorcycles", async ({ page }) => {
        await login(page);
        await page.goto("/motorcycles");

        await page.getByRole("link", { name: "Add motorcycle" }).click();

        // Clean up
        await page.close();
    });

    test.describe("Comments", () => {
        test("Create, edit and delete motorcycle comments", async ({
            page,
        }) => {
            const commentText = `Test comment ${Math.round(
                Math.random() * 100,
            )}`;

            await login(page);
            await page.goto("/motorcycles/yamaha-xj650lj-1982-1984");

            // Create comment
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
    });
});
