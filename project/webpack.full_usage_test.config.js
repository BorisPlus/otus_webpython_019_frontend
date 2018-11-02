const path = require('path');
const toMergeConfigs = require('webpack-merge');
//const productionConfig = require('./webpack.development.config.js');
//
//module.exports = toMergeConfigs(
//    productionConfig,
//    {
//        entry: './tests/full_usage_example/bug_report.full_usage_example.js',
//        watch: false,
//        output: {
//            libraryTarget: './examples/full_usage_example',
//            filename: 'bug_report.full_usage_test.js'
//        }
//    }
//);
const baseConfig = require('./webpack.base.config.js');

module.exports = toMergeConfigs(
    baseConfig,
    {
        entry: './src.tests/full_usage_test/bug_report.full_usage_test.js',
        watch: false,
        mode: 'production',
        output: {
		    path: path.resolve(__dirname, 'examples', 'full_usage_example'),
            filename: 'bug_report.full_usage_example.js'
        }
    }
);

