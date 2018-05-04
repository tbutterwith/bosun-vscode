'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const bosunCompletionProvider_1 = require("./bosunCompletionProvider");
const bosunApi_1 = require("./lib/bosunApi");
function activate(context) {
    let disposable = vscode.commands.registerCommand('bosun.clearOpentsdbCache', bosunCompletionProvider_1.clearCache);
    let validateCmd = vscode.commands.registerCommand('bosun.validateBosun', bosunApi_1.validate);
    const documentSelector = {
        language: 'bosun',
        scheme: 'file' // only files from disk
    };
    const completionProvider = vscode.languages.registerCompletionItemProvider(documentSelector, new bosunCompletionProvider_1.default(), '.');
    context.subscriptions.push(completionProvider);
    context.subscriptions.push(disposable);
    context.subscriptions.push(validateCmd);
}
exports.activate = activate;
function deactivate() {
}
exports.deactivate = deactivate;
//# sourceMappingURL=bosun.js.map