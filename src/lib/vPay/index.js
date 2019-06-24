import vPay from './vPay'

const myPlugin = {
    install(Vue, options) {
        // 将其注册为vue的组件
        Vue.component('vPay', vPay)
    }
}

export default myPlugin
