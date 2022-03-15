<template>
    <div class="container">
        <div class="login-box">
            <div class="left">
                <img class="bg-img" src="../../public/background-img.png" />
            </div>
            <div class="right">
                <p class="title">欢迎登录</p>
                <el-form
                    ref="ruleFormRef"
                    :model="loginForm"
                    :rules="rules"
                    label-width="0px"
                    class="demo-ruleForm"
                >
                    <el-form-item prop="account" class="login-input">
                        <el-input v-model="loginForm.account" clearable :prefix-icon="User" />
                    </el-form-item>
                    <el-form-item prop="password" class="login-input">
                        <el-input
                            v-model="loginForm.password"
                            clearable
                            type="password"
                            :prefix-icon="Lock"
                        />
                    </el-form-item>
                </el-form>
                <el-button type="primary" class="submit" @click="submit">确 定</el-button>
                <div class="other">
                    <span class="to-register">去注册</span>
                    <span class="to-forget">忘记密码</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { User, Lock } from '@element-plus/icons-vue'

// 登录接口
export interface ILoginForm {
    account: string
    password: string
}

const loginForm: ILoginForm = reactive({
    account: '',
    password: '',
})
const rules = reactive({
    account: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 2, max: 15, message: '请输入2-15位长度的用户名', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 15, message: '请输入6-15位长度的密码', trigger: 'blur' },
    ],
})

const emit = defineEmits(['login'])
const submit = () => {
    emit('login')
}
</script>

<style lang="less" scoped>
.container {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background-color: #409eff;

    .login-box {
        width: 80vw;
        height: 60vh;
        background-color: #fff;
        float: right;
        margin-right: 5vw;
        margin-top: 20vh;
        border-radius: 10px;
        padding: 10px;
        text-align: center;
        .left {
            width: 60%;
            height: 100%;
            float: left;
            .bg-img {
                height: 80%;
                margin-top: 10%;
            }
        }
        .right {
            width: 400px;
            height: 100%;
            margin-right: calc((38% - 400px) / 2);
            float: right;
            .title {
                font-size: 30px;
                font-weight: 800;
                color: #333;
            }
            .demo-ruleForm {
                width: 90%;
                margin-left: 5%;
                .login-input {
                    margin-bottom: 40px;
                    /deep/ .el-input__inner {
                        border: none;
                        border-bottom: 1px solid #cdcdcd;
                        border-radius: 0;
                    }
                }
            }
            .submit {
                width: 90%;
                height: 35px;
                margin-top: 50px;
                font-size: 18px;
            }
            .other {
                width: 90%;
                margin-top: 10px;
                margin-left: 5%;
                overflow: hidden;
                .to-register {
                    float: left;
                    cursor: pointer;
                    color: #cdcdcd;
                }
                .to-forget {
                    float: right;
                    cursor: pointer;
                    color: #cdcdcd;
                }
            }
        }
    }
}
</style>
