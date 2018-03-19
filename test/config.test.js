const assert = require('assert');
const { pluginRules, configRules, checkObject } = require('../src/config/formatRules');

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

  it('plugin type error', async function () {
    await checkFormat({}, pluginRules).catch(function (err) {
      assert.equal(err.message, 'plugin main function format error')
    })
  })

});

describe('config format test', function () {

  it('config type error', async function () {
    await checkFormat('string', configRules).catch(function (err) {
      assert.equal(err.message, 'config must be a object')
    })
  })

});

describe('config merge test', function () {

});
