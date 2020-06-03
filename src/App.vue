<template>
    <div id="app">
        <router-view/>
        <div class="play">
            <play/>
        </div>
    </div>
</template>
<script>
    import Play from '@/components/Play.vue'

    export default {
        name: 'Home',
        components: {
            Play
        },
    }
</script>

<style lang="less">
    .play {
        background-color: white;
        width: 100vw;
        position: fixed;
        z-index: 5;
        bottom: 0;
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

    body {
        margin: 0;
        padding: 0;
    }

</style>
