<template>
    <div class="home">
        <Header page="index"/>
        <div>
            <el-carousel :interval="40000" :indicator-position="this.checkBrowser()===0?'':'none'" :height="this.checkBrowser()===0?'200px':'30vw'">
                <el-carousel-item trigger="click" v-for="item in bannerList" :key="item.bannerId">
                    <el-image class="elImg" @click="RouterTo(item)" fit="scale-down" style=""
                              :src="item.pic||item.imageUrl"></el-image>
                </el-carousel-item>
            </el-carousel>
        </div>
        <div style="margin-top: 10px;margin-bottom: 60px">
            <el-row :gutter="5">
                <el-col class="card" v-for="item in HotList"  :key="item.id" :xs="8" :sm="4" :md="4" :lg="4" :xl="4">
                    <el-card :body-style="{ padding: '0px' }">
                        <img  @click="HotListTo(item)" :src="item.coverImgUrl" class="image">
                        <div  @click="HotListTo(item)" style="padding: 10px;height: 60px;overflow: hidden">
                            <span style="font-size: 12px;display: inline-block;height: 35px;overflow: hidden">{{item.name}}</span>
                            <div class="bottom clearFix">
                                <time class="time">{{item.playCount|filterNum}}</time>
                                <el-button type="text" class="button">操作按钮</el-button>
                            </div>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>
        <div class="play">
            <play/>
        </div>

    </div>
</template>

<script>
    // @ is an alias to /src
    // import HelloWorld from '@/components/HelloWorld.vue'
    import Play from '@/components/Play.vue'
    import Header from '@/components/Header.vue'

    export default {
        name: 'Home',
        components: {
            // HelloWorld,
            Header,
            Play
        },
        data() {
            return {
                bannerList: [],//轮播图片
                HotList: [],//热门歌曲
            };
        },
        filters: {
            filterNum(num) {
                if(num){
                    let numStr = num.toString()
                    // 十万以内直接返回
                    if (numStr.length < 6) {
                        return numStr;
                    }
                    //大于8位数是亿
                    else if (numStr.length > 8) {
                        let decimal = numStr.substring(numStr.length - 8, numStr.length - 8 +1);
                        return parseFloat(parseInt(num / 100000000) + '.' + decimal) + '亿';
                    }
                    //大于6位数是十万 (以10W分割 10W以下全部显示)
                    else if (numStr.length > 5) {
                        let decimal = numStr.substring(numStr.length - 4, numStr.length - 4+1 )
                        return parseFloat(parseInt(num / 10000) + '.' + decimal) + '万';
                    }
                }else {
                    return ''
                }
            },
        },
        methods: {
            //点击banner
            RouterTo(item) {
                console.log(item.targetId)
            },
            checkBrowser() {
                const browser = {
                    versions: (function () {
                        let u = navigator.userAgent
                        // app = navigator.appVersion;
                        return {
                            //移动终端浏览器版本信息
                            trident: u.indexOf("Trident") > -1, //IE内核
                            presto: u.indexOf("Presto") > -1, //opera内核
                            webKit: u.indexOf("AppleWebKit") > -1, //苹果、谷歌内核
                            gecko: u.indexOf("Gecko") > -1 && u.indexOf("KHTML") == -1, //火狐内核
                            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                            android: u.indexOf("Android") > -1 || u.indexOf("Linux") > -1, //android终端或uc浏览器
                            iPhone: u.indexOf("iPhone") > -1, //是否为iPhone或者QQHD浏览器
                            iPad: u.indexOf("iPad") > -1, //是否iPad
                            webApp: u.indexOf("Safari") == -1 //是否web应该程序，没有头部与底部
                        };
                    })(),
                    language: (
                        navigator.browserLanguage || navigator.language
                    ).toLowerCase()
                };
                // console.log(this.$route.query)
                if (browser.versions.mobile) {//判断是否是移动设备打开。browser代码在下面
                    let ua = navigator.userAgent.toLowerCase();//获取判断用的对象
                    if (browser.versions.ios) {
                        if (ua.match(/ipad/i) == "ipad") {
                            return 3 //ipad
                        } else {
                            return 2 //iphone
                        }
                        //是否在IOS浏览器打开

                    }
                    if (browser.versions.android) {
                        //是否在安卓浏览器打开
                        console.log('安卓浏览器打开')
                        return 1 //安卓
                    }
                } else {
                    //否则就是PC浏览器打开
                    console.log('PC浏览器打开')
                    return 0 //pc

                }
            },
            getBanner() {
                this.axios({
                        method: "get",
                        url: process.env.VUE_APP_API + "/banner",
                        params: {
                            type: this.checkBrowser() || 0,
                            timestamp: new Date().getTime()
                        }
                    }
                ).then(res => {
                    if (res.status !== 200) {
                        this.$message('请求错误哦！');
                    }
                    console.log(res.data)

                    let list = res.data && res.data.banners || []
                    this.bannerList = this._.filter(list, unit => {
                        return unit.targetId !== 0
                    })
                }).catch(err => {
                    console.log(err)
                })
            },
            playlist() {
                this.axios({
                        method: "get",
                        url: process.env.VUE_APP_API + "/top/playlist",
                        params: {
                            limit: 10 ,
                            order:'hot',
                            timestamp: new Date().getTime()
                        }
                    }
                ).then(res => {
                    if (res.status !== 200) {
                        this.$message('获取热门歌单失败！');
                    }
                    console.log(res.data)

                    this.HotList = res.data && res.data.playlists || []
                    // this.HotList = this._.filter(list, unit => {
                    //     return unit.targetId !== 0
                    // })
                }).catch(err => {
                    console.log(err)
                })
            },
            HotListTo(item){
                console.log(item)
            }

        },
        created() {
            this.getBanner()
            this.playlist()

        }
    }
</script>
<style scoped lang="less">
    .home {
        min-height: 100vh;
        /*margin: 0 auto;*/
        overflow: hidden;
        /*background-color: red;*/
        /*max-width: 1920px;*/
    }

    /deep/ .el-carousel__mask {
        background-color: transparent;
    }

    .play {
        background-color: white;
        width: 100vw;
        position: fixed;
        bottom: 0;
    }

    .elImg {
        width: 100%;
        height: 100%;
        overflow: hidden;
        :hover{
            cursor: pointer;
        }
       /deep/ img{
            vertical-align: middle;
        }
    }
    .time {
        font-size: 13px;
        color: #999;
    }

    .bottom {
        margin-top: 5px;
        line-height: 12px;
    }

    .button {
        padding: 0;
        float: right;
    }

    .image {
        width: 100%;
        display: block;
    }

    .clearFix:before,
    .clearFix:after {
        display: table;
        content: "";
    }

    .clearFix:after {
        clear: both
    }
    .card{
        margin-bottom: 5px;
    }

</style>
