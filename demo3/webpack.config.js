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
            title: '多文件引入', // 生成 html 的标题
            filename: 'index.html',// 生成 html 文件的名称 
            template: path.resolve(__dirname,'index.html'), // 根据自己的指定的模板文件来生成特定的 html 文件 
            // inject: true, // 注入选项 有四个值 ture: 默认值，script标签位于html文件的 body 底部, body: 同 true, head: script标签位于html文件的 head 底部,false:不注入script标签
            favicon: path.resolve(__dirname,'favicon.ico'), // 生成的 html 文件设置 favicon
            minify: {
                caseSensitive: false, //是否大小写敏感
                collapseBooleanAttributes: true, //是否简写boolean格式的属性如：disabled="disabled" 简写为disabled 
                collapseWhitespace: true //是否去除空格
            },
            hash: true, // hash选项的作用是 给生成的 js 文件一个独特的 hash 值，该 hash 值是该次 webpack 编译的 hash 值。默认值为 false
            cache: true, // 默认值是 true。表示只有在内容变化时才生成一个新的文件
            showErrors: true, // showErrors 的作用是，如果 webpack 编译出现错误，webpack会将错误信息包裹在一个 pre 标签内，属性的默认值为 true
            chunks: [ 'bundle1', 'bundle2' ], // 指定引入的 js 文件
            //excludeChunks:[ 'bundle1' ], // 排除掉某些 js 文件
            /**
             * script 标签的引用顺序
             * 'dependency' 按照不同文件的依赖关系来排序
             * 'auto' 默认值，插件的内置的排序方式
             * 'none'
             * 'manual'
             * funciton 自定义排序，与JS中自定义数组的sort回调一个含义, 具体可以看 https://github.com/jantimon/html-webpack-plugin/issues/481
             */
            chunksSortMode: function(chunk1,chunk2){
                var orders = [ 'bundle1' , 'bundle2' ];
                var order1 = orders.indexOf(chunk1.names[0]);
                var order2 = orders.indexOf(chunk2.names[0]);
                return order1 - order2;
            },
            xhtml: false // 一个布尔值，默认值是 false ，如果为 true ,则以兼容 xhtml 的模式引用文件
        })
    ]
};

module.exports = config;