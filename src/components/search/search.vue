<template lang="html">
  <div class="search">
    <search-bar placeholder="搜索歌曲、歌单" @valueChange="searchValueChange" ref="searchBar"></search-bar>
    <div class="search-content">
      <div class="search-key-panel" v-show="!searchkey">
        <div class="hot-key">
          <div class="title">
            <span class="text">热门搜索</span>
          </div>
          <div class="hot-key-list">
            <span class="hot-key"
                  v-for="(hotKey, index) in hotKeys"
                  :key="index"
                  @click="_hotKeyClick(hotKey)">{{hotKey.k}}</span>
          </div>
        </div>
        <div class="search-history" v-show="searchHistoryList.length > 0">
          <div class="title">
            <span class="text">搜索历史</span>
            <span class="title-button icon-clear" @click="_clearSearchHistory"></span>
          </div>
          <ul class="search-history-list">
            <li class="history-item" v-for="(historyItem,index) in searchHistoryList" :key="index">
              <span class="history-name">{{historyItem}}</span>
              <span class="item-button icon-delete" @click="deleteSearchItem(historyItem)"></span>
            </li>
          </ul>
        </div>
      </div>
      <result-list :searchkey="searchkey" v-show="searchkey" @startScroll="startScroll" @addSearchItem="addSearchItem"></result-list>
    </div>
    <confirm ref="confirm" :message="confirmMsg" @cancel="confirmCancel" @submit="confirmSubmit"></confirm>
  </div>
</template>

<script>
import SearchBar from '@/base/searchbar/searchbar.vue'
import {
  proxyGetRequestURL
} from '@/common/js/jsonp.js'
import ResultList from './resultlist.vue'
import {
  mapActions,
  mapGetters
} from 'vuex'
import Confirm from '@/base/confirm/confirm.vue'
export default {
  data: function() {
    return {
      hotKeys: [],
      searchkey: '',
      historyList: [],
      confirmMsg: '是否确认清除历史记录'
    }
  },
  computed: {
    ...mapGetters([
      'searchHistoryList'
    ])
  },
  components: {
    SearchBar,
    ResultList,
    Confirm
  },
  mounted: function() {
    this._getHotKeyList();
  },
  methods: {
    startScroll: function() {
      this.$refs.searchBar.blur();
    },
    searchValueChange: function(searchValue) {
      this.searchkey = searchValue;
    },
    _hotKeyClick: function(hotKey) {
      this.$refs.searchBar.setValue(hotKey.k.trim());
    },
    _getHotKeyList: function() {
      let url = '/api/splcloud/fcgi-bin/gethotkey.fcg';
      let param = {
        g_tk: 889241913,
        platform: 'h5',
        needNewCode: 1
      }
      this.$http.get(proxyGetRequestURL(url, param)).then(response => {
        this.hotKeys = response.data.data.hotkey.slice(0, 10);
      });
    },
    _clearSearchHistory: function() {
      this.$refs.confirm.show();
    },
    confirmCancel: function() {},
    confirmSubmit: function() {
      this.clearSearchHistory();
    },
    ...mapActions([
      'addSearchItem',
      'deleteSearchItem',
      'clearSearchHistory'
    ])
  }
}
</script>

<style lang="stylus" scoped>
.search
  position: relative
  height: 100%
.search-content
  position: absolute
  width: 100%
  top: 56px
  bottom: 0
  .title
    display: flex
    padding: 10px
    font-size: 16px
    .text
      font-weight: 300
      flex: 1 0 auto
    .title-button
      flex 0 0 30px
      text-align: center
      color: rgba(255,255,255,0.6)
      &:active
        opacity: 0.5
  .hot-key-list
    display:flex
    display: -webkit-flex
    flex-wrap: wrap
    -webkit-flex-wrap: wrap
    justify-content: left
    font-size: 0
    .hot-key
      font-size: 14px
      font-weight: 200
      border-radius: 18px
      border: 1px solid white
      padding: 4px 10px
      margin: 0 5px 10px
      :active
        opactiy: 0.5
  .history-item
    display: flex
    background: rgba(255,255,255,0.05)
    padding: 10px
    font-size: 14px
    border-bottom: 0.5px solid rgba(255,255,255,0.2)
    &:last-child
      border-bottom: none
    .history-name
      font-weight: 200
      flex: 1 0 auto
    .item-button
      font-size: 10px
      flex: 0 0 30px
      text-align: center
      color: rgba(255,255,255,0.6)
      &:active
        opacity: 0.5
</style>
