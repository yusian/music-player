<template>
<div id="app">
  <nav-bar></nav-bar>
  <tab-bar></tab-bar>
  <router-view></router-view>
</div>
</template>

<script>
import NavBar from '@/components/nav-bar/nav-bar'
import TabBar from '@/components/tab-bar/tab-bar'
export default {
  name: 'App',
  components: {
    NavBar,
    TabBar
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
