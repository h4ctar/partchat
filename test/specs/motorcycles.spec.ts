import { expect, test } from "@playwright/test";
import slugify from "slugify";
import { login } from "./util";

test.describe("Motorcycles", () => {
    test("Add, edit and delete motorcycles", async ({ page }) => {
        const motorcycleMake = `Make ${Math.round(Math.random() * 100)}`;
        const motorcycleModel = `Model ${Math.round(Math.random() * 100)}`;
        const motorcycleModel2 = `Model ${Math.round(Math.random() * 100)}`;
        const motorcycleId = slugify(`${motorcycleMake} ${motorcycleModel}`, {
            lower: true,
        });

        await login(page);
        await page.goto("/motorcycles");

        // Add motorcycle
        await page.getByRole("link", { name: "Add motorcycle" }).click();
        await page.waitForURL("/motorcycles/new");

        await page.getByLabel("Make").fill(motorcycleMake);
        await page.getByLabel("Model").fill(motorcycleModel);
        await page.getByLabel("Year from").fill("1900");
        await page.getByLabel("Year to").fill("2000");
        await page.getByLabel("Engine Type").fill("4 Cylinder");
        await page.getByLabel("Displacementccm").fill("1000");
        await page.getByLabel("Valves per cylinder").fill("4");
        await page.getByLabel("PowerkW").fill("100");
        await page.getByLabel("Compression:1").fill("10");
        await page.getByLabel("Top Speedkm/h").fill("200");
        await page.getByLabel("Weightkg").fill("200");

        await page.getByRole("button", { name: "Add motorcycle" }).click();
        await page.waitForURL(`/motorcycles/${motorcycleId}`);

        await expect(
            page.getByRole("heading", {
                name: `${motorcycleMake} ${motorcycleModel}`,
            }),
        ).toBeVisible();

        // Edit motorcycle
        await page.getByRole("link", { name: "edit" }).click();
        await page.waitForURL(`/motorcycles/${motorcycleId}/edit`);
        await expect(page.getByLabel("Make")).toHaveValue(motorcycleMake);
        await expect(page.getByLabel("Model")).toHaveValue(motorcycleModel);
        await page.getByLabel("Model").fill(motorcycleModel2);
        await page.getByRole("button", { name: "Update motorcycle" }).click();
        await page.waitForURL(`/motorcycles/${motorcycleId}`);

        await expect(
            page.getByRole("heading", {
                name: `${motorcycleMake} ${motorcycleModel2}`,
            }),
        ).toBeVisible();

        // Delete motorcycle
        page.on("dialog", (dialog) => dialog.accept());
        await page.getByRole("button", { name: "delete" }).click();

        await page.waitForURL("/motorcycles");

        // Clean up
        await page.close();
    });

    test.describe("Comments", () => {
        test("Create, edit and delete motorcycle comments", async ({
            page,
        }) => {
            const commentText = `Comment ${Math.round(Math.random() * 100)}`;

            await login(page);
            await page.goto("/motorcycles/yamaha-xj650lj-1982-1984");

            // Post comment
            await page.getByRole("textbox").fill(commentText);
            await page.getByText("Post comment").click();

            await expect(
                page.getByRole("listitem").first().getByRole("paragraph"),
            ).toHaveText(commentText);

            // Edit comment

            // Delete comment
            page.on("dialog", (dialog) => dialog.accept());
            await page
                .getByRole("listitem")
                .filter({
                    hasText: commentText,
                })
                .getByRole("button", { name: "delete" })
                .click();

            await expect(
                page.getByRole("listitem").filter({ hasText: commentText }),
            ).toBeHidden();

            // Clean up
            await page.close();
        });
    });
});
