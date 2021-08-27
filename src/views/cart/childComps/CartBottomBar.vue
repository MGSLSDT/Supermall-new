<template>
<div class="bottom-bar">
  <div class="check-content">
    <check-button
      class="check-button"
      :is-checked="isSelectAll"
      @click.native="checkClick"></check-button>
    <span>全选</span>
  </div>
  <div class="price">
    总计:{{totalPrice}}
  </div>
  <div class="calculate" @click="calcClick">去计算 : {{checkLength}}</div>
</div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";
import {mapGetters} from "vuex"
export default {
  name: "CartBottomBar",
  components:{
    CheckButton
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice() {
      return "￥" + this.$store.state.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue + item.price * item.count
      }, 0).toFixed(2)
    },
    checkLength() {
      return this.$store.state.cartList.filter(item => item.checked).length
    },
    isSelectAll() {
      if (this.cartList.length === 0) return false
      //  1.使用filter
      //   return !(this.cartList.filter(item=>!item.checked).length)

      //  2.使用find
      //   return !(this.cartList.find(item=>!item.checked))

      //  3.遍历方法
      for (let item of this.cartList) {
        if (!item.checked) {
          return false
        //  此处只要遍历一次出现不被选中，就直接返回false  不再做后面的遍历
        }
      }
      return true

    //关于return true位置不懂
    }
  },
  methods:{
    checkClick(){

      if (this.isSelectAll){//全部选中
        this.cartList.forEach(item=>item.checked=false)
      } else { //全不选中或者部分选中
        this.cartList.forEach(item=>item.checked=true)
      }

      // this.cartList.forEach(item=>item.checked=!isSelectAll)  可能会想到这种方法，但是此处isSelectAll可能会上下影响 故不采用
    },
    calcClick(){
      if(!this.isSelectAll){
        this.$toast.show('请选择购买的商品',2000)
      }
    }
  }
}
</script>

<style scoped>
.bottom-bar{
  position:relative;
  display: flex;
  height: 40px;
  background-color: #eee;
 line-height: 40px;
  font-size: 14px;

}
.check-content{
  display: flex;

  align-items: center;
  width: 80px;

}
.check-button{
  height: 20px;
  width: 20px;
  line-height: 20px;
  margin-left: 6px;
}
span{
  margin-left: 10px;
}
.price{
  margin-left: 20px;
  flex: 1;
}
.calculate{
  /*margin-left:50px;*/
  width: 90px;
  background-color: red;
  color: #fff;
  text-align: center;
}
</style>
