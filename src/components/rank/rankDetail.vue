<template lang="html">
<transition>
  <div class="rank-detail">
    <div class="header" :style="transform">
      <div class="background" :style="background">
        <div class="bg-filter"></div>
      </div>
      <div class="wrapper">
        <div class="navbar"><div class="icon-back" @click="_pop"></div></div>
        <div class="header-content" v-if="topInfo">
          <div class="header-album">
            <img v-lazy="topInfo.pic_album" width="120" height="120">
          </div>
          <div class="header-info">
            <div class="title">{{topInfo.ListName}}</div>
            <div class="day-index">{{dayIndex}}</div>
            <div class="update-time">{{`${detail.update_time} 更新`}}</div>
          </div>
        </div>
    </div>
    </div>
    <div class="songlist" v-if="this.songlist" ref="scroll">
      <ul class="list" id="list">
        <div class="description">排行榜 共{{songlist.length}}首</div>
        <li class="song-item" v-for="(song, index) in songlist" :key="index" @click="_playItem(song,index)">
          <div class="item-index" :class="{'index-style':index<3}">{{index+1}}</div>
          <div class="item-content">
            <div class="song-name">{{song.name}}</div>
            <div class="song-singer">{{_songDesciption(song)}}</div>
          </div>
        </li>
      </ul>
    </div>
    <loading v-if="!this.detail"></loading>
  </div>
</transition>
</template>

<script>
import {
  proxyGetRequestURL
} from '@/common/js/jsonp.js'
import {
  mapGetters,
  mapActions
} from 'vuex'
import Loading from '@/base/loading/loading.vue'
import BScroll from 'better-scroll'
import Song from '@/common/js/song.js'
import {
  playlistMixin
} from '@/common/js/mixin.js'
export default {
  mixins: [playlistMixin],
  data: function() {
    return {
      detail: null,
      topInfo: null,
      songlist: null,
      offsetY: 0
    }
  },
  mounted: function() {
    this._getDetailInfo();
  },
  computed: {
    background: function() {
      if (!this.topInfo) return '';
      return `background:url('${this.topInfo.pic_album}')`;
    },
    transform: function() {
      let y = Math.min(0, this.offsetY); // 永远小于0
      y = Math.max(y, 80 - 256); // 永远大于-176
      return `transform:translate3d(0,${y}px,0)`;
    },
    dayIndex: function() {
      if (this.detail.day_of_year) {
        return `第${this.detail.day_of_year}天`;
      } else {
        let array = this.detail.date.split('_');
        return `第${array[1]}周`;
      }
    },
    ...mapGetters([
      'rankItem'
    ])
  },
  methods: {
    _pop: function() {
      this.$router.back();
    },
    _getDetailInfo: function() {
      if (!this.rankItem.id) {
        this._pop();
        return;
      }
      let url = 'api/v8/fcg-bin/fcg_v8_toplist_cp.fcg';
      let param = {
        needNewCode: 1,
        tpl: 3,
        page: 'detail',
        type: 'top',
        topid: this.rankItem.id
      };
      this.$http.get(proxyGetRequestURL(url, param)).then(response => {
        this.detail = response.data;
        this.topInfo = response.data.topinfo;
        let songlist = [];
        response.data.songlist.forEach((rankSong, index) => {
          songlist.push(new Song(rankSong.data))
        });
        this.songlist = songlist;
        console.log(this.detail);
      })
    },
    _songDesciption: function(song) {
      let str = song.singer;
      if (song.albumdesc) str += ` •${song.albumdesc}`;
      return str;
    },
    _playItem: function(song, index) {
      this.selectPlay({
        list: this.songlist,
        index
      });
    },
    handlePlaylist: function(playlist) {
      if (playlist.length === 0) return;
      let list = document.getElementById('list');
      if (list) list.style['padding-bottom'] = '60px';
      if (this.scroll) this.scroll.refresh();
    },
    ...mapActions([
      'selectPlay'
    ])
  },
  watch: {
    songlist: function() {
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.scroll, {
          probeType: 3,
          click: true
        })
        this.scroll.on('scroll', offset => {
          this.offsetY = offset.y;
        });
      });
    }
  },
  components: {
    Loading
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/common/stylus/variable.styl'
.rank-detail
  position: absolute
  top: 0
  left: 0
  background: gray
  width: 100%
  height: 100%
  overflow: hidden
  background: white
  &.v-enter-active,&.v-leave-active
    transition: all 0.3s
  &.v-enter, &.v-leave-to
    transform: translate3d(100%, 0, 0)
  .header
    height: 256px
    position:relative
    overflow:hidden
    background: black
    z-index: 5
    .background
      position: absolute
      top:0
      left: 0
      width: 100%
      height: 100%
      z-index: 5
      filter: blur(10px)
      .bg-filter
        width: 100%
        height: 100%
        background: rgba(0,0,0,0.7)
    .wrapper
      position: absolute
      z-index: 10
      width: 100%
      .icon-back
        font-size: 26px
        line-height: 44px
        color: $color-theme
        width: 44px
        text-align: center
        &:active
          opacity: 0.5
      .header-content
        padding: 16px 16px 0 16px
        display: flex
        align-items: center
        .header-album
          font-size: 0
        .header-info
          flex: 1 0 auto
          margin-left: 10px
        .title,.day-index,.update-time
          padding: 5px 0
          font-weight: 300
          font-size: 12px
        .title
          font-size: 18px
  .songlist
    background: white
    position:absolute
    bottom: 0
    top: 256px
    width: 100%
    color: black
    .description
      padding: 14px
      font-weight: 300
      font-size: 14px
      color: gray
    .song-item
      display: flex
      display: -webkit-flex
      height: 60px
      align-items: center
      -webkit-align-items: center
      .item-index
        flex: 0 0 44px
        -webkit-flex: 0 0 44px
        font-weight: 300
        text-align: center
        color: gray
        &.index-style
          color: red
      .song-name
        font-weight: 300
        margin-bottom: 10px
      .song-singer
        font-weight: 300
        font-size: 10px
        color: gray
  .loading
    color: gray
</style>
