import { describe, expect, it } from "vitest";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const sourceRoot = path.resolve(process.cwd(), "src");

async function collectSourceFiles(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== "__tests__") {
        files.push(...(await collectSourceFiles(entryPath)));
      }
      continue;
    }

    if (/\.(ts|tsx|js|jsx)$/.test(entry.name)) {
      files.push(entryPath);
    }
  }

  return files;
}

describe("browser bookings boundary", () => {
  it("does not contain direct Data API access to public.bookings", async () => {
    const sourceFiles = await collectSourceFiles(sourceRoot);
    const directBookingsAccess = /\.from\(\s*["'`]bookings["'`]\s*\)/;
    const violations: string[] = [];

    for (const file of sourceFiles) {
      const contents = await readFile(file, "utf8");
      if (directBookingsAccess.test(contents)) {
        violations.push(path.relative(process.cwd(), file));
      }
    }

    expect(violations).toEqual([]);
  });
});
