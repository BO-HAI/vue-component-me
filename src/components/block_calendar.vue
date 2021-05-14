<!--
 * @Author: your name
 * @Date: 2021-04-27 10:24:21
 * @LastEditTime: 2021-05-14 11:31:02
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
        <div class="stage-block pre" style="clear: both">
            <p>
                参数:
            </p>
            <table>
                <thead>
                    <tr>
                        <th>
                            参数名称
                        </th>
                        <th>
                            参数类型
                        </th>
                        <th>
                            说明
                        </th>
                        <th>
                            默认值
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>datePoint</td>
                        <td>String</td>
                        <td>预设日期点 Ex: "2020-03-27"; 支持<i class="tab">v-model</i></td>
                        <td>当前日期</td>
                    </tr>
                    <tr>
                        <td>weekTitleAttr</td>
                        <td>Array</td>
                        <td>预设单元格标题</td>
                        <td>['周一', '周二', '周三', '周四', '周五', '周六', '周日']</td>
                    </tr>
                    <tr>
                        <td>animationId</td>
                        <td>Number</td>
                        <td>动画id</td>
                        <td> 默认: 1</td>
                    </tr>
                    <tr>
                        <td>data</td>
                        <td>Object</td>
                        <td>填充数据; 需要给出固定格式对象: {"2021": {"01": {"01": "&lt;i&gt;今日&lt;/i&gt;"}}; 对号入座渲染到单元内部</td>
                        <td>&lt;i&gt;今日&lt;/i&gt;</td>
                    </tr>
                    <tr>
                        <td>unitShowMonth</td>
                        <td>Boolean</td>
                        <td>单元格是否显示月份</td>
                        <td>默认: false</td>
                    </tr>
                    <tr>
                        <td>dayUnit</td>
                        <td>String</td>
                        <td>日期单位</td>
                        <td>默认: "日"</td>
                    </tr>
                    <tr>
                        <td>monthUnit</td>
                        <td>String</td>
                        <td>月份单位</td>
                        <td>默认: "月"</td>
                    </tr>
                    <tr>
                        <td>yearUnit</td>
                        <td>String</td>
                        <td>年单位</td>
                        <td>默认: "年"</td>
                    </tr>
                    <tr>
                        <td>width</td>
                        <td>String</td>
                        <td>组件宽度, 指支持“px”单位, 如果需要百分比, 可以默认空, 设置外层元素宽度</td>
                        <td>默认: 外层元素宽度</td>
                    </tr>
                </tbody>
            </table>
            <p>
                事件:
            </p>
            <table>
                <thead>
                    <tr>
                        <th>事件名称</th>
                        <th>事件说明</th>
                        <th>返回参数</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>@change</td>
                        <td>日期选择回调</td>
                        <td>日期字符串 "2020-03-27"</td>
                    </tr>
                </tbody>
            </table>
            <p>
                示例:
            </p>
            <pre>
                &lt;me_calendar v-model=&quot;dateStr&quot; @change=&quot;onCalendarChange&quot; :dayUnit=&quot;&#x27;&#x27;&quot;&gt;&lt;/me_calendar&gt;
            </pre>
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
