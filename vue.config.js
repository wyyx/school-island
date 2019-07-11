const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  devServer: {
    proxy: 'http://xyd.husiwei.com'
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
    }
  }
}
