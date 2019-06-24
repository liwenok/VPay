<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png"><br>
    <button class="payButton" @click="showPay = !showPay">付 款</button>
    <transition name="fade">
      <vPay :showPay="showPay" @input-end="toPay" :duration="1500" successMsg="Success!" failMsg="Failed!" ref="pay"></vPay>
    </transition>
  </div>
</template>

<script>

export default {
  name: 'app',
  data() {
    return {
      showPay: false
    }
  },
  methods: {
    toPay(pwd) {
      console.log(pwd);
      setTimeout(() => {
        if (pwd === '2019') {
          this.$refs.pay.$success().then(() => {
            console.log('付款成功！');
            // 隐藏支付页面
            this.showPay = false;
            // 跳转支付成功页面
          })
        } else {
          this.$refs.pay.$fail().catch(() => {
            console.log('付款失败！');
          })
        }
      }, 3000)
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.payButton {
    width: 5rem;
    height: 2.5rem;
    font-size: 16px;
    color: #fff;
    background: #42b883;
    border-color: #42b883;
    border-radius: 5px;
    outline: none;
}
</style>
