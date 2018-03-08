<template lang="html">
<div class="list-view" ref="listView">
  <div class="list-view-wrapper">
    <ul class="list-group" id="scroll">
      <li class="group-section" v-for="(group, index) in listGroup" :key="index" ref="section">
        <h2 class="section-title">{{group.title}}</h2>
        <ul class="section-cells">
          <li class="section-cell" v-for="item in group.items" :key="item.id" @click="_cell_click(item)">
            <span class="cell-avatar"><img v-lazy="item.avatar" width="60" height="60"></span>
            <span class="cell-text">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
  </div>
  <div class="index-list" @touchstart="_touchstart" @touchmove.stop="_touchmove">
    <ul class="index-list-wrapper">
      <li class="index-item" v-for="(item, index) in indexList" :key="index" :data-index="index" :class="{'active':index===currentIndex}">{{item}}</li>
    </ul>
  </div>
  <div class="index-title" v-show="showIndexTitle" ref="indexTitle">{{_indexTitle}}</div>
</div>
</template>

<script>
import BScroll from 'better-scroll'
import {
  playlistMixin
} from '@/common/js/mixin.js'
export default {
  mixins: [playlistMixin],
  data: function() {
    return {
      currentIndex: 0,
      showIndexTitle: false
    }
  },
  props: {
    listGroup: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  computed: {
    indexList: function() {
      return this.listGroup.map((groupItem) => {
        return groupItem.title.substr(0, 1);
      })
    },
    _indexTitle: function() {
      let indexArray = this.listGroup.map(groupItem => {
        return groupItem.title;
      })
      return indexArray[this.currentIndex];
    }
  },
  mounted: function() {
    this.scroll = new BScroll(this.$refs.listView, {
      probeType: 3,
      click: true
    });
    this.scroll.on('scroll', offset => {
      let heightArray = this._groupItemHeightArray();
      let offsetY = Math.abs(offset.y);
      let index = 0;
      for (; index < heightArray.length; index++) {
        let position = heightArray[index];
        if (position > offsetY) {
          this._animateIndex(position - offsetY);
          break;
        }
      }
      this.currentIndex = index;
      this.showIndexTitle = offset.y < 0;
    })
  },
  methods: {
    handlePlaylist: function(playlist) {
      let padding = (playlist.length === 0) ? 0 : 60;
      let listGroup = document.getElementById('scroll');
      if (listGroup) listGroup.style['padding-bottom'] = `${padding}px`;
      if (this.scroll) this.scroll.refresh();
    },
    _cell_click: function(singer) {
      this.$emit('item-click', singer);
    },
    _touchstart: function(event) {
      this.touch = event.touches[0];
      let index = event.target.getAttribute('data-index');
      if (index === null) return; // 点击没有落在index区域排除
      this.index = index;
      let el = this.$refs.section[this.index];
      this.scroll.scrollToElement(el);
      this.currentIndex = parseInt(this.index);
    },
    _touchmove: function(event) {
      let touch = event.touches[0]; // 当前touch信息
      let space = touch.clientY - this.touch.clientY; // 相对touchstart偏移量
      let height = event.target.clientHeight; // 当前元素高度
      // 相对偏移量的元素高倍数，即可得到偏移几个索引量，加上原索引得到当前索引
      let index = parseInt(this.index) + parseInt(space / height);
      // 最小为0，最大不超过元素最大个数
      index = Math.max(index, 0);
      index = Math.min(index, this.$refs.section.length - 1);
      if (index === this.currentIndex) return;
      this.currentIndex = index;
      let el = this.$refs.section[index];
      this.scroll.scrollToElement(el);
    },
    _groupItemHeightArray: function() {
      let sectionArray = this.$refs.listView.getElementsByClassName('group-section');
      let heightArray = [];
      let height = 0;
      Array.from(sectionArray).forEach(el => {
        height += el.clientHeight;
        heightArray.push(height);
      });
      return heightArray;
    },
    _animateIndex: function(distance) {
      let trans = (distance < 28) ? (28 - distance) : 0;
      if (this.trans === -trans) return;
      this.trans = -trans;
      this.$refs.indexTitle.style.transform = `translate3d(0, ${this.trans}px, 0)`;
    }
  }
}
</script>

<style lang="stylus">
@import '~@/common/stylus/variable.styl'
.list-view
  height: 100%
  font-size: 0
  position: relative
  .section-title
  .index-title
    padding: 6px 20px
    font-size: 16px
    color: $color-text-ll
    background: $color-highlight-background
  .section-cell
    display: flex
    align-items: center
    padding: 10px 20px
    .cell-avatar
      img
        border-radius: 50%
    .cell-text
      margin-left: 20px
      color: $color-text-l
      font-size: $font-size-large
    &:active
      background: $color-background-d
  .index-list
    display: flex
    align-items: center
    position: absolute
    top: 0
    right: 10px
    height: 100%
    .index-list-wrapper
      padding: 10px 4px
      background: $color-background-d
    .index-item
      padding: 2px
      font-size: 14px
      text-align: center
      color: $color-text-l
      &.active
        color: $color-theme
  .index-title
    position: absolute
    top: 0
    width: 100%
</style>
