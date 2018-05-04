'use strict';
import { window, workspace } from 'vscode';
const request = require('request-promise-native');

const validate = async () => {
  const url = workspace.getConfiguration('bosun').get('url');
  if (!url) { throw new ReferenceError('A url for Bosun is a required setting to use the validation command'); }
  try {
    const config = window.activeTextEditor!.document.getText();
    const res = await request.post({
      headers: { 'User-Agent': 'node-requests/2.85 (Bosun VSCode Plugin)' },
      url: `${url}/api/config_test`,
      body: config
    });
    if (res.length > 0) { throw new Error(res); }
    window.showInformationMessage('Bosun configuration is valid');
  } catch (err) {
    window.showErrorMessage('Bosun configuration is invalid', err.message);
    console.error(err);
  }
};

export { validate };