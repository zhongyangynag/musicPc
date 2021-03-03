<template>
    <div>
        <div class="login_box" :style="loginStyle">
            <el-col class="login_box_from" :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="手机号码">
                        <el-input v-model="form.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input v-model="form.password"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">登录</el-button>

                        <el-button>邮箱登录</el-button>
                        <el-button>重置</el-button>
                    </el-form-item>
                </el-form>
            </el-col>

        </div>


    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                form: {
                    phone: '',
                    password: '',

                }
            }
        },
        computed: {
            Browser() {
                return this.checkBrowser()
            },
            loginStyle(){
                if(this.checkBrowser()===0){
                    return {alignItems: 'center'}
                }else{
                    return {}
                }

            }
        },
        methods: {
            onSubmit() {
                console.log('submit!');
                this.request({
                        method: "post",
                        url:  "/login/cellphone",
                        data: {
                            phone: this.form.phone,
                            password: this.form.password,
                        }
                    }
                ).then(res => {
                    if (res.code !== 200) {
                        this.$message('请求错误哦！');
                    }
                    console.log(res.data)
                }).catch(err => {
                    console.log(err)
                })
            }
        }
    }
</script>

<style scoped lang="less">
    .login_box {
        height: 100vh;
        display: flex;
        /*align-content: center;*/
        /*align-items: center;*/


        .login_box_from {
            margin: 0 auto;
        }
    }
</style>