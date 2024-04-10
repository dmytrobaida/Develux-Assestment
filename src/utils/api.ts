import { getAuthToken } from "./config";
import { ScmApi } from "./types";

export class BitBucketApi implements ScmApi {
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
    file: string,
    destinationFile: string
  ): Promise<[number, string, string]> {
    try {
      const formData = new FormData();
      const fileContent = Buffer.from(file, "utf-8");

      formData.append(destinationFile, new Blob([fileContent]));
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
      if (err instanceof Error) {
        throw new Error(err.toString());
      }

      throw new Error("Something went wrong!");
    }
  }

  async createPullRequest(
    branch: string,
    title: string
  ): Promise<[number, string, string]> {
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
      if (err instanceof Error) {
        throw new Error(err.toString());
      }

      throw new Error("Something went wrong!");
    }
  }

  async readFile(branch: string, path: string): Promise<string> {
    try {
      const res = await fetch(`${this.repo}/src/${branch}/${path}`, {
        headers: {
          Authorization: getAuthToken(),
        },
      });

      return await res.text();
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.toString());
      }

      throw new Error("Something went wrong!");
    }
  }
}
