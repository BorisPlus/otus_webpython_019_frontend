var path = require('path');

let config = {
    entry: './src/bug_report.tests.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bug_report.bundle.js',
        libraryTarget: 'var',
        library: 'PackedBugReport'
    },
    mode: 'production',
    devServer: {
        open: true,
        openPage: 'examples/examples.html'
    }
};

module.exports = config