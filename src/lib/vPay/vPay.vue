<template>
    <div class="payBox" v-if="showPay">
        <div class="content">
            <!-- 标题 -->
            <header>
                <h3>{{header}}</h3>
            </header>
            <hr>
            <!-- 密码输入框 -->
            <section>
                <ul class="passwd">
                    <li :class="{on: passwd.length > index}"
                        v-for="(item, index) in digit" :key="index">
                    </li>
                </ul>
            </section>
            <!-- <router-link to="/forget" class="forget">忘记密码</router-link> -->
            <!-- 键盘 -->
            <section>
                <ul class="keyboard">
                    <li @click="clickKeyBoard(1)">1</li>
                    <li @click="clickKeyBoard(2)">2</li>
                    <li @click="clickKeyBoard(3)">3</li>
                    <li @click="clickKeyBoard(4)">4</li>
                    <li @click="clickKeyBoard(5)">5</li>
                    <li @click="clickKeyBoard(6)">6</li>
                    <li @click="clickKeyBoard(7)">7</li>
                    <li @click="clickKeyBoard(8)">8</li>
                    <li @click="clickKeyBoard(9)">9</li>
                    <li @click="reset()" class='reset'>重置</li>
                    <li @click="clickKeyBoard(0)">0</li>
                    <li @click="backspace()" class='backspace'>退格</li>
                </ul>
            </section>
        </div>
        <!-- 支付中 -->
        <div class="paying" v-if="payStatus == 1">
            <img src="@/assets/loading.jpg" alt="正在付款">
        </div>
        <!-- 支付成功 -->
        <div class="succeed" v-if="payStatus == 2">
            {{successMsg}}
        </div>
        <!-- 支付失败 -->
        <div class="failed" v-if="payFailed">
            {{failMsg}}
        </div>
    </div>
</template>

<script>
export default {
    props: {
        digit: {
            type: Number,
            default: 4      // 密码位数，默认为4 
        },
        showPay: {          // 默认不显示支付页面
            type: Boolean,
            default: false
        },
        duration: {         // 延时时间
            type: Number,
            default: 1000,
        },
        failMsg: {          // 自定义字符错误提示
            type: String,
            default: '付款失败！'
        },
        successMsg: {
            type: String,
            default: '付款成功！'
        }          
    },
    data() {
        return {
            header: '请输入支付密码',
            passwd: [],
            payStatus: 0,               // 支付状态：0 无状态，1 正在支付， 2 支付成功
            payFailed: false
        }
    },
    methods: {
        clickKeyBoard(key) {
            var {passwd, digit} = this;
            if (passwd.length >= digit) return;
            passwd.push(key);
        },
        backspace() {
            var {passwd} = this;
            if (passwd.length <= 0) return;
            passwd.pop();
        },
        reset() {
            // 项目中遇到的问题，记录下来！
            // passwd = [] 没用
            var {passwd} = this;
            passwd.splice(0, passwd.length);
        },
        cancel() {
            this.payStatus = 0;
        },
        $success() {
            return new Promise((resolve, reject) => {
                // 显示付款成功
                this.payStatus = 2;
                // 关闭付款成功提示
                setTimeout(() => {
                    this.cancel();
                    resolve();
                }, this.duration)
            });
        },
        $fail(failMsg){
            return new Promise((resolve, reject) => {
                // 显示付款失败
                this.payFailed = true;
                // 关闭付款失败提示
                setTimeout(() => {
                    this.cancel();
                    this.payFailed = false;
                    reject();
                }, this.duration)
            });
        }
    },
    watch: {
        // 监听密码长度，当填满密码时自动付款
        passwd(newValue, oldValue) {
            var {passwd} = this;
            if (newValue.length >= this.digit) {
                this.payStatus = 1;
                // 父组件在监听 input-end 事件
                this.$emit('input-end', passwd.join(''));
                // 清空密码
                passwd.splice(0, passwd.length);
            }
        }
    }
}
</script>

<style scoped>
hr {
    border-top: 1px solid #eee;
}
ul {
    padding: 0;
    list-style: none;
}
.payBox {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0rem;
    margin: 0 5px;
    background-color: rgba(0,0,0,0.8);
}
.content {
    position: absolute;
    bottom: 0;
    width: 100%;
    background-color: #fff;
}
.forget {
    color:skyblue;
}
.passwd {
    display: flex;
    position: relative;
}
.passwd li {
    flex: 1;
    height: 2.5rem;
    border: 1px solid #eee;
}
.keyboard {
    display: flex;
    flex-wrap: wrap;
}
.keyboard li {
    flex: 1 1 32%;
    height: 2.5rem;
    line-height: 2.5rem;
    border: 1px solid #eee;
}
.reset, .backspace {
    background-color: #eee;
}
/* 密码小圆点的实现 */
.on:before {
    content: '';
    position: absolute;
    top: 50%;
    margin-top: -5px;
    background-color: #000;
    width: 10px;
    height: 10px;
    border-radius: 50%;
}
.paying {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 412px;
    border-radius: 10px;
    background-color: #fff;
}
.paying img {
    /* 父元素高度塌陷 */
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
}
.succeed, .failed {
    position: absolute;
    top: 0;
    left: 0;
    width: 200px;
    height: 150px;
    line-height: 150px;
    border-radius: 10px;
    color: #fff;
    margin-left: 100px;
    margin-top: 150px;
    background: rgba(0,0,0,0.8);
}
</style>
