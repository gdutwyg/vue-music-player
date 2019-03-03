<template>
  <div class="music-box">
    <header class="music-header">
      <h1 class="music-header-title">简易音乐播放器</h1>
      <div class="music-login-button">登录</div>
    </header>
    <div class="music-content">
      <div class="music-tab">
        <div
          v-for="(item, index) in tabList"
          :key="index"
          @click="toggleTab(item.value)"
          :class="{'active-tab': currentTab === item.value}"
        >{{item.name}}</div>
      </div>
      <div class="music-list" v-show="currentTab === 'hot'">
        <div class="music-list-header">
          <span class="music-header-name">歌名</span>
          <span class="music-header-author">歌手</span>
        </div>
        <ul class="music-list-content" ref="musicList">
          <li
            v-for="(item, i) in playList"
            :class="{'music-list-item': true, 'isHasPlayMini': curMusic, 'isPlaying': playing && curIndex === i}"
            :key="i"
            @click="goPlay(item, i)"
          >
            <span class="music-item-num">{{i + 1}}</span>
            <span class="music-item-name">{{item.name}}</span>
            <span class="music-item-author">{{item.singer}}</span>
          </li>
        </ul>
      </div>
      <div v-show="currentTab === 'recommend'" class="warning">敬请期待。。。</div>
    </div>
    <div class="music-footer" v-if="curMusic" @click="turnDetail">
      <div class="music-img">
        <img :src="curMusic.picUrl" alt>
      </div>
      <div class="music-info">
        <h2>{{curMusic.name}}</h2>
        <p>{{curMusic.singer}}</p>
      </div>
      <div :class="{'btn-play': true, 'pause': !playing}" @click.stop="togglePlaying"></div>
    </div>
    <div class="music-bg"></div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState, mapMutations } from 'vuex'
import request from '@/request'
import utils from '@/utils'
import music from '@/mixins/music'
export default {
  name: 'index',
  components: {},
  mixins: [music],
  data() {
    return {
      // 热歌榜
      currentTab: 'hot',
      tabList: [
        {
          name: '热歌榜',
          value: 'hot'
        },
        {
          name: '每日推荐',
          value: 'recommend'
        }
      ],
      playList: []
    }
  },
  computed: {
    ...mapState({
      audioEle: state => state.audioEle,
      curIndex: state => state.curIndex,
      playing: state => state.playing,
      curPos: state => state.curPos
    }),
    curMusic() {
      return this.playList[this.curIndex]
    }
  },
  methods: {
    ...mapMutations({
      setPlayList: 'setPlayList',
      setCurIndex: 'setCurIndex',
      setPlaying: 'setPlaying',
      savePos: 'savePos'
    }),
    toggleTab(tab) {
      this.currentTab = tab
    },
    // 点击mini播放器进入到详情
    turnDetail() {
      this.savePos(this.$refs.musicList.scrollTop)
      this.$router.push({
        name: 'detail'
      })
    },
    // 进入详情播放音乐
    goPlay(item, i) {
      // 点击歌曲 设置当前音乐下标
      this.setCurIndex(i)
    }
  },
  async created() {
    const data = await request.sendReq('/api/top/List', {
      idx: 1
    })
    this.playList = utils.formatPlayList(data.playlist.tracks)
    this.setPlayList(this.playList)
    this.$nextTick(() => {
      this.$refs.musicList.scrollTop = this.curPos
    })
  }
}
</script>
<style lang="less">
@import '~@/assets/less/mixin.less';
.music-box {
  width: 100%;
  height: 100%;
  position: relative;
}
.music-header {
  display: flex;
  height: 60px;
  background: rgb(229, 71, 60);
  color: #fff;
  justify-content: space-between;
  align-items: center;
  .music-header-title {
    font-size: 20px;
    font-weight: bold;
    margin-left: 20px;
  }
  .music-login-button {
    margin-right: 20px;
    padding: 5px 8px;
    border: 1px solid #fff;
    border-radius: 5px;
  }
}
.music-content {
  width: 100%;
  height: calc(100% - 60px);
  color: rgba(0, 0, 0, 0.6);
  .music-tab {
    display: flex;
    height: 40px;
    align-items: center;
    background: #fff;
    padding-bottom: 0px;
    font-size: 18px;
    div {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      color: #000;
      width: 50%;
    }
    div.active-tab {
      color: #d33a31;
      border-bottom: 2px solid #d33a31;
    }
  }
  .music-list {
    position: relative;
    width: 100%;
    height: calc(100% - 40px);
    padding: 0 12px;
    box-sizing: border-box;
    .music-list-header {
      top: 0;
      display: flex;
      height: 50px;
      align-items: center;
      border-bottom: 1px solid hsla(0, 0%, 100%, 0.4);
      color: rgba(0, 0, 0, 0.9);
      .music-header-name {
        flex: 1;
        margin-left: 40px;
      }
      .music-header-author {
        float: right;
        width: 100px;
      }
    }
    .music-list-content {
      width: 100%;
      height: calc(100% - 50px);
      overflow: auto;
      .music-list-item {
        display: flex;
        width: 100%;
        height: 50px;
        line-height: 50px;
        overflow: hidden;
        border-bottom: 1px solid hsla(0, 0%, 100%, 0.4);
        font-size: 14px;
        .music-item-num {
          width: 30px;
          margin-left: 10px;
          text-align: center;
        }
        .music-item-name {
          flex: 1;
          .nowrap();
          padding-right: 10px;
        }
        .music-item-play-icon {
          width: 50px;
          height: 50px;
          background-image: url(~@/assets/imgs/player/pause.png);
          background-size: contain;
        }
        .music-item-author {
          width: 120px;
          .nowrap();
        }
      }
      .music-list-item.isHasPlayMini:last-child {
        margin-bottom: 55px;
      }
      .music-list-item.isPlaying {
        .music-item-num {
          font-size: 0;
          background: url(~@/assets/imgs/player/wave.gif) no-repeat 50%;
        }
      }
    }
  }
  .warning {
    height: 100%;
    position: relative;
    top: 30%;
    text-align: center;
  }
}
.music-footer {
  display: flex;
  position: fixed;
  align-items: center;
  bottom: 0;
  width: 100%;
  height: 54px;
  background: rgba(#c0c0c0);
  padding: 8px 12px;
  box-sizing: border-box;
  .music-img {
    width: 38px;
    height: 38px;
    margin-right: 8px;
    border-radius: 4px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .music-info {
    flex: 1;
    color: #333;
    h2 {
      font-size: 14px;
      height: 20px;
      line-height: 20px;
    }
    p {
      color: #888;
      font-size: 12px;
      height: 18px;
      line-height: 18px;
    }
  }
  .btn-play {
    width: 28px;
    height: 28px;
    margin-right: 30px;
    background-image: url(~@/assets/imgs/player/min-play.png);
    background-size: contain;
    background-position: 50%;
    background-repeat: no-repeat;
    &.pause {
      background-image: url(~@/assets/imgs/player/min-pause.png);
    }
  }
}
.music-bg {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: -2;
  background-image: url(http://cdn.mtnhao.com/music/bg.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50%;
  filter: blur(4px);
  opacity: 0.3;
  transform: translateZ(0);
  transition: all 0.8s;
}
</style>
