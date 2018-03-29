const assert = require('assert');
const PluginStream = require('../../src/core/PluginStream');

describe('plugin stream test', function () {

  const config = require('../../src/config');
  config.setConfig({
    input: [],
    plugins: [
      {
        ext: '*',
        main: async function (ctx, next) {
          ctx.number = 0;
          await next();
        }
      },
      {
        ext: 'txt',
        main: async function (ctx, next) {
          ctx.number += 1;
          await next();
        }
      },
      {
        ext: 'js',
        main: async function (ctx, next) {
          ctx.number += 2;
          await next();
        }
      },
      {
        ext: 'css',
        main: async function (ctx, next) {
          ctx.number += 4;
          await next();
        }
      },
      {
        ext: ['txt', 'css'],
        main: async function (ctx, next) {
          ctx.number += 8;
          await next();
        }
      },
      {
        ext: 'err',
        main: async function () {
          throw new Error('error');
        }
      }
    ]
  });

  const stream = [
    new PluginStream('a.html'),
    new PluginStream('a.txt'),
    new PluginStream('a.js'),
    new PluginStream('a.css'),
    new PluginStream('a.err')
  ];

  it('initialize test', function () {
    const length = stream.map(function (e) {
      return e.queue.length;
    });
    assert.deepEqual(length, [1, 3, 2, 3, 2]);
  });

  it('running test', async function () {
    const result = [0, 9, 2, 12, 0];
    for(const index in stream) {
      const item = stream[index];
      await item.start().catch(function (err) {
        assert.equal(err.message, 'error')
      });
      assert.equal(item.context.number, result[index]);
    }
  })

});