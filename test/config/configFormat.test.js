const path = require('path');
const assert = require('assert');
const { configRules, checkObject } = require('../../src/config/formatRules');

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

describe('config format test', function () {
  const config = {
    input: [],
    plugins: []
  };
  const configCheck = function (obj, errorMsg) {
    return checkFormat(obj, configRules).catch(function (err) {
      assert.equal(err.message, errorMsg);
    })
  };

  it('input can not be a object', async function () {
    config.input = {};
    await configCheck(config, 'config input format error');
    config.input = [];
  });

  it('input can not be a number', async function () {
    config.input = 1;
    await configCheck(config, 'config input format error');
    config.input = [];
  });

  it('input can be a string', async function () {
    config.input = './a.txt';
    await configCheck(config);
    assert.equal(config.input[0], path.resolve('./a.txt'));
    config.input = [];
  });

  it('input can be a array', async function () {
    config.input = ['./a.txt', '../b.js'];
    await configCheck(config);
    assert.ok(config.input.length === 2);
    assert.ok(config.input[0] === path.resolve('./a.txt'));
    assert.ok(config.input[1] === path.resolve('../b.js'));
    config.input = [];
  });

  it('plugins is a array', async function () {
    config.plugins = {};
    await configCheck(config, 'config plugins must be a array');
    config.plugins = ['test'];
    await configCheck(config, 'plugin must be a object');
    config.plugins = [];
  })

});