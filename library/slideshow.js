import slideshow_component from './slideshow.vue';

const slideshow = {
    install: function (Vue) {
        Vue.component('slideshow', slideshow_component);
    }
};

export default slideshow;
