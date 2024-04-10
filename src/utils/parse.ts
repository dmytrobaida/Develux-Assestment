export function parsePackageWithVersion(packageWithVersion: string) {
  if (packageWithVersion == null || packageWithVersion.trim() === "") {
    throw new Error("You should provide not empty value!");
  }

  return packageWithVersion.split("@");
}

export function processPackageJson(
  packageJsonStr: string,
  packageWithVersion: string
) {
  const [packageName, packageVersion] =
    parsePackageWithVersion(packageWithVersion);
  const packageJson = JSON.parse(packageJsonStr);

  if (packageJson.dependencies == null) {
    packageJson.dependencies = {};
  }

  // Update package version
  packageJson.dependencies[packageName] = packageVersion;

  return JSON.stringify(packageJson, null, 2);
}
