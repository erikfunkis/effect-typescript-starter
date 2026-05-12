import { expect, test } from "@playwright/test"

test("web loads and supports todo CRUD", async ({ page }) => {
  await page.goto("/")
  await expect(page.getByRole("heading", { name: "TypeScript Effect TODO Starter" })).toBeVisible()
  await expect(page.locator("#health-status")).toContainText("API healthy")

  const input = page.getByLabel("New todo title")
  await input.fill("Ship TODO RPC")
  await page.getByRole("button", { name: "Add" }).click()

  const item = page.getByText("Ship TODO RPC")
  await expect(item).toBeVisible()

  await page.getByLabel("Toggle Ship TODO RPC").check()
  await expect(item).toHaveCSS("text-decoration-line", "line-through")

  await page.getByRole("button", { name: "Delete" }).first().click()
  await expect(item).not.toBeVisible()
})
