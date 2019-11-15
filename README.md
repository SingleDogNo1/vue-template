## vue-cli 开发模板

> edit by singleDogNo.1 in 2019-11-15

### 脚手架默认添加功能
+ 默认添加了vue-router && vuex
+ 使用.editorconfig统一编辑格式
+ 使用[node-sass](https://lost-dream.github.io/blog/2017/10/20/使用SASS/)作为css预处理器
+ 使用eslint + prettier 作为代码规范工具并添加了默认的lint规则
+ 使用git-hook && lint-staged 作为git提交规范工具
+ **所有配置都放到对应的配置文件中**
+ 使用[normalize.css](https://www.npmjs.com/package/normalize.css)作为css reset
+ 引入了[vue-cookies](https://www.npmjs.com/package/vue-cookies),之后的使用可以使用`this.$cookies`
+ 引入了[element-ui](https://element.eleme.cn/#/zh-CN/component/layout)
  - 创建了自定义主题文件`ROOT/src/element-variables.scss` ,[具体参数](https://github.com/ElemeFE/element/blob/dev/packages/theme-chalk/src/common/var.scss)
+ 图片压缩
+ 去除生产环境console
+ 添加了修改项目默认css的文件（ROOT/src/assets/css/reset.css）
+ 增加了基础的mixins(ROOT/src/assets/css/mixins.scss)和项目全局css变量（ROOT/src/assets/css/var.scss）
+ var.scss 和 mixins.scss 已添加到全局，无需引用
+ 使用[vue-lazyload](https://www.npmjs.com/package/vue-lazyload)处理图片懒加载，配置在`main.js`, loading和error占位图自行补充
+ 引入了[webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)分析项目,`npm run serve`运行之后在8888端口可以查看项目具体结构
+ 在生产环境配置了gzip，该功能对体积大于10k的文件进一步压缩，得到\*\*.gz文件，**但是想要真正加载gzip文件，需要服务端进行相应的配置 -- 根据Request Headers的Accept-Encoding标签进行鉴别，如果支持gzip就返回 \*\*.gz文件**
+ 使用cdn引入Vue、VueRouter、Vuex、axios、ElementUI，减少vendor.js体积
+ 基于axios配置了基础的请求文件,根据实际开发场景做具体的修整

### 开发规范
- 参照`src/api/HelloWorld.js` 示例, **坚决禁止request模块挂载到Vue实例直接调用**，所有请求都放到api模块下管理，以便后期维护
- 参照`src/utils/request.js`,所有和环境相关的变量都放到.env.*文件中，同样为了后期方便维护。
- 所有的页面放在`src/views`文件夹中,所有组件放在`views/components`里，**每个组件/视图都是一个单独的文件夹**，示例
```
src
  - components
  ---- HelloWorld
  ------- index.vue
  ------- images
  ------- other static files(font/audio/video...)
  - views
  ---- Home
  ------- index.vue
  ------- images
  ------- other static files(font/audio/video...)
```
这样写的好处在于可以单独存放模块本身的资源文件，比如home.jpg图片只在home页面用到了，就把这张图片放在模块自己的images中，方便管理
- 所有的组件/页面命名**必须使用首字母大写的驼峰形式**，没有为什么，这是规定
- 结合上一条,只有多个页面公用的图像、字体、视频、音频...等静态资源才可以存放到assets文件中
- assets中，js文件夹下只能存放较大的第三方组件或插件，自己定义的公用方法只能存放在`vue-mixins`文件夹中，作为全局的vue mixins使用，或者放在`utils`文件夹中调用
- 每个*.vue文件有且只能有一个`style`标签块，并且必须加上`scoped`，如果有公用的style，按照复用程度放在父组件或者`assets/css/reset.css`中
- 所有的路由都要加上`webpackChunkName`,打包时会显示具体的文件名
- 可以使用webpack开启本地服务，参考HelloWorld.js如何获取个人信息 && vue.config.js如何创建本地服务。需要mock的数据放在根目录mockData目录下，或者使用mock.js
- 分环境打包，默认添加了三个环境 development、test、production ，按照VUE_APP_RUNTIME_ENV区分打包的环境做一些配置，现有的配置
  + test环境不做图片压缩
  + test环境不做console删除
  + test环境不删除sourceMap
  + test环境不做gzip压缩
  + development和test环境使用vue.js，生产环境使用vue.min.js，因为[vue-devtools](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)（需翻墙）不支持生产环境文件调试

- **最后也是最重要的一点，每次迭代必须把需求变更和版本号维护到README.md文档中**，如果没有添加，造成任何后果自负

### 最后附上项目脚手架目录结构
```
│  .env.development // 开发环境变量配置文件
│  .env.production // 生产环境变量配置文件
│  .env.test // 测试环境变量配置文件
│  .eslintrc.js // eslint配置文件
│  .prettierrc // prettier规则配置文件
│  vue.config.js // vue项目配置文件
├─mockData // 本地mock数据存放
│   user.json
├─public
│   favicon.ico // 网站title icon
│   index.html // htmlWebpackPlugin template文件
└─src
    │  element-variables.scss // element-ui css配置
    │  main.js
    ├─api // 存放所有网络请求
    │   HelloWorld.js
    ├─assets
    │  └─css
    │      mixins.scss // sass mixins
    │      reset.css // 项目自身的初始css
    │      var.scss // 项目自身需要定义的任何sass变量
    ├─components
    │  └─HelloWorld
    │      1.png
    │      index.vue
    │      test0.jpg
    │      test1.jpg
    │      test2.jpg
    │      test3.jpg
    ├─plugins
    │   element.js
    ├─router
    │   index.js
    ├─store
    │   index.js
    ├─utils
    │   request.js
    ├─views
    │  ├─About
    │  │   index.vue
    │  └─Home
    │      index.vue
    └─vue-mixins // vue的mixins（名字区分于sass的mixins），可以在这里定义全局混入和局部混入规则
        exampleMixins.js
```

### 熟悉脚手架后，所有HelloWorld相关的文件、初始的mockData、初始的vue-mixins都可以删除。