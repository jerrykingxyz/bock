const defaultConfig = require('./defaultConfig');

const generateConfig = function (configPath) {
    const config = Object.assign({}, defaultConfig);

    if (typeof configPath === 'object') {
        Object.assign(config, configPath);
    } else if (typeof configPath === 'string') {
        try {
            const userConfig = require(configPath);
            if (typeof userConfig === 'object') {
                Object.assign(config, userConfig);
            }
        } catch (e) {
            console.error('can not get config file, lazy pack will use default config');
        }
    }
    return config;
};

module.exports = { defaultConfig, generateConfig };