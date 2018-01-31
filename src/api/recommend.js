import SAJsonp from '@/common/js/jsonp.js'
import {
  commonParams,
  options
} from './config.js'
export function getRecommond() {
  let url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';
  let param = Object.assign({}, commonParams, {
    platfoorm: 'h5',
    uin: 0,
    needNewCode: 0
  });
  return SAJsonp(url, param, options);
}
