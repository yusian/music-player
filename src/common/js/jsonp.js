import Jsonp from 'jsonp'

export default function (url, param, option) {
  // indexOf()字符吕某字符序号，没有返回
  url += (url.indexOf('?') < 0) ? '?' : '&';
  url += stringFromParam(param);
  let promise = new Promise((resolve, reject) => {
    Jsonp(url, option, (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    })
  })
  return promise;
}
// 将参数对象拼装成get请求的url参数字符串
function stringFromParam(param) {
  let url = '';
  for (let key in param) {
    let val = param[key];
    if (val === undefined) val = '';
    url += ('&' + key + '=' + encodeURIComponent(val));
  }
  return url ? url.substr(1) : '';
}
