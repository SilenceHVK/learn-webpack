const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const resolve = p => path.join(__dirname, p);

module.exports = {
  mode: 'production',
  entry: {
    app: resolve('./index.js'),
  },
  output: {
    path: resolve('dist'),
    publicPath: './',
    filename: 'bundle.[hash:8].js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      // {
      //   test: /\.(png|jpe?g|gif)$/,
      //   // loader: 'file-loader',
      //   loader: 'url-loader',
      //   options: {
      //     // 限制输出文件大小，如果输出文件小于该限制，则被转成 base64 编码，大于则会拷贝文件
      //     limit: 1024,
      //     // 输出文件名称，默认为：'[hash].[ext]'
      //     name: '[name].[hash:8].[ext]',
      //     // 指定输出文件存放路径，默认为当前目录
      //     outputPath: 'assets/images',
      //     // 指定输出文件 公共路径
      //     // publicPath: '../',
      //     // // 如果是 true，生成一个文件（向文件系统写入一个文件）。 如果是 false，loader 会返回 public URI，但不会生成文件
      //     // emitFile: true,
      //   },
      // },

      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: '[name].[hash:8].[ext]',
              outputPath: 'assets/images',
            },
          },
          {
            loader: 'img-loader',
            options: {
              plugins: [
                require('imagemin-mozjpeg')({
                  quality: '30',
                }),
                require('imagemin-pngquant')({
                  optimizationLevel: 5,
                }),
              ],
            },
          },
        ],
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        options: {
          attrs: ['img:src', 'img:data-src'],
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Demo5-webapck 文件操作',
      template: resolve('./index.html'),
    }),
    new CleanWebpackPlugin(),
  ],
};
