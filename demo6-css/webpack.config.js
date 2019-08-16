const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const resolve = p => path.join(__dirname, p);

module.exports = {
  mode: 'production',
  entry: {
    app: resolve('./index.js'),
  },
  output: {
    filename: 'assets/js/bundle.[hash:8].js',
    path: resolve('dist'),
    publicPath: './',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          process.env.NODE_ENV === 'development'
            ? 'style-loader'
            : {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  publicPath: '../../',
                },
              },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              // plugins: [require('autoprefixer')],
              plugins: [require('postcss-preset-env')],
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|svg|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 10,
          name: '[name].[hash:8].[ext]',
          outputPath: 'assets/images',
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Demo6 CSS',
      template: resolve('./index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/styles/[name].[hash:8].css',
      thunkFilename: 'assets/styles/[id].[hash:8].css',
    }),
    // new OptimizeCssAssetsPlugin({
    //   // 匹配需要压缩的 CSS 文件正则，默认为 /\.css$/g
    //   // assetNameRegExp: /\.optimize\.css$/g,
    //   // 设置 CSS 压缩工具 默认使用的是  cssnano
    //   // cssProcessor: require('cssnano'),
    //   // 设置 CSS 压缩工具的 options ,默认 {}
    //   // cssProcessorOptions: {},
    //   // 设置 CSS 压缩工具插件的 options， 默认 {}
    //   // cssProcessorPluginOptions: {},
    //   // 插件输出信息是否输出在控制台，默认 true
    //   // canPrint: true,
    // }),
  ],
};
