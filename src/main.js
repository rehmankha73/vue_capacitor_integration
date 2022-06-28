import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'

import  Router  from  'vue-router'

Vue.use(Router)

Vue.config.productionTip = false
Vue.config.ignoredElements = [/^ion-/]

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
