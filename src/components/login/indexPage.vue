<template>
    <el-dialog v-model="dialogVisible" title="登录" width="30%" @close="close">
        <el-form
            ref="ruleFormRef"
            :model="ruleForm"
            :rules="rules"
            label-width="80px"
            class="demo-ruleForm"
        >
            <el-form-item label="学号" prop="name" placeholder="请输入学号" clearable>
                <el-input v-model="ruleForm.name" />
            </el-form-item>
            <el-form-item label="密码" prop="password" placeholder="请输入密码" clearable>
                <el-input v-model="ruleForm.password" type="password" />
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
import type { FormInstance } from 'element-plus'
import { login } from '../../api/index'

const ruleForm = reactive({
    name: '',
    password: '',
})
const ruleFormRef = ref<FormInstance>()

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
    name: [
        { required: true, message: '请输入学号', trigger: 'blur' },
        { min: 4, max: 20, message: '请输入4-20位以内的学号', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { validator: validatePassword, trigger: 'blur' },
    ],
})
const dialogVisible = ref(false)

const show = () => {
    dialogVisible.value = true
}
const close = () => {}
const submit = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate(async (valid: Boolean) => {
        if (valid) {
            try {
                const res = await login.$apiLogin({
                    nickName: '11',
                    password: '222',
                })
                console.log(res)
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
