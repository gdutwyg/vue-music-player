module.exports = {
  publicPath: '/vue-music-player/',
  productionSourceMap: false,  // 生产环境禁用
  configureWebpack: {
    devtool: false // 开发环境禁用
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
