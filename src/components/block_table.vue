<!--
 * @Author: your name
 * @Date: 2021-04-27 10:24:21
 * @LastEditTime: 2021-05-07 09:40:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-component-me/src/components/HelloWorld.vue
-->
<template>
    <div>
        <div class="stage-block">
            <h2 class="h2">表格<i>Table</i></h2>
        </div>
         <div class="stage-block">
            <me_table></me_table>
        </div>
    </div>
</template>

<script>

export default {
    name: 'table_block',
    data () {
        return {
        }
    },
    methods: {
    },
    mounted () {
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../style/theme/index';
@import '../style/reset';
</style>
