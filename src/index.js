const { generateConfig } = require('./config');

const lazypack = function (configPath) {
    const config = generateConfig(configPath);

};

module.exports = lazypack;