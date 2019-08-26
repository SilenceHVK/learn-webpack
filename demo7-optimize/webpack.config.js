const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    pageA: './pageA.js',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'assets/scripts/[name].bundle.js',
    chunkFilename: 'assets/scripts/[name].chunk.js',
    publicPath: './dist/',
  },
  plugins: [new CleanWebpackPlugin()],

  // optimization: {
  //   splitChunks: {
  //     minSize: 1,
  //     cacheGroups: {
  //       common: {
  //         name: 'common',
  //         chunks: 'all',
  //         priority: 0,
  //         reuseExistingChunk: true,
  //       },
  //       vendor: {
  //         name: 'vendor',
  //         test: /[\\/]node_modules[\\/]/,
  //         chunks: 'all',
  //         priority: 10,
  //       },
  //     },
  //   },
  // },
};
