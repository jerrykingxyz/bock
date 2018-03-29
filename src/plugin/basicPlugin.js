module.exports = {
  ext: '*',
  main: async function (ctx, next) {
    await next();
  }
};