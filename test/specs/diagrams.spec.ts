import { expect, test } from "@playwright/test";
import slugify from "slugify";
import { login } from "./util";

test.describe("Diagrams", () => {
    test("Add, edit and delete diagrams", async ({ page }) => {
        const motorcycleId = "yamaha-xj650lj-1982-1984";
        const diagramName = `Diagram ${Math.round(Math.random() * 100)}`;
        const diagramName2 = `Diagram ${Math.round(Math.random() * 100)}`;
        const diagramId = slugify(`${motorcycleId} ${diagramName}`, {
            lower: true,
        });

        await login(page);
        await page.goto(`/motorcycles/${motorcycleId}`);

        // Add diagram
        await page.getByRole("link", { name: "Add diagram" }).click();
        await page.waitForURL(`/motorcycles/${motorcycleId}/diagrams/new`);

        await page.getByLabel("Name").fill(diagramName);

        await page.getByRole("button", { name: "Add diagram" }).click();
        await page.waitForURL(
            `/motorcycles/${motorcycleId}/diagrams/${diagramId}`,
        );

        await expect(
            page.getByRole("heading", {
                name: diagramName,
            }),
        ).toBeVisible();

        // Edit diagram
        await page.getByRole("link", { name: "edit" }).click();
        await page.waitForURL(
            `/motorcycles/${motorcycleId}/diagrams/${diagramId}/edit`,
        );
        await expect(page.getByLabel("Name")).toHaveValue(diagramName);
        await page.getByLabel("Name").fill(diagramName2);
        await page.getByRole("button", { name: "Update diagram" }).click();
        await page.waitForURL(
            `/motorcycles/${motorcycleId}/diagrams/${diagramId}`,
        );

        await expect(
            page.getByRole("heading", {
                name: diagramName2,
            }),
        ).toBeVisible();

        // Delete diagram
        page.on("dialog", (dialog) => dialog.accept());
        await page.getByRole("button", { name: "delete" }).click();

        await page.waitForURL(`/motorcycles/${motorcycleId}`);

        // Clean up
        await page.close();
    });

    test.describe("Comments", () => {
        test("Create, edit and delete diagram comments", async ({ page }) => {
            const commentText = `Comment ${Math.round(Math.random() * 100)}`;

            await login(page);
            await page.goto(
                "/motorcycles/yamaha-xj650lj-1982-1984/diagrams/yamaha-xj650lj-1982-1984-camshaft-chain",
            );

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
