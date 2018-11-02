const toMergeConfigs = require('webpack-merge');
const baseConfig = require('./webpack.base.config.js');

module.exports = toMergeConfigs(
    baseConfig,
    {
        mode: 'production'
    }
);
