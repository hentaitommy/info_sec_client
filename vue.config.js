module.exports = {
  assetsDir: 'static',
  devServer: {
    port: '8080', // 设置端口号
    proxy: {
      '/api': {
        target: 'http://tommyserver.xyz:8000/', //API服务器的地址
        changeOrigin: true, // 是否跨域，虚拟的站点需要更管origin
      }
    },
  }
}