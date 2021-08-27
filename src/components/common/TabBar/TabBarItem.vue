<template>
  <div class="tab-bar-item" @click="itemClick">

    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot  name="item-icon-active"></slot></div>
    <div :style="activeStyle"> <slot   name="item-text"></slot></div>


  </div>

</template>

<script>
export default {
  name: "TabBarItem",
  props:{
    path:String,
    activeColor:{
      type:String,
      default:'red'
    //  默认颜色不满意可在MainTabBar更换，如果MainTabBar不强调则默认
    }
  },
  data(){
    return{
      // isActive:true,   不能写死，写死文字就全部激活  因此采用计算属性
      // path:'/home'  跳转页面不能写死  因此采用props
    }
  },
  computed:{
    isActive(){
      // /home->item1(/home)=true
      // /home->item1(/category)=false
      // /home->item1(/cart)=false
      // /home->item1(/profile)=false
      return this.$route.path.indexOf(this.path)!==-1
    //  indexOf==-1说明当前激活路径不包含在this.path     this.path有4个
    },
    activeStyle(){
      return this.isActive?{color:this.activeColor}:{}
    }

  },
  methods:{
    itemClick(){
      // console.log(11)
      this.$router.push(this.path)
    }
  }
}
</script>

<style scoped>
.tab-bar-item {
  flex:1;
  text-align: center;
  height: 49px;
  font-size:14px ;
}
.tab-bar-item img{
  width: 24px;
  height: 24px;
  margin-top: 3px;
  vertical-align: middle;
  margin-bottom: 2px;
}
/*.active{*/
/*  color:red;*/
/*}*/
/*颜色也需要动态绑定，根据用户需求来定  否则封装不彻底*/
</style>
