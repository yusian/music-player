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

let _prefix = (() => {
  let style = document.createElement('div').style;
  // 以transform为例
  let transformEnum = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }
  for (let key in transformEnum) {
    // 一定要和undefined对比，不能直接判断该值的真假
    if (style[transformEnum[key]] !== undefined) return key;
  }
  return null;
})();

export function prefixStyle(styleName) {
  if (_prefix == null) return styleName;
  if (_prefix === 'standard') return styleName;
  styleName = styleName.charAt(0).toUpperCase() + styleName.substr(1);
  return _prefix + styleName;
}
