使用webpack创建单页应用
### 1.webpack简介
webpack 是一个用于现代 JavaScript 应用程序的静态模块打包工具。当 webpack 处理应用程序时，它会在内部构建一个依赖图(dependency graph)，此依赖图对应映射到项目所需的每个模块，并生成一个或多个 bundle。
### 2.核心概念
* 入口(entry)：指示 webpack 应该使用哪个模块，来作为构建其内部依赖图(dependency graph) 的开始
* 输出(output)：告诉 webpack 在哪里输出它所创建的 bundle，以及如何命名这些文件
* loader：webpack 只能理解 JavaScript 和 JSON 文件，loader让 webpack 能够去处理其他类型的文件，如：css，sass，image
* 插件(plugin)：loader 用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。包括：打包优化，资源管理，注入环境变量
* 模式(mode)：通过选择 development, production 或 none 之中的一个，来设置 mode 参数，以便针对不同环境进行优化
* 浏览器兼容性(browser compatibility)：webpack 支持所有符合 ES5 标准 的浏览器（不支持 IE8 及以下版本）
### 3. 安装
如果使用 webpack v4+ 版本，除webpack自身外，还需要安装 CLI（webpack cli）
全局安装
```npm install --global webpack```
本地安装
```npm install --save-dev webpack webpack-cli```
### 4.创建项目
```
mkdir demo-webpack && cd demo-webpack
npm init -y
npm install webpack webpack-cli --save-dev
```
#### 4.1目录结构
目录结构如下：
src                 项目文件
    - js
    - images
    - css
    - index.html
package.json        包管理文件
#### 4.2 下载需要的loader(css,image,es6)
由于webpack只能处理js和json文件，不能处理css和image，所以我们得先在webpack.config.js添加处理html，css和image的loader
- html-loader 处理html文件的img图片（负责引入img,<img src="image.png"> 变为 const img = require('./image.png') 或者 import img from "./image.png""，使其能被url-loader/file-loader处理）
- css-loader 处理css文件
- style-loader 处理css样式
- url-loader  处理图片(同时需要安装file-loader，以便处理大图片 )
```
npm install --save-dev html-loader css-loader style-loader url-loader file-loader
```

如果页面中的js用到es6语法，需要使用babel先进行解析
```
npm install --save-dev babel-loader @babel/core @babel/preset-env 
```
#### 4.3 下载需要的插件
- html-webpack-plugin   复制html模板，并自动插入打包好的文件
- clean-webpack-plugin  清空dist目录下文件
```
npm install --save-dev html-webpack-plugin clean-webpack-plugin 
```
#### 4.4 配置webpack
由于我们要区分开发环境和生产环境，所以使用两个不同的配置文件，配置文件统一放在build文件下
结构如下：
build    配置文件存储目录
    - webpack.common.js  公共配置文件
    - webpack.prod.js    生产环境配置文件
    - webpack.dev.js     开发环境公共配置文件

由于我们把公共部分分开了，所以需要合并配置，此时需要安装webpack-merge，配置好后在开发环境需要启动服务，所以还要安装webpack-dev-serve
```
npm install --save-dev webpack-merge
```

具体配置信息见：[配置文件信息](),配置中有详细的介绍
### 5.整体项目目录如下
build    配置文件存储目录
    - webpack.common.js  公共配置文件
    - webpack.prod.js    生产环境配置文件
    - webpack.dev.js     开发环境公共配置文件
src                 项目文件
    - js
    - images
    - css
    - index.html
package.json        包管理文件
### 6.多页面应该
目前该项目只有一个页面，如果是多个页面，需要在入口配置多个入口，同时使用html-webpack-plugin配置多页面，如：
```
entry: {
    main: './src/index.js',
    about: './src/about.js'
}

plugins: [
    new HtmlWebpackPlugin(
        {
            template：'./src/index.html'
            title: 'demo-webpack',
            filename: 'index.html',
            chunks: ['index','vendors']  //index为入口文件js名称，vendors为属性splitChunks-cacheGroups-vendor-name的值
        }
    ),
    new HtmlWebpackPlugin(
        {
            template：'./src/about.html'
            title: '关于我们',
            filename: 'about.html',
            chunks: ['contact']
        }
    ),
]
```

