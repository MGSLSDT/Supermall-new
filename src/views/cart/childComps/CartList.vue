<template>
<div class="cart-list">
<scroll class="content" ref="scroll">
  <cart-list-item v-for="(item,index) in cartList"
                  :product="item"
                  :key="index">

  </cart-list-item>
</scroll>
</div>
</template>

<script>
import {mapGetters} from 'vuex'
import Scroll from "components/common/scroll/Scroll";
import CartListItem from "./CartListItem";
export default {
  name: "cartList",
  components:{
     Scroll,
    CartListItem
  },
  computed:{
    ...mapGetters(['cartList'])
  },
  activated() {
    this.$refs.scroll.refresh()
  //  每往购物车添加一次数据，scroll需要刷新一次
  }


}
</script>

<style scoped>
.cart-list{
  height:calc(100% - 44px - 49px - 40px);
}
.content{
  height:100%;
  overflow: hidden;
}
</style>
