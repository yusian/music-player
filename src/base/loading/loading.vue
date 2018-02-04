<template lang="html">
<div class="loading">
  <div class="loading-icon"><img src="./loading.gif" width="20" height="20" alt=""></div>
  <div class="loading-text">正在加载中...</div>
</div>
</template>

<script>
export default {}
</script>

<style lang="stylus">
.loading
  position: fixed
  top: 50%
  width: 100%
  display: flex
  justify-content: center
  font-size: 0
  .loading-text
    font-size: 16px
    font-weight: 200
    line-height: 20px
    margin-left: 10px
</style>
