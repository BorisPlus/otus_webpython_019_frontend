const toMergeConfigs = require('webpack-merge');
const baseConfig = require('./webpack.base.config.js');

config = toMergeConfigs(
    baseConfig,
    {
        mode: 'development',
        watch: true,
        watchOptions: {
            aggregateTimeout: 300,
            poll: 2000
        },
        devServer: {
            open: true,
            openPage: './examples/examples.html'
        }
    }
);

module.exports = config;

