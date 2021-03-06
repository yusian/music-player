<template lang="html">
  <transition>
    <div class="singer-detail">
      <div class="detail-wrapper">
        <div class="detail-header" ref="header">
          <div class="nav-bar">
            <span class="icon-back" @click="back_click"></span>
          </div>
          <div class="singer-info">
            <div class="avatar"><img v-lazy="detail.avatar" width="120" height="120"></div>
            <div class="basic-info">
              <div class="name">{{detail.name}}</div>
              <div class="fans" v-show="detail.fans">粉丝：{{detail.fans}}万人</div>
              <div class="intorduce">{{detail.desc}}</div>
            </div>
          </div>
          <div class="play-panel" ref="playPanel">
            <div class="play-button" v-show="detail.songList" @click="_playAll">
              <span class="icon-play"></span>
              <span class="play-text">播放全部</span>
            </div>
          </div>
          <div class="background">
            <div class="bg-wrapper" :style="backgroundStyle">
              <div class="bg-layer"></div>
            </div>
          </div>
        </div>
        <loading v-if="!detail.songList"></loading>
        <div class="song-list" ref="scroll">
          <ul v-show="detail.songList">
            <div class="statistical">歌曲 共{{detail.songCount}}首</div>
            <li class="song-item" v-for="(song,index) in detail.songList" :key="index" @click="song_item_click(song, index)">
              <div class="song-name">{{song.name}}</div>
              <div class="singer">{{song.singer}}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import {
  mapGetters,
  mapActions
} from 'vuex'
import {
  getSingerDetail
} from '@/api/singer.js'
import SingerDetail from './singerDetail.js'
import BScroll from 'better-scroll'
import {
  prefixStyle
} from '@/common/js/dom.js'
import Loading from '@/base/loading/loading.vue'
import {
  playlistMixin
} from '@/common/js/mixin'
const transform = prefixStyle('transform');
export default {
  mixins: [playlistMixin],
  data: function() {
    return {
      detail: {}
    }
  },
  components: {
    Loading
  },
  computed: {
    backgroundStyle: function() {
      let style = `background:url(${this.detail.avatar});`;
      return style;
    },
    ...mapGetters([
      'singer'
    ])
  },
  created: function() {
    this._getSingerDetail(this.singer);
  },
  mounted: function() {
    // Header的高度
    this.header_height = this.$refs.header.clientHeight
    // body的高度减去Header的高度，得以songlist的高度
    this.$refs.scroll.style.height = (document.body.clientHeight - this.header_height) + 'px';
    // Header在滚动过程中的偏移量
    this.playOffset = this.$refs.playPanel.offsetTop;
    this.scroll = new BScroll(this.$refs.scroll, {
      probeType: 3,
      click: true
    });
    this.scroll.on('scroll', offset => {
      let offsetY = Math.max(offset.y, -this.playOffset);
      offsetY = Math.min(0, offsetY);
      this.$refs.header.style[transform] = `translate3d(0, ${offsetY}px, 0)`;
    });
  },
  methods: {
    _getSingerDetail: function(singer) {
      if (!singer.id) {
        this.$router.push('/singer');
        return;
      }
      getSingerDetail(singer.id).then(response => {
        console.log(response.data);
        this.detail = new SingerDetail(response.data);
        console.log(this.detail);
      });
    },
    back_click: function() {
      this.$router.back();
    },
    song_item_click: function(song, index) {
      this.selectPlay({
        list: this.detail.songList,
        index
      });
    },
    _playAll: function() {
      console.log('...');
      this.playAll(this.detail.songList);
    },
    handlePlaylist: function(playlist) {
      let padding = (playlist.length === 0) ? 0 : 60;
      let h = document.body.clientHeight - this.header_height - padding;
      this.$refs.scroll.style['height'] = `${h}px`;
      if (this.scroll) this.scroll.refresh();
    },
    ...mapActions([
      'selectPlay',
      'playAll'
    ])
  }
}
</script>

<style lang="stylus">
@import '~@/common/stylus/variable.styl'
.singer-detail
  position: fixed
  top: 0
  width: 100%
  height: 100%
  background: white
  &.v-enter-active,&.v-leave-active
    transition: all 0.3s
  &.v-enter,&.v-leave-to
    transform: translate3d(100%, 0, 0)
  .detail-wrapper
    .detail-header
      z-index: 10
      position: relative
      height: 256px
      .nav-bar
        height: 44px
        font-size: 0
        .icon-back
          font-size: 20px
          line-height: 44px
          padding: 0 10px
      .singer-info
        display: flex
        overflow: hidden
        justify-content: space-between
        padding: 16px 16px 0
        font-size: 0
        .basic-info
          margin-left: 10px
          font-size: 14px
          overflow: hidden
          .name
            margin-top: 20px
            font-size: 18px
            font-weight: 200
          .fans
            margin-top: 16px
            font-weight: 200
          .intorduce
            margin-top: 14px
            white-space: nowrap
            overflow: hidden
            text-overflow: ellipsis
            -webkit-line-clamp: 2
            font-weight: 200
      .play-panel
        height: 80px
        display: flex
        justify-content: center
        align-items: center
        .play-button
          background: #31c27c
          padding: 10px 40px
          font-size: 0
          border-radius: 30px
          &:active
            opacity: 0.5
        .icon-play
          font-size: 20px
        .play-text
          margin-left: 10px
          font-size: 14px
          line-height: 20px
          font-weight: 200
          vertical-align: top
      .background
        position: absolute
        top:0
        width: 100%
        height: 100%
        z-index: -1
        background: $color-background
        overflow: hidden
        .bg-wrapper
          width: 100%
          height: 100%
          background-size: 100% 100% !important
          filter: blur(20px)
          .bg-layer
            width: 100%
            height: 100%
            background: rgba(0,0,0,0.5)
    .loading
      color: $color-background
    .song-list
      font-size: 0
      background: white
      .statistical
        padding: 16px 16px 6px 16px
        font-size: 14px
        font-weight: 200
        color: #999
      .song-item
        padding: 16px
        .song-name
          font-weight: 200
          font-size: 16px
          color: #444
        .singer
          margin-top: 8px
          font-size: 12px
          font-weight: 200
          color: #999
        &:active
          background: rgba(0,0,0,0.2)
</style>
