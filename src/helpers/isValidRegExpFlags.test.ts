import { isValidRegExpFlags } from "./isValidRegExpFlags";

describe("isValidRegExpFlags.ts", () => {
  describe("If flags are valid.", () => {
    const flags = "gi";

    test("It must return true since the entered flags are valid.", () => {
      const validFlags = isValidRegExpFlags(flags);

      expect(validFlags).toBeTruthy();
    });
  });

  describe("If flags are not valid.", () => {
    const flags = "xyz";

    test("It must return false since the entered flags are not valid.", () => {
      const validFlags = isValidRegExpFlags(flags);

      expect(validFlags).toBeFalsy();
    });
  });
});
