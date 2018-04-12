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
                    <td v-if="coll['colspan'] && coll['colspan'].key === key" :colspan="coll['colspan'].num">
                        {{coll[key]}}
                    </td>
                    <td v-else-if="key !== 'colspan' && coll[key] !== undefined">
                        {{coll[key]}}
                    </td>
                </template>
            </tr>
            <tr>
                <td colspan="2">fafjaf</td>
                <td rowspan="2">fsfafs</td>
            </tr>
            <tr>
                <td>fafjaf</td>
                <td>fsfafs</td>
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
                        tel: '电话'
                    },
                    {
                        id: 0,
                        name: 'bilibili',
                        colspan: {
                            key: 'name',
                            num: 2
                        }
                    },
                    {
                        id: 0,
                        name: '吧啦吧啦',
                        tel: '392839383783'
                    },
                    {
                        id: 0,
                        name: 'bilibili',
                        tel: '13909292827'
                    },
                    {
                        id: 0,
                        name: '吧啦吧啦',
                        tel: '392839383783'
                    },
                    {
                        id: 0,
                        name: 'bilibili',
                        tel: '13909292827'
                    },
                    {
                        id: 0,
                        name: '吧啦吧啦',
                        tel: '392839383783'
                    },
                    {
                        id: 0,
                        name: 'bilibili',
                        tel: '13909292827'
                    },
                    {
                        id: 0,
                        name: '吧啦吧啦',
                        tel: '392839383783'
                    },
                    {
                        id: 0,
                        name: 'bilibili',
                        tel: '13909292827'
                    },
                    {
                        id: 0,
                        name: '吧啦吧啦',
                        tel: '392839383783'
                    },
                    {
                        id: 0,
                        name: 'bilibili',
                        tel: '13909292827'
                    },
                    {
                        id: 0,
                        name: '吧啦吧啦',
                        tel: '392839383783'
                    },
                    {
                        id: 0,
                        name: 'bilibili',
                        tel: '13909292827'
                    },
                    {
                        id: 0,
                        name: '吧啦吧啦',
                        tel: '392839383783'
                    },
                    {
                        id: 0,
                        name: 'bilibili',
                        tel: '13909292827'
                    },
                    {
                        id: 0,
                        name: '吧啦吧啦',
                        tel: '392839383783'
                    },
                    {
                        id: 0,
                        name: 'bilibili',
                        tel: '13909292827'
                    },
                    {
                        id: 0,
                        name: '吧啦吧啦',
                        tel: '392839383783'
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
