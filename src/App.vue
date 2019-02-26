<template>
  <div id="app">
    <router-view/>
    <!--播放器-->
    <audio ref="player" src="https://music.163.com/song/media/outer/url?id=1313354324.mp3"></audio>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
  data() {
    return {}
  },
  methods: {
    ...mapMutations({
      setAudioEle: 'setAudioEle'
    })
  },
  mounted() {
    setTimeout(() => {
      this.$refs.player.play()
    }, 2000)
    // this.$nextTick(() => {

    //   // this.setAudioEle(this.$refs.player)
    // })
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
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
