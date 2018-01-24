<template>
  <div class="hello">
    <h1>{{msg}}</h1>
    <slideshow :images="list" :time="33000"></slideshow>
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
        axios.get('/static/data/banner_images.js').then((res) => {
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
</style>
