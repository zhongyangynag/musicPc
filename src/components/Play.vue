
<template>
    <div class="play">
        <div style="padding:10px 0;">
            <aplayer  :controls="true" showLrc  :music="musicLis"  :list="musicList" :mini="false" :shuffle="true" repeat="list"  theme="#b7daff"   listMaxHeight='96px'
                      ref="player"></aplayer>
        </div>

    </div>
</template>

<script>
    import VueAplayer from 'vue-aplayer'

    export default {
        components: {
            //别忘了引入组件
            'Aplayer': VueAplayer
        },
        computed:{
            musicLis(){
               return  this.$store.state.music
            },
            playIng(){
                return this.$store.state.playIng
            },
            musicList(){
                return this.$store.state.musicList
            }

        },
        data() {
            return {
            }
        },
        watch:{
            playIng(val,oldval){
                console.log(val,oldval)
                // let aplayer = this.$refs.player;
                // console.log(aplayer)
                // aplayer.play();
            }
        },
        mounted() {
            //异步加载，先加载出player再使用
            // await this.init();
           // this.playMusic()
        },
        methods: {
            playMusic(){
                // if(this.$store.state.playIng){
                    let aplayer = this.$refs.player;
                    console.log(aplayer)
                    aplayer.play();
                // }
            }
        }
    }
</script>

<style scoped lang="less">
    .play{
        margin: 0 auto;
        max-width: 1920px;
    }
</style>