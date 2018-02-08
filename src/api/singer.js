import SAJsonp from '@/common/js/jsonp.js'
import {
  commonParams,
  options
} from './config.js'

export function getSingerList() {
  let url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg';
  let param = Object.assign({}, commonParams, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    g_tk: 989744817
  });
  return SAJsonp(url, param, options);
}

export function getSingerDetail(singerId) {
  let url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg';
  let param = Object.assign({}, commonParams, {
    singerid: singerId,
    platform: 'h5page',
    needNewCode: 1,
    order: 'listen',
    from: 'h5',
    num: 15,
    begin: 0
  });
  return SAJsonp(url, param, options);
}
