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
    rules: '*',
    main: ()=>{}
  };
  const pluginCheck = function (obj, errorMsg) {
    return checkFormat(obj, pluginRules).catch(function (err) {
      assert.equal(err.message, errorMsg);
    })
  };

  it('rules can not be a object', async function () {
    plugin.rules = {};
    await pluginCheck(plugin, 'plugin rules format error');
    plugin.rules = '*';
  });

  it('rules can not be a number', async function () {
    plugin.rules = 1;
    await pluginCheck(plugin, 'plugin rules format error');
    plugin.rules = '*';
  });

  it('rules can be a array', async function () {
    plugin.rules = ['txt'];
    await pluginCheck(plugin);
    plugin.rules = '*';
  });

  it('rules format array', async function () {
    plugin.rules = ['txt', 'js'];
    await pluginCheck(plugin);
    assert.ok(plugin.rules('txt'));
    assert.ok(plugin.rules('js'));
    assert.ok(!plugin.rules('css'));
    plugin.rules = '*';
  });

  it('rules format string', async function () {
    plugin.rules = 'txt';
    await pluginCheck(plugin);
    assert.ok(plugin.rules('txt'));
    assert.ok(!plugin.rules('js'));
    plugin.rules = '*';
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