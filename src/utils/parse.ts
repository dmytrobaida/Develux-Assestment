export function processPackageJson(
  packageJsonStr: string,
  packageWithVersion: string
) {
  if (packageWithVersion == null || packageWithVersion.trim() === "") {
    throw new Error("You should provide not empty value!");
  }

  const keysToLook = ["dependencies", "devDependencies", "peerDependencies"];
  const [packageName, packageVersion] = packageWithVersion.split("@");
  const packageJson = JSON.parse(packageJsonStr);

  for (const key of keysToLook) {
    if (packageJson[key] != null && packageJson[key][packageName] != null) {
      // Update package version
      packageJson.dependencies[packageName] = packageVersion;
      return JSON.stringify(packageJson, null, 2);
    }
  }

  throw new Error("There are no such packages!");
}
