## vue-cli 开发模板
### 脚手架默认添加功能

+ 默认添加了vue-router && vuex
+ 使用.editorconfig统一编辑格式
+ 使用[node-sass](https://lost-dream.github.io/blog/2017/10/20/使用SASS/)作为css预处理器
+ 使用eslint + prettier 作为代码规范工具并添加了默认的lint规则
+ 使用git-hook && lint-staged 作为git提交规范工具
+ **所有配置都放到对应的配置文件中**
+ 使用[normalize.css](https://www.npmjs.com/package/normalize.css)作为css reset
+ 引入了[vue-cookies](https://www.npmjs.com/package/vue-cookies)
+ 引入了[element-ui](https://element.eleme.cn/#/zh-CN/component/layout)
  - 创建了自定义主题文件`ROOT/src/element-variables.scss` ,[具体参数](https://github.com/ElemeFE/element/blob/dev/packages/theme-chalk/src/common/var.scss)
+ 图片压缩
+ 去除生产环境console
+ 添加了修改项目默认css的文件（ROOT/src/assets/css/reset.css）
+ 增加了基础的mixins(ROOT/src/assets/css/mixins.scss)和项目全局css变量（ROOT/src/assets/css/var.scss）
+ var.scss 和 mixins.scss 已添加到全局，无需引用
+ 使用[vue-lazyload](https://www.npmjs.com/package/vue-lazyload)处理图片懒加载，配置在`main.js`, loading和error占位图自行补充

### 开发规范

