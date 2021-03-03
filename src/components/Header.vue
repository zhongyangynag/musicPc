<template>
    <div>
        <header class="header-box">
            <el-row>
                <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="1">
                    <div @click="$router.push({path:'/'})" :class="[page==='index'?'header active':'header']">推荐</div>
                </el-col>
                <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="11">
                    <div :class="[page==='index2'?'header active':'header']">排行榜</div>
                </el-col>
                <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="11">
                    <div :class="[page==='index3'?'header active':'header']">歌单</div>
                </el-col>
                <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="1">
                    <div :class="[page==='index4'?'header active':'header']">歌手</div>
                </el-col>
                <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="1">
                    <div :class="[page==='index5'?'header active':'header']" @click="dialogVisible = true">登录</div>
                </el-col>
            </el-row>
        </header>
        <el-dialog
                center
                title="登录"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">
            <el-form v-if="!QrCode" ref="form" :rules="rules" label-position="left" :model="form" label-width="80px">
                <el-form-item v-if="email" prop="email" label="邮箱">
                    <el-input v-model="form.email"></el-input>
                </el-form-item>
                <el-form-item v-else prop="phone" label="手机号码">
                    <el-input v-model="form.phone"></el-input>
                </el-form-item>
                <el-form-item prop="password" label="密码">
                    <el-input v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('form')">登录</el-button>
                </el-form-item>
            </el-form>
            <div class="Qr_code" v-else>
                <div>扫码登录</div>
                <div class="el-image-Qrcode">
                    <el-image v-if="qrUrl" :src="qrUrl"></el-image>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button v-if="QrCode" @click="QrCode=false">其它方式登录</el-button>
                <template v-if="!QrCode">
                    <el-button v-if="email" @click="email=false">手机登录</el-button>
                    <el-button v-else @click="email=true">邮箱登录</el-button>
                </template>

            </div>
            <div v-if="!QrCode" @click="QrCode=true" class="QrCode"></div>
        </el-dialog>
    </div>

</template>

<script>

    export default {
        name: "Header",
        data() {
            return {
                QrCode: false,
                email: false,
                form: {
                    phone: '',
                    email: '',
                    password: '',

                },
                dialogVisible: false,
                rules: {
                    email: [
                        {required: true, message: '请输入邮箱', trigger: 'blur'},
                        {type: 'email', required: true, message: '请输入正确的邮箱', trigger: 'blur'},
                    ],
                    phone: [
                        {required: true, message: '请输入手机号', trigger: 'change'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'change'}
                    ],
                },
                qrUrl: '',
                unikey: '',
                QrCodeStaus: ''
            };
        },
        props: ['page'],
        created() {

        },
        watch: {
            QrCode(val) {
                if (val) {
                    this.getQrCodeKey()
                }
            }
        },
        methods: {

            getQrCodeKey() {
                this.axios({
                        method: "get",
                        url: "/login/qr/key?timestamp=" + new Date().getTime(),
                    }
                ).then(res => {
                    if (res.status !== 200) {
                        this.$message('请求错误哦！');
                        return
                    }
                    this.createQrCode(res.data.data.unikey)
                    this.unikey = res.data.data.unikey
                }).catch(() => {
                    this.$message('出错了哦！');
                })
            },
            createQrCode(key) {
                this.axios({
                        method: "get",
                        url:  `/login/qr/create?key=${key}&qrimg=true&timestamp=` + new Date().getTime(),
                    }
                ).then(res => {
                    if (res.status !== 200) {
                        this.$message('请求错误哦！');
                        return
                    }
                    this.qrUrl = res.data.data.qrimg
                    this.checkKey()
                }).catch(() => {
                    this.qrUrl = ""
                    this.$message('出错了哦！');
                })
            },
            checkKey() {
                this.axios({
                        method: "get",
                        url:  `/login/qr/check?key=${this.unikey}&timestamp=` + new Date().getTime(),
                    }
                ).then(res => {
                    debugger
                    if (res.status !== 200) {
                        this.$message('请求错误哦！');
                        return
                    }
                    if (this.QrCode) {
                        switch (res.data.code) {
                            case 800:
                                this.QrCodeStaus = 800
                                break;
                            case 801:
                                this.QrCodeStaus = 801
                                setTimeout(() => {
                                    this.checkKey()
                                }, 1000)
                                break;
                            case 802:
                                this.QrCodeStaus = 802
                                setTimeout(() => {
                                    this.checkKey()
                                }, 1000)
                                break;
                            case 803:
                                this.QrCodeStaus = 803
                                console.log(res,'803')
                                this.$store.commit('changeCookie', res.data.cookie)
                                break;
                            default:
                                this.QrCodeStaus = ''
                        }

                    }

                }).catch(() => {
                    this.$message('出错了哦！');
                })
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.onSubmit()
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            onSubmit() {
                console.log('submit!');
                let loginData = {}
                let loginUrl =  "/login/cellphone"
                if (this.email) {
                    loginData = {
                        email: this.form.email,
                        password: this.form.password
                    }
                    loginUrl =  "/login"
                } else {
                    loginData = {
                        phone: this.form.phone,
                        password: this.form.password
                    }
                }
                this.request({
                        method: "post",
                        url: loginUrl,
                        data: loginData
                    }
                ).then(res => {
                    if (res.status !== 200) {
                        this.$message('请求错误哦！');
                    }
                    if (res.data.code !== 200) {
                        this.$message(res.data.message);
                    }

                    console.log(res.data)
                }).catch(err => {
                    console.log(err)
                })
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(() => {
                        done();
                    })
                    .catch(() => {
                    });
            }

        }
    }
</script>

<style scoped lang="less">
    .header-box {
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

    .active {
        background-color: #585858;
    }

    .dialog-footer {
        text-align: left;
    }

    .QrCode {
        position: absolute;
        bottom: 0;
        right: 0;
        background: url("../../src/assets/qr_login_icon.png");
        background-repeat: no-repeat;
        background-size: cover;
        width: 5rem;
        height: 5rem;
        z-index: 1;
        cursor: pointer;
    }

    .Qr_code {
        text-align: center;
        font-size: 18px;
        font-weight: 500;
    }

    .el-image-Qrcode {
        width: 100%;
        height: 100%;
    }
</style>