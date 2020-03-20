import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/iconfont/iconfont.css'
import 'normalize.css'

Vue.use(ElementUI, { size: 'small' })
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// eslint-disable-next-line no-new
// new Vue({
//   el: '#app',
//   router,
//   store,
//   render: h => h(App)
// })
