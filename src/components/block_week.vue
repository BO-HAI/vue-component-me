<!--
 * @Author: your name
 * @Date: 2021-04-27 10:24:21
 * @LastEditTime: 2021-04-27 14:44:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-component-me/src/components/HelloWorld.vue
-->
<template>
    <div>
        <div class="stage-block">
            <h2 class="h2">Week</h2>
            <div class="component-week-set-block">
                <span class="txt">当前日期: <i>{{textVal}}</i></span>
                <input type="text" v-model="inputVal">
                <button @click="onSetDate">设置日期</button>
            </div>
        </div>
        <div class="stage-block">
            <me_week v-model="dateStr" @change="onWeekChange"></me_week>
        </div>
        <div class="stage-block">
            <me_week v-model="dateStr" @change="onWeekChange" :animation-id="2"></me_week>
        </div>
        <div class="stage-block pre">
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
                        <td></td>
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
                        <td> 默认: 1; 可选: 1, 2</td>
                    </tr>
                    <tr>
                        <td>data</td>
                        <td>Object</td>
                        <td>填充数据; 需要给出固定格式对象: {"2021": {"01": {"01": "&lt;i&gt;今日&lt;/i&gt;"}}; 对号入座渲染到单元内部</td>
                        <td>&lt;i&gt;今日&lt;/i&gt;</td>
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
                &lt;me_week v-model=&quot;dateStr&quot; @change=&quot;onWeekChange&quot; :animation-id=&quot;2&quot;&gt;&lt;/me_week&gt;
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
        onWeekChange (_dateStr_) {
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
