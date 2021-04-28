<!--
 * @Author: your name
 * @Date: 2021-04-27 10:24:21
 * @LastEditTime: 2021-04-28 13:47:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-component-me/src/components/HelloWorld.vue
-->
<template>
    <div class="clearfix">
         <div class="stage-block pre">
            <h2 class="h2">开始<i>Start</i></h2>
            <pre>
                npm i vue-component-me

                import component_me from 'vue-component-me'

                Vue.use(component_me)
            </pre>
        </div>
        <Slidesshow></Slidesshow>
        <Week></Week>
        <Calendar></Calendar>
    </div>
</template>

<script>
import Slidesshow from '../components/block_slideshow'
import Week from '../components/block_week'
import Calendar from '../components/block_calendar'
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
        Calendar
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../style/theme/index';
@import '../style/reset';
</style>
