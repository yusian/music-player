import {
  mapGetters
} from 'vuex'

export const playlistMixin = {
  computed: {
    ...mapGetters([
      'playlist'
    ])
  },
  mounted: function () {
    console.log('mixin_mounted......');
    this.handlePlaylist(this.playlist);
  },
  activated: function () {
    console.log('mixin_activated......');
    this.handlePlaylist(this.playlist);
  },
  // updated: function () {
  //   this.handlePlaylist(this.playlist);
  // },
  watch: {
    playlist: function (value) {
      this.handlePlaylist(value);
    }
  },
  methods: {
    handlePlaylist: function () {
      throw new Error('component must implement handlePlaylist method !!!');
    }
  }
}
