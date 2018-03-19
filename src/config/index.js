const defaultConfig = require('./defaultConfig');
const checkFormat = require('./checkFormat');

const generateConfig = function (config) {
  const result = Object.assign({}, defaultConfig);

  if (typeof config === 'string') {
    config = require(config);
  }
  if (typeof config === 'object') {
    Object.assign(result, config);
  }

  checkFormat(result);
  return result;
};

module.exports = { defaultConfig, generateConfig };