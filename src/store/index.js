import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    music:{
      artist:"澤野弘之",
      mId:22753344,
      pic:"https://p2.music.126.net/wwcDhvLfUGM9el16_eiN7A==/838927372016609.jpg",
      src:"http://m8.music.126.net/20200603190905/f8bbf41a5c8aaf111a5e7cbcd6a7417f/ymusic/7696/df9c/eaf6/de90c9272c4dd10bfa30f0f0f1ed9ab6.mp3",
      title:"Desert"

    },//当前播放的
    musicList:{},//当前播放的list

  },
  mutations: {
    changeMusic(state, payload) {
      // console.log(payload)
      state.music = payload[0];
    },
  },
  actions: {
  },
  modules: {
  }
})
