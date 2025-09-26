import { workspace } from "vscode";

import { loadPatterns } from "@src/helpers/loadPatterns";

jest.mock("vscode");

describe("loadPatterns.ts", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("If default and custom patterns exist", () => {
    test("It must merge them and return RegExp objects", () => {
      (workspace.getConfiguration as jest.Mock).mockReturnValue({
        get: (key: string) => {
          if (key === "defaultPatterns") {
            return {
              GitHub: { pattern: "ghp_[A-Za-z0-9]{36}", flags: "g" },
            };
          }
          if (key === "customPatterns") {
            return {
              MyToken: { pattern: "my_[0-9]+", flags: "i" },
            };
          }
          return {};
        },
      });

      const regexPatterns = loadPatterns();

      expect(regexPatterns.GitHub).toBeInstanceOf(RegExp);
      expect(regexPatterns.MyToken).toBeInstanceOf(RegExp);
      expect("ghp_123456789012345678901234567890123456").toMatch(regexPatterns.GitHub);
      expect("MY_123").toMatch(regexPatterns.MyToken);
    });
  });

  describe("If flags are invalid", () => {
    test("It must ignore flags and build RegExp without them", () => {
      (workspace.getConfiguration as jest.Mock).mockReturnValue({
        get: () => ({
          InvalidToken: { pattern: "abc", flags: "zzz" },
        }),
      });

      const regexPatterns = loadPatterns();

      expect(regexPatterns.InvalidToken).toBeInstanceOf(RegExp);
      expect(regexPatterns.InvalidToken.flags).toBe("");
    });
  });
});
