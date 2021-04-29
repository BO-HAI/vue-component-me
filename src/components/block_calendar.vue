<!--
 * @Author: your name
 * @Date: 2021-04-27 10:24:21
 * @LastEditTime: 2021-04-29 14:12:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-component-me/src/components/HelloWorld.vue
-->
<template>
    <div>
        <div class="stage-block">
            <div style="width: 35%; float: left">
                <me_calendar :dayUnit="''"></me_calendar>
            </div>
            <div style="width: 60%; float: right">
                <me_calendar :dayUnit="''"></me_calendar>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'index',
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
