<template>
<div class="cart">
<!--  顶部-->
  <nav-bar class="nav-bar">
  <div slot="center">购物车({{cartLength}})</div>
<!--<div slot="center">购物车({{$store.state.cartList.length}})</div>-->
  </nav-bar>

<!-- 商品list-->
  <cart-list></cart-list>

<!-- 底部汇总-->

  <cart-bottom-bar></cart-bottom-bar>


</div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar"
import CartList from "./childComps/CartList"
import CartListItem from "./childComps/CartListItem"
import CartBottomBar from "./childComps/CartBottomBar";

import {mapGetters} from 'vuex'
export default {
  name: "Cart",
  components:{
    NavBar,
    CartList,
    CartListItem,
    CartBottomBar


  },
  computed:{
    //两种语法
    ...mapGetters(['cartLength']),
    // ...mapGetters({
    //   length:'cartLength',
    //   list:'cartList'
    // })
  }
}
</script>

<style scoped>
.cart{
  height: 100vh;
}
.nav-bar{
  background-color: var(--color-tint);
  color:#fff
}
</style>
