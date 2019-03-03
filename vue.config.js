module.exports = {
  outputDir: 'docs',
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
