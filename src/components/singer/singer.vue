<template lang="html">
  <div class="singer">
    <loading v-if = "!singerList.length"></loading>
    <list-view :listGroup="this.singerList"></list-view>
  </div>
</template>

<script>
import {
  getSingerList
} from '@/api/singer.js'
import ListView from '@/base/listview/listview.vue'
import Loading from '@/base/loading/loading.vue'
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
        console.log(this.singerList);
      }).catch(reject => {
        console.log(reject);
      });
    },
    // 歌手分组列表数据转换
    _formatSingerList: function(originList) {
      let hots = {};
      let group = {};
      originList.forEach((item, index) => {
        let obj = this._formatSingerObject(item);
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
    // 歌手对象数据转换
    _formatSingerObject: function(originObj) {
      let avatar = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${originObj.Fsinger_mid}.jpg?max_age=2592000`
      return {
        id: originObj.Fsinger_mid,
        name: originObj.Fsinger_name,
        avatar: avatar
      }
    }
  }
}
</script>

<style lang="stylus">
.singer
  height: 100%
  overflow: hidden
</style>
