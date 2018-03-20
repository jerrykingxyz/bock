const path = require('path');
const Context = require('./Context');
const { plugins } = require('../config');

class PluginStream {

  constructor (filepath) {
    const ext = path.extname(filepath).substr(1);
    this.context = new Context(filepath);
    this.queue = plugins.filter(e => e.rules(ext));
    this.next = this.nextPlugin.bind(this);

    this.next().catch(function (err) {
      console.error(`${filepath} packaging error: ${err.message}`);
    })
  }

  async nextPlugin () {
    const fn = this.queue[0];
    if (fn) {
      await fn(this.context, this.next);
      this.queue.shift();
    }
  }

}

module.exports = PluginStream;
