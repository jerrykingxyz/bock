module.exports = {
  rules: '*',
  main: async function (ctx, next) {
    await next();
  }
};