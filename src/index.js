const Lazypack = require('./Lazypack');
const PluginStream = require('./core/PluginStream');
const plugins = require('./plugin');

const factory = function (...args) {
  return new Lazypack(...args);
};

factory.PluginStream = PluginStream;

module.exports = Object.assign(factory, plugins);