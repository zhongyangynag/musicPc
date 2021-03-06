import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        music: {
            artist: "Spankers",
            mId: 5101915,
            pic: "https://p2.music.126.net/Y6zo-QRajEHVlIvDUWGa5g==/1700944488182385.jpg",
            src: "http://m8.music.126.net/20200604161958/24066953888d07e1dbb98f6ff001e05f/ymusic/a281/66ab/c394/827d15622480efe7ed82458629be52c8.mp3",
            title: "*** On The Beach"
        },//当前播放的
        musicList: [],//当前播放的list
        playIng: false,//播放
        SelectedType: 'hot',
        loginStatus: false,
        loginInfo: {
            account: {},
            profile: {},
        }

    },
    mutations: {
        changeMusic(state, payload) {
            state.musicList.unshift(payload[0])
            let list = state.musicList
            let hash = {};
            list = list.reduce(function (arr, current) {
                hash[current.mId] ? '' : hash[current.mId] = arr.push(current);
                return arr
            }, [])
            state.musicList = list
            state.music = payload[0];

        },
        changePlayIng(state, payload) {
            // console.log(payload)
            state.playIng = payload
        },
        changeSelectedType(state, payload) {
            state.SelectedType = payload
        },
        changeLoginStatus(state, payload) {
            state.loginStatus = payload
        },
        changeLoginInfo(state, payload) {
            state.loginInfo = {...payload}
        },
        clearLoginInfo(state) {
            state.loginInfo = {
                account: {},
                profile: {},
            }
        }

    },
    actions: {},
    modules: {}
})
