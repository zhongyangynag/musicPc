<template>
    <div class="home">
        <Header page="index"/>
        <div style="width: 100%;height: 43px"></div>
        <div>
            <el-carousel :interval="9000" :indicator-position="Browser===0?'':'none'"
                         :height="Browser===0?'350px':'30vw'">
                <el-carousel-item trigger="click" v-for="item in bannerList" :key="item.bannerId">
                    <div class="blur" :style="{backgroundImage:'url(' + (item.pic||item.imageUrl) + ')'}">
                    </div>
                    <el-image class="elImg" @click="RouterTo(item)" fit="scale-down"
                              :src="item.pic||item.imageUrl"></el-image>
                </el-carousel-item>
            </el-carousel>
        </div>
        <!--        歌单-->
        <div style="margin-top: 10px;margin-bottom: 10px">
            <div class="mType">
                <div class="mTypeText">精选</div>
                <div class="mTypeChose">
                    <span :class="[this.listType==='hot'?'hot':'']" @click="playlist('hot')">最热</span>
                    <span class="line"></span>
                    <span :class="[this.listType==='new'?'new':'']" @click="playlist('new')">最新</span>
                </div>
            </div>
            <el-row class="mBox" :gutter="5">
                <el-col class="card" v-for="item in HotList" :key="item.id" :xs="8" :sm="4" :md="4" :lg="4" :xl="4">
                    <el-card :body-style="{ padding: '0px' }">
                        <el-image fit="fill" @click="HotListTo(item)" :src="item.coverImgUrl"
                                  :class="[Browser===0?'image':'imagePhone']"></el-image>
                        <div @click="HotListTo(item)" style="padding: 10px;height: 60px;overflow: hidden">
                            <span class="description">{{item.name}}</span>
                            <div class="bottom clearFix">
                                <time class="time">{{item.playCount|filterNum}}</time>
                                <div class="artistNameText">{{item.creator.nickname}}</div>
                            </div>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>
        <!--      推荐MV  -->
        <div style="margin-top: 10px;margin-bottom: 60px">
            <div class="mType">
                <div class="mTypeText">推荐 mv</div>
            </div>
            <el-row class="mBox" :gutter="5">
                <el-col class="card" v-for="item in MvList" :key="item.id" :xs="8" :sm="8" :md="6" :lg="6" :xl="6">
                    <el-card :body-style="{ padding: '0px' }">
                        <el-image fit="fill" @click="MvTo(item)" :src="item.picUrl"
                                  :class="[Browser===0?'imageMv':'imageMvPhone']"></el-image>

                        <div @click="MvTo(item)" style="padding: 5px;height: 60px;overflow: hidden">
                            <span class="description">{{item.name}}</span>
                            <div class="bottom clearFix">
                                <time class="time">{{item.playCount|filterNum}}</time>
                                <div class="artistNameText">{{item.artistName}}</div>
                            </div>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>


    </div>
</template>

<script>
    // @ is an alias to /src
    import Header from '@/components/Header.vue'

    export default {
        name: 'Home',
        components: {
            Header,
        },
        data() {
            return {
                bannerList: [],//轮播图片
                HotList: [],//热门歌曲
                MvList: [],//Mv
            };
        },
        computed: {
            Browser() {
                return this.checkBrowser()
            },
            listType(){
                return this.$store.state.SelectedType
            }
        },
        filters: {
            filterNum(num) {
                if (num) {
                    let numStr = num.toString()
                    // 十万以内直接返回
                    if (numStr.length < 6) {
                        return numStr;
                    }
                    //大于8位数是亿
                    else if (numStr.length > 8) {
                        let decimal = numStr.substring(numStr.length - 8, numStr.length - 8 + 1);
                        return parseFloat(parseInt(num / 100000000) + '.' + decimal) + '亿';
                    }
                    //大于6位数是十万 (以10W分割 10W以下全部显示)
                    else if (numStr.length > 5) {
                        let decimal = numStr.substring(numStr.length - 4, numStr.length - 4 + 1)
                        return parseFloat(parseInt(num / 10000) + '.' + decimal) + '万';
                    }
                } else {
                    return ''
                }
            },
        },
        methods: {
            //点击banner
            RouterTo(item) {
                if (item.targetType === 1) {
                    this.$router.push({path: '/MusicDetail', query: {id: item.targetId}});
                } else if (item.targetType === 1004) {
                    this.$router.push({path: '/MvPlay', query: {id: item.targetId}});
                }
                console.log(item)
                // this.$router.push({path: '/MusicListDetail', query: {id: item.targetId}});
            },
            //跳转歌单详情页面
            HotListTo(item) {
                console.log(item)
                this.$router.push({path: '/MusicListDetail', query: {id: item.id}});
            },
            //跳转歌单详情页面
            MvTo(item) {
                console.log(item)
                this.$router.push({path: '/MvPlay', query: {id: item.id}});
            },
            //获取轮播图
            getBanner() {
                this.axios({
                        method: "get",
                        url: process.env.VUE_APP_API + "/banner",
                        params: {
                            type: this.Browser || 0,
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
            //获取最新或最热歌单
            playlist(val) {
                if(val){
                    this.$store.commit('changeSelectedType', val)
                }
                this.axios({
                        method: "get",
                        url: process.env.VUE_APP_API + "/top/playlist",
                        params: {
                            limit: this.Browser === 0 ? 12 : 6,
                            order: this.listType || 'hot',
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
            //获取推荐Mv
            personalized() {
                this.axios({
                        method: "get",
                        url: process.env.VUE_APP_API + "/personalized/mv",
                        params: {
                            timestamp: new Date().getTime()
                        }
                    }
                ).then(res => {
                    if (res.status !== 200) {
                        this.$message('获取Mv失败！');
                    }
                    console.log(res.data.result)
                    if (res.data && res.data.result) {
                        if (this.Browser === 0) {
                            this.MvList = res.data.result
                        } else {
                            this.MvList = res.data.result.slice(0, 3)
                        }

                    } else {
                        return []
                    }

                    // this.HotList = this._.filter(list, unit => {
                    //     return unit.targetId !== 0
                    // })
                }).catch(err => {
                    console.log(err)
                })
            },


        },
        created() {
            this.getBanner()
            this.playlist()
            this.personalized()

        }
    }
</script>
<style scoped lang="less">
    .home {
        min-height: 100vh;
        /*margin: 0 auto;*/
        overflow: hidden;
        margin-bottom: 50px;
        /*background-color: red;*/
        /*max-width: 1920px;*/
    }

    /deep/ .el-carousel__mask {
        background-color: transparent;
    }

    .blur {
        position: relative;
        top: 0;
        width: 100%;
        height: 100%;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        filter: blur(10px);
    }

    .elImg {
        top: 0;
        position: absolute;
        width: 100%;
        height: 100%;

        overflow: hidden;


        :hover {
            cursor: pointer;
        }

        /deep/ img {
            vertical-align: middle;
        }
    }

    .time {
        width: 55%;
        font-size: 13px;
        color: #999;
    }

    .bottom {
        margin-top: 5px;
        line-height: 12px;
        display: flex;
    }

    .button {
        padding: 0;
        float: right;
    }

    .image {
        width: 100%;
        padding-bottom: 100%;
        display: block;

        :hover {
            transition: all 0.5s; /* 所有的属性变化在0.5s的时间段内完成 */
            cursor: pointer;
            transform: scale(1.2);
        }

        /deep/ img {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            width: 100%;
            margin: auto;
        }
    }

    .imagePhone {
        width: 100%;
        display: block;
        padding-bottom: 100%;

        /deep/ img {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            width: 100%;
            margin: auto;
        }
    }

    .imageMv {
        width: 100%;
        padding-bottom: 60%;
        display: block;

        :hover {
            transition: all 0.5s; /* 所有的属性变化在0.5s的时间段内完成 */
            cursor: pointer;
            transform: scale(1.2);
        }

        /deep/ img {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            width: 100%;
            margin: auto;
        }
    }

    .imageMvPhone {
        width: 100%;
        display: block;
        padding-bottom: 60%;

        /deep/ img {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            width: 100%;
            margin: auto;
        }
    }

    .clearFix:before,
    .clearFix:after {
        display: table;
        content: "";
    }

    .clearFix:after {
        clear: both
    }

    .card {
        margin-bottom: 5px;
    }

    /***********/
    /*safari 有兼容问题*/
    /*.mBox {*/
    /*    !*display: -webkit-flex; !* Safari *!*!*/
    /*    !*display: flex;*!*/
    /*    !*flex-direction: row;*!*/
    /*    !*flex-wrap: wrap;*!*/
    /*}*/

    .mType {
        display: -webkit-flex; /* Safari */
        display: flex;
        /*flex-direction: row;*/
        justify-content: space-between;
        margin-bottom: 5px;
    }

    .mTypeText {
        margin-left: 10px;
        font-size: 20px;
    }

    .line {
        margin: 0 5px;
        display: inline-block;
        line-height: 14px;
        vertical-align: middle;
        width: 1.4px;
        height: 14px;
        background-color: black;

        :hover {
            cursor: pointer;
        }
    }

    .mTypeChose {
        margin-right: 10px;

        :hover {
            cursor: pointer;
        }

        span {
            vertical-align: middle;
        }
    }

    .hot, .new {
        color: #42b983;
    }

    .artistNameText {
        font-size: 13px;
        line-height: 13px;
        text-align: right;
        display: inline-block;
        width: 45%;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        margin-right: 5px;
    }

    .description {
        font-size: 12px;
        display: inline-block;
        height: 35px;
        overflow: hidden;
        text-overflow: ellipsis;
    }

</style>
