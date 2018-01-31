<template lang="html">
  <div class="recommend">
    Recommend...
  </div>
</template>

<script>
import {
  getRecommond
} from '@/api/recommend.js'
export default {
  created: function() {
    this._getRecommond();
  },
  methods: {
    _getRecommond: function() {
      getRecommond().then(response => {
        console.log(response);
      }).catch(error => {
        console.log(error);
      });
    }
  }
}
</script>

<style lang="css">
</style>
