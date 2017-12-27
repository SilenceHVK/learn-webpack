'use strict';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const config = {
    entry: path.resolve(__dirname,'main.js'),
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            { test: /\.js$/, loader: 'babel-loader' }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin()
    ]
};

module.exports = config;