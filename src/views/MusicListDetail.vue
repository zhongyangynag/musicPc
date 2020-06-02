<template>
    <div>
        <Header page="index3"/>
        <div class="hidden-xs-only" style="width: 100%;height: 40px"></div>
        <div class="musicList">
            <el-row :gutter="10">
                <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                    <div>
                        <el-image
                                class="elimg"
                                style="width: 100%;"
                                :src="Detail.coverImgUrl"
                                fit="cover"></el-image>
                    </div>
                </el-col>
                <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="11">
                    <div>{{Detail.name}}</div>
                </el-col>
            </el-row>
        </div>

        <div class="play">
            <play/>
        </div>
    </div>
</template>

<script>
    import Play from '@/components/Play.vue'
    import Header from '@/components/Header.vue'

    export default {
        name: "MusicListDetail",
        components: {
            Header,
            Play
        },
        data() {
            return {
                Detail: '',//歌单信息
                songlist: [],//歌单的歌曲
            }
        },
        methods: {
            //获取歌单详情
            playlistDetail() {
                this.axios({
                        method: "get",
                        url: process.env.VUE_APP_API + "/playlist/detail",
                        params: {
                            id: this.$route.query.id || '',
                            timestamp: new Date().getTime()
                        }
                    }
                ).then(res => {
                    if (res.status !== 200) {
                        this.$message('请求错误哦！');
                    }
                    console.log(res.data.playlist)
                    this.Detail = res.data.playlist
                    let list = res.data && res.data.playlist.trackIds || []
                    let ids = this._.map(list, unit => {
                        return unit.id
                    })
                    this.getAllSong(ids)

                }).catch(err => {
                    console.log(err)
                })
            },
            //    获取歌单所有歌曲
            getAllSong(val) {
                this.axios({
                        method: "get",
                        url: process.env.VUE_APP_API + "/song/detail",
                        params: {
                            ids: val.toString() || '',
                            timestamp: new Date().getTime()
                        }
                    }
                ).then(res => {
                    if (res.status !== 200) {
                        this.$message('请求错误哦！');
                    }
                    this.songlist = res.data && res.data.songs || []
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
    .play {
        background-color: white;
        width: 100vw;
        position: fixed;
        bottom: 0;
    }
    .musicList{
        max-width: 1200px;
        margin: 0  auto;
    }
    @media only screen and (max-width: 767px){
        .elimg{
            height: 30vw;
        }
    }



</style>