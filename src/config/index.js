const defaultConfig = require('./defaultConfig');
const { configRules, checkObject } = require('./formatRules');

const setConfig = function (config) {
  // this pointer to exports config object
  const result = {};

  if (typeof config === 'string') {
    config = require(config);
  }
  if (typeof config === 'object') {
    Object.assign(result, config);
  }
  checkObject(result, configRules);

  for (const key of Object.keys(defaultConfig)) {
    this[key] = result[key];
  }

  return this;
};

const config = Object.create(defaultConfig);
Object.defineProperty(config, 'setConfig', {
  value: setConfig
});

module.exports = config;