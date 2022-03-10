<template>
    <el-dialog
        v-model="dialogVisible"
        class="container"
        :title="title"
        width="40%"
        @close="closeFn"
    >
        <el-form ref="ruleFormRef" :rules="rules" :model="searchForm" label-width="100px">
            <el-form-item label="类别编号" prop="typeId">
                <el-input v-model="searchForm.typeId"></el-input>
            </el-form-item>
            <el-form-item label="类别名称" prop="typeName">
                <el-input v-model="searchForm.typeName"></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="submitForm(ruleFormRef)">确认</el-button>
            </span>
        </template>
    </el-dialog>
</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue'
import type { ElForm } from 'element-plus'
import { IAddForm } from '../utils/interfaces'

const searchForm: IAddForm = reactive({
    typeName: null,
    typeId: null,
})
const dialogVisible = ref(false)
const title = ref('新增类别')

type FormInstance = InstanceType<typeof ElForm>
const ruleFormRef = ref<FormInstance>()
const rules = reactive({
    typeId: [
        {
            required: true,
            message: '请输入类别编号',
            trigger: 'blur',
        },
    ],
    typeName: [
        {
            required: true,
            message: '请输入类别名称',
            trigger: 'blur',
        },
    ],
})
const closeFn = () => {
    ruleFormRef.value?.resetFields()
}
const show = () => {
    dialogVisible.value = true
}
const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            console.log('submit!')
        } else {
            console.log('error submit!')
            return false
        }
    })
}
defineExpose({
    show,
})
</script>
<style lang="less" scoped>
.form-common-width {
    width: 100%;
}
</style>
