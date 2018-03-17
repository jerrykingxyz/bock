const path = require('path');
const Context = require('./Context');
const { plugins } = global.config;

class PluginStream {

  constructor (filepath) {
    const ext = path.extname(filepath).substr(1);
    this.queue = plugins.filter(e => e.rules === '*' || (e.rules.indexOf(ext) !== -1));
    this.context = new Context();
    this.index = 0;
    this.next = this.nextPlugin.bind(this);
  }

  async nextPlugin () {
    const fn = this.queue[this.index];
    if (fn) {
      await fn(this.context, this.next);
      this.index ++;
    }
  }

}