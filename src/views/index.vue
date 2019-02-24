<template>
  <div class="music-box">
    <header class="music-header">
      <h1 class="music-header-title">简易音乐播放器</h1>
      <div class="music-login-button">登录</div>
    </header>
    <div class="music-content">
      <div class="music-tab">
        <div>每日推荐</div>
        <div>热歌榜</div>
      </div>
      <div class="music-list">
        <div class="music-list-header">
          <span class="music-header-name">歌名</span>
          <span class="music-header-author">歌手</span>
        </div>
        <ul class="music-list-content">
          <li class="music-list-item" @click="turnDetail">
            <span class="music-item-num">1</span>
            <span class="music-item-name">xxx</span>
            <!-- <span class="music-item-play-icon"></span> -->
            <span class="music-item-author">xxx/abc</span>
          </li>
          <li class="music-list-item">
            <span class="music-item-num">1</span>
            <span class="music-item-name">xxx</span>
            <!-- <span class="music-item-play-icon"></span> -->
            <span class="music-item-author">xxx/abc</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="music-footer"></div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'index',
  components: {},
  data() {
    return {}
  },
  methods: {
    turnDetail() {
      this.$router.push('detail')
    }
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
    div:first-child {
      color: #d33a31;
      border-bottom: 2px solid #d33a31;
    }
  }
  .music-list {
    padding: 0 12px;
    .music-list-header {
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
    .music-list-item {
      display: flex;
      width: 100%;
      height: 50px;
      line-height: 50px;
      overflow: hidden;
      border-bottom: 1px solid hsla(0, 0%, 100%, 0.4);
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
</style>
