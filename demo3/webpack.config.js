const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const config = {
    entry: {
        bundle1: path.resolve(__dirname,'main1.js'),
        bundle2: path.resolve(__dirname,'main2.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            { test: /\.css$/, loader: 'style-loader!css-loader' }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ 
            date: new Date(),
            title: 'multiple entry',
            filename: 'index.html',
            template: path.resolve(__dirname,'index.html'), 
            inject: true, 
            favicon: path.resolve(__dirname,'favicon.ico'), 
            minify: {
                caseSensitive: false,
                collapseBooleanAttributes: true,
                collapseWhitespace: true
            },
            hash: true, 
            cache: true, 
            showErrors: true, 
            chunks: [ 'bundle1', 'bundle2' ], 
            // excludeChunks:[ 'bundle1' ],
            chunksSortMode: function(chunk1,chunk2){
                var orders = [ 'bundle1' , 'bundle2' ];
                var order1 = orders.indexOf(chunk1.names[0]);
                var order2 = orders.indexOf(chunk2.names[0]);
                return order1 - order2;
            },
            xhtml: false
        })
    ]
};

module.exports = config;