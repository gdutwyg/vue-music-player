<template>
  <div :class="{'music-detail': true, 'pause': !playing}">
    <div class="detail-header">
      <span class="detail-header-back" @click="goBack"></span>
      <div class="detail-header-info">
        <h1>{{curMusic.name}}</h1>
        <span>{{curMusic.singer}}</span>
      </div>
    </div>
    <div class="detail-cover">
      <div class="player-cd">
        <div class="player-needle"></div>
        <div class="player-cover-box">
          <div class="player-cover-bg"></div>
          <img :src="curMusic.picUrl">
        </div>
      </div>
    </div>
    {{audioEle.currentTime}}
    <div class="detail-player">
      <progress-bar
        :currentTime="currentTime"
        :percent="percentMusic"
        @percentChange="changeProgress"
      ></progress-bar>
      <div class="music-controls">
        <div class="btn btn-mode"></div>
        <div class="btn btn-prev" @click="prevMusic"></div>
        <div class="btn btn-play" @click="togglePlaying"></div>
        <div class="btn btn-next" @click="nextMusic"></div>
        <div class="btn btn-list"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import progressBar from '@/components/progressBar'
export default {
  name: 'detail',
  components: {
    progressBar
  },
  data() {
    return {
      currentTime: 0 //当前播放时间
    }
  },
  computed: {
    ...mapState({
      audioEle: state => state.audioEle,
      playList: state => state.playList,
      curIndex: state => state.curIndex,
      playing: state => state.playing
    }),
    curMusic() {
      return this.playList[this.curIndex]
    },
    percentMusic() {
      const duration = this.curMusic.duration
      return this.currentTime && duration ? this.currentTime / duration : 0
    }
  },
  watch: {
    curIndex() {
      this.playMusic()
    },
    playing(newVal) {
      newVal ? this.audioEle.play() : this.audioEle.pause()
    }
  },

  methods: {
    ...mapMutations({
      setCurIndex: 'setCurIndex',
      setPlaying: 'setPlaying'
    }),
    goBack() {
      this.$router.push('/')
    },
    //修改音乐进度
    changeProgress(percent) {
      this.audioEle.currentTime = this.curMusic.duration * percent
    },
    // 暂停/播放
    togglePlaying() {
      this.setPlaying(!this.playing)
    },
    // 播放音乐
    playMusic() {
      this.currentTime = 0
      this.audioEle.src = this.playList[this.curIndex].url
      this.audioEle.play()
    },
    prevMusic() {
      if (this.curIndex === 0) {
        this.setCurIndex(this.playList.length - 1)
        return
      }
      this.setCurIndex(this.curIndex - 1)
    },
    nextMusic() {
      if (this.curIndex === this.playList.length - 1) {
        this.setCurIndex(0)
        return
      }
      this.setCurIndex(this.curIndex + 1)
    },
    onMusicTimeupdate() {
      this.currentTime = this.audioEle.currentTime
    }
  },
  mounted() {
    this.togglePlaying()
    this.playMusic()
    this.audioEle.onended = this.nextMusic
    this.audioEle.ontimeupdate = this.onMusicTimeupdate
  }
}
</script>
<style lang="less">
.music-detail {
  height: 100%;
  background: #000;
  .detail-header {
    display: flex;
    align-items: center;
    height: 50px;
    border-bottom: 1px solid hsla(0, 0%, 100%, 0.15);
    .detail-header-back {
      width: 28px;
      height: 28px;
      margin-left: 10px;
      background-image: url(~@/assets/imgs/back.png);
      background-size: contain;
    }
    .detail-header-info {
      margin-left: 20px;
      h1 {
        font-weight: 400;
        font-size: 18px;
        color: #fff;
        margin-bottom: 4px;
      }
      span {
        color: hsla(0, 0%, 100%, 0.4);
      }
    }
  }
  .detail-cover {
    height: calc(100% - 50px - 100px);
    .player-cd {
      width: 100%;
      overflow: hidden;
      .player-needle {
        position: relative;
        top: -20px;
        left: 50%;
        z-index: 1;
        width: 100px;
        height: 150px;
        text-align: center;
        background-image: url(~@/assets/imgs/player/needle.png);
        background-size: contain;
        transform-origin: 16px 16px;
        transition: all 0.3s;
        transform: translate(-20px, 0);
      }
      .player-cover-box {
        position: relative;
        width: 240px;
        height: 240px;
        left: 50%;
        top: -80px;
        margin-left: -120px;
        animation: circle-rotate 12s linear infinite;
        .player-cover-bg {
          position: relative;
          width: 100%;
          height: 100%;
          background-image: url(~@/assets/imgs/player/cover-bg.png);
          background-size: contain;
          z-index: 1;
        }
        img {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 160px;
          transform: translate(-50%, -50%);
        }
      }
    }
  }
  .detail-player {
    color: #fff;
    height: 100px;
    font-size: 12px;
    .music-controls {
      display: flex;
      justify-content: space-between;
      margin-top: 8px;
      .btn {
        width: 64px;
        height: 64px;
        background-size: contain;
      }
      .btn-mode {
        background-image: url(../assets/imgs/player/mode-list.png);
      }
      .btn-prev {
        background-image: url(~@/assets/imgs/player/prev.png);
      }
      .btn-play {
        background-image: url(~@/assets/imgs/player/play.png);
      }
      .btn-next {
        background-image: url(~@/assets/imgs/player/next.png);
      }
      .btn-list {
        background-image: url(~@/assets/imgs/player/list.png);
      }
    }
  }
  &.pause {
    .player-cd {
      .player-needle {
        transform: translate(-20px, 0) rotate(-30deg);
      }
      .player-cover-box {
        animation-play-state: paused;
      }
    }
    .music-controls {
      .btn-play {
        background-image: url(~@/assets/imgs/player/pause.png);
      }
    }
  }
}
@keyframes circle-rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
