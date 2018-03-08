<template lang="html">
  <div class="rank">
    <div class="scroll" ref="scroll">
      <ul class="rank-list" v-show="topList.length > 0" id="list">
        <li class="rank-item" v-for="(rank,index) in topList" :key="index" @click="_itemClick(rank)">
          <div class="avatar">
            <img v-lazy="rank.picUrl" width="100" height="100">
          </div>
          <div class="content">
            <div class="title">{{rank.topTitle}}</div>
            <ul class="song-list">
              <li class="song-item" v-for="(song,index) in rank.songList" :key="index">
                <span class="song-index">{{index+1}}</span>
                <span class="song-name">{{song.songname}}</span>
                <span class="song-singer"> - {{song.singername}}</span>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
    <loading v-if="topList.length === 0"/>
    <router-view/>
  </div>
</template>

<script>
import {
  proxyGetRequestURL
} from '@/common/js/jsonp.js'
import Loading from '@/base/loading/loading.vue'
import BScroll from 'better-scroll'
import {
  mapMutations
} from 'vuex'
import {
  playlistMixin
} from '@/common/js/mixin.js'
export default {
  mixins: [playlistMixin],
  data: function() {
    return {
      topList: []
    }
  },
  mounted: function() {
    this._getTopList();
    this.scroll = new BScroll(this.$refs.scroll, {
      click: true
    });
  },
  methods: {
    _itemClick: function(rank) {
      this.setRankItem(rank);
      this.$router.push(`./rank/${rank.id}`);
    },
    _getTopList: function() {
      let url = 'api/v8/fcg-bin/fcg_myqq_toplist.fcg';
      let param = {
        format: 'json',
        notice: 0,
        platform: 'h5',
        needNewCode: 1
      }
      this.$http.get(proxyGetRequestURL(url, param)).then(response => {
        this.topList = response.data.data.topList;
        console.log(this.topList);
      })
    },
    handlePlaylist: function(playlist) {
      if (playlist.length === 0) return;
      let list = document.getElementById('list');
      if (list) list.style['padding-bottom'] = '60px';
      if (this.scroll) this.scroll.refresh();
    },
    ...mapMutations({
      setRankItem: 'SET_RANK_ITEM'
    })
  },
  watch: {
    topList: function(list) {
      if (this.scroll) this.scroll.refresh();
    }
  },
  components: {
    Loading
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/common/stylus/variable.styl'
.rank
.scroll
  height: 100%
  overflow: hidden
.rank-list
  padding-bottom: 10px
.rank-item
  margin: 10px
  display: flex
  background: rgba(255,255,255,0.1)
  font-size: 0
  &:active
    opacity: 0.5
  .content
    padding: 0 10px
    overflow: hidden
    .title
      font-size: 16px
      font-weight: 300
      line-height: 20px
      padding: 10px 0
    .song-list
      font-size: 12px
      flex-basis: 250px
      .song-item
        padding: 4px 0
        overflow: hidden
        text-overflow: ellipsis
        white-space: nowrap
        .song-index
          color: gray
          width: 10px
          display: inline-block
        .song-name
          font-weight: 300
        .song-singer
          color: gray
          font-weight: 300
</style>
