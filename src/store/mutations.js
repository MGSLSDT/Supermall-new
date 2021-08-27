import {ADD_COUNTER,ADD_TO_CART} from './mutation-types'
export default {
  // mutations唯一目的就是修改state中状态
  // mtations中每个方法尽可能完成事件单一一点
  // 把复杂逻辑放在actions，便于后期对mutions直接跟踪，方便维护
  [ADD_COUNTER](state,payload){
    payload.count++
  },
  [ADD_TO_CART](state,payload){
    payload.checked = true
    state.cartList.push(payload)
  }
}
