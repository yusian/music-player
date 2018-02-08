<template lang="html">
  <div class="singer">
    <loading v-if = "!singerList.length"></loading>
    <list-view :listGroup="this.singerList" @item-click="itemClick"></list-view>
    <router-view></router-view>
  </div>
</template>

<script>
import {
  getSingerList
} from '@/api/singer.js'
import ListView from '@/base/listview/listview.vue'
import Loading from '@/base/loading/loading.vue'
import {
  mapMutations
} from 'vuex'
// import Singer from '@/common/js/singer.js'
import {
  createSinger
} from '@/common/js/singer.js'
const HOT_GROUP_NAME = '热门歌手'
const HOT_GROUP_LENGTH = 10
export default {
  data: function() {
    return {
      singerList: []
    }
  },
  created: function() {
    setTimeout(() => {
      this._getSingerList();
    }, 1000);
  },
  components: {
    ListView,
    Loading
  },
  methods: {
    _getSingerList: function() {
      getSingerList().then(response => {
        this.singerList = this._formatSingerList(response.data.list);
      }).catch(reject => {
        console.log(reject);
      });
    },
    // 歌手分组列表数据转换
    _formatSingerList: function(originList) {
      let hots = {};
      let group = {};
      originList.forEach((item, index) => {
        // let obj = new Singer(item.Fsinger_id, item.Fsinger_mid, item.Fsinger_name);
        let obj = createSinger(item);
        // 前10个为热门
        if (index < HOT_GROUP_LENGTH) this._formartGroupObject(hots, HOT_GROUP_NAME, obj);
        this._formartGroupObject(group, item.Findex, obj);
      })

      let array = [];
      for (let key in group) {
        if (!key.match(RegExp('[a-zA-Z]'))) continue;
        array.push(group[key]);
      }
      array.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0);
      })
      array.unshift(hots[HOT_GROUP_NAME]);
      return array;
    },
    // 歌手分组
    _formartGroupObject: function(map, groupName, groupItem) {
      if (!map[groupName]) {
        map[groupName] = {
          title: groupName,
          items: []
        };
      }
      map[groupName]['items'].push(groupItem);
    },
    itemClick: function(singer) {
      this.$router.push(`./singer/${singer.id}`);
      this.setSinger(singer);
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    })
  }
}
</script>

<style lang="stylus">
.singer
  height: 100%
  overflow: hidden
</style>
