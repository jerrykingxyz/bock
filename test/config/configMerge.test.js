const path = require('path');
const assert = require('assert');
const config = require('../../src/config');

describe('config merge test', function () {

  it('default object', function () {
    config.setConfig({});
    assert.equal(config.input.length, 0);
    assert.equal(config.plugins.length, 0);
  });

  it('merge object', function () {
    config.setConfig({
      input: './a.txt',
      plugins: [],
      test: 'test'
    });
    assert.equal(config.input[0], path.resolve('./a.txt'));
    assert.equal(config.plugins.length, 0);
    assert.equal(config.test, undefined);
  });

  it('merge object by path', function () {
    config.setConfig('./test/config/config.js');
    assert.equal(config.input[0], path.resolve('./a.txt'));
    assert.equal(config.plugins.length, 0);
    assert.equal(config.test, undefined);
  });

});

