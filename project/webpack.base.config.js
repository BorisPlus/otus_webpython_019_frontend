const path = require('path');

module.exports = {
    entry: './src/bug_report',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'packed.bug_report.js',
        libraryTarget: 'var',
        library: 'PackedBugReport'
    },
};
