const config = require('./config');
const PluginStream = require('./core/PluginStream');
const plugins = require('./plugin');

const lazypack = function (configPath) {
  config.setConfig(configPath);

  for(const filepath of config.input) {
    const stream = new PluginStream(filepath);
    stream.start()
  }
};

module.exports = Object.assign(lazypack, plugins);