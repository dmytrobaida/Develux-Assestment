import { processPackageJson } from "../parse";

const json1 = JSON.stringify({});
const json2 = JSON.stringify({ dependencies: {} });
const json3 = JSON.stringify({ dependencies: { package: "0.0.0" } });

const validPackage = "package@0.0.1";
const jsonResult = JSON.stringify(
  { dependencies: { package: "0.0.1" } },
  null,
  2
);

describe("processPackageJson", () => {
  test.each([null, "", " "])("pass empty value throws error", (input: any) => {
    expect(() => processPackageJson("", input)).toThrow(Error);
  });

  test.each([
    [json1, "pack@0.0.0"],
    [json2, "pack@0.0.0"],
    [json3, "pack@0.0.0"],
  ])(
    "package name mismatch throws error",
    (json: string, packageName: string) => {
      expect(() => processPackageJson(json, packageName)).toThrow(Error);
    }
  );

  test.each([[json3, validPackage, jsonResult]])(
    "pass valid value returns valid result",
    (json: string, pack: string, result: string) => {
      const res = processPackageJson(json, pack);
      expect(res).toEqual(result);
    }
  );
});
