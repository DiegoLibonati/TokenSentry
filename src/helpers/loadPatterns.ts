import * as vscode from "vscode";

import { CustomPatterns, DefaultPatterns } from "../entities/configuration";
import { RegexPatterns } from "../entities/extension";

import { isValidRegExpFlags } from "./isValidRegExpFlags";

export const loadPatterns = (): RegexPatterns => {
  const config = vscode.workspace.getConfiguration("tokenSentry");
  const defaultPatterns = config.get<DefaultPatterns>("defaultPatterns") || {};
  const customPatterns = config.get<CustomPatterns>("customPatterns") || {};

  const allPatterns = { ...defaultPatterns, ...customPatterns };

  const regexPatterns: RegexPatterns = {};

  for (const [name, { pattern, flags }] of Object.entries(allPatterns)) {
    if (flags && !isValidRegExpFlags(flags)) {
      regexPatterns[name] = new RegExp(pattern);
      continue;
    }

    regexPatterns[name] = new RegExp(pattern, flags);
  }

  return regexPatterns;
};
