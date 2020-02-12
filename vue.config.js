module.exports = {
  publicPath: '/vue-music-player/',
  productionSourceMap: false, // 生产环境禁用
  configureWebpack: {
    devtool: false // 开发环境禁用
  },
  chainWebpack: config => {
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, { limit: 100240 }))
  },
  devServer: {
    proxy: {
      // 代理
      '/api': {
        target: 'http://api.mtnhao.com',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
