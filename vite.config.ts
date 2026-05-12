import { defineConfig } from "vite-plus";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  fmt: {
    ignorePatterns: ["repos/**"],
  },
  lint: {
    ignorePatterns: ["repos/**"],
  },
  test: {
    passWithNoTests: true,
    setupFiles: [path.join(__dirname, "vitest.setup.ts")],
    exclude: [
      "**/node_modules/**",
      "repos/**",
      "tests/e2e/**",
      "**/tests/e2e/**",
    ],
  },
});
