/*
 * @Author: your name
 * @Date: 2021-04-27 10:24:21
 * @LastEditTime: 2021-04-28 13:46:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-component-me/library/main.js
 */
import slideshow_component from './slideshow.vue'
import week_component from './week.vue'
import table_component from './table.vue'
import calendar_component from './calendar.vue'

const LIBRARY_ME = {
    install: function (Vue) {
        Vue.component('me_slideshow', slideshow_component)
        Vue.component('me_week', week_component)
        Vue.component('me_table', table_component)
        Vue.component('me_calendar', calendar_component)
    }
}

export default LIBRARY_ME
