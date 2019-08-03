const webpack = require('webpack');

module.exports = {
    target: 'web',
    mode: 'production',
    entry: './main.js',
    output: {
        path: __dirname,
        filename: '../bundle.js'
    },
};
