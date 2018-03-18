const checkPluginFormat = function (plugin) {
  if (typeof plugin !== 'object' || plugin === null) {
    throw new Error('plugin must a object');
  }

  // rules format check
  if (typeof plugin.rules === 'undefined') {
    plugin.rules = '*';
  }
  if (typeof plugin.rules !== 'string' && !Array.isArray(plugin.rules)) {
    throw new Error('plugin rules format error')
  }

  // main function format check
  if (typeof plugin.main !== 'function') {
    throw new Error('plugin main function format error')
  }
};

const checkConfigFormat = function (config) {
  if (!Array.isArray(config.plugins)) {
    throw new Error('config plugins must be a array');
  }
  for(const plugin of config.plugins) {
    checkPluginFormat(plugin)
  }
};

module.exports = checkConfigFormat;
