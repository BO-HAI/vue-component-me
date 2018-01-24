import slideshow_component from './slideshow.vue'
import table_component from './table.vue'

const LIBRARY_ME = {
    install: function (Vue) {
        Vue.component('me_slideshow', slideshow_component)
        Vue.component('me_table', table_component)
    }
}

export default LIBRARY_ME
