import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from "components/common/toast" //导入自己封装的toast插件
import FastClick from "fastclick"
import VueLazyload from "vue-lazyload";

Vue.config.productionTip = false
// 安装toast插件
Vue.use(toast);

//减少移动端300ms延迟
FastClick.attach(document.body)
//使用懒加载的插件
Vue.use(VueLazyload,{
  loading:require('./assets/img/common/placeholder.png')
})
// 添加事件总线对象
Vue.prototype.$bus= new Vue()

new Vue({
  render: h => h(App),
  router,
  store,

}).$mount('#app')

