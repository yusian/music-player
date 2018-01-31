<template lang="html">
  <div class="recommend">
    <slider v-if="slidArray.length">
      <a v-for="pic in slidArray" :href="pic.linkUrl" :key="pic.id">
        <img :src="pic.picUrl" width="100%" alt="">
      </a>
    </slider>
  </div>
</template>

<script>
import {
  getRecommond
} from '@/api/recommend.js'
import Slider from '@/base/slider/slider.vue'
export default {
  data: function() {
    return {
      slidArray: []
    }
  },
  created: function() {
    this._getRecommond();
  },
  methods: {
    _getRecommond: function() {
      getRecommond().then(response => {
        console.log(response);
        this.slidArray = response.data.slider;
      }).catch(error => {
        console.log(error);
      });
    }
  },
  components: {
    Slider
  }
}
</script>

<style lang="stylus">
.recommend
  height: 100%
</style>
