<template>
  <div id="app">
    <header>
        <img src="./assets/logo.png">
    </header>

    <router-view/>
  </div>
</template>

<script>
export default {
    name: 'App'
}
</script>

<style>
html {
    font-size: 16px;
}

body {
    padding: 0;
    margin: 0;
}

@media screen and (max-width:500px) {
    html {
        font-size: 12px;
    }
}

#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    /*margin-top: 60px;*/
}

header {
    padding: 20px 0;
    height: 90px;
    /*background: #252525;*/
}

header img {
    width: 90px;
}
</style>
