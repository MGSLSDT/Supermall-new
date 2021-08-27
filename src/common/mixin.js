import {debounce} from "./utiles";
import BackTop from "components/content/backTop/BackTop"
export const itemImgListenerMixin = {
  data(){
    return{
      itemImgListener:null
    }
  },
  mounted(){
    const refresh = debounce(this.$refs.scroll.refresh,10000)
    this.itemImgListener = ()=>{
      refresh()
    }
    this.$bus.$on('ItemImageLoad', this.itemImgListener)
    // console.log('我是混入中的内容')
  }

}

export const BackTopListenerMixin ={
  data(){
    return{
      isShowBackTop:false
    }
  },
  components:{
    BackTop
  },
  methods:{
    //methods方法仅抽取完整函数  函数内部不能单独抽取，实在要抽取，重新组装新的函数
    backClick(){
      this.$refs.scroll.scrollTo(0,0)
    },

  }
}

