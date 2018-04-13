<template>
  <div class="hello">
    <h1 class="page-title font">{{msg}}</h1>
    <h2 class="font">轮播图</h2>
    <me_slideshow :images="imgList" :time="15000"></me_slideshow>
    <h2 class="font">表格</h2>
    <me_table :collection="tableData2"></me_table>
    <me_table :collection="tableData3"></me_table>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'HelloWorld',
    data () {
        return {
            msg: 'Welcome to my Vue component library',
            imgList: [],
            tableData2: [],
            tableData3: []
        }
    },
    mounted () {
        // const GITHUB_URL = '/vue-component-me-demo/static/data/banner_images.json'
        const URL = '/static/data/banner_images.json'
        const TABLE_DATA_URL_3 = '/static/data/table_data_3.json'
        const TABLE_DATA_URL_2 = '/static/data/table_data_2.json'

        axios.get(URL).then((res) => {
            res.data[0].btnHoverColor = '#54b883'
            this.$data.imgList = res.data
        })

        axios.get(TABLE_DATA_URL_2).then((res) => {
            this.$data.tableData2 = res.data
        })

        axios.get(TABLE_DATA_URL_3).then((res) => {
            this.$data.tableData3 = res.data
        })
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
    font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.page-title {
    padding: 20px;
    margin: 0;
    font-size: 26px;
}

.font {
    font: "Helvetica Neue", "Open Sans", sans-serif;
    font-weight: 100;
}

h2 {
    background: #fbfbfb;
    margin: 0;
    height: 55px;
    line-height: 55px;
}
</style>
