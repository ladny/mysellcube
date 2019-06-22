# vue-sell-cube
环境：
Vue-cli初始化项目  
脚手架官方文档：https://cli.vuejs.org/zh/guide/  
版本要求：Vue CLI 需要 Node.js 8.9 或更高版本 (推荐 8.11.0+)
npm install -g @vue/cli
vue –-version 检查版本
vue –-h  列出命令
创建项目：
Vue create vue-sell-cube
选项：空格是选中 上下挑选 回车选完
启动项目：Npm run serve
Cube-ui安装：vue add cube-ui

Api接口mock
Vue.config.js中配置mock数据，配置完后，一定要重新启动一下才生效。
Vue.config.js 设置相对路径的引用配置
项目开发
https://git.imooc.com/coding-74/coding-74

在main.js中，引入 
import 'common/stylus/index.styl'
props传参时，这个对象的属性运用到标签中时，必须声明默认值，否者会报错，
如：
props: {
  seller: {
    type: Object,
    default() {
      return {}
    }
  }
}
如果运用更深层的属性时，需要添加v-if判断，如:
<div v-if="seller.supports" class="support">
  <support-ico :size=1 :type="seller.supports[0].type"></support-ico>
  <span class="text">{{seller.supports[0].description}}</span>
</div>

引用axios
Npm I axios –save

关于全屏弹窗，可以使用Cube-UI  实现以 API 的形式调用自定义组件
注： 所有通过 createAPI 实现的通过 API 的形式调用的自定义组件（cube-ui 内置的组件）都需要通过 Vue.use 注册才可以。  
createAPI
https://didi.github.io/cube-ui/#/zh-CN/docs/create-api
创建register.js 注册后，变成api模式的调用，在main.js入口引入。

深度修改样式
https://vue-loader.vuejs.org/zh/guide/scoped-css.html

tabBar组件
获取组件的宽度的方法：记得加上$el
const tabBarWidth=this.$refs.tabBar.$el.clientWidth

//获取组件的宽度的方法： slide是slide的一个实例，获取实例的scrollWidth
const slideWidth=this.$refs.slide.slide.scrollerWidth
//滚动的位置
const transform=-pos.x/slideWidth*tabBarWidth
this.$refs.tabBar.setSliderTransform(transform)
注意要关闭默认滚动属性：
:useTransition=false

tab组件的抽象和封装,使页面更灵活，充分的解耦。
代码的优雅性
没有提供动态组件时 component :is=””   组件和数据时外部传入的
<component :is="tab.component" :data="tab.data"></component>

Goods组件开发
ScrollNav组件
Better-scroll引用时触发两次时，设置click为false
scrollOptions: {
  click: false,

如果没有count属性，则通过$set设置
if(!this.food.count) {
  this.$set(this.food, 'count', 1)
}


@click.stop
阻止事件冒泡

插槽，作用域插槽
https://didi.github.io/cube-ui/#/zh-CN/docs/scroll-nav-bar

技巧
foods.forEach((food)=>{
  count += food.count || 0
})

cube-popup弹窗组件
cube-scroll 滚动
设置成一个API组件，在register中调用  api组件是动态挂载到body下。

购物车列表的层级问题
Sticky组件能力覆盖

弹窗抽象出来mixins

时间开源库 moment http://momentjs.cn/
本地存储

解析参数 Query-string库
https://github.com/sindresorhus/query-string

本地缓存 storage库
https://github.com/ustbhuangyi/storage

storage.js可通用
import storage from 'good-storage'

const SELLER_KEY = '__seller__'

// 存 区分商家id 不同功能收藏 key 值value
export function saveToLocal(id, key, val) {
  const seller = storage.get(SELLER_KEY, {})
  if (!seller[id]) {
    seller[id] = {}
  }
  seller[id][key] = val
  storage.set(SELLER_KEY, seller)
}

// 取 def表示默认值
export function loadFromLocal(id, key, def) {
  const seller = storage.get(SELLER_KEY, {})
  if (!seller[id]) {
    return def
  }
  return seller[id][key] || def
}

seller中 收藏功能引用
import { saveToLocal, loadFromLocal} from 'common/js/storage'

const KEY = 'favorite'

created() {
  //获取
  this.favorite = loadFromLocal(this.seller.id, KEY, false)
},

methods: {
  toggleFavorite() {
    this.favorite = !this.favorite
    //存储
    saveToLocal(this.seller.id, KEY, this.favorite)
  }
}


app.vue中tab切换功能引用
this.$emit('getTabIndex',current)

<tab ref="tab" @getTabIndex="getTabIndex" :tabs="tabs" :initialIndex="initialIndex"></tab>

import { saveToLocal, loadFromLocal} from 'common/js/storage'

const KEY = 'type'

created() {
  //获取
  this.initialIndex = loadFromLocal(this.seller.id, KEY, 0)
},


getTabIndex(current) {
  this.initialIndex=current
  //存储
  saveToLocal(this.seller.id, KEY, this.initialIndex)
}
create-api原理介绍
https://didi.github.io/cube-ui/#/zh-CN/docs/create-api
https://github.com/cube-ui/vue-create-api

打包构建
dist\js\chunk-vendors.b2ead849.js  表示通过第三方node_model库中import的js
dist\js\app.9e2a803f.js 表示以应用开发的代码，src自己开发的代码依赖的模块
通过哈希的方式 达到增量发布的效果


