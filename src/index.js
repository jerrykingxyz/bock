const config = require('./config');
const PluginStream = require('./core/PluginStream');
const plugins = require('./plugin');

const lazypack = async function (configPath) {
  config.setConfig(configPath);

  for(const filepath of config.input) {
    const stream = new PluginStream(filepath);
    await stream.start()
  }
};

lazypack.PluginStream = PluginStream;

module.exports = Object.assign(lazypack, plugins);