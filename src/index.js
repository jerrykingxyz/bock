const { generateConfig } = require('./config');

const lazypack = function (configPath) {
    global.config = generateConfig(configPath);

};

module.exports = lazypack;