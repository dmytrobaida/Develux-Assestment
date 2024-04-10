function parsePackageWithVersion(packageWithVersion) {
  return packageWithVersion.split("@");
}

module.exports = {
  parsePackageWithVersion,
};
