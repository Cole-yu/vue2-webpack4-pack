const webpack = require('webpack');
const common = require('./webpack.common.js');
const { merge } = require('webpack-merge');
const { SERVER_HOST, SERVER_PORT } = require('./constant.js');
const { rootResolve, devMode } = require('./utils.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    compress: true, // 开启 gzips 压缩功能，Content-Encoding: gzip
    host: SERVER_HOST,
    port: SERVER_PORT,
    hot: true,
    // contentBase: rootResolve('src'), // 设置 http://10.15.45.11:8080 访问的本地资源目录为 src 文件夹
    // publicPath: '/a', // 设置访问内存中资源的路径 http://10.15.45.11:8080/a/index.html，output.publicPath='/a/'，环境变量 PUBLIC_PATH='../a/'
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000',
        pathRewrite: {
          '^/api' : ''
        }
      },
    }
  },
  optimization: {
    minimize: false,
    minimizer: [],
  }
})