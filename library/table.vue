<!--
 * @Author: your name
 * @Date: 2021-04-27 10:24:21
 * @LastEditTime: 2021-05-07 10:28:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-component-me/library/table.vue
-->
<template lang="html">
    <table class="hqui component-table">
        <thead>
            <tr>
                <td v-for="(head, key) in date.head" :key="key">{{head.value}}</td>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(body, index) in date.body" :key="index">
                <td v-for="(head, h_index) in date.head" :key="h_index">
                    {{body[head.key]}}
                </td>
            </tr>
        </tbody>
        <!-- <tfoot>
            <tr>
                <td>
                    foot-1
                </td>
                <td>
                    foot-2
                </td>
                <td>
                    foot-3
                </td>
                <td>
                    foot-4
                </td>
            </tr>
        </tfoot> -->
    </table>
</template>

<script>
export default {
    props: {
        date: {
            type: Object,
            default: function () {
                return {
                    head: [{
                        value: '表头1',
                        key: 'head1'
                    }, {
                        value: '表头2',
                        key: 'head2'
                    }, {
                        value: '表头3',
                        key: 'head3' 
                    }, {
                        value: '表头4',
                        key: 'head4'
                    }, {
                        value: '表头5',
                        key: 'head5'
                    }, {
                        value: '表头6',
                        key: 'head6'
                    }],
                    body: [{
                        head1: '1',
                        head2: '2',
                        head3: '3',
                        head4: '4',
                        head5: '5',
                        head6: '6'
                    }, {
                        head1: '71',
                        head2: '8',
                        head3: '9',
                        head4: '10',
                        head5: '11',
                        head6: '12'
                    }],
                    foot: []
                }
            }
        }
    },
    data() {
        return {

        }
    },
    methods: {
        init() {
            
        }
    }
}
</script>

<style scoped lang="scss">
@import '../src/style/theme/index';
@import '../src/style/component';
.hqui.component-table {
    border-collapse: collapse;
    border-spacing: 0;
    width: 100%;
    font-size: 12px;

    * {
        box-sizing: border-box;
    }

    thead {
        tr {
            text-align: center;
            background: #5A82FF;
            color: #ffffff;
            text-align: center;
            border: 1px solid #dddddd;
            font-weight: bold;
        }
    }

    tbody {
        tr {

        }
    }

    tfoot {
        tr {
            background: #eeeeee;
        }
    }

    tr {
        height: 35px;
        line-height: 35px;
    }

    td {
        border: 1px solid #dddddd;
        padding: 0 5px;
    }
}
</style>
