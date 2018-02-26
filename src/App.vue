<template>
<div id="app">
  <nav-bar></nav-bar>
  <tab-bar></tab-bar>
  <keep-alive>
    <router-view></router-view>
  </keep-alive>
  <player></player>
</div>
</template>

<script>
import NavBar from '@/components/nav-bar/nav-bar'
import TabBar from '@/components/tab-bar/tab-bar'
import Player from '@/components/player/player.vue'
export default {
  name: 'App',
  components: {
    NavBar,
    TabBar,
    Player
  }
}
</script>

<style scoped lang="stylus">
@import '~@/common/stylus/variable.styl'
#app
  height: 100%
  display: flex
  flex-direction: column
</style>
