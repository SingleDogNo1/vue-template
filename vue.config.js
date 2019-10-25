const env = process.env

module.exports = {
  publicPath: env.NODE_ENV === 'production' ? './' : '/',
  productionSourceMap: false,
  configureWebpack: config => {
    if (env.NODE_ENV === 'production') {
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
    }
  }
}
