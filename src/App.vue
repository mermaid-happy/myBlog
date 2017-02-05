<template>
  <div id="app">
    <db-header></db-header>
    <router-view></router-view>
  </div>
</template>

<script>
import dbHeader from './components/dbHeader'

export default {
  name: 'app',
  components: {
    dbHeader

  }
}
</script>

<style>
*{
  margin:0;
  padding:0;
}
img {
    max-width: 100%;
    vertical-align: middle;
}
li {
    list-style: outside none none;
}
body, td, th {
    font: 12px/1.62 Helvetica,Arial,sans-serif;
    background-color: #e1e1e1;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
