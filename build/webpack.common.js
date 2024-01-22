const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");
const { VueLoaderPlugin } = require('vue-loader');
const chalk = require('chalk');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const { rootResolve, devMode } = require('./utils.js');

module.exports = {
  resolve: {
    extensions: [".js", ".jsx", ".json", ".vue"], // 可省略后缀
    alias: {
      '@': rootResolve('src')
    }
  },
  entry: {
    main: rootResolve('src/main.js'),
  },
  output: {
    filename: 'js/[name].[hash].js',
    path: rootResolve('dist'),
    publicPath: devMode ? '/' : './', // 开发环境生成的虚拟 chunk 文件位于根路径内存中
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          compiler: require('vue-template-compiler'), // 默认编译器
          compilerOptions: { // 编译器选项
            preserveWhitespace: false // 移除模板标签之间的换行空格
          },
          prettify: false,
        }
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            },
          },
          'css-loader',
          'postcss-loader',
          'less-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            },
          },
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: '[name].[contenthash].[ext]',
              outputPath: 'images',
            },
          },
        ],
      },
      {
        test: /\.(eot|woff|woff2|ttf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[contenthash].[ext]',
              limit: 8192,
              outputPath: 'fonts',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack4',
      template: rootResolve('public/index.html'),      
      filename: 'index.html',
      chunks: ['main'],
      minify: {
        removeComments: true, // 移除html中的注释
        removeAttributeQuotes: true, // 移除属性中的双引号
        collapseWhitespace: true, // 去除空格与换行
      },
    }),
    new MiniCssExtractPlugin({
      filename: devMode ? 'style/[name].css' : 'style/[name].[contenthash].css',
      chunkFilename: devMode ? "style/[id].css" : "style/[id].[contenthash].css",
      ignoreOrder: false, //启用关闭 警告⚠️
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: rootResolve('public'),
          to: rootResolve('dist'),
          globOptions: {
            ignore: [ // 忽略拷贝的文件
              '**/*.html'
            ]
          }
        },
      ],
    }),
     // 设定环境变量
     new webpack.DefinePlugin({
      "PUBLIC_PATH": JSON.stringify("./"),
      "process.env": JSON.stringify({ // 传递的值必须字符串化
        ...process.env,
        "SHOW_CONFIG_HEADER": "TRUE"
      })
    }),
    new VueLoaderPlugin(),
    // 编译进度提示
    new ProgressBarPlugin({
      format: `:msg [:bar] ${chalk.green.bold(':percent')} (:elapsed s)`,
      clear: false
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin({
        extractComments: false, // 不创建许可证文件和注释 vendors.js.LICENSE.txt
        terserOptions: {
          format: {
            comments: false, // 删除js中的注释
          },
          compress: {
            // 移除所有console相关代码；
            drop_console: true,
            // 移除自动断点功能；
            drop_debugger: true,
            // 配置移除指定的指令，如console.log,alert
            pure_funcs: ['console.log', 'console.error'],
          },
        }
      })
    ],
    splitChunks: {
      // 实际拆分条件优先级： maxSize < minSize
      minSize: 20*1024, // 限制拆分包的最小值，达到这个值，才能够拆出新包
      maxSize: 50*1024, // 单位:字节 约等于40kb，生成的块大于40KB的chunk将拆分成较小部分，增加请求数量以实现更好的缓存
      minChunks: 1, // 引入次数大于等于该值时，才会进行分包
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
    moduleIds: 'hashed', // "natural" | "named" | "hashed" | "size" | "total-size" | false
  },
  performance: {
    hints: devMode ? false : 'warning',
    // 入口起点的最大体积 整数类型（以字节为单位）
    maxEntrypointSize: 2000000, // 1kb=1024个字节=8比特
    // 生成文件的最大体积 整数类型（以字节为单位 300k）
    maxAssetSize: 1000000,
    // 只给出 js/css 文件的性能提示
    assetFilter: function(assetFilename) {
      return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
    }
  },
  // 外部扩展引入，防止单个文件体积过大，影响首屏渲染
  externals: {
    "vue": 'Vue',
    "vuex": "Vuex",
    "axios": 'axios',
  },
};