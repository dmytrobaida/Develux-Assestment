import { createPullRequest } from "./create-pull-request";
import { BitBucketApi } from "./utils/api";
import { getInputArguments } from "./utils/config";

async function main() {
  // Get all command line arguments
  const options = await getInputArguments();

  // Create api instance
  const api = new BitBucketApi(options.repo);

  // Create pull request
  await createPullRequest(api, options);
}

main();
