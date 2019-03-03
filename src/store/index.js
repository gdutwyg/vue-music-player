import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    audioEle: null,
    playList: [],
    curIndex: -1,
    playing: false,
    curPos: 0
  },
  getters,
  mutations: {
    setAudioEle(state, audioEle) {
      state.audioEle = audioEle
    },
    setPlayList(state, playList) {
      state.playList = playList
    },
    setCurIndex(state, curIndex) {
      state.curIndex = curIndex
    },
    setPlaying(state, playing) {
      state.playing = playing
    },
    savePos(state, pos) {
      state.curPos = pos
    }
  },
  actions: {
    setAudioEle(context, audioEle) {
      context.commit('setAudioEle', audioEle)
    }
  }
})
