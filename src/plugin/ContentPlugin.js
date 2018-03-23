const fs = require('fs');
const { promisify } = require('util');
const PluginStream = require('../core/PluginStream');

const fsStat = promisify(fs.stat);
const fsReadFile = promisify(fs.readFile);
const fsReaddir = promisify(fs.readdir);

const defaultConfig = {
  rules: ['html', 'htm', 'js', 'css', 'json'],
  maxContentSize: 5 * 1024 * 1024
};

class ContentPlugin {

  constructor (config) {
    this.config = Object.assign({}, defaultConfig, config);
    this.rules = this.config.rules;
  }

  async main (ctx, next) {
    const filepath = ctx.filepath;
    const fileStat = await fsStat(filepath);

    if (fileStat.isDirectory()) {
      const files = await fsReaddir(filepath);
      for (const file of files) {
        new PluginStream(file).start();
      }
      return;
    }

    if (fileStat.size < this.config.maxContentSize) {
      ctx.content = await fsReadFile(filepath);
    }
    return next();
  }

}