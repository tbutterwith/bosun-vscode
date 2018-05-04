'use strict';
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
const request = require('request-promise-native');
const validate = () => __awaiter(this, void 0, void 0, function* () {
    const url = vscode_1.workspace.getConfiguration('bosun').get('url');
    if (!url) {
        throw new ReferenceError('A url for Bosun is a required setting to use the validation command');
    }
    try {
        const config = vscode_1.window.activeTextEditor.document.getText();
        const res = yield request.post({
            headers: { 'User-Agent': 'node-requests/2.85 (Bosun VSCode Plugin)' },
            url: `${url}/api/config_test`,
            body: config
        });
        if (res.length > 0) {
            throw new Error(res);
        }
        vscode_1.window.showInformationMessage('Bosun configuration is valid');
    }
    catch (err) {
        vscode_1.window.showErrorMessage('Bosun configuration is invalid', err.message);
        console.error(err);
    }
});
exports.validate = validate;
//# sourceMappingURL=bosunApi.js.map