import { createPullRequest } from "../create-pull-request";
import { CreatePullRequestOptions } from "../utils/types";

const sampleJson = JSON.stringify({
  dependencies: {
    package: "0.0.0",
  },
});
const srcBranch = "main";
const destFile = "package1.json";
const title = "Test";
const branch = "test";
const packageProcessorResult = "test-res";
const pathToPackageJson = "package2.json";

const readFileMock = jest.fn().mockResolvedValue(sampleJson);
const createPullRequestMock = jest.fn();
const createCommitFromFileMock = jest.fn();
const packageProcessor = jest.fn().mockReturnValue(packageProcessorResult);

const options: CreatePullRequestOptions = {
  packageWithVersion: "package@0.0.1",
  pathToPackageJson: pathToPackageJson,
  repo: "http://bitbucket.com",
  branch: branch,
  title: title,
  destFile: destFile,
  srcBranch: srcBranch,
};

describe("createPullRequest", () => {
  test("pass correct data passes the flow", async () => {
    await createPullRequest(
      {
        readFile: readFileMock,
        createPullRequest: createPullRequestMock,
        createCommitFromFile: createCommitFromFileMock,
      },
      options,
      packageProcessor
    );

    expect(readFileMock).toHaveBeenCalledWith(srcBranch, pathToPackageJson);
    expect(createCommitFromFileMock).toHaveBeenCalledWith(
      branch,
      packageProcessorResult,
      destFile
    );
    expect(createPullRequestMock).toHaveBeenCalledWith(branch, title);
  });
});
