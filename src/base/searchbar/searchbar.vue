<template lang="html">
<div class="search-bar">
  <div class="wrapper">
    <div class="icon-search"></div>
    <input type="text" class="search-input" :placeholder="placeholder" v-model="inputValue" ref="searchInput">
    <div class="clear-button icon-dismiss"
         @click="_clearButtonEvent"
         v-show="(inputValue.length > 0)"></div>
  </div>
</div>
</template>

<script>
import {
  debounce
} from '@/common/js/util.js'
export default {
  data: function() {
    return {
      inputValue: ''
    }
  },
  created: function() {
    // 监听某个数据的变化
    this.$watch('inputValue', debounce(inputValue => {
      this.$emit('valueChange', inputValue);
    }, 400));
  },
  props: {
    placeholder: {
      type: String,
      default: '请输入搜索内容'
    }
  },
  methods: {
    _clearButtonEvent: function() {
      this.inputValue = '';
    },
    setValue: function(value) {
      this.inputValue = value;
    },
    blur: function() {
      this.$refs.searchInput.blur();
    }
  }
}
</script>

<style lang="stylus" scoped>
.search-bar
  padding: 10px
  background: rgba(255,255,255,0.2)
.icon-search
  font-size: 24px
  margin-right: 5px
.wrapper
  position:relative
  background: rgba(255,255,255,0.2)
  height: 36px
  display: flex
  align-items: center
  display: -webkit-flex
  -webkit-align-items: center
  padding: 0 10px
  border-radius: 4px
  font-size: 0
  .search-input
    height: 100%
    font-size: 14px
    background: rgba(0,0,0,0)
    color: white
    font-weight: 100
    flex: 1 0 auto
    outline:none
    &::placeholder
      color:rgba(255,255,255,0.5)
  .clear-button
    position: absolute
    font-size: 14px
    right: 5px
    height: 30px
    line-height: 30px
    padding: 0 10px
</style>
