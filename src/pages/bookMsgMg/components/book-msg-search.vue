<template>
    <el-card class="container">
        <el-form ref="ruleFormRef" :inline="true" :model="searchForm" label-width="70px">
            <el-form-item label="图书编号" prop="bookId">
                <el-input v-model="searchForm.bookId"></el-input>
            </el-form-item>
            <el-form-item label="图书名称" prop="bookName">
                <el-input v-model="searchForm.bookName"></el-input>
            </el-form-item>
            <el-form-item label="图书类别" prop="bookType">
                <el-select v-model="searchForm.bookType" placeholder="请选择">
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
        </el-form>
        <div class="btns">
            <el-button type="primary" @click="searchFn">查询</el-button>
            <el-button @click="resetForm(ruleFormRef)">重置</el-button>
        </div>
    </el-card>
</template>
<script lang="ts" setup>
import { ref, reactive, watch } from 'vue'
import type { ElForm } from 'element-plus'
import { ISearchForm } from '../utils/interfaces'
const emit = defineEmits(['setSearchFormdata', 'search'])

const searchForm: ISearchForm = reactive({
    bookId: null,
    bookName: null,
    bookType: null,
    author: null,
    press: null,
})
watch(searchForm, (newVal, oldVal) => {
    emit('setSearchFormdata', newVal)
})
type FormInstance = InstanceType<typeof ElForm>
const ruleFormRef = ref<FormInstance>()
const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}
const searchFn = () => {
    emit('search')
}
</script>
<style lang="less" scoped>
.container {
    margin-bottom: 10px;
}
.btns {
    text-align: right;
}
</style>
