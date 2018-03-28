<template lang="html">
<div class="result-list">
  <div class="scroll" ref="scroll">
  <ul class="wrapper" id="scroll">
    <!-- 歌手 -->
    <li class="result-item" v-if="this.singer" @click="_singerClick(singer)">
      <img class="item-icon" v-lazy="this.singer.avatar" width="38" height="38">
      <div class="content">
        <div class="text">{{this.singer.name}}</div>
        <div class="description">{{`单曲：${this.singer.songnum} 专辑：${this.singer.albumnum}`}}</div>
      </div>
    </li>
    <!-- 歌曲 -->
    <li class="result-item" v-for="(song,index) in songlist" :key="index" @click="_songClick(song)">
      <div class="item-icon icon-music"></div>
      <div class="content">
        <div class="text">{{song.name}}</div>
        <div class="description">{{song.singer}}</div>
      </div>
    </li>
    <loading v-if="hasMore"></loading>
  </ul>
  </div>
  <router-view/>
</div>
</template>

<script>
import {
  proxyGetRequestURL
} from '@/common/js/jsonp.js'
import Song from '@/common/js/song.js'
import Singer from '@/common/js/singer.js'
import Loading from '@/base/loading/loading.vue'
import BScroll from 'better-scroll'
import {
  playlistMixin
} from '@/common/js/mixin.js'
import {
  mapMutations,
  mapActions
} from 'vuex'
const PER_PAGE = 20
export default {
  mixins: [playlistMixin],
  data: function() {
    return {
      songlist: null,
      singer: null,
      pageIndex: 1,
      hasMore: true,
      loading: false
    }
  },
  props: {
    searchkey: {
      type: String,
      default: ''
    }
  },
  mounted: function() {
    this.scroll = new BScroll(this.$refs.scroll, {
      click: true
    });
    this.scroll.on('scrollEnd', offset => {
      let maxY = this.scroll.maxScrollY;
      if (offset.y > maxY + 50) return;
      this._getSearchData(this.searchkey, true);
    });
    this.scroll.on('beforeScrollStart', () => {
      this.$emit('startScroll');
    })
  },
  watch: {
    searchkey: function(value) {
      if (value.length === 0) {
        this.songlist = null;
        this.singer = null;
        return;
      }
      this._getSearchData(value);
      this.scroll.scrollTo(0, 0);
    }
  },
  methods: {
    _getSearchData: function(value, isLoadMore = false) {
      this.pageIndex = isLoadMore ? this.pageIndex + 1 : 1;
      let url = '/api/soso/fcgi-bin/search_for_qq_cp';
      let param = {
        g_tk: 365238914,
        needNewCode: 1,
        w: value,
        zhidaqu: 1,
        catZhida: 1,
        t: 0,
        flag: 1,
        ie: 'utf-8',
        sem: 1,
        aggr: 0,
        perpage: PER_PAGE,
        n: 20,
        p: this.pageIndex,
        remoteplace: 'txt.mqq.all',
        format: 'json'
      };
      this.loading = true;
      this.$http.get(proxyGetRequestURL(url, param)).then(response => {
        this.loading = false;
        let data = response.data.data;
        console.log(data);
        this.hasMore = (data.song.curpage * PER_PAGE < data.song.totalnum);
        let songArray = [];
        data.song.list.forEach(song => {
          songArray.push(new Song(song))
        })
        if (isLoadMore) {
          this.songlist.push(...songArray);
        } else {
          this.songlist = songArray;
          if (data.zhida.type === 2) {
            this.singer = new Singer();
            this.singer.zhida(data.zhida);
          }
        }
        if (this.scroll) this.scroll.refresh();
      }).catch(reject => {
        this.loading = false;
      });
    },
    _singerClick: function(singer) {
      this.setSinger(singer);
      this.$router.push(`./search/${singer.id}`);
      // 搜索结果交互记录
      this.$emit('addSearchItem', singer.name);
    },
    _songClick: function(songer) {
      let list = this.songlist.slice()
      let index = list.indexOf(songer);
      console.log(list);
      this.selectPlay({
        list,
        index
      });
      // 搜索结果交互记录
      this.$emit('addSearchItem', songer.name);
    },
    handlePlaylist: function(playlist) {
      let h = (playlist.length > 0) ? 60 : 0;
      let scroll = document.getElementById('scroll');
      scroll.style['padding-bottom'] = `${h}px`;
      if (this.scroll) this.scroll.refresh();
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    }),
    ...mapActions([
      'selectPlay'
    ])
  },
  components: {
    Loading
  }
}
</script>

<style lang="stylus" scoped>
.loading
  position: relative
  height: 50px
.result-list,.scroll
  height: 100%
  overflow: hidden
.wrapper
  font-size: 0
.result-item
  display: flex
  align-items: center
  background: rgba(255,255,255,0.1)
  margin: 1px 0
  height: 50px
  &:active
    opacity: 0.5
  .item-icon
    padding: 5px
    font-size: 30px
    width: 38px
    border-radius: 50%
    text-align: center
  .content
    display: flex
    flex-direction: column
    justify-content: center
    font-size: 12px
    margin-left: 10px
    .text
      font-weight: 200
      color: #EEE
      font-size: 16px
    .description
      font-weight: 200
      margin-top: 8px
      color: gray
</style>
