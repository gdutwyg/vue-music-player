module.exports = {
  devServer: {
    proxy: {
      // 代理
      '/api': {
        target: ' http://192.168.1.119:3000',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}