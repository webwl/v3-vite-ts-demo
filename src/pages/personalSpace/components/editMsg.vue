<template>
    <el-dialog v-model="dialogVisible" title="编辑" width="30%" @close="close">
        <el-form
            ref="ruleFormRef"
            :model="ruleForm"
            :rules="rules"
            label-width="100px"
            class="demo-ruleForm"
        >
            <el-form-item label="昵称" prop="nickName" placeholder="请输入昵称" clearable>
                <el-input v-model="ruleForm.nickName" />
            </el-form-item>

            <el-form-item label="旧密码" prop="prevPassword" placeholder="请输入旧密码" clearable>
                <el-input v-model="ruleForm.prevPassword" type="password" />
            </el-form-item>
            <el-form-item label="新密码" prop="password" placeholder="请输入密码" clearable>
                <el-input v-model="ruleForm.password" type="password" />
            </el-form-item>
            <el-form-item label="电话" prop="tel" placeholder="请输入电话" clearable>
                <el-input v-model="ruleForm.tel" />
            </el-form-item>
            <el-form-item label="邮箱" prop="email" placeholder="请输入邮箱" clearable>
                <el-input v-model="ruleForm.email" />
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
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { $apiUserMsgEdit } from '@/api/index'
import { useUserMsg } from '@/components/userMsg'

const props = defineProps({
    userMsg: {
        type: Object,
        default: () => {
            return {
                nickName: '',
                password: '',
                prevPassword: '',
                tel: '',
                email: '',
            }
        },
    },
})
const ruleForm = reactive({
    nickName: '',
    password: '',
    prevPassword: '',
    tel: '',
    email: '',
})
const ruleFormRef = ref()

const validateOldPassword = (rule: any, value: any, callback: any) => {
    const Reg = /^[A-Za-z0-9]{4,20}$/
    if (value === '') {
        callback(new Error('请输入密码'))
    } else if (!Reg.test(value)) {
        callback(new Error('请输入4-20位以内的密码'))
    } else {
        callback()
    }
}
const validateNewPassword = (rule: any, value: any, callback: any) => {
    const Reg = /^[A-Za-z0-9]{4,20}$/
    if (value === '') {
        callback()
    } else if (!Reg.test(value)) {
        callback(new Error('请输入4-20位以内的密码'))
    } else {
        callback()
    }
}
const validateTel = (rule: any, value: any, callback: any) => {
    const Reg = /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/
    if (value) {
        if (!Reg.test(value)) {
            callback(new Error('请正确的手机号'))
        } else {
            callback()
        }
    } else {
        callback()
    }
}
const validateEmail = (rule: any, value: any, callback: any) => {
    const Reg =
        /^[0-9a-zA-Z]+([\.\-_]*[0-9a-zA-Z]+)*@([0-9a-zA-Z]+[\-_]*[0-9a-zA-Z]+\.)+[0-9a-zA-Z]{2,6}$/
    if (value) {
        if (!Reg.test(value)) {
            callback(new Error('请正确的邮箱'))
        } else {
            callback()
        }
    } else {
        callback()
    }
}
const rules = reactive({
    nickName: [{ min: 1, max: 20, message: '请输入1-20位以内的昵称', trigger: 'blur' }],
    password: [{ validator: validateNewPassword, trigger: 'blur' }],
    prevPassword: [
        { required: true, message: '请输入旧密码', trigger: 'blur' },
        { validator: validateOldPassword, trigger: 'blur' },
    ],
    tel: [{ validator: validateTel, trigger: 'blur' }],
    email: [{ validator: validateEmail, trigger: 'blur' }],
})
const dialogVisible = ref(false)

const show = () => {
    ruleForm.nickName = props.userMsg.nickName
    ruleForm.password = props.userMsg.password
    ruleForm.prevPassword = props.userMsg.prevPassword
    ruleForm.tel = props.userMsg.tel
    ruleForm.email = props.userMsg.email
    dialogVisible.value = true
}
const close = () => {
    ruleFormRef.value.resetFields()
}
const emit = defineEmits(['setUser'])
const submit = async (formEl: any) => {
    if (!formEl) {
        return
    }
    await formEl.validate(async (valid: Boolean) => {
        if (valid) {
            try {
                await $apiUserMsgEdit(ruleForm)
                ElMessage.success('修改成功')
                emit('setUser')
                dialogVisible.value = false
            } catch (error) {
                console.log('编辑失败')
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
