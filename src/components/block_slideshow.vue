<!--
 * @Author: your name
 * @Date: 2021-04-27 10:24:21
 * @LastEditTime: 2021-04-27 15:23:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-component-me/src/components/HelloWorld.vue
-->
<template>
    <div>
        <div class="stage-block">
            <h2 class="h2">Slibeshow</h2>
            <me_slideshow :images="list" :time="15000"></me_slideshow>
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
                        <td>height</td>
                        <td>String</td>
                        <td>高度</td>
                        <td>450px, 带标题不建议小于“350px”</td>
                    </tr>
                    <tr>
                        <td>width</td>
                        <td>String</td>
                        <td>宽度</td>
                        <td>450px, 带标题不建议小于“350px”</td>
                    </tr>
                    <tr>
                        <td>time</td>
                        <td>Number</td>
                        <td>轮播间隔时间</td>
                        <td>默认15000 单位“毫秒”</td>
                    </tr>
                    <tr>
                        <td>speed</td>
                        <td>Number</td>
                        <td>滚动速度</td>
                        <td>默认1.5 单位“秒”</td>
                    </tr>
                    <tr>
                        <td>btnMargin</td>
                        <td>Number</td>
                        <td>轮播按钮间距</td>
                        <td>默认10 单位“px”</td>
                    </tr>
                    <tr>
                        <td>images</td>
                        <td>[Array | {url, link, title, subtitle, linkText, color, btnHoverColor}]</td>
                        <td>图片合集</td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
            <p>
                示例:
            </p>
            <pre>
                &lt;me_slideshow :images=&quot;list&quot; :time=&quot;15000&quot;&gt;&lt;/me_slideshow&gt;
            </pre>
        </div>
    </div>
</template>

<script>
// import axios from 'axios'
export default {
    name: 'index',
    data () {
        return {
            list: [
                {
                    'url': 'http://ykonlinevideo.bs2dl.yy.com:80/original/359026dcb19541888898d8705fddbe48.jpg',
                    'link': 'http://www.hqwx.com',
                    'title': '这是一个轮播图组件',
                    'subtitle': '',
                    'linkText': 'ABOUT US',
                    'color': '#ffffff',
                    'btnHoverColor': '#40b883'
                },
                {
                    'url': 'http://ykonlinevideo.bs2dl.yy.com:80/original/c6299568d981433c877de5421cf08218.jpg',
                    'link': 'http://www.hqwx.com',
                    'title': '这是一个轮播图组件',
                    'subtitle': '',
                    'linkText': 'ABOUT US',
                    'color': '#ffffff',
                    'btnHoverColor': '#40b883'
                },
                {
                    'url"': 'http://ykonlinevideo.bs2dl.yy.com:80/original/959aaecaa1e44034827243035c74d79f.jpg',
                    'link': 'http://www.hqwx.com',
                    'title': '这是一个轮播图组件',
                    'subtitle': '',
                    'linkText': 'ABOUT US',
                    'color': '#ffffff',
                    'btnHoverColor': '#40b883'
                },
                {
                    'url': 'http://ykonlinevideo.bs2dl.yy.com:80/original/e5d511f0b8a94470a12171bb6c54e01a.jpg',
                    'link': 'http://www.hqwx.com',
                    'title': '这是一个轮播图组件',
                    'subtitle': '',
                    'linkText': 'ABOUT US',
                    'color': '#ffffff',
                    'btnHoverColor': '#40b883'
                }
            ]
        }
    },
    mounted () {
        // const GITHUB_URL = '/vue-component-me-demo/static/data/banner_images.json'
        // const URL = '/static/data/banner_images.json'

        // console.log(GITHUB_URL)
        // console.log(URL)

        // axios.get(URL).then((res) => {
        //     console.log(res)

        //     res.data[0].btnHoverColor = '#40b883'

        //     this.$data.list = res.data
        // })
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../style/theme/index';
@import '../style/reset';
</style>
