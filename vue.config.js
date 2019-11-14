const env = process.env
const path = require('path')
function kbs(num) {
  return num * 1024
}

module.exports = {
  publicPath: env.NODE_ENV === 'production' ? './' : '/',
  productionSourceMap: false,
  configureWebpack: () => ({
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            chunks: 'all',
            test: /node_modules/,
            name: 'vendor',
            minChunks: 1,
            maxInitialRequests: 5,
            minSize: 0,
            priority: 100
          },
          common: {
            chunks: 'all',
            test: /[\\/]src[\\/]js[\\/]/,
            name: 'common',
            minChunks: 2,
            maxInitialRequests: 5,
            minSize: 0,
            priority: 60
          },
          styles: {
            name: 'styles',
            test: /\.(sa|sc|c)ss$/,
            chunks: 'all',
            enforce: true
          },
          runtimeChunk: {
            name: 'manifest'
          }
        }
      }
    }
  }),
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
        resources: [
          path.resolve(__dirname, 'src/assets/css/var.scss'),
          path.resolve(__dirname, 'src/assets/css/mixins.scss')
        ]
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
