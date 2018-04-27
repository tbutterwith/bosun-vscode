import * as nock from 'nock';
import * as sinon from 'sinon';
import * as vscode from 'vscode';
import * as assert from 'assert';

import { getMetricsPaths } from './../lib/openTsdb';

const sandbox = sinon.createSandbox();

describe('openTsdb', () => {
  beforeEach(() => {
    nock.disableNetConnect();
    const configMock = sinon.stub();
    configMock.withArgs('url').returns('testing');
    configMock.withArgs('port', 4242).returns(4242);
    configMock.withArgs('maxEntries', 500).returns(500);
    sandbox.stub(vscode.workspace, 'getConfiguration').withArgs('bosun.openTsdb').returns({ get: configMock });
  });

  afterEach(() => {
    sandbox.restore();
    nock.enableNetConnect();
  });

  it('requests metric paths from openTSDB', async () => {
    const mock = nock('http://testing:4242')
      .get('/suggest?type=metrics&q=test&max=500')
      .reply(200, '{}');
    await getMetricsPaths('test');
    mock.done();
  });

  it('returns the metrics paths from openTSDB', async () => {
    const metrics = ['my.path', 'test.path'];
    nock('http://testing:4242')
      .get('/suggest?type=metrics&q=test&max=500')
      .reply(200, JSON.stringify(metrics));
    const result = await getMetricsPaths('test');
    assert.deepEqual(result, metrics);
  });

  it('throws an exception on non 200', async () => {
    const mock = nock('http://testing:4242')
      .get('/suggest?type=metrics&q=test&max=500')
      .reply(500, 'Internal server error');
    try {
      await getMetricsPaths('test');
      assert.fail(0, 0, 'Expected exception to be thrown');
    } catch (err) {
      assert.equal(err.message, '500 - "Internal server error"');
    }
    mock.done();
  });
});