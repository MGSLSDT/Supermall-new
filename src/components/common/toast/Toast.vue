<template>
<div class="toast" v-show="isShow">
  <div >{{message}}</div>
</div>
</template>

<script>
export default {
  name: "Toast",
  // props:{
  //   message:{
  //     type:String,
  //     default:''
  //   },
  //   isShow:{
  //     type:Boolean,
  //     default: false
  //   }
  //
  // },
  data() {
    return {
      isShow: false,
      message: ''
    }
  },
  methods:{
    show(message="默认值",duration = 1500){
      //设置默认值
      // message = message||'商品添加成功';  如果有message就显示message，没有的话显示商品添加成功  message="默认值",duration = 1500是es6
      用法
      // duration = duration || 1500;

      this.isShow = true;
      this.message = message;

      setTimeout(()=>{
        this.isShow = false
        this.message = " "
      },duration)
    }
  }
}
</script>

<style scoped>
.toast{
  position: fixed;
  top: 50%;
  left:50%;
  padding: 8px 10px;
  transform: translate(-50%,-50%);
  color: #fff;
  background-color: rgba(0,0,0,0.75);
  z-index:999
}
</style>
