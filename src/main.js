import Vue from 'vue'
import App from './App.vue'
import vPay from './lib/vPay'

Vue.use(vPay)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
