const path = require('path');

class Context {
  constructor (filepath) {
    this.ext = path.extname(filepath).substr(1);
    this.filepath = filepath;
  }
}

module.exports = Context;
