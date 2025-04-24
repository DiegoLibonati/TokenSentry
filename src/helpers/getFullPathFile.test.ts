import path from "path";

import { getFullPathFile } from "./getFullPathFile";

describe("getFullPathFile.ts", () => {
  describe("General Tests.", () => {
    const directory = "./src/1";
    const filename = "file.jpg";

    test("It must return the complete directory through a directory and file name.", () => {
      const fullPath = getFullPathFile(directory, filename);

      expect(fullPath).toEqual(path.join(directory, filename));
    });
  });
});
