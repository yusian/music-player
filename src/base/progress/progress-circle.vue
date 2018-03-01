<template lang="html">
  <div class="progress-circle">
    <svg :width="radius" :height="radius" viewBox="0 0 100 100">
      <circle r="46" cx="50" cy="50" fill="transparent"  stroke-dasharray="314" :stroke-dashoffset="dashoffset"></circle>
    </svg>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    radius: {
      type: String
    },
    progress: {
      type: Number,
      default: 0
    }
  },
  computed: {
    dashoffset: function() {
      return `${this.progress * -314}`;
    }
  }
}
</script>

<style lang="stylus">
@import '~@/common/stylus/variable.styl'
.progress-circle
  position: relative
  svg
    position: absolute
    top: 26%
    circle
      stroke-width: 8px
      transform-origin: center
      transform: rotate(-90deg)
      stroke: rgba(0,0,0,0.5)
</style>
