<!--
 * @Author: your name
 * @Date: 2021-04-27 10:24:21
 * @LastEditTime: 2021-04-29 15:20:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-component-me/src/components/HelloWorld.vue
-->
<template>
    <div>
        <div class="stage-block">
            <h2 class="h2">日历<i>Calendar</i></h2>
            <div class="component-week-set-block">
                <span class="txt">当前日期: <i>{{textVal}}</i></span>
                <input type="text" v-model="inputVal">
                <button @click="onSetDate">设置日期</button>
            </div>
        </div>
        <div class="stage-block">
            <div style="width: 35%; float: left">
                <me_calendar v-model="dateStr" @change="onCalendarChange" :dayUnit="''"></me_calendar>
            </div>
            <div style="width: 60%; float: right">
                <me_calendar v-model="dateStr" @change="onCalendarChange" :dayUnit="''"></me_calendar>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'index',
    data () {
        return {
            dateStr: '',
            inputVal: '',
            textVal: ''
        }
    },
    methods: {
        onCalendarChange (_dateStr_) {
            this.textVal = _dateStr_
        },
        onSetDate () {
            this.dateStr = this.inputVal
        }
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
