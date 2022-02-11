// this file is needed to build .pug files
module.exports = {
  module: {
    rules: [{
      test: /.pug$/,
      use: [
        {loader: "apply-loader"},
        {loader: "pug-loader"}
      ]
    }]
  },
  devServer: {
    proxy: {
      '/api/*': {
        target: 'https://wisdom-demo.uol.de',
        changeOrigin: true
      }
    }
  }
}
