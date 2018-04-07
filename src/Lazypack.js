const config = require('./config');
const PluginStream = require('./core/PluginStream');

// TODO events
class Lazypack {
  constructor (configPath) {
    config.setConfig(configPath);

    for(const filepath of config.input) {
      const stream = new PluginStream(filepath);
      stream.start();
    }
  }
}

module.exports = Lazypack;