const config = require('./config');
const PluginStream = require('./core/PluginStream');

const lazypack = function (configPath) {
  config.setConfig(configPath);

  for(const item of config.input) {
    new PluginStream(item);
  }
};

module.exports = lazypack;