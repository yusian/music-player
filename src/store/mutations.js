import * as types from './mutation-types.js'

const mutations = {
  [types.SET_SINGER](state, singer) {
    state.singer = singer
  },
  [types.SET_PLAYING_STATE](state, playing) {
    state.playing = playing
  },
  [types.SET_FULL_SCREEN](state, fullScreen) {
    state.fullScreen = fullScreen;
  },
  [types.SET_PLAYLIST](state, playlist) {
    state.playlist = playlist;
  },
  [types.SET_SEQUENCE_LIST](state, sequenceList) {
    state.sequenceList = sequenceList;
  },
  [types.SET_PLAY_MODE](state, mode) {
    state.mode = mode;
  },
  [types.SET_CURRENT_INDEX](state, currentIndex) {
    state.currentIndex = currentIndex;
  },
  [types.SET_RANK_ITEM](state, rankItem) {
    state.rankItem = rankItem;
  },
  [types.SET_SEARCH_HISTORY](state, searchList) {
    state.searchHistoryList = searchList;
  }
}

export default mutations
