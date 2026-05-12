import { expect, test } from "@playwright/test"

test("web loads and shows API health", async ({ page }) => {
  await page.goto("/")
  await expect(page.getByRole("heading", { name: "TypeScript Effect Starter" })).toBeVisible()
  await expect(page.locator("#health-status")).toContainText("API healthy")
})
