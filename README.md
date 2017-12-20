# Learn-Webpack [阅读中文](https://github.com/SilenceHVK/articles/issues/20)

## About Webpack 
&ensp;&ensp; Webpack is module loader developed by German developer Tobias Koppers.

&ensp;&ensp; All files in webpack will be used as modules. When webpack processes an application, it recursively builds a dependency graph that contains every module the application needs, and then packages all those modules into one or more bundles.

![What can webpack do?](http://images.cnblogs.com/cnblogs_com/hvkcode/966655/o_what-is-webpack.png)

## Contrast with Gulp/Grunt
&ensp;&ensp; Webpack is not comparable to Gupl/Grunt because Gupl/Grunt is a tool that optimizes the front-end development process and webpack is a modular solution. However, the advantages of webpack make webpack in many scenarios can replace Gulp/Grunt category of tools.

&ensp;&ensp; Grunt and Gulp work in the following ways: In a configuration file,you specify the specific steps to perform similar tasks such as compiling, assembling, and compressing certain files taht the tool can then automate for you.

![Grunt and Gulp work charts](http://images.cnblogs.com/cnblogs_com/hvkcode/966655/o_gulp-grunt.png)

&ensp;&ensp; Webpack work in the following ways: Think of your project as a whole, and through a given master file (eg,index.js), Webpack will find all the dependencies for your project from this file, process them with loaders, and finally package it into on (or more) browser-aware JavaScript file.

![webpack work charts](http://images.cnblogs.com/cnblogs_com/hvkcode/966655/o_1031000-160bc667d3b6093a.png)

## webpack installation and use

1. Install [webpack](https://www.npmjs.com/package/webpack) golbally via npm.
```bash
    $ npm install -g webpack
```

2. Create the project and initialize the package.json file.
```bash
    $ mkdir demo1 && cd demo1
    $ npm init
```

3. Install webpack in the project
```bash
    $ npm install webpack --save-dev
```
> --save-dev is dependent on the development time, - save is also dependent on the release of things

4. Create the following file structure in the project
<pre>
.        
├── index.html  // 显示的网页
├── main.js    // webpack 入口
└── bundle.js // 通过 webpack 命令生成的文件，无需创建
</pre>

5. Package the js files dependent on the project with the command
```bash
    # webpack Js file name to be packaged. Generated after the package js file name.
    $ webpack main.js bundle.js
```