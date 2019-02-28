<template>
  <div class="music-progress">
    <span class="music-playing-time">{{formatCurTime}}</span>
    <div class="music-progress-bar" ref="progressBar" @click="barClick">
      <div class="music-progress-outer"></div>
      <div class="music-progress-inner" ref="progressBarInner">
        <div class="music-progress-dot" @mousedown="barDown" @touchstart.prevent="barDown"></div>
      </div>
    </div>
    <span class="music-all-time">{{curMusic.musicTime}}</span>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import utils from '@/utils/'
const dotWidth = 10
export default {
  name: 'progressBar',
  props: {
    // 当前音乐的播放时间
    currentTime: {
      type: Number,
      required: true
    },
    // 播放进度百分比
    percent: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      move: {
        status: false, // 是否可拖动
        startX: 0, // 记录最开始点击的X坐标
        left: 0 // 记录当前已经移动的距离
      },
      utils
    }
  },
  computed: {
    ...mapState({
      playList: state => state.playList,
      curIndex: state => state.curIndex
    }),
    curMusic() {
      return this.playList[this.curIndex]
    },
    formatCurTime() {
      return utils.formatMusicTime(this.currentTime)
    }
  },
  watch: {
    percent(newPercent) {
      if (newPercent >= 0 && !this.move.status) {
        const barWidth = this.$refs.progressBar.clientWidth - dotWidth
        const offsetWidth = newPercent * barWidth
        this.moveSilde(offsetWidth)
      }
    }
  },
  methods: {
    //添加绑定事件
    bindEvents() {
      document.addEventListener('mousemove', this.barMove)
      document.addEventListener('mouseup', this.barUp)

      document.addEventListener('touchmove', this.barMove)
      document.addEventListener('touchend', this.barUp)
    },
    //移除绑定事件
    unbindEvents() {
      document.removeEventListener('mousemove', this.barMove)
      document.removeEventListener('mouseup', this.barUp)

      document.removeEventListener('touchmove', this.barMove)
      document.removeEventListener('touchend', this.barUp)
    },
    //点击事件
    barClick(e) {
      let rect = this.$refs.progressBar.getBoundingClientRect()
      let offsetWidth = Math.min(
        this.$refs.progressBar.clientWidth - dotWidth,
        Math.max(0, e.clientX - rect.left)
      )
      this.moveSilde(offsetWidth)
      this.commitPercent()
    },
    //鼠标按下事件
    barDown(e) {
      this.move.status = true
      this.move.startX = e.clientX || e.touches[0].pageX
      this.move.left = this.$refs.progressBarInner.clientWidth
    },
    //鼠标/触摸移动事件
    barMove(e) {
      if (!this.move.status) {
        return false
      }
      let endX = e.clientX || e.touches[0].pageX
      let dist = endX - this.move.startX
      let offsetWidth = Math.min(
        this.$refs.progressBar.clientWidth - dotWidth,
        Math.max(0, this.move.left + dist)
      )
      this.moveSilde(offsetWidth)
      this.commitPercent()
    },
    //鼠标/触摸释放事件
    barUp(e) {
      e.stopPropagation()
      this.move.status = false
    },
    moveSilde(offsetWidth) {
      this.$refs.progressBarInner.style.width = `${offsetWidth}px`
    },
    commitPercent() {
      let lineWidth = this.$refs.progressBar.clientWidth - dotWidth
      let percent = this.$refs.progressBarInner.clientWidth / lineWidth
      this.$emit('percentChange', percent)
    }
  }
}
</script>

<style lang="less">
.music-progress {
  display: flex;
  padding: 0 20px;
  height: 20px;
  align-items: center;
  .music-progress-bar {
    position: relative;
    width: 100%;
    line-height: 20px;
    margin: 0 12px;
    padding: 5px 0;
    .music-progress-outer {
      height: 2px;
      width: 100%;
      background-color: hsla(0, 0%, 100%, 0.15);
    }
    .music-progress-inner {
      position: absolute;
      top: 50%;
      left: 0;
      display: inline-block;
      width: 0;
      height: 2px;
      background: rgb(229, 71, 60);
      width: 0px;
      .music-progress-dot {
        position: absolute;
        top: 50%;
        right: -9px;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        transform: translate(0, -50%);
        background-color: #fff;
        &:after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background-color: rgb(229, 71, 60);
          transform: translate(-50%, -50%);
        }
      }
    }
  }
}
</style>
