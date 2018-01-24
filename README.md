# vue-component-me

> Own component library

> 这是一个开发版本

[![NPM](https://nodei.co/npm/vue-component-me.png)](https://nodei.co/npm/vue-component-me/)

## demo

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

# run unit tests
npm run unit

# run all tests
npm test
```

# 开始使用

### 轮播图
```javascript
// js
import slideshow from 'vue-component-me/library/slideshow.vue'

// html
<slideshow :images="list" :time="15" :speed="1.5"></slideshow>
```
 或
```javascript
import slideshow from 'vue-component-me/library/slideshow.js'
Vue.use(slideshow)
```

#### 参数

###### images [type: Array]
图片对象集合；每个图片对象都需要保持如下格式：
1. url: 图片地址
2. link: 图片链接
3. title: 图片中的标题［可选］
4. subtitle: 图片中的副标题［可选］
5. linkText: 图片中的按钮文本 ［可选］；“link”属性作用这个按钮之上，如果该项为空，则“link”属性作用在整张图片
6. color: 图片中文本颜色 ［可选］
```json
[
    {
        "url": "",
        "link": "#",
        "title": "",
        "subtitle": "",
        "linkText": "",
        "color": "#ffffff",
        "btnHoverColor": "#f36371"
    },
    {
        "url": "",
        "link": "#",
        "title": "",
        "subtitle": "",
        "linkText": "",
        "color": "#ffffff",
        "btnHoverColor": "#f36371"
    }
]
```

###### height [type: String]
高度， 默认‘450px’；带标题不建议小于“350px”

###### width [type: String]
宽度， 默认‘100%’

###### time [type: Number]
轮播间隔时间，默认15000 单位“毫秒”

###### speed [type: Number]
滚动速度，默认1.5 单位“秒”

###### btnMargin [type: Number]
轮播按钮间距，默认10 单位“px”
