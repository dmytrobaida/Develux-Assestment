const { getAuthToken } = require("./config");

class BitBucketApi {
  constructor(repo) {
    this.repo = repo;
    this.commitCreator = "Automated System <auto@develux.com>";
    this.commitMessageBase = "Automated commit";
  }

  async readPullRequests() {
    try {
      const res = await fetch(`${this.repo}/pullrequests`, {
        method: "GET",
        headers: {
          Authorization: getAuthToken(),
          Accept: "application/json",
        },
      });

      return await res.json();
    } catch (err) {
      throw new Error("Something went wrong!");
    }
  }

  async createCommitFromFile(branch, file, destinationFile) {
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
      throw new Error("Something went wrong!");
    }
  }

  async createPullRequest(branch, title) {
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
      throw new Error("Something went wrong!");
    }
  }

  async readFile(branch, path) {
    const res = await fetch(`${this.repo}/src/${branch}/${path}`, {
      headers: {
        Authorization: getAuthToken(),
      },
    });

    return await res.text();
  }
}

module.exports = {
  BitBucketApi,
};
