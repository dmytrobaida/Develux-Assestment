export function getAuthToken() {
  const username = process.env.BITBUCKET_USERNAME;
  const appPassword = process.env.BITBUCKET_APP_PASSWORD;
  return `Basic ${btoa(`${username}:${appPassword}`)}`;
}
