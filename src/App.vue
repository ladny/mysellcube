<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab-wrapper">
      <tab ref="tab" @getTabIndex="getTabIndex" :tabs="tabs" :initialIndex="initialIndex"></tab>
    </div>
  </div>
</template>

<script>
import VHeader from 'components/v-header/v-header'
import Tab from 'components/tab/tab'
import Goods from 'components/goods/goods'
import Seller from 'components/seller/seller'
import Ratings from 'components/ratings/ratings'
import { getSeller } from "api";
import qs from 'query-string'
import { saveToLocal, loadFromLocal} from 'common/js/storage'

const KEY = 'type'
export default {
  name: 'app',
  data() {
    return {
     seller:{
       id: qs.parse(location.search).id
     },
     initialIndex: 0
    }
  },
  computed: {
    tabs() {
      return [
        {
          label:'商品',
          component:Goods,
          data:{
            seller: this.seller
          }
        },
        {
          label:'评价',
          component:Ratings,
          data:{
            seller: this.seller
          }
        },
        {
          label:'商家',
          component:Seller,
          data:{
            seller: this.seller
          }
        }
      ]
    }
  },
  components: {
    VHeader,
    Tab
  },
  created() {
    this._getSeller()
    //获取
    this.initialIndex = loadFromLocal(this.seller.id, KEY, 0)
  },
  methods: {
    _getSeller() {
      getSeller({
        id: this.seller.id
      }).then((seller) => {
        this.seller=seller
      })
    },
    getTabIndex(current) {
      this.initialIndex=current
      //存储
      saveToLocal(this.seller.id, KEY, this.initialIndex)
    }
  }

}
</script>
<style lang="stylus">
  #app
    .tab-wrapper
      position:fixed
      top: 136px
      left: 0
      right: 0
      bottom: 0
</style>
