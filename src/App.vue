<template>
  <div id="app">
    <router-view/>
    <!--播放器-->
    <audio ref="player"></audio>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
  data () {
    return {}
  },
  methods: {
    ...mapMutations({
      setAudioEle: 'setAudioEle'
    })
  },
  mounted () {
    this.$nextTick(() => {
      this.setAudioEle(this.$refs.player)
    })
  }
}
</script>

<style lang="less">
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
}
</style>
