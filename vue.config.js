const env = process.env
const path = require('path')
function kbs(num) {
  return num * 1024
}

module.exports = {
  publicPath: env.NODE_ENV === 'production' ? './' : '/',
  productionSourceMap: false,
  configureWebpack: config => {
    if (env.NODE_ENV === 'production') {
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
    }
  },
  devServer: {
    host: '0.0.0.0',
    disableHostCheck: true
  },
  chainWebpack: config => {
    config.module
      .rule('sass-resources')
      .test(/\.(scss|sass)$/)
      .use('sass-resources-loader')
      .loader('sass-resources-loader')
      .options({
        resources: [path.resolve(__dirname, 'src/assets/css/var.scss'), path.resolve(__dirname, 'src/assets/css/mixins.scss')]
      })
      .end()

    if (env.NODE_ENV === 'production') {
      const imageRule = config.module.rule('images')
      imageRule.uses.clear()
      imageRule
        .use('url-loader')
        .loader('url-loader')
        .options({
          limit: kbs(4),
          fallback: {
            loader: 'file-loader',
            options: {
              name: 'img/[name].[hash:8].[ext]'
            }
          }
        })
      /* 压缩图片 */
      imageRule
        .use('image-webpack-loader')
        .loader('image-webpack-loader')
        .options({ disable: false })
    }
  }
}
