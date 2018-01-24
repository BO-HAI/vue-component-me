# vue-component-me

> Own component library

[![NPM](https://nodei.co/npm/vue-component-me.png)](https://nodei.co/npm/vue-component-me/)

## demo
<https://bo-hai.github.io/vue-component-me-demo/>


<!-- ## Build Setup

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
``` -->

# 开始使用

所有全局组件注册标签名称都是“me_”开头 + 组件名称：“me_slideshow”

例如：

```html
<!--组件名称-->
<me_slideshow></me_slideshow>
```

全局组件注入：

```javascript
import LIBRARY_ME from 'vue-component-me/library/main.js'
Vue.use(library_me)
```

全局单组件注入(例如：轮播图组件)：

```javascript
import slideshow_me from 'vue-component-me/library/slideshow.js'
Vue.use(slideshow_me)
```

按需引入请查看 doc 目录
