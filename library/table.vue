<template lang="html">
    <table class="me_table">
        <thead>
            <tr v-for="(coll, index) in collection" v-if="index === 0">
                <td v-for="key in keys">
                    {{coll[key]}}
                </td>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(coll, index) in collection" v-if="index > 0">
                <template v-for="key in keys">
                    <td v-if="coll['_colspan'] && coll['_colspan'].key === key" :colspan="coll['_colspan'].num">
                        {{coll[key]}}
                    </td>
                    <td v-else-if="coll['_rowspan'] && coll['_rowspan'].key === key" :rowspan="coll['_rowspan'].num">
                        {{coll[key]}}
                    </td>
                    <td v-else-if="typeof coll[key] === 'object' && key !== '_rowspan' && key !== '_colspan'">
                        <a v-if="coll[key].type === 'link'" :href="coll[key].url">{{coll[key].key}}</a>
                        <button v-if="coll[key].type === 'button'">{{coll[key].key}}</button>
                    </td>
                    <td v-else-if="key !== '_colspan' && key !== '_rowspan' && coll[key] !== undefined">
                        {{coll[key]}}
                    </td>
                </template>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    props: {
        collection: {
            type: Array,
            default: function () {
                return [
                    {
                        id: '编号',
                        name: '姓名',
                        tel: '电话',
                        add: '地址',
                        option: '选项'
                    },
                    {
                        id: 1,
                        name: 'bohai',
                        tel: '13910506488',
                        add: '漠河',
                        option: {
                            type: 'link',
                            key: '百度',
                            url: 'http://www.baidu.com'
                        }
                    },
                    {
                        id: 2,
                        name: 'bilibili',
                        add: '北京',
                        option: {
                            type: 'button',
                            key: '百度',
                            url: 'http://www.baidu.com'
                        },
                        _colspan: {
                            key: 'name',
                            num: 2
                        }
                    },
                    {
                        id: 3,
                        name: '吧啦吧啦',
                        tel: '392839383783',
                        add: '北京',
                        _rowspan: {
                            key: 'add',
                            num: 2
                        },
                        option: {
                            type: 'link',
                            key: '百度',
                            url: 'http://www.baidu.com'
                        }
                    },
                    {
                        id: 4,
                        name: 'bilibili',
                        tel: '13909292827',
                        option: {
                            type: 'link',
                            key: '百度',
                            url: 'http://www.baidu.com'
                        }
                    },
                    {
                        id: 1,
                        name: 'bohai',
                        tel: '13910506488',
                        add: '漠河',
                        option: {
                            type: 'link',
                            key: '百度',
                            url: 'http://www.baidu.com'
                        }
                    },
                    {
                        id: 1,
                        name: 'bohai',
                        tel: '13910506488',
                        add: '漠河',
                        option: {
                            type: 'link',
                            key: '百度',
                            url: 'http://www.baidu.com'
                        }
                    }
                ]
            }
        }
    },
    data () {
        return {
            keys: []
        }
    },
    mounted () {
        this.keys = Object.keys(this.collection[0])
    }
}
</script>

<style lang="scss">
.me_table {
    width: 100%;
    border-spacing: 0;
    border-collapse: collapse;
    // background: rgb(204, 124, 40);

    thead {
        background: #333333;
        color: #ffffff;
        height: 35px;
        line-height: 35px;

        td {
            border: 1px solid #333333;
        }
    }

    tr {

    }

    td {
        border: 1px solid #dddddd;
        height: 35px;
        line-height: 35px;
    }
}
</style>
