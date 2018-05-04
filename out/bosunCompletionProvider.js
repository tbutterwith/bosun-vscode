"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const openTsdb_1 = require("./lib/openTsdb");
let suggestionsCache = new Map();
class BosunCompletionProvider {
    provideCompletionItems(document, position, token, context) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = getQueryString(document, position);
                console.log(query);
                if (query.length < 1) {
                    return new vscode_1.CompletionList([]);
                }
                if (suggestionsCache.has(query)) {
                    return suggestionsCache.get(query);
                }
                const items = yield getOpenTsdbMetricsPaths(query);
                const response = new vscode_1.CompletionList(items);
                suggestionsCache.set(query, response);
                return response;
            }
            catch (err) {
                console.log(err);
                return new vscode_1.CompletionList([]);
            }
        });
    }
}
exports.default = BosunCompletionProvider;
const clearCache = () => suggestionsCache = new Map();
exports.clearCache = clearCache;
const stripTypedString = (query, path) => {
    const remaining = path.slice(query.length);
    if (remaining.indexOf('.') == -1)
        return remaining;
    return remaining.substring(0, remaining.indexOf('.'));
};
const getQueryString = (document, position) => {
    const { text } = document.lineAt(position.line);
    const quotedText = text.slice(0, position.character).split('"').pop() || '';
    return quotedText.split(":").pop() || '';
};
const getOpenTsdbMetricsPaths = (query) => __awaiter(this, void 0, void 0, function* () {
    const metricsPaths = openTsdb_1.getMetricsPaths(query);
    vscode_1.window.setStatusBarMessage('Fetching metrics paths from OpenTSDB...', metricsPaths);
    const result = yield metricsPaths;
    const paths = new Set(result.map((path) => stripTypedString(query, path)));
    const items = [];
    paths.forEach((path) => {
        items.push(new vscode_1.CompletionItem(path, vscode_1.CompletionItemKind.Property));
    });
    return items;
});
//# sourceMappingURL=bosunCompletionProvider.js.map