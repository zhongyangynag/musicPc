import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import {checkBrowser,check,getSong} from "@/utils/utils";
import play from '@/components/Play.vue'


import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/display.css';
import ElementUI from 'element-ui';
import _ from 'lodash'

import VideoPlayer from 'vue-video-player'

import Moment from 'moment'

// 定义全局时间戳过滤器
Vue.filter('formatDate', function(value) {
    if(value){
        return Moment(value).format('YYYY-MM-DD')
    }else{
        return value
    }

})
Vue.filter('formatTime', function(value) {
    if(value){
        value=value/1000
        let h = Math.floor(value / 3600) < 10 ? '0'+Math.floor(value / 3600) : Math.floor(value / 3600);
        let m = Math.floor((value / 60 % 60)) < 10 ? '0' + Math.floor((value / 60 % 60)) : Math.floor((value / 60 % 60));
        let s = Math.floor((value % 60)) < 10 ? '0' + Math.floor((value % 60)) : Math.floor((value % 60));
        if(h>0){
            return value = h + ":" + m + ":" + s;
        }else {
            return value =  m + ":" + s;
        }

    }else{
        return value
    }

})
Vue.filter('formatName', function(value) {
    let name=''
    if(value){
        _.map(value,(unit,index)=>{
            if(value.length===index+1){
                name=name+unit.name
            }else {
                name=name+unit.name+'/'
            }
        })
        return name

    }else{
        return value
    }

})
Vue.component('Play',play)
Vue.use(ElementUI);
Vue.prototype._ = _
Vue.prototype.checkBrowser = checkBrowser
Vue.prototype.check = check
Vue.prototype.getSong = getSong
Vue.use(VueAxios, axios)
Vue.use(VideoPlayer)
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')