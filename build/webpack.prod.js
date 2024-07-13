const common = require('./webpack.common.js');
const { merge } = require('webpack-merge');
// const WebpackBundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    // new WebpackBundleAnalyzerPlugin(),
  ],
});