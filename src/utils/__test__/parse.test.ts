import { parsePackageWithVersion } from "../parse";

describe("parsePackageWithVersion", () => {
  test.each([null, "", " "])("pass empty value throws error", (input: any) => {
    expect(() => parsePackageWithVersion(input)).toThrow(Error);
  });

  test.each([
    ["test@0.0.1", ["test", "0.0.1"]],
    ["package@1.0.1", ["package", "1.0.1"]],
    ["a@0.0", ["a", "0.0"]],
  ])("pass valid value returns valid result", (input, output) => {
    const res = parsePackageWithVersion(input);
    expect(res).toStrictEqual(output);
  });
});
