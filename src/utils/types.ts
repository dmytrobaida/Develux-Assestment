export interface ScmApi {
  createCommitFromFile(
    branch: string,
    file: string,
    destinationFile: string
  ): Promise<[number, string, string]>;

  createPullRequest(
    branch: string,
    title: string
  ): Promise<[number, string, string]>;

  readFile(branch: string, path: string): Promise<string>;
}

export type CreatePullRequestOptions = {
  packageWithVersion: string;
  pathToPackageJson: string;
  repo: string;
  branch: string;
  title: string;
  destFile: string;
  srcBranch: string;
};

export type PackageProcessor = (
  packageJsonStr: string,
  packageWithVersion: string
) => string;
