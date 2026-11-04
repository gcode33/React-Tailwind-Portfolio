import { execSync, spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync } from "node:fs";

const TESTS_FILE = ".build-info/tests.json";
const LIGHTHOUSE_FILE = "lighthouse-score.json";

const readJson = (path) => {
  try {
    return existsSync(path) ? JSON.parse(readFileSync(path, "utf8")) : null;
  } catch {
    return null;
  }
};

// Only a clean run earns a number on the site. A count from a failing run would be a boast.
export const passingTests = (summary) =>
  summary?.success === true && summary.numPassedTests > 0 ? summary.numPassedTests : null;

export const commitHash = (env = process.env) => {
  if (env.VERCEL_GIT_COMMIT_SHA) return env.VERCEL_GIT_COMMIT_SHA;
  try {
    return execSync("git rev-parse HEAD", { stdio: ["ignore", "pipe", "ignore"] }).toString().trim();
  } catch {
    return null;
  }
};

// What the footer's build strip shows. Anything unknown stays null and is left off the page.
export const readBuildInfo = () => ({
  commit: commitHash(),
  tests: passingTests(readJson(TESTS_FILE)),
  lighthouse: readJson(LIGHTHOUSE_FILE)?.performance ?? null,
});

// Runs before each build. Failing tests don't stop a deploy, they just remove the number.
if (process.argv[1]?.endsWith("build-info.mjs")) {
  mkdirSync(".build-info", { recursive: true });
  spawnSync("npx", ["vitest", "run", "--reporter=json", `--outputFile=${TESTS_FILE}`], { stdio: "ignore" });
  console.log("build info:", readBuildInfo());
}
