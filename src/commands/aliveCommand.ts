import * as vscode from "vscode";

const aliveCommand = () => {
  vscode.window.showInformationMessage("Hello world from TokenSentry.");
};

export const registerAliveCommand = () => {
  return vscode.commands.registerCommand("tokensentry.alive", aliveCommand);
};
