import Jsonp from 'jsonp'
import {
  commonParams
} from '@/api/config.js'
export default function (url, param, option) {
  // indexOf()字符吕某字符序号，没有返回
  url += (url.indexOf('?') < 0) ? '?' : '&';
  url += stringFromParam(param);
  let promise = new Promise((resolve, reject) => {
    Jsonp(url, option, (error, data) => {
      if (error) {
        console.log('jsonp.error...');
        reject(error);
      } else {
        console.log('jsonp.data...');
        resolve(data);
      }
    })
  })
  return promise;
}
// 将参数对象拼装成get请求的url参数字符串
export function stringFromParam(param) {
  let url = '';
  for (let key in param) {
    let val = param[key];
    if (val === undefined) val = '';
    url += ('&' + key + '=' + encodeURIComponent(val));
  }
  return url ? url.substr(1) : '';
}
// 代理请求方法
export function proxyGetRequestURL(url, param) {
  url += (url.indexOf('?') < 0) ? '?' : '&';
  url += stringFromParam(Object.assign({
    format: 'json',
    platform: 'h5'
  }, commonParams, param));
  return url;
}
