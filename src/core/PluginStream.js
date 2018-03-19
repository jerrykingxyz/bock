const path = require('path');
const Context = require('./Context');
const { plugins } = global.config;

class PluginStream {

  constructor (filepath) {
    const ext = path.extname(filepath).substr(1);
    this.filepath = filepath;
    this.queue = plugins.filter(e => e.rules(ext));
    this.next = this.nextPlugin.bind(this);

    this.start().catch(function (err) {
      console.error(`${filepath} packaging error: ${err}`);
    })
  }

  async nextPlugin () {
    const fn = this.queue[0];
    if (fn) {
      await fn(this.context, this.next);
      this.queue.shift();
    }
  }

  async start () {
    this.context = new Context(this.filepath);
    await this.next();
  }

}

module.exports = PluginStream;
