const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const config = {
    target: 'web',
    mode: 'development',
    entry: path.join(__dirname, 'main.js'),
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist')
    },
    devtool: 'cheap-module-eval-source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': '"development"'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(), // / HMR shows correct file names in console on update.
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin()
    ],
    devServer: {
        clientLogLevel: 'warning',
        port: 3000,
        host: '0.0.0.0',
        contentBase: false, // since we use CopyWebpackPlugin.
        compress: true,
        // 当存在编译器错误或警告时，在浏览器中显示全屏叠加
        overlay: {
            errors: true,
            warnings: false
        },
        quiet: true, // 除启动内容外，其内容不会显示在控制台
        open: true,  // dev-server 打开浏览器
        hot: true,   //
        watchOptions: {
            poll: true
        }
    }
};

module.exports = config;