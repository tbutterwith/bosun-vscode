'use strict';
import * as vscode from 'vscode';
import BosunCompletionProvider, { clearCache } from './bosunCompletionProvider';
import { validate } from './lib/bosunApi';

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('bosun.clearOpentsdbCache', clearCache);
  let validateCmd = vscode.commands.registerCommand('bosun.validateBosun', validate);

  const documentSelector: vscode.DocumentSelector = {
    language: 'bosun',
    scheme: 'file' // only files from disk
  };
  const completionProvider = vscode.languages.registerCompletionItemProvider(documentSelector, new BosunCompletionProvider(), '.');
  context.subscriptions.push(completionProvider);

  context.subscriptions.push(disposable);
  context.subscriptions.push(validateCmd);
}

export function deactivate() {
}