<template>
    <div>
        <el-button @click="drawer = true" type="primary" style="margin-left: 16px;">
            点我打开
        </el-button>
    </div>
    
</template>

<script>
    export default {
        name: "Play",
        data() {
            return {
                drawer: false,
            };
        }
    }
</script>

<style scoped>

</style>