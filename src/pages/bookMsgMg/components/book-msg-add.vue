<template>
    <el-dialog
        v-model="dialogVisible"
        class="container"
        :title="title"
        width="40%"
        @close="closeFn"
    >
        <el-form ref="ruleFormRef" :rules="rules" :model="searchForm" label-width="100px">
            <el-form-item label="图书编号" prop="bookId">
                <el-input v-model="searchForm.bookId"></el-input>
            </el-form-item>
            <el-form-item label="图书名称" prop="bookName">
                <el-input v-model="searchForm.bookName"></el-input>
            </el-form-item>
            <el-form-item label="图书类别" prop="bookType">
                <el-select
                    v-model="searchForm.bookType"
                    class="form-common-width"
                    placeholder="请选择"
                >
                    <el-option label="book one" value="shanghai"></el-option>
                    <el-option label="book two" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="作者" prop="author">
                <el-input v-model="searchForm.author"></el-input>
            </el-form-item>
            <el-form-item label="出版社" prop="press">
                <el-input v-model="searchForm.press"></el-input>
            </el-form-item>
            <el-form-item label="存放地址" prop="address">
                <el-input v-model="searchForm.address"></el-input>
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
    bookName: null,
    bookType: null,
    author: null,
    press: null,
    address: null,
})
const dialogVisible = ref(false)
const title = ref('新增图书')

type FormInstance = InstanceType<typeof ElForm>
const ruleFormRef = ref<FormInstance>()
const rules = reactive({
    bookId: [
        {
            required: true,
            message: '请输入图书编号',
            trigger: 'blur',
        },
    ],
    bookName: [
        {
            required: true,
            message: '请输入图书名称',
            trigger: 'change',
        },
    ],
    bookType: [
        {
            required: true,
            message: '请选择图书类型',
            trigger: 'change',
        },
    ],
    author: [
        {
            required: true,
            message: '请输入作者名称',
            trigger: 'change',
        },
    ],
    press: [
        {
            required: true,
            message: '请输入出版社名称',
            trigger: 'change',
        },
    ],
    address: [
        {
            required: true,
            message: '请输入存放地址',
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
