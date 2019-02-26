import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    audioEle: null,
    currentIndex: -1
  },
  getters,
  mutations: {
    setAudioEle(state, audioEle) {
      state.audioEle = audioEle
    }
  },
  actions: {
    setAudioEle(context, audioEle) {
      context.commit('setAudioEle', audioEle)
    }
  }
})
