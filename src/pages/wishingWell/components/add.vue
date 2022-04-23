<template>
    <el-dialog v-model="dialogVisible" title="新增" width="30%" @close="close">
        <el-form
            ref="ruleFormRef"
            :model="ruleForm"
            :rules="rules"
            label-width="80px"
            class="demo-ruleForm"
        >
            <el-form-item label="书名" prop="name" placeholder="请输入书名" clearable>
                <el-input v-model="ruleForm.name" />
            </el-form-item>
            <el-form-item label="作者" prop="author" placeholder="请输入作者" clearable>
                <el-input v-model="ruleForm.author" />
            </el-form-item>
            <el-form-item label="出版社" prop="press" placeholder="请输入出版社" clearable>
                <el-input v-model="ruleForm.press" />
            </el-form-item>
            <el-form-item label="IBSN" prop="ibsn" placeholder="请输入IBSN" clearable>
                <el-input v-model="ruleForm.ibsn" />
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
const ruleForm = reactive({
    name: '',
    author: '',
    press: '',
    ibsn: '',
})
const ruleFormRef = ref<FormInstance>()

const rules = reactive({
    name: [
        { required: true, message: '请输入书名', trigger: 'blur' },
        { min: 1, max: 40, message: '请输入1-40位以内的书名', trigger: 'blur' },
    ],
    author: [
        { required: true, message: '请输入书名', trigger: 'blur' },
        { min: 2, max: 40, message: '请输入2-40位以内的作者名', trigger: 'blur' },
    ],
    press: [
        { required: true, message: '请输入出版社', trigger: 'blur' },
        { min: 2, max: 40, message: '请输入2-40位以内的出版社名', trigger: 'blur' },
    ],
    ibsn: [
        { required: true, message: '请输入IBSN', trigger: 'blur' },
        { min: 2, max: 40, message: '请输入2-40位以内的IBSN编号', trigger: 'blur' },
    ],
})
const dialogVisible = ref(false)

const show = () => {
    dialogVisible.value = true
}
const close = () => {}
const submit = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid: Boolean) => {
        if (valid) {
            ElMessage.success('校验通过！')
        }
    })
}
defineExpose({
    show,
    close,
})
</script>
