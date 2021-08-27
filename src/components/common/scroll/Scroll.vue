<template>
<div class="wrapper" ref="wrapper">
  <div class="content">
    <slot></slot>
  </div>
</div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: "Scroll",
  props:{
    probeType:{
      type:Number,
      default:0
    },
    pullUpLoad:{
      type:Boolean,
      default: false
    }
  },
  data(){
return{
  scroll:null
    }
  },
  mounted() {
    //ref 如果绑定在组件中，那么通过this.$refs.refname获取到的是一个组件对象  ref通常用在父传子
    //ref如果是绑定在普通元素中，那么通过this.$refs.refname获取到的是一个元素对象
    //1.创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper,{
      // probeType:3,
      // pullUpLoad:true
      // observeDOM:true
      click:true,
      probeType: this.probeType,
      pullUpLoad:this.pullUpLoad,
    })
    //2.监听滚动位置
    if(this.probeType === 2 || this.probeType === 3 ){
      this.scroll.on('scroll', (position)=>{
        // console.log(position)
        //  谁想用传给谁
        this.$emit('scroll',position)
      })

    }


  //  3.监听上拉事件
  //  if(this.pullUpload){
     this.scroll.on('pullingUp',()=>{
       // console.log('监听滚动到底部')
       this.$emit('pullingUp' )

     })
   },
  // },
  methods:{
    scrollTo(x,y,time=500){
      this.scroll && this.scroll.scrollTo(x,y*1)
    },
    finishPullUp(){
      this.scroll && this.scroll.finishPullUp()
    },
    refresh() {
      this.scroll && this.scroll.refresh()
      // console.log('---')
    },

    getScrollY(){
     return this.scroll ? this.scroll.y : 0
    }

  }
}
</script>

<style scoped>

</style>
