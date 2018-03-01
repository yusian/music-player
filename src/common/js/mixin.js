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
    this.handlePlaylist(this.playlist);
  },
  updated: function () {
    console.log('updated...');
    this.handlePlaylist(this.playlist);
  },
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
