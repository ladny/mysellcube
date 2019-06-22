<template>
    <div class="tab">
      <cube-tab-bar
        :showSlider=true
        :useTransition=false
        v-model="selectedLabel"
        :data="tabs"
        ref="tabBar"
        class="border-bottom-1px"
      >
      </cube-tab-bar>
      <div class="slide-wrapper">
        <cube-slide
          :loop=false
          :auto-play=false
          :show-dots=false
          :initial-index="index"
          ref="slide"
          @change="onChange"
          @scroll="onScroll"
          :options="slideOptions"
        >
          <cube-slide-item v-for="(tab, index) in tabs" :key="index">
            <component :is="tab.component" :data="tab.data" ref="component"></component>
          </cube-slide-item>
        </cube-slide>
      </div>
    </div>
</template>

<script>
    export default {
      name: "tab",
      props: {
        tabs: {
          type:Array,
          default() {
            return []
          }
        },
        initialIndex: {
          type: Number,
          default: 0
        }
      },
      data() {
        return {
          index:this.initialIndex,
          slideOptions: {
            listenScroll:true,
            probeType:3,
            directionLockThreshold:0//竖向滚动0
          }
        }
      },
      computed: {
        selectedLabel: {
          get() {
            return this.tabs[this.index].label
          },
          //设置index
          set(newVal) {
            this.index = this.tabs.findIndex((value) => {
              return value.label === newVal
            })
          }
        }
      },
      mounted() {
        this.onChange(this.index)
      },
      methods: {
        //current当前索引
        onChange(current) {
          this.index=current
          //获取当前组件
          const component=this.$refs.component[current]
          //如果component组件定义了fetch方法，就是调用这个方法，获取数据
          component.fetch && component.fetch()


          this.$emit('getTabIndex',current)
        },
        //滚动时tab随之滚动
        //pos派发的对象  better-scroll内部的实例对象slide的scrollerWidth属性获取宽度
        onScroll(pos) {
          const tabBarWidth=this.$refs.tabBar.$el.clientWidth
          const slideWidth=this.$refs.slide.slide.scrollerWidth
          //滚动的位置
          const transform=-pos.x/slideWidth*tabBarWidth
          this.$refs.tabBar.setSliderTransform(transform)
        }

      }
    }
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"

  .tab
    >>> .cube-tab
      padding: 10px 0
    display: flex
    flex-direction: column
    height: 100%
  .slide-wrapper
    flex: 1
    overflow: hidden
</style>
