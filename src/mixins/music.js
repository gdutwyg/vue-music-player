import request from '@/request'
const music = {
  watch: {
    curIndex () {
      this.playMusic()
    }
  },
  methods: {
    keyEvent (e) {
      // space 键
      if (e.keyCode === 32) {
        console.log(this.togglePlaying)
        this.togglePlaying()
      }
    },
    // 播放音乐
    async playMusic () {
      const res = await request.sendReq('/api/check/music', {
        id: this.playList[this.curIndex].id
      })
      if (res.success) {
        this.setPlaying(true)
        this.currentTime = 0
        this.audioEle.src = this.playList[this.curIndex].url
        this.audioEle.play()
      } else {
        // 音乐不可用
        this.$toast(res.message)
        this.nextMusic()
      }
    },
    nextMusic () {
      console.log(this.curIndex)
      if (this.curIndex === this.playList.length - 1) {
        this.setCurIndex(0)
        return
      }
      this.setCurIndex(this.curIndex + 1)
    },
    // 暂停/播放
    togglePlaying () {
      !this.playing ? this.audioEle.play() : this.audioEle.pause()
      this.setPlaying(!this.playing)
    }
  },
  mounted () {
    document.onkeydown = this.keyEvent
    // 如果此时没有playList 则跳转到列表页面 防止detail f5刷新的问题
    if (!this.playList.length) this.$router.push('/')
    this.$nextTick(() => {
      if (this.audioEle && !this.audioEle.onended) this.audioEle.onended = this.nextMusic
    })
  }
}
export default music
