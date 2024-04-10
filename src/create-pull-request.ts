import {
  CreatePullRequestOptions,
  PackageProcessor,
  ScmApi,
} from "./utils/types";

export async function createPullRequest(
  api: ScmApi,
  options: CreatePullRequestOptions,
  packageProcessor: PackageProcessor
) {
  try {
    // Get all command line arguments
    const {
      packageWithVersion,
      pathToPackageJson,
      branch,
      title,
      srcBranch,
      destFile,
    } = options;

    // Read original package.json file
    console.log("Reading original package.json...");
    const packageJsonStr = await api.readFile(srcBranch, pathToPackageJson);

    // Update package json with new package version
    console.log("Updating package.json with new package version...");
    const fileContent = packageProcessor(packageJsonStr, packageWithVersion);

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
