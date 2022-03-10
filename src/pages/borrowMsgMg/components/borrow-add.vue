<template>
    <el-dialog
        v-model="dialogVisible"
        class="container"
        :title="title"
        width="40%"
        @close="closeFn"
    >
        <el-form ref="ruleFormRef" :rules="rules" :model="searchForm" label-width="100px">
            <el-form-item label="借阅书籍" prop="bookId">
                <el-select
                    v-model="searchForm.bookId"
                    class="form-common-width"
                    placeholder="请选择"
                >
                    <el-option label="爱的供养" value="shanghai"></el-option>
                    <el-option label="臭脚" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="借阅人" prop="schoolId">
                <el-select
                    v-model="searchForm.schoolId"
                    class="form-common-width"
                    placeholder="请选择"
                >
                    <el-option label="五颗豆" value="shanghai"></el-option>
                    <el-option label="污蝌蚪" value="beijing"></el-option>
                </el-select>
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
    bookId: null,
    schoolId: null,
})
const dialogVisible = ref(false)
const title = ref('新增借阅')

type FormInstance = InstanceType<typeof ElForm>
const ruleFormRef = ref<FormInstance>()
const rules = reactive({
    bookId: [
        {
            required: true,
            message: '请选择图书编号',
            trigger: 'change',
        },
    ],
    schoolId: [
        {
            required: true,
            message: '请选择图书名称',
            trigger: 'change',
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
