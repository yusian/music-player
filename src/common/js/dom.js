export function AddClass(el, className) {
  if (HasClass(el, className)) return;
  // 使用空格拆分成数组
  let classArray = el.className.split(' ');
  // 数组添加class成员
  classArray.push(className);
  // 使用空格将数组拼成字符串(去除两侧空格)
  el.className = classArray.join(' ').trim();
}

export function HasClass(el, className) {
  // 以空格或当前类名开头，以空格或当前类名结尾
  let reg = '(^|\\s)' + className + '(\\s|$)';
  return RegExp(reg).test(el.className);
}
