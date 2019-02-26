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
      <div class="music-list" v-if="currentTab === 'hot'">
        <div class="music-list-header">
          <span class="music-header-name">歌名</span>
          <span class="music-header-author">歌手</span>
        </div>
        <ul class="music-list-content">
          <li
            class="music-list-item"
            v-for="(item, index) in playlist"
            :key="index"
            @click="turnDetail(item, i)"
          >
            <span class="music-item-num">{{index + 1}}</span>
            <span class="music-item-name">{{item.name}}</span>
            <span class="music-item-author">{{item.singer}}</span>
          </li>
        </ul>
      </div>
      <div v-else class="warning">敬请期待。。。</div>
    </div>
    <audio ref="audioEle" src="https://music.163.com/song/media/outer/url?id=1313354324.mp3"></audio>
    <!-- <div class="music-footer"></div> -->
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import { mapState } from 'vuex'
import request from '@/request'
import utils from '@/utils'
export default {
  name: 'index',
  components: {},
  data() {
    return {
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
      playlist: []
    }
  },
  computed: {
    ...mapState({
      audioEle: state => state.audioEle
    })
  },
  methods: {
    toggleTab(tab) {
      this.currentTab = tab
    },
    turnDetail(item, i) {
      this.audioEle.src = item.url
      this.audioEle.play()
      this.audioEle.onended = () => {
        if (i + 1 === this.playlist.length) i = 0
        this.audioEle.src = this.playlist[i + 1]
        this.audioEle.play()
      }
      // this.$router.push('detail')
    }
  },
  mounted() {
    this.$nextTick(() => {
      // this.$refs.audioEle.play()
    })
  },
  async created() {
    const data = await request.sendReq('/api/top/List', {
      idx: 1
    })
    this.playlist = utils.formatPlayList(data.playlist.tracks)
    console.log(utils.formatPlayList(data.playlist.tracks))
  }
}
</script>
<style lang="less">
.music-box {
  width: 100%;
  height: 100%;
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
  color: #000;
  background: rgb(#ccc, 0.6);
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
    height: 100%;
    padding: 0 12px;
    .music-list-header {
      top: 0;
      display: flex;
      height: 50px;
      align-items: center;
      border-bottom: 1px solid hsla(0, 0%, 100%, 0.4);
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
        color: #000;
        .music-item-num {
          width: 30px;
          margin-left: 10px;
        }
        .music-item-name {
          flex: 1;
        }
        .music-item-play-icon {
          width: 50px;
          height: 50px;
          background-image: url(~@/assets/imgs/player/pause.png);
          background-size: contain;
        }
        .music-item-author {
          width: 100px;
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
</style>
