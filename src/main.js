import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

/* css support */
import 'normalize.css'
import '@/assets/css/reset.css'

// js vendors && plugins
import './plugins/element.js'
import VueCookies from 'vue-cookies'

Vue.config.productionTip = false

Vue.use(VueCookies)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
