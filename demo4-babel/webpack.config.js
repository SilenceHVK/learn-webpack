const path = require('path');

const resolve = p => path.join(__dirname, p);

module.exports = {
  mode: 'development',
  entry: {
    app: resolve('./app.js'),
  },
  output: {
    path: resolve('dist'),
    filename: '[name].[hash:5].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                // useBuiltIns: 'usage',
                targets: {
                  browsers: ['ie>=9'],
                },
              },
            ],
          ],
          plugins: ['@babel/plugin-transform-runtime'],
        },
      },
    ],
  },
};
