import path from "path";

import { getDirectoriesNameByPath } from "@src/helpers/getDirectoriesNameByPath";

describe("getDirectoriesNameByPath.ts", () => {
  describe("General Tests.", () => {
    const folderPath = path.resolve(__dirname, "..");

    test("It should return the name of the folders in a directory.", () => {
      const nameFolders = getDirectoriesNameByPath(folderPath);

      expect(nameFolders.length > 0).toBeTruthy();
      expect(nameFolders.includes("entities")).toBeTruthy();
    });
  });
});
