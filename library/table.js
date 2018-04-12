import table_component from './table.vue';

const table = {
    install: function (Vue) {
        Vue.component('table', table_component);
    }
};

export default table;
