import { z } from "zod";
import { input } from "@inquirer/prompts";

export function getAuthToken() {
  const env = getEnvVariables();
  const username = env.BITBUCKET_USERNAME;
  const appPassword = env.BITBUCKET_APP_PASSWORD;

  return `Basic ${btoa(`${username}:${appPassword}`)}`;
}

export function getEnvVariables() {
  const envSchema = z.object({
    BITBUCKET_USERNAME: z.string().min(1),
    BITBUCKET_APP_PASSWORD: z.string().min(1),
  });

  return envSchema.parse(process.env);
}

export async function getInputArguments() {
  return {
    packageWithVersion: await input({
      message: "Enter package with version you want to update",
      default: "package@1.0.0",
      validate: (value) => {
        return z
          .string()
          .regex(/([^@]+)@([^@]+)/)
          .safeParse(value).success;
      },
    }),
    pathToPackageJson: await input({
      message: "Enter path to package.json in repo",
      default: "package.json",
      validate: (value) => {
        return z.string().trim().min(1).safeParse(value).success;
      },
    }),
    repo: await input({
      message: "Enter BitBucket repository url",
      default:
        "https://api.bitbucket.org/2.0/repositories/mstbilln2024/develuxassestment",
      validate: (value) => {
        return z.string().url().safeParse(value).success;
      },
    }),
    branch: await input({
      message: "Enter branch which will be used to create pull request",
      default: "bump-packages",
      validate: (value) => {
        return z.string().trim().min(1).safeParse(value).success;
      },
    }),
    title: await input({
      message: "Enter pull request title",
      default: "Automated Pull Request",
      validate: (value) => {
        return z.string().trim().min(1).safeParse(value).success;
      },
    }),
  };
}
