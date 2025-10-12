import * as fs from "fs";
import * as vscode from "vscode";
import simpleGit from "simple-git";

import { loadPatterns } from "@src/helpers/loadPatterns";
import { getDirectoriesNameByPath } from "@src/helpers/getDirectoriesNameByPath";
import { getFullPathFile } from "@src/helpers/getFullPathFile";

import { GIT_FOLDER_NAME } from "@src/constants/vars";

export const registerCheckFilesCommand = () => {
  return vscode.commands.registerCommand("tokensentry.checkFiles", async () => {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    const patterns = loadPatterns();

    if (workspaceFolders?.length === 0) {
      return vscode.window.showErrorMessage(
        "You are not standing on any folder."
      );
    }

    const currentDir = workspaceFolders![0].uri.fsPath;

    const nameDirs = getDirectoriesNameByPath(currentDir);

    if (!nameDirs.includes(GIT_FOLDER_NAME)) {
      return vscode.window.showErrorMessage(
        "Git is not initialized in this folder."
      );
    }

    vscode.window.showInformationMessage("Checking for tokens...");

    const git = simpleGit({ baseDir: currentDir });

    const files = await git.diff(["--cached", "--name-only"]);
    const filenames = files.split("\n").filter((f) => f);

    if (filenames.length === 0) {
      return vscode.window.showErrorMessage(
        "There are no files added to commit."
      );
    }

    for (const filename of filenames) {
      const filePath = getFullPathFile(currentDir, filename);
      const content = fs.readFileSync(filePath, "utf8");

      for (const [patterName, pattern] of Object.entries(patterns)) {
        if (pattern.test(content)) {
          vscode.window.showWarningMessage(
            `Potential token detected in ${filename} with pattern: ${patterName}.`
          );
          break;
        }
      }
    }

    vscode.window.showInformationMessage("Analysis successfully completed.");
  });
};
