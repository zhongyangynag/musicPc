<template>
    <div id="app">
        <router-view/>
        <div v-if="showPlay" class="play">
            <Play/>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'Home',
        data(){
            return{
                showPlay:true
            }
        },
        watch: {
            $route() {
                this.showPlay = !(this.$route.path === "/MvPlay");

            }
        }
    }
</script>

<style lang="less">
    .play {
        background-color: white;
        width: 100vw;
        position: fixed;
        z-index: 5;
        bottom: 0;
        left: 0;
        right: 0;
    }

    #app {
        max-width: 1920px;
        margin: 0 auto;
        font-family: Avenir, Helvetica, Arial, sans-serif;
        /*-webkit-font-smoothing: antialiased;*/
        /*-moz-osx-font-smoothing: grayscale;*/
        /*text-align: center;*/
        /*color: #2c3e50;*/
    }
    video, button{
        outline: none
    }


    body {
        margin: 0;
        padding: 0;
    }

</style>
