const path = require('path');

const defaultConfig = {
  ext: ['html'],
  rules: {
    html: (ctx) => {
      let regexp = /(url\(|src=['"]|href=["'])([^'"()]*['")])/g;
      let dependentTmp = ctx.content.match(regexp);
      let dependentList = [];
      if (dependentTmp) {
        dependentTmp.forEach(obj => {
          let Obj = obj.split(/["'()]/);
          if (Obj[1].match(/(http:\/\/|https:\/\/|\/\/)/)) {
            dependentList.push([Obj[1]]);
          } else {
            dependentList.push([Obj[1], path.join(path.dirname(ctx.filepath), Obj[1])]);
          }

        });
      }
      return dependentList;
    },
  },
};

function configFormat(config) {
  let Config = {};
  if (!!config.ext && config.ext instanceof Array) {
    Config.ext = config.ext;
    Config.rules = {};
  } else {
    return defaultConfig;
  }
  for (let ext of Config.ext) {
    if (!!config.rules && !!config.rules[ext] &&
        typeof config.rules[ext] === 'function') {
      Config.rules[ext] = config.rules[ext];
    } else if (!!defaultConfig.rules[ext]) {
      Config.rules[ext] = defaultConfig.rules[ext];
    } else {
      throw new Error(
          `please Set solve function of ${ext} ,this extname don't have default solve function !`);
    }
  }
  return Config;
}

class DependentPlugin {
  constructor(config) {
    this.config = configFormat(config);
    this.rules = this.config.rules;
  }

  main(ctx, next) {

    if (ctx.content === undefined) {
      return;
    }
    let extname = path.extname(ctx.filepath).slice(1);
    ctx.dependent = this.rules[extname](ctx);
    return next();
  }
}

module.exports = DependentPlugin;