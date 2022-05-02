<template>
    <el-dialog v-model="dialogVisible" title="修改密码" width="30%" @close="close">
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
            <el-form-item label="邮箱" prop="email" placeholder="请输入邮箱" clearable>
                <el-input v-model="ruleForm.email" />
            </el-form-item>
            <el-form-item label="新密码" prop="password" placeholder="请输入新密码" clearable>
                <el-input v-model="ruleForm.password" type="password" />
            </el-form-item>
            <el-form-item label="验证码" prop="captcha" placeholder="请输入验证码" clearable>
                <div class="captcha">
                    <el-input v-model="ruleForm.captcha" class="captcha-input" />
                    <el-button
                        class="captcha-btn"
                        type="primary"
                        :disabled="captchaText !== '获取验证码'"
                        @click="getCaptcha"
                        >{{ captchaText }}</el-button
                    >
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
import { ref, reactive, computed, toRefs } from 'vue'
import { ElMessage } from 'element-plus'
import { $apiResetSend, $apiResetPwd } from '../../api/index'
const emailReg =
    /^[0-9a-zA-Z]+([\.\-_]*[0-9a-zA-Z]+)*@([0-9a-zA-Z]+[\-_]*[0-9a-zA-Z]+\.)+[0-9a-zA-Z]{2,6}$/
const ruleForm = reactive({
    username: '',
    email: '',
    password: '',
    captcha: '',
})
const ruleFormRef = ref()

const time = ref(60)
const captchaText = computed(() => {
    let text = '获取验证码'
    if (time.value === 60) {
        text = '获取验证码'
    } else {
        text = `剩余${time.value}秒`
    }
    return text
})

const getCaptcha = () => {
    if (!ruleForm.username) {
        ElMessage.warning('请输入用帐号')
        return
    }
    if (!ruleForm.email) {
        ElMessage.warning('请输入邮箱')
        return
    } else if (!emailReg.test(ruleForm.email)) {
        ElMessage.warning('请输入正确的邮箱')
        return
    }
    countDown()
    try {
        $apiResetSend({
            email: ruleForm.email,
            username: ruleForm.username,
        })
    } catch (error) {
        console.log('获取验证码失败')
        console.error(error)
    }
}
const countDown = () => {
    const timer = setInterval(() => {
        time.value--
        if (!time.value) {
            clearInterval(timer)
            time.value = 60
        }
    }, 1000)
}

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

const validateEmail = (rule: any, value: any, callback: any) => {
    if (!value) {
        callback(new Error('请输入邮箱'))
    } else if (!emailReg.test(value)) {
        callback(new Error('请输入正确的邮箱'))
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
    email: [
        { required: true, message: '请输入邮箱', trigger: 'blur' },
        { validator: validateEmail, trigger: 'blur' },
    ],
    captcha: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
})
const dialogVisible = ref(false)

const show = () => {
    dialogVisible.value = true
}
const close = () => {
    ruleFormRef.value.resetFields()
}
const emit = defineEmits(['showLogin'])
const submit = async (formEl: any) => {
    if (!formEl) {
        return
    }
    await formEl.validate(async (valid: Boolean) => {
        if (valid) {
            try {
                await $apiResetPwd({
                    username: ruleForm.username,
                    password: ruleForm.password,
                    captcha: ruleForm.captcha,
                })
                ElMessage.success('修改成功，请重新登录')
                emit('showLogin')
            } catch (error) {
                console.log('重置密码失败')
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
        width: 75%;
        float: left;
    }
    :deep(.captcha-btn) {
        float: right;
        width: calc(25% - 12px);
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
