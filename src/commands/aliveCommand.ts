import * as vscode from "vscode";

export const registerAliveCommand = () => {
  return vscode.commands.registerCommand("tokensentry.alive", () => {
    vscode.window.showInformationMessage("Hello world from TokenSentry.");
  });
};
