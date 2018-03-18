const defaultConfig = require('./defaultConfig');
const checkFormat = require('./checkFormat');

const generateConfig = function (configPath) {
  const config = Object.assign({}, defaultConfig);

  if (typeof configPath === 'object') {
    Object.assign(config, configPath);
  } else if (typeof configPath === 'string') {
    const userConfig = require(configPath);
    if (typeof userConfig === 'object') {
      Object.assign(config, userConfig);
    }
  }

  checkFormat(config);
  return config;
};

module.exports = { defaultConfig, generateConfig };