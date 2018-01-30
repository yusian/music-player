<template lang="html">
<div class="header">
  <div class="header-wrapper">
    <div class="title">
      <div class="icon"></div>
      <div class="text">Sian-Music</div>
    </div>
  </div>
</div>
</template>

<script>
export default {}
</script>

<style scoped lang="stylus">
@import '~@/common/stylus/mixin.styl'
@import '~@/common/stylus/variable.styl'
.header-wrapper
  height: 44px
  display: flex
  justify-content: center
  border-bottom: 0.5px solid $color-theme-d
  .title
    display: flex
    align-items: center
    .icon
      width: 32px
      height: 32px
      background-size: 32px 32px
      background-repeat: no-repeat
      background-position: center center
      bg-image('logo')
    .text
      margin-left: 10px
      font-size: 18px
      color: $color-theme
</style>
