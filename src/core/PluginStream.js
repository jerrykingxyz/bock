const Context = require('./Context');
const config = require('../config');

class PluginStream {

  constructor (filepath) {
    this.context = new Context(filepath);
    this.queue = config.plugins.filter(e => e.ext(this.context.ext));
    this.next = this.nextPlugin.bind(this);
  }

  async nextPlugin () {
    const plugin = this.queue.shift();
    if (plugin) {
      await plugin.main(this.context, this.next);
    }
  }

  start () {
    const ret = this.next();
    if (config.interactive) {
      ret.catch(function (err) {
        console.error(`${filepath} packaging error: ${err.message}`);
      });
    }
    return ret;
  }

}

module.exports = PluginStream;
