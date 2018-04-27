'use strict';
import * as vscode from 'vscode';
import BosunCompletionProvider, { clearCache } from './bosunCompletionProvider';

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('bosun.clearOpenTSDBCache', clearCache);

  const documentSelector: vscode.DocumentSelector = {
    language: 'bosun',
    scheme: 'file' // only files from disk
  };
  const completionProvider = vscode.languages.registerCompletionItemProvider(documentSelector, new BosunCompletionProvider(), '.');
  context.subscriptions.push(completionProvider);

  context.subscriptions.push(disposable);
}

export function deactivate() {
}