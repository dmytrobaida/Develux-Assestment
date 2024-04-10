import { z } from "zod";

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
