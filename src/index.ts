import { createPullRequest } from "./create-pull-request";
import { BitBucketApi } from "./utils/api";
import { getInputArguments } from "./utils/config";
import { processPackageJson } from "./utils/parse";

async function main() {
  try {
    // Get all command line arguments
    const options = await getInputArguments();

    // Create api instance
    const api = new BitBucketApi(options.repo);

    // Create pull request
    await createPullRequest(api, options, processPackageJson);
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.toString());
    }
  }
}

main();
