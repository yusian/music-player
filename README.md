# Sian-Music

> A Simple Music Player Demo

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## Notes
> 0、依赖库：

```
"babel-polyfill": "^6.26.0",
"babel-runtime": "^6.26.0",
"fastclick": "^1.0.6",
"jsonp": "^0.2.1",
"stylus": "^0.54.5",
"stylus-loader": "^3.0.1",
"better-scroll": "^1.8.0",
"vue-lazyload": "^1.1.4",
"vue-router": "^3.0.1",
"vuex": "^3.0.1"
```
> 1、样式预处理程序stylus

```
1.1、2010年问世，相关预处理器还有Saas(2007)、Less(2009)；
1.2、脚手架支持需要安装stylus与stylus-loader两个组件；
```
> 2、项目准备的其他组件

```
2.1、babel-runtime：ES6语法转义成ES5，提高兼容性
2.2、fastclick：解决移动网页点击300ms的延时问题
2.3、babel-polyfill：ES6相关API的转义，支持ES6最新的API编译
```
> 3、网络请求Jsonp封装

```
3.1、安装第三方库jsonp：npm install jsonp —save
3.2、创建Api目录，所有的网络请求在该目录下创建js文件；
3.3、Api目录下创建config.js文件，将公共的参数或配置写在该文件下；
3.4、封装jsonp，公共库中新建一个jsonp.js文件；
3.5、export default function (url, param, option) {…}
```

> 4、实现推荐页面轮播图（封装轮播组件）

```
4.1、实现轮播外围基础视图，通过vue的slot特性让轮播调用者实现内部子视图；
4.2、通过this.$refs.xxx.children来获取轮播子视图，动态添加class来实现样式；
4.3、轮播图为水平滑动，因此内部子视图white-space: nowarp，父视图宽度动态计算；
4.4、兼听window的resize事件，动态刷新视图大小
4.5、引入第三方better-scroll实现左右滑动及自动轮播效果
4.6、实现图片索引标识，better-scroll的currentPage属性与当前标识序号关联；
```

> 5、推荐页面开发

```
5.1、img标签的load方法监听，能够在图片加载时被调用，实现某些特殊功能；
5.2、图片懒加载第三方组件：vue-lazyload
```

> 6、歌手列表模块

```
6.1、数组处理的相关方法：
6.1.3、数组拼接：array.concat(arr)；// array中的元素与arr中的元素合并，array元素在前
6.1.4、数组排序：array.sort((a, b) => {return xxx})；// a与b分别为取出来比较的两个元素，返回正、0、负数；
6.2、字符串处理的相关方法：
6.2.1、字符串过滤方法：string.match(/[a-zA-Z]/)；// string是否为字母
6.2.2、字符串取字符比较：string.charCodeAt(0)；// string的第一个字母转成ASC码值
6.3、公共组件listview实现：
6.3.1、根据数据模型循环出两个ul+li，html实现分组列表的根本结构，css美化样式，better-scroll实现滑动效果；
6.3.2、根据索引数组循环出一个ul+li，absolute布局在视图右侧；
6.3.3、在索引视图上监听touchstart与touchmove方法；
6.3.4、两个事件中event的touches数据中的touch对象中能够得到当前触摸到的视图，touch.clientY能够得到触摸点的偏移量；
6.3.5、结合上两点可以得到：开始触摸时索引上的元素、滑动时滑动时相对触摸元素的偏移量从而得到当前滑动到哪个元素；
6.3.6、滑动与触摸事件与列表联动，调用better-scroll的scrollToElement跳转到相对应的元素；
6.3.7、列表在滑动时，监听better-scroll的scroll事件得到滑动偏移量，与事先计算出的每个列表分组高度对比，得到当前所处的位置与索引列表相联动；
6.3.8、增加一个体验性功能，列表的顶端添加一个组头视图，当滑动到哪个分组，组头视图即显示哪个分组的索引名称；
6.4、公共组件loading，当视图成功挂载后，先显示loading视图，数据加载成功后再隐藏该组件，显示列表；
```

> 7、歌手详情页面

```
7.1、使用vuex进行状态管理（组件间数据交互）
7.1.1、State：状态（数据）存储的全局单例
7.1.2、Getter：状态（数据）存储的数据 读取 方法封装
7.1.3、Mutation：状态（数据）存储的数据 写入 方法封装
7.1.4、Action：暂未使用
7.2、添加子路由，在路由路径为singer下面添加children数组，设置一个path为":id”这样路径就会根据router.push动态生成
7.3、添加网络请求，封装歌手详情页面的网络请求方法；
7.4、添加singer与song两个数据模拟对象；
7.5、歌手详情页面的基本实现
7.5.1、整体结构为Header+SongList两部分，songlist为scroll，监听scroll事件；
7.5.2、当往上滚动时将Header部分进行transform变化，使其同步上移到保留Header的底部；
7.5.3、由于往上滚动超出了songlist的可视区域，overflow不能设置hidden，并且Header的z-index要比songlist大；
```
