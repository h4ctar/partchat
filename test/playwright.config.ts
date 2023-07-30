import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
    testDir: "specs",

    /* No not run in parallel */
    fullyParallel: false,

    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,

    /* No retries */
    retries: 0,

    /* Opt out of parallel tests. */
    workers: 1,

    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: "html",

    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
        /* Base URL to use in actions like `await page.goto('/')`. */
        baseURL: process.env.TEST_BASEURL,

        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: "on-first-retry",

        screenshot: "only-on-failure",
    },

    /* Configure projects for firefox */
    projects: [
        {
            name: "firefox",
            use: { ...devices["Desktop Firefox"] },
        },
    ],
});
