<!--
 * @Author: your name
 * @Date: 2021-04-27 10:24:21
 * @LastEditTime: 2021-04-27 13:49:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-component-me/src/App.vue
-->
<template>
  <div id="app">
    <header>
        <img src="./assets/logo.png">
        <!-- <h1 class="header-title">我的Vue组件</h1> -->
        <h2 class="header-subtitle">Welcome to MeVue component library</h2>
    </header>

    <router-view/>
  </div>
</template>

<script>
export default {
    name: 'App'
}
</script>

<style scoped lang="scss">
@import './style/theme/index';
@import './style/reset';

header {
    padding: 20px 0;
    color: $color-font;

    .header-title {
        font-weight: 900;
    }

    .header-subtitle {
        font-weight: 100;
        color: #989898;
    }
}

header img {
    width: 90px;
    height: 90px;
}
</style>
