const {merge} = require('webpack-merge');
const common = require('./webpack.common');
const webpack = require('webpack');
const path = require('path');

module.exports = merge(common, {
    mode: 'development',
    output: {
        filename: 'js/[name]_[hash:10].js',  // 入口和内容hash组成的文件名，也可以是hash
        chunkFilename: 'js/[name]_[hash:10].chunk.js',
        path: path.resolve(__dirname, 'dist')  //导出文件的路径
    },
    devtool: 'inline-source-map',  //开发环境使用（帮助调试，可显示错误的文件和行数）
    devServer: {        //开发服务器配置，可用来自动化:自动编译,自动打开浏览器，自动刷新浏览器等等(只会在内存中编译，不会有任何输，出启动指令  webpack-dev-server)
        contentBase: path.resolve(__dirname, 'build'),    //编译缓存在哪个文件
        compress: true,     //启动gzip压缩
        port: 8088,          //端口号
        open: true,         //自动打开浏览器
        hot: true,          //开启热替换, css代码更新不刷新页面(必须配合webpack.HotModuleReplacementPlugin插件一起使用)
        proxy: {
            '/bx':{           //代理前缀
                target: '代理地址',
                changeOrigin:true,    //表示是否跨域，
                pathRewrite:{           //表示需要rewrite重写的
                    '^/bx': ''
                }
            }
        }
    },
    module:{  
        rules: [    //从下到上，从右到左解析
            //处理sass，scss，css
            {   
                test: /\.(sa|sc|c)ss$/,
                use: ['style-loader', 'css-loader']    //使用多个loader用use
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin() //devServer中设置hot：true时必须使用此插件
    ],
})