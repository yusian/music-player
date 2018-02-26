<template lang="html">
<div class="player" v-if="playlist && (playlist.length > 0)">
  <transition>
    <div class="player-full" v-show="fullScreen">
    <div class="full-background" :style="backgroundStyle"></div>
    <div class="full-wrapper">
      <div class="full-header">
        <div class="full-title">{{currentSong.name}}</div>
        <div class="full-dismiss icon-back" @click="dismiss"></div>
      </div>
      <div class="full-singer">{{currentSong.singer}}</div>
      <div class="full-content">
        <div class="full-song-record">
          <div class="full-song-record-img">
            <img :src="currentSong.albumImage" width="100%" height="100%" :class="playing?'play':'play pause'">
          </div>
        </div>
      </div>
      <div class="full-ctrl-panel">
        <ul class="ctrl-item-list">
          <li class="ctrl-item mode icon-sequence"></li>
          <li class="ctrl-item back icon-prev" @click="playPrev" :class="playItemDisable"></li>
          <li class="ctrl-item play" @click="playCtrl" :class="playItemDisable">
            <i :class="playing?'icon-pause':'icon-play'"></i>
          </li>
          <li class="ctrl-item next icon-next" @click="playNext"  :class="playItemDisable"></li>
          <li class="ctrl-item favorite icon-not-favorite"></li>
        </ul>
      </div>
    </div>
  </div>
  </transition>
  <transition>
    <div class="player-mini" @click="showFullScreen" v-show="!fullScreen">
    <div class="player-mini-wrapper">
      <div class="mini-record">
        <div class="mini-record-image">
          <img :src="currentSong.albumImage" width="100%" height="100%" :class="playing?'play':'play pause'">
        </div>
      </div>
      <div class="mini-content">
        <div class="mini-song-name">{{currentSong.name}}</div>
        <div class="mini-song-singer">{{currentSong.singer}}</div>
      </div>
      <div class="mini-play-ctrl" @click.stop="playCtrl">
        <div :class="playing?'icon-pause-mini':'icon-play-mini'"></div>
      </div>
      <div class="mini-play-list">
        <div class="icon-playlist"></div>
      </div>
    </div>
  </div>
  </transition>
  <audio :src="currentSong.url" ref="audio" @canplay="audioReady" @error="audioError">您的浏览器不支持audio标签</audio>
</div>
</template>

<script>
import {
  mapGetters,
  mapMutations
} from 'vuex'
export default {
  data: function() {
    return {
      audioReaded: false
    }
  },
  computed: {
    backgroundStyle: function() {
      return `background: url(${this.currentSong.albumImage});
              background-repeat: no-repeat;
              background-size: 100% 100%;
              filter: blur(16px);
              `;
    },
    playItemDisable: function() {
      return this.audioReaded ? '' : 'disable';
    },
    ...mapGetters([
      'playlist',
      'fullScreen',
      'currentSong',
      'playing',
      'currentIndex'
    ])
  },
  methods: {
    dismiss: function() {
      this.setFullScreen(false);
    },
    showFullScreen: function() {
      this.setFullScreen(true);
    },
    playCtrl: function() {
      if (this.audioReaded === false) return;
      this.setPlayingState(!this.playing);
    },
    playPrev: function() {
      if (this.audioReaded === false) return;
      let index = this.currentIndex - 1;
      if (index < 0) index = this.playlist.length - 1;
      this.setCurrentIndex(index);
      if (!this.playing) this.setPlayingState(true);
      this.audioReaded = false;
    },
    playNext: function() {
      if (this.audioReaded === false) return;
      let index = this.currentIndex + 1;
      if (index === this.playlist.length) index = 0;
      this.setCurrentIndex(index);
      if (!this.playing) this.setPlayingState(true);
      this.audioReaded = false;
    },
    // 解决快速切换歌曲时Audio报错的问题
    audioReady: function() {
      this.audioReaded = true;
    },
    audioError: function() {
      this.audioReaded = true;
    },
    ...mapMutations({
      setFullScreen: 'SET_FULL_SCREEN',
      setPlayingState: 'SET_PLAYING_STATE',
      setCurrentIndex: 'SET_CURRENT_INDEX'
    })
  },
  watch: {
    currentSong: function() {
      this.$nextTick(() => {
        if (this.playing) this.$refs.audio.play();
      });
    },
    playing: function(aBool) {
      this.$nextTick(() => {
        if (aBool === true) {
          this.$refs.audio.play();
        } else {
          this.$refs.audio.pause();
        }
      });
    }
  }
}
</script>

<style lang="stylus">
@import '~@/common/stylus/variable.styl'
.player
  position: absolute
  bottom: 0
  height: 100%
  width: 100%
  .player-full
    height: 100%
    background: $color-background
    &.v-enter-active,&.v-leave-active
      transition: all 0.4s
      .full-header,.full-ctrl-panel
        transition: all 0.4s
    &.v-enter,&.v-leave-to
      opacity: 0
      .full-header
        transform: translate3d(0, -100%, 0)
      .full-ctrl-panel
        transform: translate3d(0, 100%, 0)
  .player-mini
    position: absolute
    bottom: 0
    height: 60px
    width: 100%
    background: $color-background
    &.v-enter-active,&.v-leave-active
      transition: all 0.4s
    &.v-enter, &.v-leave-to
      transform: translate3d(0, 100%, 0)
  .full-background
    position: absolute
    top:0
    width: 100%
    height: 100%
  .full-wrapper
    display: flex
    flex-direction: column
    height: 100%
    position: relative
    z-index: 10
    background: rgba(0,0,0,0.4)
  .full-title
    line-height: 44px
    text-align: center
    font-size: 18px
  .full-dismiss
    display: inline-block
    position: absolute
    top: 0
    line-height: 44px
    padding: 0 10px
    font-size: 24px
    color: $color-theme
    transform: rotate(270deg)
    &:active
      opacity: 0.5
  .full-singer
    line-height: 20px
    font-size: 12px
    font-weight: 300
    text-align: center
  .full-content
    flex: 1 1 auto
  .full-song-record
    padding: 20px 40px
    .full-song-record-img
      padding-top: 100%
      border-radius: 50%
      background: rgba(0,0,0,0.2)
      position: relative
      overflow: hidden
      img
        position: absolute
        top: 0
        left: 0
        padding: 10px
        box-sizing: border-box
        border-radius: 50%
        &.play
          animation: playRotate 20s linear infinite
        &.pause
          animation-play-state: paused
  .full-ctrl-panel
    height: 60px
    padding-bottom: 40px
    .ctrl-item-list
      display: flex
      justify-content: space-around
      align-items: center
      padding: 20px 20px
      font-size: 26px
      color: $color-theme
      .ctrl-item
        &:active,&.disable
          opacity: 0.5
      .play
        font-size: 36px

  .player-mini-wrapper
    display: flex
    .mini-record-image
      overflow: hidden
      width: 60px
      padding: 10px
      margin-left: 10px
      box-sizing: border-box
      img
        border-radius: 50%
        &.play
          animation: playRotate 20s linear infinite
        &.pause
          animation-play-state: paused
    .mini-content
      flex: 1 1 auto
      display: flex
      flex-direction: column
      justify-content: space-around
      padding: 8px 0
      .mini-song-name
        font-size: 14px
      .mini-song-singer
        font-size: 12px
        font-weight: 300
        color: $color-text-l
    .icon-playlist,.icon-play-mini,.icon-pause-mini
      font-size: 28px
      line-height: 60px
      color: $color-theme
      padding: 0 16px 0 0

@keyframes playRotate
  from
    transform: rotate(0deg)
  to
    transform: rotate(360deg)
</style>
