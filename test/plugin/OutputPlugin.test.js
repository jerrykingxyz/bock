const path = require('path');
const fs = require('fs');
const assert = require('assert');
const Context = require('../../src/core/Context');
const OutputPlugin = require('../../src/plugin/OutputPlugin');
const { promisify } = require('util');

const fsReadFile = promisify(fs.readFile);
const fsUnlink = promisify(fs.unlink);

describe('output plugin test', function () {

  const ctx = new Context(path.resolve(__dirname, './data.txt'));
  ctx.content = 'test text in ctx context';

  const outputPlugin = new OutputPlugin({
    ext: 'txt',
    rootDir: __dirname,
    output: './dist',
    contentProperty: 'content'
  });

  it('config test', function () {
    const { ext, config } = outputPlugin;
    assert.equal(config.rootDir, __dirname, 'root dir format error');
    assert.equal(ext, 'txt', 'ext value not equal');
    assert.equal(config.output('/var/data/a.txt', '/var/data'), '/var/data/dist/a.txt', 'output dir value not equal');
  });

  it('main function test', async function () {
    let nextDone = false;
    await outputPlugin.main(ctx, function () {
      nextDone = true;
    });

    const file = path.resolve(__dirname, './dist/data.txt');
    const data = await fsReadFile(file);
    assert.equal(ctx.content, data);
    assert.ok(nextDone);
    await fsUnlink(file);
  });

});