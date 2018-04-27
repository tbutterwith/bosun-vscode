const request = require('request-promise-native');
import { workspace } from 'vscode';

const getMetricsPaths = async (query: string) => {
  const url = workspace.getConfiguration('bosun.openTsdb').get('url');
  if (!url) { throw new ReferenceError('A url for OpenTSDB is a required setting to use autocomplete'); }

  const port = workspace.getConfiguration('bosun.openTsdb').get('port', 4242);
  const maxEntries = workspace.getConfiguration('bosun.openTsdb').get('maxEntries', 500);

  const res = await request(`http://${url}:${port}/suggest?type=metrics&q=${query}&max=${maxEntries}`);
  return JSON.parse(res);
};

export { getMetricsPaths };