import { input } from "@inquirer/prompts";
import { BitBucketApi } from "./utils/api";
import { processPackageJson } from "./utils/parse";

// Hardcoded it because we only change package json
const destFile = "package.json";
// Hardcoded because we will use main branch at the moment
const srcBranch = "main";

async function main() {
  try {
    // Get all command line arguments
    const { packageWithVersion, pathToPackageJson, repo, branch, title } =
      await getArguments();
    // Create api instance
    const api = new BitBucketApi(repo);
    // Read original package.json file
    console.log("Reading original package.json...");
    const packageJsonStr = await api.readFile(srcBranch, pathToPackageJson);
    // Update package json with new package version
    console.log("Updating package.json with new package version...");
    const fileContent = Buffer.from(
      processPackageJson(packageJsonStr, packageWithVersion),
      "utf-8"
    );
    // Create new branch with updated package json
    console.log("Creating new branch and commit with new changes...");
    await api.createCommitFromFile(branch, fileContent, destFile);
    // Create pull request
    console.log("Creating pull request...");
    await api.createPullRequest(branch, title);
    // Print result
    console.log("Success!");
  } catch (err) {
    console.error(err);
  }
}

async function getArguments() {
  return {
    packageWithVersion: await input({
      message: "Enter package with version you want to update",
      default: "package@1.0.0",
    }),
    pathToPackageJson: await input({
      message: "Enter path to package.json in repo",
      default: "package.json",
    }),
    repo: await input({
      message: "Enter BitBucket repository url",
      default:
        "https://api.bitbucket.org/2.0/repositories/mstbilln2024/develuxassestment",
    }),
    branch: await input({
      message: "Enter branch which will be used to create pull request",
      default: "bump-packages",
    }),
    title: await input({
      message: "Enter pull request title",
      default: "Automated Pull Request",
    }),
  };
}

main();
