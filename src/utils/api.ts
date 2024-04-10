import { getAuthToken } from "./config";

export class BitBucketApi {
  private repo: string;
  private commitCreator: string;
  private commitMessageBase: string;

  constructor(repo: string) {
    this.repo = repo;
    this.commitCreator = "Automated System <auto@develux.com>";
    this.commitMessageBase = "Automated commit";
  }

  async createCommitFromFile(
    branch: string,
    file: Buffer,
    destinationFile: string
  ) {
    try {
      const formData = new FormData();
      formData.append(destinationFile, new Blob([file]));
      formData.append("branch", branch);
      formData.append("author", this.commitCreator);
      formData.append(
        "message",
        `${this.commitMessageBase} ${new Date().toISOString()}`
      );

      const res = await fetch(`${this.repo}/src`, {
        method: "POST",
        headers: {
          Authorization: getAuthToken(),
        },
        body: formData,
      });

      return [res.status, res.statusText, await res.text()];
    } catch (err) {
      throw new Error(err.toString());
    }
  }

  async createPullRequest(branch: string, title: string) {
    try {
      const data = {
        title: title,
        source: {
          branch: {
            name: branch,
          },
        },
      };
      const res = await fetch(`${this.repo}/pullrequests`, {
        method: "POST",
        headers: {
          Authorization: getAuthToken(),
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      return [res.status, res.statusText, await res.text()];
    } catch (err) {
      throw new Error(err.toString());
    }
  }

  async readFile(branch: string, path: string) {
    try {
      const res = await fetch(`${this.repo}/src/${branch}/${path}`, {
        headers: {
          Authorization: getAuthToken(),
        },
      });

      return await res.text();
    } catch (err) {
      throw new Error(err.toString());
    }
  }
}
