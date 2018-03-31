const path = require('path');
//todo: refactor htmlsolve
const htmlSolve = function(ctx, subConfig) {
  // (ctx) => {
  // const regexp = /(url\(|src=['"]|href=["'])([^'"()]*['")])/g;
  // const dependent = getDependent(ctx.content, regexp);

  // let dependentList = [];
  // if (dependentTmp) {
  //   dependentTmp.forEach(obj => {
  //     let Obj = obj.split(/["'()]/);
  //     if (Obj[1].match(/(http:\/\/|https:\/\/|\/\/)/)) {
  //       dependentList.push([Obj[1]]);
  //     } else {
  //       let baseDir = getDir(ctx.filepath);
  //       let relativeDir = Obj[1];
  //       let absoluteDir = relativeDirToAbsoluteDir(baseDir, relativeDir);
  //       dependentList.push(
  //           new Array(relativeDir, absoluteDir);
  //     )
  //       ;
  //     }
  //
  //   });
  // }
  // return dependentList;
  //   },
  // },
  // };
};

const subConfigCheck = function(subConfig) {

};

const urlFilter = function(dependent, subConfig) {
  if (!!subConfig.url) {
    return dependent;
  }
  const dependentFiltered = dependent.filter(obj => {
    const regexp = /(http:\/\/|https:\/\/|\/\/)/;
    return !regexp.test(obj);
  });
  return dependentFiltered;
};

const getDependent = function(content, regexp) {
  return content.match(regexp);
};

const getDir = function(filePath) {
  return path.dirname(filePath);
};

const relativeDirToAbsoluteDir = function(baseDir, relativeDir) {
  return path.join(baseDir, relativeDir);
};

const defaultConfig = {
  ext: ['html'],
  solves: {
    html: {
      url: true,
      solveFunc: htmlSolve
    }
  }
};
// todo: refactor configformat
// const configFormat = function(config) {
//   let Config = {};
//   if (!!config.ext && config.ext instanceof Array) {
//     Config.ext = config.ext;
//     Config.solves = {};
//   } else {
//     return defaultConfig;
//   }
//   for (let ext of Config.ext) {
//     if (!!config.solves && !!config.solves[ext] &&
//         typeof config.solves[ext] === 'function') {
//       Config.solves[ext] = config.solves[ext];
//     } else if (!!defaultConfig.solves[ext]) {
//       Config.solves[ext] = defaultConfig.solves[ext];
//     } else {
//       throw new Error(
//           `please Set solve function of ${ext} ,this extname don't have default solve function !`);
//     }
//   }
//   return Config;
// };

class DependentPlugin {
  constructor(config) {
    this.config = configFormat(config);
    this.ext = this.config.ext;
  }

  main(ctx, next) {

    if (ctx.content === undefined) {
      return;
    }
    let extname = path.extname(ctx.filepath).slice(1);
    ctx.dependent = this.config.solves[extname](ctx);
    return next();
  }
}

module.exports = DependentPlugin;