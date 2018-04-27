'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const bosunCompletionProvider_1 = require("./bosunCompletionProvider");
function activate(context) {
    let disposable = vscode.commands.registerCommand('bosun.clearOpenTSDBCache', bosunCompletionProvider_1.clearCache);
    const documentSelector = {
        language: 'bosun',
        scheme: 'file' // only files from disk
    };
    const completionProvider = vscode.languages.registerCompletionItemProvider(documentSelector, new bosunCompletionProvider_1.default(), '.');
    context.subscriptions.push(completionProvider);
    context.subscriptions.push(disposable);
}
exports.activate = activate;
function deactivate() {
}
exports.deactivate = deactivate;
//# sourceMappingURL=bosun.js.map