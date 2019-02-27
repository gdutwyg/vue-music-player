<template>
  <div class="music-detail">
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
    <div class="detail-player">
      <div class="music-progress">
        <span class="music-playing-time">00:00</span>
        <div class="music-progress-bar">
          <div class="music-progress-outer"></div>
          <div class="music-progress-inner">
            <div class="music-progress-dot"></div>
          </div>
        </div>
        <span class="music-all-time">03:56</span>
      </div>
      <div class="music-controls">
        <div class="btn btn-mode"></div>
        <div class="btn btn-prev" @click="prevMusic"></div>
        <div class="btn btn-play" @click="palyMusic"></div>
        <div class="btn btn-next" @click="nextMusic"></div>
        <div class="btn btn-list"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'detail',
  components: {},
  data () {
    return {}
  },
  computed: {
    ...mapState({
      audioEle: state => state.audioEle,
      playList: state => state.playList,
      curIndex: state => state.curIndex
    }),
    curMusic () {
      return this.playList[this.curIndex]
    }
  },
  watch: {
  },

  methods: {
    ...mapMutations({
      setCurIndex: 'setCurIndex'
    }),
    goBack () {
      this.$router.push('/')
    },
    // 播放音乐
    palyMusic () {
      this.audioEle.src = this.playList[this.curIndex].url
      this.audioEle.play()
      this.audioEle.onended = () => {
        console.log('end')
        if (this.curIndex + 1 === this.playlist.length) this.setCurIndex(0)
        this.audioEle.src = this.playlist[this.curIndex + 1].url
        this.audioEle.play()
      }
    },
    prevMusic () {

    },
    nextMusic () {

    }
  },
  mounted () {
    this.palyMusic()
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
        &.pause {
          transform: translate(-20px, 0) rotate(-30deg);
        }
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
        .music-progress-outer {
          height: 2px;
          width: 100%;
          background-color: hsla(0, 0%, 100%, 0.15);
        }
        .music-progress-inner {
          position: absolute;
          top: 0;
          left: 0;
          display: inline-block;
          width: 0;
          height: 2px;
          background: rgb(229, 71, 60);
          width: 42.6661px;
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
              content: "";
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
    .music-controls {
      display: flex;
      .btn {
        width: 80px;
        height: 80px;
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
