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
const request = require('request-promise-native');
const vscode_1 = require("vscode");
const getMetricsPaths = (query) => __awaiter(this, void 0, void 0, function* () {
    const url = vscode_1.workspace.getConfiguration('bosun.openTsdb').get('url');
    if (!url) {
        throw new ReferenceError('A url for OpenTSDB is a required setting to use autocomplete');
    }
    const port = vscode_1.workspace.getConfiguration('bosun.openTsdb').get('port', 4242);
    const maxEntries = vscode_1.workspace.getConfiguration('bosun.openTsdb').get('maxEntries', 500);
    const res = yield request(`http://${url}:${port}/suggest?type=metrics&q=${query}&max=${maxEntries}`);
    return JSON.parse(res);
});
exports.getMetricsPaths = getMetricsPaths;
//# sourceMappingURL=openTsdb.js.map