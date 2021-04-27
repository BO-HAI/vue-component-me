<!--
 * @Author: your name
 * @Date: 2021-04-27 10:24:21
 * @LastEditTime: 2021-04-27 14:41:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-component-me/src/components/HelloWorld.vue
-->
<template>
  <div class="clearfix">
    <Slidesshow></Slidesshow>
    <Week></Week>
  </div>
</template>

<script>
import Slidesshow from '../components/block_slideshow'
import Week from '../components/block_week'
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
        Week
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../style/theme/index';
@import '../style/reset';
</style>
