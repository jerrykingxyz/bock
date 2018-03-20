const assert = require('assert');
const Context = require('../../src/core/Context');

describe('context test', function () {

  it('file path test', function () {
    const context = new Context('~/test.txt');
    assert.equal(context.filepath, '~/test.txt');
  })
  
});