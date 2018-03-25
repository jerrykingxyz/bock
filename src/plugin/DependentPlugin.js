const path = require('path');
const defaultRegExp = /(url\(|src=['"]|href=["'])([^'"()]*[?='")])/g;

class DependentPlugin {
  constructor(userExtName) {
    !!userExtName ? this.setRegExp(userExtName) : this.setRegExp(defaultRegExp);
  }

  main(ctx, next) {

    if (ctx.content === undefined) {
      return;
    }

    let dependentList = [];
    let dependentTemp = ctx.content.match(this.regExp);

    if (dependentTemp === null) return;

    dependentTemp.forEach((each) => {
      dependentList.push(new Array(each.split(/['"()]/)[1]));
    });

    dependentList.forEach(each => {
      let eachtoString = each.toString();
      if (/^(https:\/\/|http:\/\/|\/\/)/.test(eachtoString)) {
        return;
      }
      each.push(path.join(ctx.filepath, each[0]));
    });
    ctx.dependentList = dependentList;
    return next();

  }

  setRegExp(n) {
    if (toString.call(n) === '[object RegExp]') {
      return this.regExp = n;
    }
    this.regExp = this.generateRegExp(n);
  }

  /**
   *  @ extNameList [array]
   */
  generateRegExp(extNameList) {
    if (!Array.isArray(extNameList)) {
      throw new Error('extname must be a array , eg:[\'.css\',\'.htm\']');
    }
    return new RegExp(
        `(url\\(|src=['"]|href=["'])([^'"()]*(${extNameList.join('|')})[?='")])`,'g');
  }
}

module.exports = DependentPlugin;