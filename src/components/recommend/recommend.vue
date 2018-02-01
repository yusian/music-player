<template lang="html">
  <div class="recommend" ref="recommend">
    <div class="recom-wrapper">
      <slider v-if="slidArray.length">
        <a v-for="pic in slidArray" :href="pic.linkUrl" :key="pic.id">
          <img :src="pic.picUrl" width="100%" alt="">
        </a>
      </slider>
      <div class="song-sheet">
        <div class="song-wrapper">
          <div class="title">热门歌单推荐</div>
          <ul class="song-list" v-if="songList.length">
            <li class="song-item" v-for="song in songList" :key="song.id">
              <div class="icon">
                <img v-lazy="song.picUrl" width="80" height="80">
              </div>
              <div class="content">
                <div class="author">{{song.songListAuthor}}</div>
                <div class="desc">{{song.songListDesc}}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getRecommond
} from '@/api/recommend.js'
import Slider from '@/base/slider/slider.vue'
import BScroll from 'better-scroll'
export default {
  data: function() {
    return {
      slidArray: [],
      songList: []
    }
  },
  created: function() {
    this._getRecommond();
  },
  mounted: function() {
    setTimeout(() => {
      this._initScrollCtrl();
    }, 20);
  },
  methods: {
    _getRecommond: function() {
      getRecommond().then(response => {
        console.log(response);
        this.slidArray = response.data.slider;
        this.songList = response.data.songList;
      }).catch(error => {
        console.log(error);
      });
    },
    _initScrollCtrl: function() {
      this.scroll = new BScroll(this.$refs.recommend, {
        click: true
      });
    }
  },
  components: {
    Slider
  }
}
</script>

<style lang="stylus">
@import '~@/common/stylus/variable.styl'
.recommend
  height: 100%
  overflow: hidden
  .song-sheet
    .title
      padding: 10px
      line-height: 24px
      text-align: center
      color: $color-theme
    .song-list
      .song-item
        display: flex
        padding: 10px 20px
        .icon
          font-size: 0
        .content
          margin-left: 20px
          flex: auto
          display: flex
          flex-direction: column
          justify-content: space-around
          .desc
            color: $color-text-d
</style>
