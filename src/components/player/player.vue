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
      <div class="play-progress">
        <div class="complete">{{formatTime(playProgTime)}}</div>
        <div class="progress-bar">
          <progress-bar :progress="progress" @progressChange="progressChange"></progress-bar>
        </div>
        <div class="total-length">{{formatTime(currentSong.interval)}}</div>
      </div>
      <div class="full-ctrl-panel">
        <ul class="ctrl-item-list">
          <li class="ctrl-item mode" :class="modeClass" @click="changeMode"></li>
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
        <progress-circle radius="28" :progress="progress">
          <div :class="playing?'icon-pause-mini':'icon-play-mini'"></div>
        </progress-circle>
      </div>
      <div class="mini-play-list">
        <div class="icon-playlist"></div>
      </div>
    </div>
  </div>
  </transition>
  <audio :src="currentSong.url"
          ref="audio"
          @canplay="audioReady"
          @error="audioError"
          @timeupdate="audioUpdate"
          @ended="audioEnd">您的浏览器不支持audio标签</audio>
</div>
</template>

<script>
import {
  mapGetters,
  mapMutations
} from 'vuex'
import ProgressBar from '@/base/progress/progress-bar.vue'
import ProgressCircle from '@/base/progress/progress-circle.vue'
import {
  playMode
} from '@/common/js/config.js'
import {
  shuffle
} from '@/common/js/util.js'
export default {
  data: function() {
    return {
      audioReaded: false,
      playProgTime: 0, // 当前播放进度
      progress: 0
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
    // 播放、上一曲、下一曲按钮状态
    playItemDisable: function() {
      return this.audioReaded ? '' : 'disable';
    },
    // 播放模式对应图标
    modeClass: function() {
      if (this.mode === playMode.sequence) return 'icon-sequence';
      if (this.mode === playMode.loop) return 'icon-loop';
      if (this.mode === playMode.random) return 'icon-random';
      return 'mode=sequence'
    },
    ...mapGetters([
      'playlist',
      'fullScreen',
      'currentSong',
      'playing',
      'currentIndex',
      'mode',
      'sequenceList'
    ])
  },
  methods: {
    dismiss: function() {
      this.setFullScreen(false);
    },
    showFullScreen: function() {
      this.setFullScreen(true);
    },
    // 播放|暂停
    playCtrl: function() {
      if (this.audioReaded === false) return;
      this.setPlayingState(!this.playing);
    },
    // 上一曲
    playPrev: function() {
      if (this.audioReaded === false) return;
      if (this.mode === playMode.loop) {
        this._replay();
        return;
      }
      let index = this.currentIndex - 1;
      if (index < 0) index = this.playlist.length - 1;
      this.setCurrentIndex(index);
      if (!this.playing) this.setPlayingState(true);
      this.audioReaded = false;
    },
    // 下一曲
    playNext: function() {
      if (this.audioReaded === false) return;
      if (this.mode === playMode.loop) {
        this._replay();
        return;
      }
      let index = this.currentIndex + 1;
      if (index === this.playlist.length) index = 0;
      this.setCurrentIndex(index);
      if (!this.playing) this.setPlayingState(true);
      this.audioReaded = false;
    },
    // 播放进度条事件响应
    progressChange: function(percent) {
      this.$refs.audio.currentTime = this.currentSong.interval * percent;
      if (!this.playing) this.setPlayingState(true);
    },
    // 解决快速切换歌曲时Audio报错的问题
    audioReady: function() {
      this.audioReaded = true;
    },
    audioError: function() {
      this.audioReaded = true;
    },
    // 更新当前歌曲播放进度
    audioUpdate: function(event) {
      this.playProgTime = event.target.currentTime;
      let percent = event.target.currentTime / event.target.duration;
      this.progress = percent;
    },
    audioEnd: function(event) {
      switch (this.mode) {
        case playMode.sequence:
        case playMode.random:
          this.playNext();
          break;
        case playMode.loop:
          this._replay();
          break;
        default:
      }
    },
    // 时间格式化
    formatTime: function(interval) {
      let minute = interval / 60 | 0;
      let second = interval % 60 | 0;
      return `${minute}:${this._pad(second)}`;
    },
    _pad: function(num, n = 2) {
      num = String(num);
      while (num.length < n) {
        num = '0' + num;
      }
      return num;
    },
    _replay: function() {
      this.$refs.audio.currentTime = 0;
      this.$refs.audio.play();
    },
    // 播放模式切换
    changeMode: function() {
      let mode = (this.mode + 1) % 3;
      this.setPlayMode(mode);
      switch (mode) {
        case playMode.sequence:
          this._resetCurrentIndex(this.sequenceList);
          this.setPlayList(this.sequenceList);
          break;
        case playMode.random:
          let list = shuffle(this.playlist.concat());
          this._resetCurrentIndex(list);
          this.setPlayList(list);
          break;
        default:
          break;
      }
    },
    // 更新当前歌曲序号，避免切换模式时歌曲被切换
    _resetCurrentIndex: function(list) {
      let index = list.findIndex(song => {
        return song.id === this.currentSong.id;
      });
      this.setCurrentIndex(index);
    },
    ...mapMutations({
      setFullScreen: 'SET_FULL_SCREEN',
      setPlayingState: 'SET_PLAYING_STATE',
      setCurrentIndex: 'SET_CURRENT_INDEX',
      setPlayMode: 'SET_PLAY_MODE',
      setPlayList: 'SET_PLAYLIST'
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
  },
  components: {
    ProgressBar,
    ProgressCircle
  }
}
</script>

<style lang="stylus">
@import '~@/common/stylus/variable.styl'
.player
  .player-full
    position: absolute
    top: 0
    width: 100%
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
  .play-progress
    display: flex
    padding: 0 8%
    align-items: center
    justify-content: space-between
    .complete,.total-length
      font-size: 14px
      font-weight: 200
      min-width: 30px
    .progress-bar
      flex: 1 0 auto
      padding: 0 15px
      height: 14px
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
