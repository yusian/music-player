import {
  playMode
} from '@/common/js/config.js'
import {
  loadSearch
} from '@/common/js/cache.js'
const state = {
  singer: {},
  playing: false,
  fullScreen: false,
  playlist: [],
  sequenceList: [],
  mode: playMode.sequence,
  currentIndex: -1,
  rankItem: {},
  searchHistoryList: loadSearch()
}

export default state
