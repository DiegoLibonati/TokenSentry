# TokenSentry

## Getting Started

1. Clone the repository with `git clone "repository link"`
2. Join to `TokenSentry` folder and execute: `npm run install` or `yarn install` in the terminal

## Test extension under development.

1. Go to the `Run and Debug` tab or press `Ctrl+Shift+D`.
2. Run `Run Extension` or press the `F5` key.

NOTE: A new vscode tab will open where you can navigate to another folder and test the extension. You can use the `Command Palette` or open it with `Ctrl+Shift+P`. Enter the keywords: `TokenSentry:` and run the command you want to test.

## Description

TokenSentry is an extension that allows to analyze the files added before or during the commit to detect that no sensitive data is uploaded.

## Technologies used

1. Typescript

## Libraries used

#### Dependencies

```
"simple-git": "^3.27.0"
```

#### devDependencies

```
"@types/jest": "^29.5.14"
"@types/node": "20.x"
"@types/vscode": "^1.99.0"
"@typescript-eslint/eslint-plugin": "^8.28.0"
"@typescript-eslint/parser": "^8.28.0"
"@vscode/test-cli": "^0.0.10"
"@vscode/test-electron": "^2.4.1"
"esbuild": "^0.25.1"
"eslint": "^9.23.0"
"jest": "^29.7.0"
"npm-run-all": "^4.1.5"
"ts-jest": "^29.3.2"
"ts-node": "^10.9.2"
"typescript": "^5.8.2"
```

## Portfolio Link

[`https://www.diegolibonati.com.ar/#/project/TokenSentry`](https://www.diegolibonati.com.ar/#/project/TokenSentry)

## Video

https://github.com/user-attachments/assets/f710b19b-0ed3-4dc8-8481-7b41893482b6

## Testing

1. Join to `TokenSentry` folder
2. Execute: `yarn test:jest` or `npm run test:jest`

## Documentation Extension

### Version

```ts
APP VERSION: 1.0.0
README UPDATED: 24/04/2025
AUTHOR: Diego Libonati
```

### Patterns

- Patterns are very important in this extension because thanks to these patterns we will be able to detect if there is any sensitive pattern in the content of the files we are going to commit.

1. `defaultPatterns`: The default patterns are patterns that we are going to configure by default in our extension. This should not be touched in PROD but we can add in DEV for PROD.
2. `customPatterns`: Custom patterns are patterns that we will be able to add in PROD through `settings.json`. We must look for in configuration the keyword: `TokenSentry: `.

```ts
"configuration": {
    "title": "TokenSentry",
    "properties": {
        "tokenSentry.defaultPatterns": {
            "type": "object",
            "default": {
                "GitLab Token": {
                    "pattern": "glpat-[A-Za-z0-9_-]{20}",
                    "flags": "g"
                },
                "GitHub Token": {
                    "pattern": "ghp_[A-Za-z0-9]{36}",
                    "flags": "g"
                }
            },
            "description": "Default patterns to detect tokens (do not modify directly)."
        },
        "tokenSentry.customPatterns": {
            "type": "object",
            "default": {},
            "description": "Add your own Regex patterns (e.g. 'My Token': {'pattern': 'my_token_[0-9]{32}', 'flags': 'gi'} - flags key is OPTIONAL)."
        }
    }
}
```

### Create a new command

1. You must choose the name of the command in this case it is called `alive`.
2. Inside the callback you should put the logic of your new command.

```ts
const disposable1 = vscode.commands.registerCommand("tokensentry.alive", () => {
  vscode.window.showInformationMessage("Hello world from TokenSentry.");
});
```

3. In the `package.json` in the `commands` key, add your new command take `alive` as an example.

```ts
"commands": [
    {
    "command": "tokensentry.alive",
    "title": "TokenSentry: Alive"
    },
    {
    "command": "tokensentry.checkFiles",
    "title": "TokenSentry: Check Files"
    }
],
```
