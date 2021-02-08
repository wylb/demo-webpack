const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugins = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: './src/index.js',
    },
    output: {
        filename: '[name]_[contenthash].js',  //入口文件和内容hash组成的文件名  默认为bundle.js
        chunkFilename: '[name]_[contenthash].chunk.js',  //分离出的公共插件名称
        path: path.resolve(__dirname, '../dist')  //导出文件的路径
    },
    module:{  
        rules: [    //从下到上，从右到左解析
            // 将es6编译成es5
            { 
                test: /\.jsx?$/,   // ?表示x有0个或一个
                exclude: /node_modules/,  // 不编译某个目录下的文件
                include: path.resolve(__dirname, '../src'),  // 只在include包含的目录下进行loader编译
                use: [
                    "babel-loader",
                ]
            },
            //处理图片
            {   
                test: /\.(jpg|png|gif)$/,
                loader: 'url-loader',  //使用一个loader  file-loader也可加载图片，但不优化
                options:{
                    //图片大小小于8kb就会使用base64处理
                    //优点：减少http请求（减少服务器压力）
                    //缺点：图片体积会更大（加载慢）
                    limit: 8*1024,
                    //因为url-loader默认使用es6模块化解析，而html-loader引入图片是commonJs方式，解析时会出问题【object module】
                    //所以关闭es6模块化，使用commonjs解析
                    esModule: false,
                    name: 'images/[hash:10].[ext]' //文件重命名 取hash的前10位
                }
            },
            //处理html中图片（如果使用HtmlWebpackPlugins插件设置页面title，则不能使用html-loader，否则不生效）
            // {
            //     test: /\.html$/,
            //     loader: 'html-loader',  //处理html文件的img图片（负责引入img，使其能被url-loader处理）
            // }
        ]
    },
    plugins: [
        //html-webpack-plugins  
        //功能：默认会创建一个空的html，自动引入打包输出的所有资源js、css
        //需求：需要一个有结构的html文件
        new HtmlWebpackPlugins({
            minify: false,
            template: './src/index.html',  //自动复制该html的内容，并引入打包好的js、css（WebpackManifestPlugin 可以追踪所有的输出映射，过程）
            title:'demo webpack'    //给输出的文件命名
        })
    ]
};