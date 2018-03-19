const fs = require('fs');

class Context {
  constructor (filepath) {
    this.filepath = filepath;
    this.fileStat = fs.statSync(filepath);
  }
}

module.exports = Context;
