import { BitBucketApi } from "./utils/api";
import { getInputArguments } from "./utils/config";
import { processPackageJson } from "./utils/parse";

// Hardcoded it because we only change package json
const destFile = "package.json";
// Hardcoded because we will use main branch at the moment
const srcBranch = "main";

async function main() {
  try {
    // Get all command line arguments
    const { packageWithVersion, pathToPackageJson, repo, branch, title } =
      await getInputArguments();

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

main();
