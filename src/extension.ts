import * as vscode from "vscode";

import { registerAliveCommand } from "@src/commands/aliveCommand";
import { registerCheckFilesCommand } from "@src/commands/checkFilesCommand";

export function activate(context: vscode.ExtensionContext) {
  console.log("Congratulations, your “tokensentry” extension is now active.");

  context.subscriptions.push(registerAliveCommand());
  context.subscriptions.push(registerCheckFilesCommand());
}

export function deactivate() {}
