
<template lang="html">
  <div class="slider" ref="slider">
    <div class="slider-wrapper" ref="sliderWrapper">
      <slot></slot>
    </div>
    <div class="dots">
      <span class="dot" v-for="(dot,index) in dots" :key="index" :class="{'active': index==currentPage}"></span>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import {
  AddClass
} from '@/common/js/dom.js'
export default {
  data: function() {
    return {
      dots: [],
      currentPage: 0
    }
  },
  props: {
    loop: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 4000
    }
  },
  mounted: function() {
    this.sliderItems = this.$refs.sliderWrapper.children;
    setTimeout(() => {
      this._layoutScroll();
      this._layoutDots();
      this._initScrollCtrl();
      if (this.autoPlay) this._autoPlay();
    }, 200);
    window.addEventListener('resize', () => {
      if (!this.scroll) return;
      this._layoutScroll();
      this.scroll.refresh();
    });
  },
  methods: {
    _layoutScroll: function() {
      let w = this.$refs.slider.clientWidth; // 单个元素宽度
      let width = w * this.sliderItems.length; // 总宽度
      if (this.loop) width += (w * 2); // 自动轮播增加两个宽度
      this.$refs.sliderWrapper.style.width = width + 'px';
      Array.from(this.sliderItems).forEach(el => {
        el.style.width = w + 'px';
        AddClass(el, 'slider-item');
      })
    },
    _layoutDots: function() {
      this.dots = new Array(this.sliderItems.length);
    },
    _initScrollCtrl: function() {
      this.scroll = new BScroll(this.$refs.slider, {
        scrollX: true,
        momentum: false,
        snap: {
          loop: true
        }
      });
      this.scroll.on('scrollEnd', () => {
        this.currentPage = this.scroll.currentPage.pageX - 1;
        if (this.autoPlay) {
          clearTimeout(this.scrollTimer);
          this._autoPlay();
        }
      });
    },
    _autoPlay: function() {
      this.scrollTimer = setTimeout(() => {
        let index = (this.currentPage + 1) % this.dots.length;
        console.log(index);
        this.scroll.goToPage(index, 0, 400);
      }, this.interval);
    }
  }
}
</script>

<style lang="stylus">
.slider
  overflow: hidden
  font-size: 0
  position: relative
  .slider-item
    display: inline-block
    white-space: nowrap
  .dots
    display: flex
    position: absolute
    width: 100%
    bottom: 10px
    justify-content: center
    .dot
      display: inline-block
      background: rgba(255, 255, 255, 0.5)
      width: 8px
      height: 8px
      border-radius: 50%
      margin-right: 10px
      &:last-child
        margin: 0
      &.active
        background: white
</style>
