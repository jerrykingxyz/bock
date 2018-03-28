const path = require('path');
const assert = require('assert');
const Context = require('../../src/core/Context');
const ContentPlugin = require('../../src/plugin/ContentPlugin');

describe('content plugin test', function () {

  const ctx = new Context(path.resolve(__dirname, './data.txt'));
  const contentPlugin = new ContentPlugin({ext: 'txt'});

  it('config test', function () {
    assert.equal(contentPlugin.config.ext, 'txt');
  });

  it('main file test', async function () {
    let nextDone = false;
    await contentPlugin.main(ctx, function () {
      nextDone = true;
    });
    assert.equal(ctx.content, 'test data for content plugin');
    assert.ok(nextDone);
  });

});