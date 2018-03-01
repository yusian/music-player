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
7.1.4、Action：对一组mutation的操作
7.2、添加子路由，在路由路径为singer下面添加children数组，设置一个path为":id”这样路径就会根据router.push动态生成
7.3、添加网络请求，封装歌手详情页面的网络请求方法；
7.4、添加singer与song两个数据模拟对象；
7.5、歌手详情页面的基本实现
7.5.1、整体结构为Header+SongList两部分，songlist为scroll，监听scroll事件；
7.5.2、当往上滚动时将Header部分进行transform变化，使其同步上移到保留Header的底部；
7.5.3、由于往上滚动超出了songlist的可视区域，overflow不能设置hidden，并且Header的z-index要比songlist大；
7.6、高斯模糊的两种方式：backdrop-filter=blur(10px)与filter=blur(10px)，前者只有在iOS系统中被支持；
7.7、添加JS操作dom属性的多浏览器兼容方法prefixStyle，在dom.js中实现；
7.8、完善详情页面，添加loading体验效果；
```
> 8、播放器组件基础功能实现

```
8.1、播放器基本页面实图，该页面为全局页面，因此直接挂载在App.vue的模板中；
8.2、Vuex中增加多个状态值，如：播放状态、播放器状态、播放列表、播放模式、当前歌曲等，并实现状态的读写；
8.3、完善Song类，新增专辑图片、歌曲url、歌曲名等，播放器中需要使用这些字段；
8.4、实现播放|暂停、下一曲、上一曲及与mini视图相互切换功能；
8.5、播放动画，专辑海报随着播放循环自转，暂停而暂停；
```

> 9、播放器组件功能完善

```
9.1、进度条的实现
9.1.1、根据audio标签的当前时间currentTime与歌曲的总时长取比值得到百分比，即为进度条的百分比；
9.1.2、进度条两个标签动态变化，播放进度色带，通过width百分比实现，进度点通过绝对定位的left百分比实现；
9.2、进度条事件
9.2.1、进度条的拖拽事件，作用在进度点上，通过touch的开始与当前拖动位置的clientX差值来计算拖动距离；
9.2.2、通过点击进度条上的位置，点击事件clicent的offsetX来确定点击位置与进度条总长度比获取百分比；
9.2.3、事件最终转换成百分比，即歌曲播放位置，通过百分比与歌曲总时长进行计算获取当前时间，赋值给audio；
9.3、mini面板中的进度展示
9.3.1、svg+circle标签来实现，circle画圈，stroke-dashoffset属性来修改圈的完整度同步显示播放进度；
9.4、播放模式切换
9.4.1、绑定播放模式点击事件，更新模式数据，根据数据返回icon图标对应类名；
9.4.2、根据模式数据，更新playlist，随机模式通过遍历顺序数组随机对调元素位置打散序号(注意数据拷贝模式影响原数组)；
9.4.3、单曲循环通过控制下一曲、上一曲时修改audio的currentTime来实现，不更改当前歌曲或当前序号；
9.4.4、歌曲播放完毕后会自动调用audio的ended事件，在该事件是实现自动切换下一曲；
9.5、播放详情中播放全部，实现顺序播放；
9.6、优化播放器mini状态下对其他组件的遮挡问题；
9.6.1、使用vue的mixin扩展vue类的基础功能，封装播放器组件显示或隐藏时的状态；
9.6.2、在需要优化遮挡问题的页面引入mixin，并实现相关方法解决不足；
```
