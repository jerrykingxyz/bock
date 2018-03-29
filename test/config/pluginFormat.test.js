const assert = require('assert');
const { pluginRules, checkObject } = require('../../src/config/formatRules');

const checkFormat = function(...args) {
  return new Promise(function (resolve, reject) {
    try {
      checkObject(...args);
      resolve();
    } catch (err) {
      reject(err);
    }
  }
)};

describe('plugin format test', function () {
  const plugin = {
    ext: '*',
    main: ()=>{}
  };
  const pluginCheck = function (obj, errorMsg) {
    return checkFormat(obj, pluginRules).catch(function (err) {
      assert.equal(err.message, errorMsg);
    })
  };

  it('ext can not be a object', async function () {
    plugin.ext = {};
    await pluginCheck(plugin, 'plugin ext format error');
    plugin.ext = '*';
  });

  it('ext can not be a number', async function () {
    plugin.ext = 1;
    await pluginCheck(plugin, 'plugin ext format error');
    plugin.ext = '*';
  });

  it('ext can be a array', async function () {
    plugin.ext = ['txt'];
    await pluginCheck(plugin);
    plugin.ext = '*';
  });

  it('ext format array', async function () {
    plugin.ext = ['txt', 'js'];
    await pluginCheck(plugin);
    assert.ok(plugin.ext('txt'));
    assert.ok(plugin.ext('js'));
    assert.ok(!plugin.ext('css'));
    plugin.ext = '*';
  });

  it('ext format string', async function () {
    plugin.ext = 'txt';
    await pluginCheck(plugin);
    assert.ok(plugin.ext('txt'));
    assert.ok(!plugin.ext('js'));
    plugin.ext = '*';
  });

  it('main can not be a string', async function () {
    plugin.main = 'test';
    await pluginCheck(plugin, 'plugin main function format error');
    plugin.main = ()=>{};
  });

  it('main can be a function', async function () {
    await pluginCheck(plugin);
  });

});