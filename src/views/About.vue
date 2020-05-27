// 可以直接在components的HelloWorld.vue里面写，也可以src中任意地方新建vue页面来写，下面是vue页面的完整代码
// 注意三个import引用即可

<template>
    <div class="player-container">
        <el-upload
                class="upload-demo"
                action="http://127.0.0.1:8888/upload"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                multiple
                :limit="3"
                :on-exceed="handleExceed"
                :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        <!--        <video-player class="vjs-custom-skin" :options="playerOptions"></video-player>-->
    </div>
</template>

<script>
    //引入video样式

    //引入hls.js

    export default {
        name: 'about',
        data() {
            return {
                fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }],
                // playerOptions: {
                //     // playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
                //     autoplay: false, //如果true,浏览器准备好时开始回放。
                //     controls: true, //控制条
                //     preload: 'auto', //视频预加载
                //     muted: false, //默认情况下将会消除任何音频。
                //     loop: false, //导致视频一结束就重新开始。
                //     language: 'zh-CN',
                //     aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                //     fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                //     sources: [{
                //         type: "application/x-mpegURL",
                //         src: "https://logos-channel.scaleengine.net/logos-channel/live/biblescreen-ad-free/playlist.m3u8"
                //         // src: "https://cdn.letv-cdn.com/2018/12/05/JOCeEEUuoteFrjCg/playlist.m3u8"
                //     }],
                //     poster: "", //你的封面地址
                //     width: document.documentElement.clientWidth,
                //     notSupportedMessage: '此视频暂无法播放，请稍后再试' //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                // }
            }
        },
        methods: {
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            }
        },
        computed: {}
    }
</script>
<style scoped lang="less">

    /deep/.el-table th{
        background-color: transparent;
    }
    /deep/.el-table tr{
        background-color: transparent;
        position: relative;
    }

    .player-container {
        height:500px;
    }

</style>

