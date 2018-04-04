const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const fsWriteFile = promisify(fs.writeFile);

const defaultConfig = {
  ext: '*',
  rootDir: '.',
  output: null,
  contentProperty: 'content'
};

class OutputPlugin {
  constructor (option) {
    const config = Object.assign({}, defaultConfig, option);

    const { rootDir, output } = config;
    config.rootDir = path.resolve(typeof rootDir === 'string' ? rootDir : defaultConfig.rootDir);

    if (typeof output === 'string') {
      // convert string to function
      config.output = function (filepath, rootDir) {
        return filepath.replace(new RegExp(`^${rootDir}`), path.resolve(rootDir, output));
      }
    }
    if (typeof config.output !== 'function') {
      throw new Error('output plugin outputDir format error');
    }

    this.ext = config.ext;
    this.config = config;
  }

  async main (ctx, next) {
    const { rootDir, output, contentProperty } = this.config;

    // write file
    await fsWriteFile(output(ctx.filepath, rootDir), ctx[contentProperty]);
    return next();
  }
}

module.exports = OutputPlugin;
