const path = require('path');
const defaultRegExp = /(url\(|src=['"]|href=["'])([^'"()]*[?='")])/g;

class DependentPlugin {
  constructor(regExp = defaultRegExp) {
      this.setRegExp(regExp);
  }

  main(ctx, next) {

    if (ctx.content === undefined) {
      return;
    }

    let dependentList = [];
    let dependentTemp = ctx.content.match(this.regExp);

    dependentTemp.forEach((each) => {
      dependentList.push(new Array(each.split(/['"()]/)[1]));
    });

    if (!!ctx.filepath) {
      dependentList.forEach(each => {
        let eachtoString = each.toString();
        if (!!/^(https|http):\/\//.test(eachtoString)) {
          return;
        }
        each.push(path.join(ctx.filepath, each[0]));
      });
    }

    ctx.dependentList = dependentList;
    return next();

  }

  setRegExp(userRegExp) {
    if (toString.call(userRegExp) === '[object RegExp]') {
      this.regExp = userRegExp;
    }
  }
}

module.exports = DependentPlugin;