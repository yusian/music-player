function _random(min, max) {
  // max-min+1:1~9
  // Math.random()*(max-min+1): 0~8.999
  // 1~9.999取floor()得到1～9
  let r = Math.random() * (max - min + 1) + min;
  r = Math.floor(r);
  return r;
}
export function shuffle(array) {
  for (var i = 0; i < array.length; i++) {
    let j = _random(0, i); // 前面取一个与当前位置的对换
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}
