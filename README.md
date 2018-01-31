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
"better-scroll": "^1.8.0"
```
> 1、样式预处理程序stylus

```
2010年问世，相关预处理器还有Saas(2007)、Less(2009)；
脚手架支持需要安装stylus与stylus-loader两个组件；
```
> 2、项目准备的其他组件

```
babel-runtime：ES6语法转义成ES5，提高兼容性
fastclick：解决移动网页点击300ms的延时问题
babel-polyfill：ES6相关API的转义，支持ES6最新的API编译
```
> 3、网络请求Jsonp封装

```
安装第三方库jsonp：npm install jsonp —save
创建Api目录，所有的网络请求在该目录下创建js文件；
Api目录下创建config.js文件，将公共的参数或配置写在该文件下；
封装jsonp，公共库中新建一个jsonp.js文件；
export default function (url, param, option) {…}
```

> 4、实现推荐页面轮播图（封装轮播组件）

```
实现轮播外围基础视图，通过vue的slot特性让轮播调用者实现内部子视图；
通过this.$refs.xxx.children来获取轮播子视图，动态添加class来实现样式；
轮播图为水平滑动，因此内部子视图white-space: nowarp，父视图宽度动态计算；
兼听window的resize事件，动态刷新视图大小
引入第三方better-scroll实现左右滑动及自动轮播效果
实现图片索引标识，better-scroll的currentPage属性与当前标识序号关联；
```
