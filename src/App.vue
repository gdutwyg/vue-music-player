<template>
  <div id="app">
    <router-view/>
    <!--播放器-->
    <audio ref="player"></audio>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  methods: {

  }
}
</script>

<style>
#app,
body,
html {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
