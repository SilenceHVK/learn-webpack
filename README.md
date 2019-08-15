## 什么是 webpack

&ensp;&ensp; webpack 是德国开发者 Tobias Koppers 开发的**模块加载器**。

&ensp;&ensp;在 webpack 中所有的文件都将被当做模块使用。当 webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有的这些模块打包成一个或多个 bundle。如图所示：
![webpack能做什么](https://github.com/SilenceHVK/Articles/raw/master/assets/images/learn-webpack/what-is-webpack.png)

## 与 Gulp/Grunt 对比

&ensp;&ensp;webpack 与 Gulp/Grunt 是没有对比性的,因为 Gulp/Grunt 是一种能够优化前端的开发流程的工具，而 webpack 是一种模块化的解决方案。不过 Webpack 的优点使得 Webpack 在很多场景下可以替代 Gulp/Grunt 类的工具。

&ensp;&ensp;Grunt 和 Gulp 的工作方式是：在一个配置文件中，指明对某些文件进行类似编译，组合，压缩等任务的具体步骤，工具之后可以自动替你完成这些任务。

![Grunt和Gulp工作图](https://github.com/SilenceHVK/Articles/raw/master/assets/images/learn-webpack/gulp-grunt.png)

&ensp;&ensp;webpack 的工作方式是：把你的项目当做一个整体，通过一个给定的主文件（如：index.js），Webpack 将从这个文件开始找到你的项目的所有依赖文件，使用 loaders 处理它们，最后打包为一个（或多个）浏览器可识别的 JavaScript 文件。

![webpack工作图](https://github.com/SilenceHVK/Articles/raw/master/assets/images/learn-webpack/webpack-work-charts.png)

## webpack 的安装及使用 （[Demo1 Source](https://github.com/SilenceHVK/learn-webpack/tree/master/demo1)）

1. 通过 npm 全局安装 webapck

```bash
    $ npm install -g webpack
```

2. 创建项目并初始化 package.json 文件

```bash
    $ mkdir demo1 && cd demo1
    $ npm init
```

3. 在项目中安装 webpack

```bash
    $ npm install webpack --save-dev
```

> --save-dev 是开发时候依赖的东西，--save 是发布之后还依赖的东西

4. 在项目中创建如下文件结构

   <pre>
   .
   ├── index.html  // 显示的网页
   ├── main.js    // webpack 入口
   └── bundle.js // 通过 webpack 命令生成的文件，无需创建
   </pre>

5. 通过命令对项目中依赖的 js 文件进行打包

```bash
    # webpack 要打包的 js 文件名  打包后生成的js文件名
    $ webpack main.js bundle.js
```

&ensp;&ensp;在 webpack 命令后面还可以加入以下参数

- `--watch` 实时打包
- `--progress` 显示打包进度
- `--display-modules` 显示打包的模块
- `--display-reasons` 显示模块包含在输出中的原因

&ensp;&ensp;更多参数可以通过命令 `webpack --help` 查看

## webpack 中的四个核心概念 （[Demo2 Source](https://github.com/SilenceHVK/learn-webpack/tree/master/demo2)）

- `Entry` 入口
- `Output` 输出
- `Loaders`
- `Plugins` 插件

&ensp;&ensp;webpack 中默认的配置文件名称是 `webpack.config.js`，因此我们需要在项目中创建如下文件结构：

<pre>
.
├── index.html            // 显示的页面
├── main.js              // webpack 入口
├── webpack.config.js   //  webpack 中默认的配置文件
└── bundle.js          //  通过 webpack 命令生成的文件，无需创建
</pre>

### `entry` 入口

&ensp;&ensp;入口起点（entry point）指示 `webpack` 应该使用哪个模块，来作为构建其内部依赖图的开始。进入入口起点后。 `webpack` 会找出有哪些模块和库是入口起点（直接和间接）依赖的。

&ensp;&ensp;可以在 `webpack.config.js` 中 配置 `entry` 属性，来指定一个入口或多个起点入口，代码如下:

```javascript
moudle.exports = {
  entry: './path/file.js',
};
```

### `output` 输出

&ensp;&ensp; `output` 属性告诉 `webpack` 在哪里输出它所创建的 `bundles`，以及如何命名这些文件。你可以通过在配置指定一个 `output` 字段，来配置这些过程：

```javascript
const path = require('path');

moudle.exports = {
  entry: './path/file.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-webpack.bundle.js',
  },
};
```

&ensp;&ensp;其中 `output.path` 属性用于指定生成文件的路径，`output.filename` 用于指定生成文件的名称。

### `Loaders`

&ensp;&ensp; `Loaders` 让 `webpack` 能够去处理那些非 `JavaScript` 文件（`webpack` 自身只理解 JavaScript）。`loader` 可以将所有类型的文件转换为 `webpack` 能够处理的有效模块，然后可以利用 `webpack` 的打包能力，对它们进行处理。

&ensp;&ensp;本质上，`webpack loader` 将所有类型的文件，转换为应用程序的依赖图可以直接引用模块。在更高层面上，在 `webpack` 的配置中 `loader` 有两个目标：

1. 识别应该被对应的 `loader` 进行转换的那些文件（使用 `test` 属性）
2. 转换这些文件，从而使其能够被添加到依赖图中（并且最终添加到 `bundle` 中）(`use` 属性)

&ensp;&ensp;在开始下面的代码之前，我们需要安装 [style-loader](https://www.npmjs.com/package/style-loader) 和 [css-loader](https://www.npmjs.com/package/css-loader)

```bash
    $ npm install --save-dev style-loader css-loader
```

并在项目中创建 `style.css` 样式文件:

```css
h1 {
  color: red;
}
```

&ensp;&ensp;然后在 `webpack.config.js` 中输入以下代码：

```javascript
const path = require('path');

module.export = {
  entry: './main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
      },
    ],
  },
};
```

### `Plugins` 插件

&ensp;&ensp; `Loaders` 被用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量。

&ensp;&ensp;想要使用一个插件，需要 `require()` 它，然后把它添加到 `Plugins` 数组中，多数插件可以通过选项自定义。也可以在一个配置文件中因为不同目的而多次使用同一个插件，这时需要通过使用 `new` 操作符来创建它的实例。

&ensp;&ensp;在开始下面的代码之前，我们需要安装 [html-webpack-plugin](https://www.npmjs.com/package/html-webpack-plugin) 插件：

```bash
    $ npm install html-webpack-plugin --save-dev
```

它可以简化 HTML 文件的创建，为您的 webpack 包提供服务。

&ensp;&ensp;然后在 `webpack.config.js` 中输入以下代码：

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const config = {
  entry: './main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin({ template: './index.html' })],
};

module.exports = config;
```

### 运行与配置

&ensp;&ensp; 最后我们可以直接通过 `webpack` 命令编译打包,如果想要在其命令后加入参数，可以通过配置 `package.json` 文件中的 `scripts` 属性：

```json
{
  "scripts": {
    "build": "webpack --config webpack.config.js --progress --display-modules"
  }
}
```

当然如果你想要更改默认的配置文件名称，可以将 `--config` 后面的 `webpack.config.js` 配置文件名改为你自定义的名称。

&ensp;&ensp;通过以下命令执行：

```bash
    $ npm run build
```

## 多入口设置与 html-webpack-pugin 插件详解（[Demo3 Source](https://github.com/SilenceHVK/learn-webpack/tree/master/demo3))

&ensp;&ensp;我们可以为 `entry` 指定多个入口。在开始代码之前，我们需要创建如下目录解构

<pre>
.
├── index.html            // 显示的页面
├── main1.js             // webpack 入口1
├── main1.js            // webpack 入口2
├── style.css          // 样式文件
└── webpack.config.js // webpack 中默认的配置文件
</pre>

&ensp;&ensp;我们在 `index.html` 文件中输入以下内容：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>demo3</title>
  </head>
  <body></body>
</html>
```

&ensp;&ensp;我们在 `main1.js` 文件中输入以下内容：

```javascript
    improt './style.css'

    var h1 = document.createElement('h1');
    h1.innertHTML = '这是 main1.js 中的内容';
    document.body.appendChild(h1);
```

&ensp;&ensp;我们在 `main2.js` 文件中输入以下内容：

```javascript
    improt './style.css'

    var h2 = document.createElement('h2');
    h2.innertHTML = '这是 main2.js 中的内容';
    document.body.appendChild(h2);
```

&ensp;&ensp;我们在 `style.css` 文件中输入以下内容：

```css
h1 {
  color: red;
}
h2 {
  color: blue;
}
```

&ensp;&ensp;我们在 `webpack.config.js` 文件中输入以下内容：

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const config = {
  entry: {
    bundle1: './main1.js',
    bundle2: './main2.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [{ test: /\.css$/, loader: 'style-loader!css-loader' }],
  },
  pugins: [new HtmlWebpackPlugin({ template: './index.html' })],
};

module.exports = config;
```

&ensp;&ensp;完成上面的代码工作后，运行 `webapck` 命令，我们打开 `dist` 文件中的 `index.html`。
![index.html 运行结果](https://github.com/SilenceHVK/Articles/raw/master/assets/images/learn-webpack/demo3-the-result-of-the-operation-1.png)

运行的结果并不是我们预期的那样展示 `h1` 的内容在前，`h2` 内容在后，打开生成后的 `index.html` 源码：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>demo3</title>
  </head>
  <body>
    <script type="text/javascript" src="bundle2.js"></script>
    <script type="text/javascript" src="bundle1.js"></script>
  </body>
</html>
```

从源码中便可得知，先引入的 `bundle2.js` 文件，也就是 `main2.js` 的内容，后引入的 `bundle1.js` 文件，也就是 `main1.js` 的内容。

&ensp;&ensp;我们并没有在 `index.html` 中输入任何引入 `JavaScript` 文件的代码，那么使用 `webpack` 打包后生成的文件，是怎么引入 `JavaScript` 文件的呢。事实上就是通过 [html-webpack-plugin](https://www.npmjs.com/package/html-webpack-plugin) 为我们生成的 `index.html` 。

### `html-webpack-plugin` 中的参数详解

&ensp;&ensp;通过 `npm` 中的介绍，[html-webpack-plugin](https://www.npmjs.com/package/html-webpack-plugin) 是一个 `webpack` 插件，可以简化 `HTML` 文件的创建，为我们的 `webpack` 包提供服务，它包含了一个改变每个编译的文件名参数。使用 `lodash` 模板提供我们自己的模板或者使用自己的 `loader`。

&ensp;&ensp;我们可以配置以下参数传递给 `HtmlWebpackPlugin`：

- `title`: 用于生成的 `HTML` 文档的标题。
- `filename`: 要写入 `HTML` 的文件。默认为 `index.html` 。你也可以在这里指定一个子目录（例如：assets / admin.html）。
- `template`: 引入的模板文件，具体内容可以查看[文档](https://github.com/jantimon/html-webpack-plugin/blob/master/docs/template-option.md)。
- `inject`: `true | 'head' | 'body' | false`，指定引入 `JavaScript` 脚本文件，在生成的`HTML` 中的位置。默认为 true，指`JavaScript` 脚本文件在 `<body>` 元素中引入；`head` ，指`JavaScript` 脚本文件在 `<head>` 元素中引入，`body` 与 `true` 值相同；`false` 指只生成 `HTML` 文件，不引入任何`JavaScript` 脚本文件。
- `favicon`: 生成的 `HTML` 文件中的图标路径。
- `minify`: `{...} | false` 是否对生成的 `HTML` 文件压缩，默认为 `false`,具体配置可查看 [ html-minifier](https://github.com/kangax/html-minifier#options-quick-reference)
- `hash`: `true | false` ，如果为 `true` ，给生成的 js 文件一个独特的 hash 值，该 hash 值是该次 webpack 编译的 hash 值,这对缓存清除非常有用。默认值为 `false`。
- `cache`: `true | false`， 如果为 `true` 则只编译生成更改的内容将文件,默认值为 `true`。
- `showErrors`:`true | false`，如果为 `true`,则将错误内容添加到 `HTML` 中,默认值为 `true`。
- `chunks`: 指定引入的 `JavaScript` 脚本文件（例如：[ 'bundle1', 'bundle2' ]）。
- `chunksSortMode`: `'none' | 'auto' | 'dependency' |'manual' | {function} - default: 'auto'`，对引入的 `chunks` 进行排序,具体可以查看该[文档](https://github.com/jantimon/html-webpack-plugin/issues/481)。
- `excludeChunks`: 排除掉指定的 `JavaScript` 脚本文件（例如：[ 'bundle1', 'bundle2' ]）。
- `xhtml`: `true | false`，默认值是 `false` ，如果为 `true` ,则以兼容 `xhtml` 的模式引用文件。

&ensp;&ensp;现在我们知道了 [html-webpack-plugin](https://www.npmjs.com/package/html-webpack-plugin) 中的参数，下面我们就来修改 `webpack.config.js` 中的内容:

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const config = {
  entry: {
    bundle1: path.resolve(__dirname, 'main1.js'),
    bundle2: path.resolve(__dirname, 'main2.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [{ test: /\.css$/, loader: 'style-loader!css-loader' }],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: '多文件引入', // 生成 html 的标题
      filename: 'index.html', // 生成 html 文件的名称
      template: path.resolve(__dirname, 'index.html'), // 根据自己的指定的模板文件来生成特定的 html 文件
      // inject: true, // 注入选项 有四个值 ture: 默认值，script标签位于html文件的 body 底部, body: 同 true, head: script标签位于html文件的 head 底部,false:不注入script标签
      favicon: path.resolve(__dirname, 'favicon.ico'), // 生成的 html 文件设置 favicon
      minify: {
        caseSensitive: false, //是否大小写敏感
        collapseBooleanAttributes: true, //是否简写boolean格式的属性如：disabled="disabled" 简写为disabled
        collapseWhitespace: true, //是否去除空格
      },
      hash: true, // hash选项的作用是 给生成的 js 文件一个独特的 hash 值，该 hash 值是该次 webpack 编译的 hash 值。默认值为 false
      cache: true, // 默认值是 true。表示只有在内容变化时才生成一个新的文件
      showErrors: true, // showErrors 的作用是，如果 webpack 编译出现错误，webpack会将错误信息包裹在一个 pre 标签内，属性的默认值为 true
      chunks: ['bundle1', 'bundle2'], // 指定引入的 js 文件
      //excludeChunks:[ 'bundle1' ], // 排除掉某些 js 文件
      /**
       * script 标签的引用顺序
       * 'dependency' 按照不同文件的依赖关系来排序
       * 'auto' 默认值，插件的内置的排序方式
       * 'none'
       * 'manual'
       * funciton 自定义排序，与JS中自定义数组的sort回调一个含义, 具体可以看 https://github.com/jantimon/html-webpack-plugin/issues/481
       */
      chunksSortMode: function(chunk1, chunk2) {
        var orders = ['bundle1', 'bundle2'];
        var order1 = orders.indexOf(chunk1.names[0]);
        var order2 = orders.indexOf(chunk2.names[0]);
        return order1 - order2;
      },
      xhtml: false, // 一个布尔值，默认值是 false ，如果为 true ,则以兼容 xhtml 的模式引用文件
    }),
  ],
};

module.exports = config;
```

&ensp;&ensp;完成上面的代码工作后，运行 `webapck` 命令，我们打开 dist 文件中的 index.html。
![index.html 运行结果](https://github.com/SilenceHVK/Articles/raw/master/assets/images/learn-webpack/demo3-the-result-of-the-operation-2.png)
&ensp;&ensp;Nice!与我们的预期效果显示一致。在对 [html-webpack-plugin](https://www.npmjs.com/package/html-webpack-plugin) 的介绍中，提到了 `lodash` 模板, 那么该怎么用呢？我们再次修改 `webpack.config.js` 中的内容，为 `HtmlWebpackPlugin` 传入 `Date` 参数:

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const config = {
  entry: {
    bundle1: path.resolve(__dirname, 'main1.js'),
    bundle2: path.resolve(__dirname, 'main2.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [{ test: /\.css$/, loader: 'style-loader!css-loader' }],
  },
  plugins: [
    new HtmlWebpackPlugin({
      date: new Date(),
      title: '多文件引入', // 生成 html 的标题
      filename: 'index.html', // 生成 html 文件的名称
      template: path.resolve(__dirname, 'index.html'), // 根据自己的指定的模板文件来生成特定的 html 文件
      // inject: true, // 注入选项 有四个值 ture: 默认值，script标签位于html文件的 body 底部, body: 同 true, head: script标签位于html文件的 head 底部,false:不注入script标签
      favicon: path.resolve(__dirname, 'favicon.ico'), // 生成的 html 文件设置 favicon
      minify: {
        caseSensitive: false, //是否大小写敏感
        collapseBooleanAttributes: true, //是否简写boolean格式的属性如：disabled="disabled" 简写为disabled
        collapseWhitespace: true, //是否去除空格
      },
      hash: true, // hash选项的作用是 给生成的 js 文件一个独特的 hash 值，该 hash 值是该次 webpack 编译的 hash 值。默认值为 false
      cache: true, // 默认值是 true。表示只有在内容变化时才生成一个新的文件
      showErrors: true, // showErrors 的作用是，如果 webpack 编译出现错误，webpack会将错误信息包裹在一个 pre 标签内，属性的默认值为 true
      chunks: ['bundle1', 'bundle2'], // 指定引入的 js 文件
      //excludeChunks:[ 'bundle1' ], // 排除掉某些 js 文件
      /**
       * script 标签的引用顺序
       * 'dependency' 按照不同文件的依赖关系来排序
       * 'auto' 默认值，插件的内置的排序方式
       * 'none'
       * 'manual'
       * funciton 自定义排序，与JS中自定义数组的sort回调一个含义, 具体可以看 https://github.com/jantimon/html-webpack-plugin/issues/481
       */
      chunksSortMode: function(chunk1, chunk2) {
        var orders = ['bundle1', 'bundle2'];
        var order1 = orders.indexOf(chunk1.names[0]);
        var order2 = orders.indexOf(chunk2.names[0]);
        return order1 - order2;
      },
      xhtml: false, // 一个布尔值，默认值是 false ，如果为 true ,则以兼容 xhtml 的模式引用文件
    }),
  ],
};

module.exports = config;
```

更改 `index.html` 中的内容，`lodash` 模板默认支持的是 `ejs` 模板的语法:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>demo3</title>
  </head>
  <body>
    <%= htmlWebpackPlugin.options.date %>
  </body>
</html>
```

&ensp;&ensp;完成上面的代码工作后，运行 `webapck` 命令，我们打开 dist 文件中的 index.html。
![index.html 运行结果](https://github.com/SilenceHVK/Articles/raw/master/assets/images/learn-webpack/demo3-the-result-of-the-operation-3.png)

&ensp;&ensp;通过运行结果，我们可以发现在顶部输出了当前时间，也就是 `HtmlWebpackPlugin` 传入的参数，实际上 `HtmlWebpackPlugin` 中的参数都可以通过 `htmlWebpackPlugin.options.参数名称` 输出，我就不一一列举。

## Babel

&ensp;&ensp;Babel 是一个工具链，主要用于在旧的浏览器或环境中将 ECMAScript 2015+ 代码转换为向后兼容版本的 JavaScript 代码。

安装依赖包

```bash
npm i -D babel-loader @babel/core @babel/preset-env
```

- `babel-loader`：用于 babel 在 webapck 中的加载模块。
- `@babel/core`：babel 编译工具；
- `@babel/preset-env`：babel 生成指定支持浏览器版本的编译工具。

babel 支持两种配置，一种是在项目根目录下创建 `.babelrc` 配置文件，另一种是通过 webpack loader options 的方式配置

- .babelrc

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        // 用于指定浏览器版本号
        "targets": {
          "browsers": "last 2 version"
        }
      }
    ]
  ]
}
```

- webpack loader options 配置

```json
{
  "module": {
    "rules": [
      {
        "test": /\.js$/,
        "exclude": /(node_modules)/,
        "loader": "babel-loader",
        "options": {
          "presets": [
            [
              "@babel/preset-env",
              {
                // 用于指定浏览器版本号
                "targets": {
                  "browsers": "last 2 version"
                }
              }
            ]
          ]
        }
      }
    ]
  }
}
```

**Babel 默认只转换语法，而不转换新的 API，如 Set、Promise、Map 等或是 ES6 对 Array、String 等扩展，如果需要使用新的 API 还需要使用对相应的 转换插件 或 polyfill**

- Babel Polyfill

```bash
npm i --save @babel/polyfill
```

只需在入口头部引入即可

```javascript
import '@babel/polyfill';
// 或
require('@babel/polyfill');
```

> 上面的使用方法，会导致打包后的文件过大，由于是在入口文件直接引入 polyfill，从而将会导入 polyfill 整个包，增加了无用代码。

`@babel/preset-env` 中 `useBuiltIns: 'usage'` 按需引入，就是用于解决上面的问题。

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        // 用于指定浏览器版本号
        "targets": {
          "browsers": "last 2 version"
        },
        "useBuiltIns": "usage"
      }
    ]
  ]
}
```

**@babel/polyfill 是通过改写全局 prototype 的方式对新的 API 支持，比较适合单独运行的项目。**

- Babel RunTime Transform

```bash
npm i @babel/runtime --save
npm i @babel/plugin-transform-runtime --save-dev
```

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        // 用于指定浏览器版本号
        "targets": {
          "browsers": "last 2 version"
        }
      }
    ]
  ],
  "plugins": ["@babel/plugin-transform-runtime"]
}
```

**@babel/runtime 的 polyfill 对象是临时构造并 import/require 的，因此并不是真正的全局引用，由于不是全局引用，对于实例化对象的方法，并不能生效。比较适合编写 第三方类库。**

## 文件操作

`file-loader` 可以解析项目中的 url 引入（不禁限于 CSS），根据配置，将图片拷贝到相应路径，并修改打包后文件的引用路径。

```json
{
  "test": /\.(png|jpe?g|gif)$/,
  "loader": "file-loader",
  "options": {
    // 输出文件名称，默认为：'[hash].[ext]'
    "name": "[name].[hash:8].[ext]",
    // 指定输出文件存放路径，默认为当前目录
    "outputPath": "assets/images",
    // 指定输出文件 公共路径
    // publicPath: '../',
    // 如果是 true，生成一个文件（向文件系统写入一个文件）。 如果是 false，loader 会返回 public UR不会生成文件
    "emitFile": true
  }
}
```

`url-loader` 与 `file-loader` 的作用是一样的，但是 `url-loader` 可以通过 `limit` 配置限制输出大小，如果小于 limit 字节的文件会被转成 Base64 编码，大于则会拷贝文件。

```json
{
  "test": /\.(png|jpe?g|gif)$/,
  "loader": "url-loader",
  "options": {
    // 限制输出文件大小，如果输出文件小于该限制，则被转成 base64 编码，大于则会拷贝文件
    "limit": 1024,
    // 输出文件名称，默认为：'[hash].[ext]'
    "name": "[name].[hash:8].[ext]",
    // 指定输出文件存放路径，默认为当前目录
    "outputPath": "assets/images"
    // 指定输出文件 公共路径
    // publicPath: '../',
  }
}
```

`img-loader` 可以压缩图片，也可以使用 `image-webpack-loader` 代替。

```bash
npm i -D img-loader imagemin imagemin-gifsicle imagemin-mozjpeg imagemin-pngquant imagemin-svgo
```

插件具体参数可以查看 github

- [imagemin-gifsicle](https://github.com/imagemin/imagemin-gifsicle)
- [imagemin-mozjpeg](https://github.com/imagemin/imagemin-mozjpeg)
- [imagemin-pngquant](https://github.com/imagemin/imagemin-pngquant)
- [imagemin-svgo](https://github.com/imagemin/imagemin-svgo)

```json
{
  "loader": "img-loader",
  "options": {
    "plugins": [
      require("imagemin-gifsicle")({}),
      require("imagemin-mozjpeg")({}),
      require("imagemin-pngquant")({}),
      require("imagemin-svgo")({})
    ]
  }
}
```

`html-loader` 可以设置 html 中的某些片段是要交给 webpack 处理的。

```json
{
  "test": /\.html$/,
  "loader": "html-loader",
  "options": {
    // 设置交由 webpack 处理的属性
    "attrs": ["img:src", "img:data-src"]
  }
}
```

当我们在使用第三方库时，如果每个模块都用到了它，但我们并不想在每个模块中重复去写 `import` 或 `require`
，我们可以使用下面两种方式：

- `webpack.ProvidePlugin`

```json
{
  "resolve": {
    "alias": {
      // 定义别名 指定本地文件路径，$ 表示将 jquery 关键字解析到某个目录的文件下，而不是解析某个目录
      "jquery$": path.join(__dirname, "./lib/jquery.min.js")
    }
  },
  "plugins": [
    new webpack.ProvidePlugin({
      // "$": "jquery", // 导入 npm 依赖包
      // "$": ["./lib/jquery.min.js"] // 指定本地文件路径
      "$": "jquery"
    })
  ]
}
```

- `imports-loader`

```bash
npm i imports-loader
```

```json
{
  "test": /\.js$/,
  "loader": "imports-loader",
  "options": {
    "$": "jquery"
  }
}
```
