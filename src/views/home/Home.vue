<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行','新款','精选']" ref="tabControl1" @tabClick="tabClick" class="tabControl" v-show="isTabFixed"></tab-control>
     <scroll class="content"
             ref="scroll"
             :probe-type="3"
             @scroll="contentScroll"
              :pull-up-load="true"
     @pullingUp="loadMore">
       <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
       <recommend-view :recommends="recommends" ></recommend-view>
       <feature-view></feature-view>
       <tab-control :titles="['流行','新款','精选']" ref="tabControl2" @tabClick="tabClick" ></tab-control>
       <good-list :goods="showGoods"></good-list>
     </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>

  </div>
</template>

<script>

//子组件
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";
//公共组件
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabcontrol/TabControl";
import GoodList from "../../components/content/goods/GoodsList";
//方法
import {getHomeMultidata, getHomeGoods} from "network/home.js"
import Scroll from "components/common/scroll/Scroll"

import {itemImgListenerMixin,BackTopListenerMixin} from "common/mixin"



export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodList,
    Scroll,

  },
  mixins:[itemImgListenerMixin, BackTopListenerMixin],
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      currentType:'pop',

      tabOffsetTop : 0,
      isTabFixed:false,


    }
  },
  created() {
    //  1.请求多个数据
    this.getHomeMultidata()


    //2.请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')

  },
  mounted() {
    // console.log('我是混入中的内容')
    //以下代码已经被mixin  可以删除
    // //这个地方img标签确实被挂载，但其中图片还没有占据高度
    // //this.$refs.scroll.refresh对这个函数进行防抖操作
    // const refresh = debounce(this.$refs.scroll.refresh,10000)
    //
    // //对监听事件进行保存
    // this.itemImgListener = ()=>{
    //   refresh()
    // }
    // this.$bus.$on('ItemImageLoad', this.itemImgListener)
  },
  destroyed() {
    // console.log('home destoryed')
  },
  activated() {
    this.$refs.scroll.scrollTo(0,this.saveY,0)
    this.$refs.scroll.refresh()
  },
  deactivated() {
    //1. 保存y值
    this.saveY = this.$refs.scroll.getScrollY()
  //  2.取消全局事件监听
    this.$bus.$off('ItemImageLoad', this.itemImgListener)


  },
  computed:{
    showGoods(){
      return  this.goods[this.currentType].list
    }

 },


  methods: {
    /**
     * 事件监听相关方法
     */
    tabClick(index){
     switch (index){
       case 0:
         this.currentType='pop'
           break
       case 1:
         this.currentType='new'
             break
       case 2:
         this.currentType='sell'
             break
     }
     this.$refs.tabControl1.currentIndex=index
      this.$refs.tabControl2.currentIndex=index
    },

    contentScroll(position){
      //1.判断backTop是否显示
      this.isShowBackTop = -position.y > 800
    //2.决定tabControll是否吸顶
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    loadMore(){
      this.getHomeGoods(this.currentType)
      this.$refs.scroll.refresh()

    },
    swiperImageLoad(){
      //获取tabControl的offsetTop
      //所有组件都有一个属性$el:用于获取组件中的元素
      // console.log(this.$refs.tabControl.$el.offsetTop) homeSwiper中监听emit发射后后在home中监听 方法中做出动作
      // console.log(this.$refs.tabControl2.$el.offsetTop)
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },

    // debounce(func,delay){
    //   let timer=null
    //   return function (...args){
    //     if(timer) clearTimeout(timer)
    //     timer =setTimeout(()=>{
    //     func.apply(this,args)},delay)
    //   }
    //
    // },

    /**
     * 网络请求相关方法
     */

    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.result = res;
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    },
    getHomeGoods(type) {

      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        // ...res.data.list   就相当于把一个一个item取出来放进list， for（let item of res.data.list ）
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1

        this.$refs.scroll.finishPullUp()
      })

    },

  }
}


</script>

<style scoped>


#home {
  /*padding-top: 44px;*/
  height: 100vh;
  position: relative;
/*  vh:viewport height  视口*/

}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  /*在使用浏览器原生滚动时，为了让导航不跟随一起滚动*/
  /*position: fixed;*/
  /*left: 0;*/
  /*right: 0;*/
  /*top: 0;*/
  /*z-index: 9*/
}
.tabControl{
  position:relative;
  z-index: 9;
}

/*.tab-control {*/
/*  !*position: sticky;*!*/
/*  top: 44px;*/
/*  z-index: 9*/
/*}*/
.content{
  /*对于已经知道顶部高度和底部高度  求中间视角高度的两种解决方案
  1.calc(100% - 49px);
  2.相对定位
  */
  /*height: calc(100% - 49px);*/
  position:absolute;
  top:44px;
  bottom:49px;
  left: 0;
  right: 0;

  overflow: hidden;
}
</style>


<!--//函数调用->压入函数栈（保存函数调用过程中所有变量）-->
<!--//函数调用结束->弹出函数栈（释放函数所有的变量）-->
<!--function test(){-->
<!--const names = ['why','aaa']-->
<!--}-->
<!--test()-->
