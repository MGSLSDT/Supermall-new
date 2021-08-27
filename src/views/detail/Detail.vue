<template>
  <div id="detail">
    <detail-nav-bar class="detail-navbar" @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">

      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info ref="params" :param-info="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <goods-list ref="recommend" :goods="recommends"></goods-list>

    </scroll>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <!--    <toast :message="message" :is-show="isShow" ></toast>-->
  </div>
</template>

<script>

import DetailNavBar from "./childComps/DetailNavBar"
import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "../../network/detail"
import DetailSwiper from "./childComps/DetailSwiper"
import DetailBaseInfo from "./childComps/DetailBaseInfo"
import DetailShopInfo from "./childComps/DetailShopInfo"
import DetailGoodsInfo from "./childComps/DetailGoodsInfo"
import DetailParamInfo from "./childComps/DetailParamInfo"
import DetailCommentInfo from "./childComps/DetailCommentInfo"
import DetailBottomBar from "./childComps/DetailBottomBar";
import GoodsList from "components/content/goods/GoodsList"
import {itemImgListenerMixin, BackTopListenerMixin} from "common/mixin"
// import Toast from "components/common/toast/Toast";   普通封装
import {mapActions} from "vuex"

import Scroll from "components/common/scroll/Scroll"

import {debounce} from "common/utiles"


export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList,
    // Toast

  },
  mixins: [itemImgListenerMixin, BackTopListenerMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
      // message:'',
      // isShow:false

    }
  },
  created() {
    // console.log(this.$route.params)
    //第一步：保存传入的id
    this.iid = this.$route.params.iid
    //  第二步：根据id请求详情页数据
    getDetail(this.iid).then(res => {
      console.log(res)
      //  1.获取顶部的图片轮播数据
      //   console.log(this.topImages)
      const data = res.result
      this.topImages = data.itemInfo.topImages
      //  2.获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

      //  3.获取店铺信息
      this.shop = new Shop(data.shopInfo)
      //  4.保存商品详情数据
      this.detailInfo = data.detailInfo
      //  5.获取参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
      //  6.获取评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }
    })
    //  第三步：请求推荐数据
    getRecommend().then((res) => {
      // console.log(res)
      this.recommends = res.data.list
    })
    //  第4步 给getThemeTopy赋值
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = []
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44)
      this.themeTopYs.push(Number.MAX_VALUE)
      // console.log(this.themeTopYs)
    }, 500)

  },
  mounted() {
    // console.log('我是混入中的内容')

    //以下代码已经被mixin  可以删除
    // const refresh = debounce(this.$refs.scroll.refresh,10000)
    // this.itemImgListener = ()=>{
    //   refresh()
    // }
    // this.$bus.$on('ItemImageLoad', this.itemImgListener)
  },
  destroyed() {
    this.$bus.$off('ItemImageLoad', this.itemImgListener)
  },
  methods: {
    ...mapActions(['addCart']),
    addToCart() {

      //1.获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;
      //  2.将商品添加到购物车
      //   this.$store.commit('addCart',  product)
      // 通过调用action中的addCart方法，把商品加入购物车
      //   this.$store.dispatch('addCart',product).then(res=>{
      //     console.log(res)
      // })
      //使用vuex的mapActions，将actions中的方法映射到methods中，看起来像是调用自己方法
      this.addCart(product).then(res => {
        // console.log(res)
        // this.isShow = true
        // this.message = res
        //
        // setTimeout(()=>{
        //   this.isShow = false
        //   this.message = " "
        // },1000)
        // this.$toast.show(res, 2000)
        this.$toast.show()
      })

    },
    imageLoad() {
      this.$refs.scroll.refresh()
      this.getThemeTopY()
    },
    titleClick(index) {
      // console.log(index)
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)
    },
    contentScroll(position) {
      //1.判断backTop是否显示
      this.isShowBackTop = -position.y > 1200
      // 1.获取y值
      const positionY = -position.y
      //  2.positionY和主题中的值进行对比
      //     [0, 5753, 6514, 6846,Number.MAX_VALUE]
      //  positionY在0和5753之间，index=0
      //  positionY在5753和6514之间，index=1
      // positionY在6514和6848之间，index=2
      // positionY超过6846，index=3
      let length = this.themeTopYs.length
      for (let i = 0; i < length - 1; i++) {
        if (this.currentIndex !== i && (positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i + 1])) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex
        }
        // console.log(i+1); //str 3+1 =3  parseInt(i)
        // if(this.currentIndex!==i && ((i<length-1 && positionY>this.themeTopYs[i]&&positionY<this.themeTopYs[i+1]) || (i ===   length-1&&positionY>this.themeTopYs[i]))){
        //   this.currentIndex = i;
        //   console.log(this.currentIndex)
        //   this.$refs.nav.currentIndex = this.currentIndex
      }

    }
  }
}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}

.detail-navbar {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.content {
  height: calc(100% - 44px);
  overflow: hidden;
  /*background-color: #fff;*/
}

</style>
