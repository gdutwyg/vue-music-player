module.exports = {
  devServer: {
    proxy: {
      // 代理
      '/api': {
        target: ' http://localhost:3000',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
