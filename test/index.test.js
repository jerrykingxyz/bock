const path = require('path');
const assert = require('assert');
const lazypack = require('../src/index');

describe('lazy pack test', function () {

  require('./config/index.test.js');
  require('./core/index.test.js');
  require('./plugin/index.test.js');

  it('factory function test', async function () {
    const config = {
      input: './a.txt',
      plugins: [{
        rules: '*',
        main: async function (ctx) {
          assert.equal(ctx.filepath, path.resolve('./a.txt'));
        }
      }]
    };
    await lazypack(config)
  })
});