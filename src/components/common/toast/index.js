
import Toast from "./Toast";
import Vue from "vue";

const obj = {}
obj.install=function(vue){
  // console.log('执行了obj文件的install函数',vue)
//  1.创建组件构造器
  const toastConstructor = Vue.extend(Toast);
//  2.使用new创建一个组件实例对象
  const toast = new toastConstructor();
//  3.将这个实例对象挂载到某个div上
  toast.$mount(document.createElement('div'))
//  4.toast.$el对应的就是div
  document.body.appendChild(toast.$el)
//  5.将实例添加到Vue的prototype上
  Vue.prototype.$toast = toast;
};

export default obj
