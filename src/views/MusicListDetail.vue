<template>
    <div class="MusicListDetail">
        <div class="musicList">
            <el-row>
                <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                    <div v-if="Detail.coverImgUrl">
                        <el-image
                                class="elimg"
                                style="width: 100%;"
                                :src="Detail.coverImgUrl"
                                fit="cover"></el-image>
                    </div>
                </el-col>
                <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-row>
                        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                            <h2 class="mTittle">{{Detail.name}}</h2>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                            <div v-if="Detail.creator">
                                <el-image class="userImg" fit="scale-down" :src="Detail.creator.avatarUrl"></el-image>
                                <span class="userNickname">{{Detail.creator.nickname}}</span>
                                <span class="listCreateTime">{{Detail.createTime|formatDate}} 创建</span>
                            </div>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                            <div class="tagBox">
                                <span>标签：</span>
                                <div class="tag" v-for="item in Detail.tags" :key="item">{{item}}</div>
                            </div>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                            <div v-if="Detail.description" class="descripBox">
                                <span>介绍：</span>
                                <div style="text-indent: 2em">
                                    <div v-for="(item,index) in Detail.description" :key="index">{{item}}</div>
                                    <div v-if="showAll">
                                        <div v-for="(item,index) in Detail.descriptionlast" :key="index">{{item}}</div>
                                    </div>

                                </div>
                                <div v-show="Detail.descriptionlast.length>0" style="text-align: right">
                                    <el-button @click="showAll=(!showAll)" type="text">{{showAll?'收起':'展开'}}</el-button>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
            <div class="songsList">
                <el-table
                        @row-click="clickRow"
                        :data="songlist"
                        style="width: 100%">
                    <el-table-column
                            align="center"
                            prop="name"
                            label="歌曲"
                    >
                        <template slot-scope="scope">
                            <div class="singerName">{{scope.row.name}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="dt"
                            label="时长"
                    >
                        <template slot-scope="scope">
                            <div class="singerName">{{scope.row.dt|formatTime}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="ar"
                            label="歌手">
                        <template slot-scope="scope">
                            <div class="singerName">{{scope.row.ar|formatName}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="address"
                            label="专辑">
                        <template slot-scope="scope">
                            <div class="singerName">{{scope.row.al.name}}</div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>

        </div>
    </div>
</template>

<script>
    // import Header from '@/components/Header.vue'

    export default {
        name: "MusicListDetail",
        components: {
            // Header,
        },
        data() {
            return {
                Detail: {},//歌单信息
                songlist: [],//歌单的歌曲
                showAll: false,//默认不显示所有介绍
            }
        },
        filters: {},
        methods: {
            //获取歌曲播放地址
            getSongUrl() {
            },
            //点击当前行
            clickRow(row) {
                console.log(row)
                // console.log(this.$parent.$children[0])
                let _this = this
                // this.$parent.$children[0].$refs.player.play()
                let pic = row.al.picUrl
                let artist = row.ar[0].name
                let title = row.name
                // console.log(alPicUrl)
                this.check(row.id).then(res => {
                    if (res.success) {
                        this.getSong(row.id).then(res => {
                            console.log(res)
                            if (res.data[0].url === null) {
                                this.$message('亲爱的,这首歌播放不了哦！')
                            } else {
                                //准备单手歌曲的数据格式
                                let songMsg = this._.map(res?.data, unit => {
                                    return {
                                        src: unit.url+`?timestamp=${new Date().getTime()}`,
                                        mId: unit.id,
                                        artist,
                                        title,
                                        pic
                                    }
                                })
                                console.log(songMsg)
                                //vuex==》替换当前歌曲
                                this.$store.commit('changeMusic', songMsg)
                                //设置延时，否则歌曲未加载完成就播放会是上一首歌曲的数据
                                setTimeout(() => {
                                    _this.$parent.$children[0].$refs.player.play()
                                }, 600)
                                // this.$store.commit('changePlayIng', true)
                            }
                        }).catch(error => {
                            this.$message('亲爱的,这首歌播放不了哦！')
                            console.log(error)
                        })
                    } else {
                        this.$message(res.message)
                    }
                    // console.log(res)
                }).catch(() => {
                    this.$message('亲爱的,暂无版权')
                })


                // console.log(this.check(row.id))
            },
            //获取歌单详情
            playlistDetail() {
                this.request({
                        method: "get",
                        url:  "/playlist/detail",
                        params: {
                            id: this.$route.query.id || '',
                        }
                    }
                ).then(res => {
                    if (res.code !== 200) {
                        this.$message('请求错误哦！');
                    }
                    // console.log(res.data.playlist.description)
                    let test = res.playlist.description
                    this.Detail = res.playlist
                    this.Detail.description = test.replace(/[\r\n]/g, "testCode").split('testCode').splice(0, 3)
                    this.Detail.descriptionlast = test.replace(/[\r\n]/g, "testCode").split('testCode').splice(3)
                    let list = res && res.playlist.trackIds || []
                    let ids = this._.map(list, unit => {
                        return unit.id
                    }).splice(0, 100)
                    this.getAllSong(ids)

                }).catch(err => {
                    console.log(err)
                })
            },
            //    获取歌单所有歌曲
            getAllSong(val) {
                this.request({
                        method: "get",
                        url:  "/song/detail",
                        params: {
                            ids: val.toString() || '',
                        }
                    }
                ).then(res => {
                    if (res.code !== 200) {
                        this.$message('请求错误哦！');
                    }
                    this.songlist = res && res.songs || []
                    // console.log(res.data.songs)
                }).catch(err => {
                    console.log(err)
                })
            },
        },
        created() {
            this.playlistDetail()
        }
    }
</script>

<style scoped lang="less">
    .MusicListDetail {

        margin-bottom: 50px;
    }

    .play {
        background-color: white;
        width: 100vw;
        position: fixed;
        bottom: 0;
    }

    .musicList {
        max-width: 1200px;
        margin: 0 auto;
        padding-bottom: 100px;
    }

    .mTittle {
        /*text-align: center;*/
        padding-left: 30px;
    }

    .userImg {
        border-radius: 10px;
        width: 60px;
        margin-left: 30px;
        vertical-align: middle;
    }

    .userNickname {
        margin-left: 10px;
        display: inline-block;
        color: #42b983;
    }

    .listCreateTime {
        margin-left: 10px;
        font-size: 14px;
        color: #999999;
    }

    .tagBox, .descripBox {
        margin: 0 30px;
        margin-top: 20px;
        color: #585858;
    }


    .tag {
        display: inline-block;
        margin: 0 5px;
        background-color: #c7c5c5;
        padding: 4px 10px;
        border-radius: 30px;
    }

    .tag:hover {
        cursor: pointer;
    }

    .singerName {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap
    }

    .songsList {

    }

    @media only screen and (max-width: 767px) {
        .elimg {
            height: 40vw;
        }

        .mTittle {
            padding: 0 5vw;
        }

        .userImg {
            width: 10vw;
        }
    }


</style>
