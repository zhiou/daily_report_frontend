const Timestamp = new Date().getTime();

module.exports = {
  productionSourceMap: false,
  lintOnSave: false,
  devServer: {
    disableHostCheck: true
  },
  configureWebpack: {
    devtool: 'source-map',
    output: { // 输出重构 打包编译后的 文件名称 【模块名称.版本号.时间戳】
      filename: `static/js/[name].${process.env.VUE_APP_VERSION}.${Timestamp}.js`,
      chunkFilename: `static/js/[name].${process.env.VUE_APP_VERSION}.${Timestamp}.js`
    },
  }
}
