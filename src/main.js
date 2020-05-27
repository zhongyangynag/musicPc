import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
// require('…/static/css/myvideo.css') //如果你需要自定义播放器的样式，自己新建一个css
import VideoPlayer from 'vue-video-player'
//引入 hls
import 'videojs-contrib-hls'
Vue.use(VideoPlayer)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
