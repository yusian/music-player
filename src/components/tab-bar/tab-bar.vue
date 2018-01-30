<template lang="html">
  <div class="tabbar">
    <div class="tabbar-wrapper">
      <router-link tag="span" :to="{ name: 'recommend', params: {} }" class="tabbar-item">
        <span class="text">推荐</span>
      </router-link>
      <router-link tag="span" :to="{ name: 'singer', params: {} }" class="tabbar-item">
        <span class="text">歌手</span>
      </router-link>
      <router-link tag="span" :to="{ name: 'rank', params: {} }" class="tabbar-item">
        <span class="text">排行</span>
      </router-link>
      <router-link tag="span" :to="{ name: 'search', params: {} }" class="tabbar-item">
        <span class="text">搜索</span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang="stylus">
@import '~@/common/stylus/variable.styl'
.tabbar-wrapper
  display: flex
  justify-content: space-between
  .tabbar-item
    width: 100%
    line-height: 44px
    text-align: center
    &.router-link-active
      .text
        padding: 2px 0
        color: $color-theme
        border-bottom: 2px solid $color-theme
</style>
