<template>
    <el-dialog v-model="dialogVisible" title="登录" width="30%" @close="close">
        <el-form
            ref="ruleFormRef"
            :model="ruleForm"
            :rules="rules"
            label-width="80px"
            class="demo-ruleForm"
        >
            <el-form-item label="账号" prop="username" placeholder="请输入账号" clearable>
                <el-input v-model="ruleForm.username" />
            </el-form-item>
            <el-form-item label="密码" prop="password" placeholder="请输入密码" clearable>
                <el-input v-model="ruleForm.password" type="password" />
            </el-form-item>
            <el-form-item label="验证码" prop="captcha" placeholder="请输入验证码" clearable>
                <div class="captcha">
                    <el-input v-model="ruleForm.captcha" class="captcha-input" />
                    <img :src="captchaSrc" class="captcha-icon" @click="getCode" />
                </div>
            </el-form-item>
            <el-form-item clearable>
                <div class="password-set">
                    <el-checkbox
                        v-model="ruleForm.rememberMe"
                        class="remember"
                        label="记住密码"
                        size="large"
                    />
                    <div class="forget" @click="forget">忘记密码</div>
                </div>
            </el-form-item>
        </el-form>

        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="submit(ruleFormRef)">确定</el-button>
            </span>
        </template>
    </el-dialog>
</template>
<script lang="ts" setup>
import { ref, reactive, computed } from 'vue'
import { ElMessage, imageProps } from 'element-plus'
import { $apiLogin, $apiLoginSecurityCode } from '../../api/index'

const emit = defineEmits(['setToken', 'showForget'])
const myTimestamp = ref(new Date().getTime())
const captchaSrc = computed(() => {
    return 'http://124.220.34.251:5250/auth/captcha?' + myTimestamp.value
})
const getCode = async () => {
    myTimestamp.value = new Date().getTime()
}
const ruleForm = reactive({
    username: '',
    password: '',
    captcha: null,
    rememberMe: true,
})
const ruleFormRef = ref()

const validatePassword = (rule: any, value: any, callback: any) => {
    const Reg = /^[A-Za-z0-9]{4,20}$/
    if (value === '') {
        callback(new Error('请输入密码'))
    } else if (!Reg.test(value)) {
        callback(new Error('请输入4-20位以内的密码'))
    } else {
        callback()
    }
}
const rules = reactive({
    username: [
        { required: true, message: '请输入账号', trigger: 'blur' },
        { min: 4, max: 20, message: '请输入4-20位以内的账号', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { validator: validatePassword, trigger: 'blur' },
    ],
    captcha: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
})
const dialogVisible = ref(false)

const show = () => {
    getCode()
    // 单独执行一次验证码请求，获取登录所需token
    $apiLoginSecurityCode()
    dialogVisible.value = true
}
const close = () => {
    ruleFormRef.value.resetFields()
}
const forget = () => {
    dialogVisible.value = false
    emit('showForget')
}
const submit = async (formEl: any) => {
    if (!formEl) {
        return
    }
    await formEl.validate(async (valid: Boolean) => {
        if (valid) {
            try {
                const res = await $apiLogin(ruleForm)
                if (res && typeof res === 'string') {
                    localStorage.setItem('library_jwt_token', res)
                    dialogVisible.value = false
                    formEl.resetFields()
                    emit('setToken', res)
                }
            } catch (error) {
                console.log('登录失败')
                console.error(error)
            }
        }
    })
}
defineExpose({
    show,
    close,
})
</script>
<style lang="less" scoped>
.captcha {
    overflow: hidden;
    width: 100%;
    .captcha-input {
        width: 80%;
        float: left;
    }
    .captcha-icon {
        height: 30px;
        width: calc(20% - 12px);
        float: left;
        margin-left: 10px;
        border: 1px solid;
    }
}
.password-set {
    overflow: hidden;
    width: 100%;
    .remember {
        float: left;
    }
    .forget {
        float: right;
        line-height: 40px;
        color: #409eff;
        font-size: 14px;
        cursor: pointer;
    }
}
</style>
