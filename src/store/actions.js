import {ADD_COUNTER,ADD_TO_CART} from './mutation-types'
export default {
  //用actions之前  以下代码直接放在mutation中,vue跟踪结果都是addcart增加
  // addCart(state,payload){
  //   // payload新添加商品
  //   //数组常用的方法有哪些？ push/pop/unshift/shift/sort/reverse/map/filter/reduce/join
  //   // let oldProduct = null;
  //   // for(let item of state.cartList){
  //   //   if(item.iid === payload.iid){
  //   //     oldProduct = item;
  //   //   }
  //   // }
  //
  //   //1.查找之前数组中是否有该商品
  //   // let oldProduct = state.cartList.find(function (item)
  //   // {
  //   //   return item.iid===payload.iid
  //   // })
  //   let oldProduct = state.cartList.find(item=>item.iid===payload.iid)
  //   //  2.判断oldProduct
  //   if(oldProduct){
  //     oldProduct.count+=1
  //   }else{
  //     payload.count = 1
  //     this.state.cartList.push(payload)
  //   }
  // }
  //  用actions对应mutation后之后  vue结果根据数量+1还是产品+1对应不同结果便于跟踪排查
  addCart(context,payload){
    return new Promise ((resolve, reject)=>{
      // 1.查找之前数组中是否有该商品
      let oldProduct = context.state.cartList.find(item=>item.iid===payload.iid)
      //  2.判断oldProduct
      if(oldProduct){
        // oldProduct.count+=1  无法追踪
        context.commit(ADD_COUNTER, oldProduct)
        resolve('当前商品数量+1')
      }else{
        payload.count = 1
        // this.state.cartList.push(payload)
        context.commit(ADD_TO_CART, payload)
        resolve('添加新商品成功')
      }
    })

  }
}
