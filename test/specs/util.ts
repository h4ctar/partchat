import { Page } from "@playwright/test";

export const login = async (page: Page) => {
    await page.goto("/");
    await page.getByText("Log in").click();

    await page.getByLabel("Username or email").fill(process.env.TEST_USERNAME!);
    await page.getByLabel("Password").fill(process.env.TEST_PASSWORD!);
    await page.getByRole("button", { name: "Sign In" }).click();
    await page.waitForURL("/");
};
