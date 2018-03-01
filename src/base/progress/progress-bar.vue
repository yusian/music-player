<template lang="html">
  <div class="sa-progress">
    <div class="progress-wrapper" @click="_progressClick">
      <div class="progress-background">
        <div class="history-progress" ref="historyProgress">
        </div>
      </div>
    </div>
    <div class="progress-position"
         ref="progressPosition"
         @touchstart.stop.prevent="_touchStart"
         @touchmove.stop.prevent="_touchMove"
         @touchend.stop.prevent="_touchEnd"></div>
  </div>
</template>

<script>
export default {
  props: {
    progress: {
      type: Number,
      default: 0
    }
  },
  watch: {
    progress: function(value) {
      if (this.touch) return;
      this.updateProgress(value);
    }
  },
  methods: {
    updateProgress: function(value) {
      let percent = `${value * 100}%`;
      this.$refs.historyProgress.style.width = percent;
      this.$refs.progressPosition.style['left'] = percent;
    },
    _progressClick: function(event) {
      console.log(event.target.getBoundingClientRect());
      let percent = event.offsetX / event.target.clientWidth;
      this.$emit('progressChange', percent);
    },
    _touchStart: function(event) {
      this.touch = event.touches[0];
      this.touch.progress = this.progress;
    },
    _touchMove: function(event) {
      if (!this.touch) return;
      let touch = event.touches[0];
      let offset = touch.clientX - this.touch.clientX; // 相对滑动偏移量
      let length = this.$refs.historyProgress.parentNode.clientWidth; // 进度条总长度
      let percent = offset / length + this.progress; // 相对滑动百分比+原百分比
      percent = Math.max(percent, 0); // 不小于0
      percent = Math.min(percent, 1); // 不大于1
      this.updateProgress(percent); // 更新视图
      this.touch.progress = percent; // 暂时记录，在touchEnd中再执行
    },
    _touchEnd: function(event) {
      this.$emit('progressChange', this.touch.progress);
      this.touch = null;
    }
  }
}
</script>

<style lang="stylus">
@import '~@/common/stylus/variable.styl'
.sa-progress
  display: flex
  position: relative
  align-items: center
  width: 100%
  height: 100%
  .progress-wrapper
    display: flex
    width: 100%
    height: 100%
    align-items: center
  .progress-background
    height: 4px
    width: 100%
    background: rgba(0,0,0,0.4)
    border-radius: 2px
    overflow: hidden
  .history-progress
    height: 100%
    width: 0
    background: $color-theme
    pointer-events:none
  .progress-position
    position: absolute
    background: $color-theme
    height: 10px
    width: 10px
    margin-left: -5px
    border-radius: 50%
    border: 2px solid white
</style>
