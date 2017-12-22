'use strict';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');


const config = {
    entry: path.resolve(__dirname,'main.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/, 
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ template: path.resolve(__dirname,'index.html') })
    ]
}

module.exports = config;