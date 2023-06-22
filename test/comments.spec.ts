import { test, expect, Page } from "@playwright/test";

test.describe.configure({ mode: "serial" });

const commentText = `Test comment ${Math.random()}`;
let page: Page;

test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();

    await page.goto("/");
    await page.getByText("Log in").click();

    await page
        .getByLabel("Username or email address")
        .fill(process.env.TEST_USERNAME!);
    await page.getByLabel("Password").fill(process.env.TEST_PASSWORD!);
    await page.getByRole("button", { name: "Continue", exact: true }).click();
    await page.waitForURL("/");

    await page.goto("/motorcycles/yamaha-xj650lj-1982-1984");
});

test("post comment", async () => {
    await page.getByRole("textbox").fill(commentText);
    await page.getByText("Post comment").click();

    await expect(page.getByRole("listitem").first()).toHaveText(commentText);
});

test("delete comment", async () => {
    await page
        .getByRole("listitem")
        .filter({ hasText: commentText })
        .getByRole("button", { name: "delete" })
        .click();

    await expect(
        page.getByRole("listitem").filter({ hasText: commentText }),
    ).toBeHidden();
});

test.afterAll(async () => {
    await page.close();
});
