<!--
 * @Author: your name
 * @Date: 2021-04-27 10:24:21
 * @LastEditTime: 2021-05-11 15:51:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-component-me/src/components/HelloWorld.vue
-->
<template>
    <div class="clearfix">
         <div class="stage-block pre">
            <h2 class="h2">开始<i>Start</i></h2>

            <p>私有库安装</p>
            <pre>
                绑定host:
                120.77.144.110 npm.hqwx.com
                120.77.144.110 registry.hqwx.com
                120.77.144.110 hqview.hqwx.com
                120.77.144.110 fed.hqwx.com
            </pre>
            <pre>
                安装:
                $cnpm install @hqwx/vue-component-me
            </pre>
            <pre>
                js:
                import component_me from '@hqwx/vue-component-me'
                Vue.use(component_me)
            </pre>
            <p>公共库安装</p>
            <pre>
                npm i vue-component-me

                import component_me from 'vue-component-me'

                Vue.use(component_me)
            </pre>
        </div>
        <Slidesshow></Slidesshow>
        <Week></Week>
        <Calendar></Calendar>
        <Table></Table>
    </div>
</template>

<script>
import Slidesshow from '../components/block_slideshow'
import Week from '../components/block_week'
import Calendar from '../components/block_calendar'
import Table from '../components/block_table'
export default {
    name: 'index',
    data () {
        return {
        }
    },
    mounted () {
    },
    components: {
        Slidesshow,
        Week,
        Calendar,
        Table
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../style/theme/index';
@import '../style/reset';
</style>
