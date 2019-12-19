'use strict';
import { window, workspace, Selection, Position, Range } from 'vscode';
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
    if (res.length === 0) { 
      window.showInformationMessage('Bosun configuration is valid');
      return;
    }

    const responseArray = res.split(':');
    const errorLine = parseInt(responseArray[4]) - 1;
    const message = responseArray[5];

    window.showErrorMessage(`Bosun configuration is invalid: ${message}`, `Go to line ${errorLine}`)
      .then((action) => {
        if (!action) { return; }

        if(window.activeTextEditor) {
          window.activeTextEditor.selections = [new Selection(new Position(errorLine-1, 0), new Position(errorLine-1, 0))]
          window.activeTextEditor.revealRange(new Range(errorLine-1, 0, errorLine-1, 0), 1)
          ;
        }
      });
  } catch (err) {
    console.error(err);
    window.showErrorMessage('Error fetching Bosun response')
  }
};

export { validate };