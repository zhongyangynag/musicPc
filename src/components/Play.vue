
<template>
    <div>
        <div style="padding:10px 0;">
            <aplayer  :music="musicLis"  :narrow="false" theme="#b7daff" mode="circulation"  listmaxheight='96px'
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

            }
        },
        data() {
            return {
                flag: false,
                musicList: '',
            }
        },
        async mounted() {
            //异步加载，先加载出player再使用
            // await this.init();
            // let aplayer = this.$refs.player.control;
            // aplayer.play();
        },
        methods: {}
    }
</script>

<style scoped>
</style>