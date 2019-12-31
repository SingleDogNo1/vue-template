const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CompressionPlugin = require('compression-webpack-plugin')
const MockData = require('./mockData/mock')
const env = process.env
const kbs = num => num * 1024

module.exports = {
  publicPath: env.NODE_ENV === 'production' ? './' : '/',
  productionSourceMap: env.VUE_APP_RUNTIME_ENV === 'production',
  configureWebpack: () => ({
    externals: {
      vue: 'Vue',
      'vue-router': 'VueRouter',
      vuex: 'Vuex',
      axios: 'axios',
      'element-ui': 'ELEMENT'
    },
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

    if (env.VUE_APP_RUNTIME_ENV === 'development') {
      config.plugin('define').tap(args => {
        args[0]['process.env'].MOCK = true
        return args
      })
    } else {
      config.plugin('define').tap(args => {
        args[0]['process.env'].MOCK = false
        return args
      })
    }

    if (env.NODE_ENV === 'production') {
      config.plugin('webpack-bundle-analyzer').use(BundleAnalyzerPlugin)
    }

    if (env.VUE_APP_RUNTIME_ENV === 'production') {
      const imageRule = config.module.rule('images')
      imageRule.uses.clear()
      imageRule
        .use('url-loader')
        .loader('url-loader')
        .options({
          limit: kbs(10),
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

      config.plugin('compression-webpack-plugin').use(CompressionPlugin, [
        {
          algorithm: 'gzip',
          test: new RegExp(/\.(css|scss|sass|js|vue)$/i),
          threshold: kbs(10)
        }
      ])
    }
  },
  devServer: {
    host: '0.0.0.0',
    disableHostCheck: true,
    before(app) {
      if (env.MOCK) {
        MockData(app)
      }
    },
    proxy: {
      '/': {
        target: 'http://106.12.208.84:8080/',
        changeOrigin: true,
        wx: true
      }
    }
  }
}
