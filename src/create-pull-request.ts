import { BitBucketApi } from "./utils/api";
import { processPackageJson } from "./utils/parse";

// Hardcoded it because we only change package json
const destFile = "package.json";
// Hardcoded because we will use main branch at the moment
const srcBranch = "main";

async function main() {
  try {
    // Get all command line arguments
    const [, , packageWithVersion, pathToPackageJson, repo, branch, title] =
      process.argv;
    // Create api instance
    const api = new BitBucketApi(repo);
    // Read original package.json file
    const packageJsonStr = await api.readFile(srcBranch, pathToPackageJson);
    // Update package json with new package version
    const fileContent = Buffer.from(
      processPackageJson(packageJsonStr, packageWithVersion),
      "utf-8"
    );
    // Create new branch with updated package json
    await api.createCommitFromFile(branch, fileContent, destFile);
    // Create pull request
    const res = await api.createPullRequest(branch, title);
    // Print result
    console.log("Success", res);
  } catch (err) {
    console.error(err);
  }
}

main();
