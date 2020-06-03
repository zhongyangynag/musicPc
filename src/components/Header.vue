<template>
    <header class="header-box">
        <el-row >
            <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="1">
                <div @click="$router.push({path:'/'})" :class="[page==='index'?'header active':'header']">推荐</div>
            </el-col>
            <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="11">
                <div :class="[page==='index2'?'header active':'header']" >排行榜</div>
            </el-col>
            <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="11">
                <div :class="[page==='index3'?'header active':'header']" >歌单</div>
            </el-col>
            <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="1">
                <div :class="[page==='index4'?'header active':'header']" >歌手</div>
            </el-col>
        </el-row>
    </header>
</template>

<script>
    export default {
        name: "Header",
        props:['page'],
        created() {

        }
    }
</script>

<style scoped lang="less">
    .header-box{
        background-color: #727272;
        color: white;
        position: fixed;
        top: 0;
        width: 100%;
        text-align: center;
        z-index: 5;
    }
    .header:hover {
        cursor: pointer;
        background-color: #585858;
    }
    .header:active {
        cursor: pointer;
        background-color: #585858;
    }
    .header {
        padding: 10px 5px;
        text-align: center;
    }
    .active{
        background-color: #585858;
    }
</style>