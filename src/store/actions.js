import * as types from './mutation-types.js'
import {
  playMode
} from '@/common/js/config.js'
export const selectPlay = function (context, {
  list,
  index
}) {
  context.commit(types.SET_PLAY_MODE, playMode.sequence);
  context.commit(types.SET_SEQUENCE_LIST, list);
  context.commit(types.SET_PLAYLIST, list);
  context.commit(types.SET_CURRENT_INDEX, index);
  context.commit(types.SET_FULL_SCREEN, true);
  context.commit(types.SET_PLAYING_STATE, true);
}
export const playAll = function (context, list) {
  context.commit(types.SET_PLAY_MODE, playMode.sequence);
  context.commit(types.SET_SEQUENCE_LIST, list);
  context.commit(types.SET_PLAYLIST, list);
  context.commit(types.SET_CURRENT_INDEX, 0);
  context.commit(types.SET_FULL_SCREEN, true);
  context.commit(types.SET_PLAYING_STATE, true);
}
