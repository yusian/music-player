<template lang="html">
<transition>
<div class="confirm" v-show="display">
  <div class="content">
    <div class="content-wrapper">
      <div class="text-group">
        <div class="title">提示</div>
        <div class="text">{{message}}</div>
      </div>
      <div class="button-group">
        <span class="confirm-button cancel-button" @click="_cancel">取消</span>
        <span class="confirm-button submit-button" @click="_submit">确认</span>
      </div>
    </div>
  </div>
</div>
</transition>
</template>

<script>
export default {
  data: function() {
    return {
      display: false
    }
  },
  props: {
    message: {
      type: String,
      default: '是否确认？'
    }
  },
  methods: {
    _cancel: function() {
      this.hidden();
      this.$emit('cancel');
    },
    _submit: function() {
      this.hidden();
      this.$emit('submit');
    },
    show: function() {
      this.display = true;
    },
    hidden: function() {
      this.display = false;
    }
  }
}
</script>

<style lang="stylus" scoped>
.confirm
  position: absolute
  width: 100%
  height: 100%
  top: 0
  left: 0
  background: rgba(0,0,0,0.5);
  &.v-enter-active
    animation: confirm-fadein .3s
    .content
      animation: confirm-zoom .3s
  .content
    position: absolute
    top: 50%
    left: 50%
    width: 240px
    transform: translate(-50%, -50%)
    border-radius: 12px
    overflow: hidden
    .content-wrapper
      color: #444
    .text-group
      background: rgba(255,255,255,0.9)
    .title
      line-height: 40px
      text-align: center
    .text
      text-align: center
      line-height: 40px
      font-weight: 200
    .button-group
      display: flex
      display: -webkit-flex
      margin-top: 0.5px
      .confirm-button
        background: rgba(255,255,255,0.9)
        line-height: 44px
        flex: 1 1 auto
        -webkit-flex: 1 1 auto
        text-align: center
        margin-right: 0.5px
        &:active
          opacity: 0.5
        &:last-child
          margin-right: 0
@keyframes confirm-fadein
  0%
    opacity: 0
  100%
    opacity: 1
@keyframes confirm-zoom
  0%
    transform: translate(-50%, -50%) scale(0)
  50%
    transform: translate(-50%, -50%) scale(1.1)
  100%
    transform: translate(-50%, -50%) scale(1.0)
</style>
