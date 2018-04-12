<template>
  <div class="hello">
    <h1 class="page-title">{{msg}}</h1>
    <me_slideshow :images="list" :time="15000"></me_slideshow>
    <me_table></me_table>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'HelloWorld',
    data () {
        return {
            msg: 'Welcome to my Vue component library',
            list: []
        }
    },
    mounted () {
        const GITHUB_URL = '/vue-component-me-demo/static/data/banner_images.json'
        const URL = '/static/data/banner_images.json'

        console.log(GITHUB_URL)
        console.log(URL)

        axios.get(URL).then((res) => {
            console.log(res)

            res.data[0].btnHoverColor = '#54b883'

            this.$data.list = res.data
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
    /*background: #dddddd;*/
    padding: 20px;
    margin: 0;
    font: 26px "Helvetica Neue", "Open Sans", sans-serif;
    font-weight: 100;
}
</style>
