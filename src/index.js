const { generateConfig } = require('./config');
const PluginStream = require('./core/PluginStream');

const lazypack = function (configPath) {
  global.config = generateConfig(configPath);

  for(const item of config.input) {
    new PluginStream(item);
  }
};

module.exports = lazypack;