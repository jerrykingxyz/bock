const pluginRules = {
  rules: {
    default: '*',
    format: function (e) {
      return typeof e === 'string' || Array.isArray(e);
    }
  },
  main: {
    format: 'function'
  }
};

const configRules = {
  plugins: {
    format: function (e) {
      const ok = Array.isArray(e);
      if (ok) {
        for(const plugin of e) {
          checkFormat('plugin', plugin, pluginRules);
        }
      }
      return ok;
    }
  }
};

const checkFormat = function (errorTitle, obj, rules) {
  if (typeof obj !== 'object' || obj === null) throw new Error(`${errorTitle} must be a object`);

  for (const k of Object.keys(rules)) {
    const v = rules[k];
    // set default value
    if (typeof obj[k] === 'undefined') {
      obj[k] = v.default;
    }
    // check format
    const ok = typeof v.format === 'string' ? typeof obj[k] === v.format : v.format(obj[k]);
    if (!ok) {
      throw new Error(`${errorTitle} ${k} format error`)
    }
  }
};

const checkConfigFormat = function (config) {
  checkFormat('config', config, configRules);
};

module.exports = checkConfigFormat;
