// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import slideshow from '../library/slideshow.js'
// Vue.use(slideshow)
import LIBRARY_ME from '../library/main.js'

Vue.config.productionTip = false

Vue.use(LIBRARY_ME)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})
