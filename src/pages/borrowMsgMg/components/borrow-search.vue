<template>
    <el-card class="container">
        <el-form ref="ruleFormRef" :inline="true" :model="searchForm" label-width="70px">
            <el-form-item label="借阅人" prop="borrower">
                <el-select
                    v-model="searchForm.borrower"
                    class="form-common-width"
                    placeholder="请选择"
                >
                    <el-option label="张三" value="shanghai"></el-option>
                    <el-option label="李四" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="学号" prop="schoolId">
                <el-input v-model="searchForm.schoolId" class="form-common-width"></el-input>
            </el-form-item>
            <el-form-item label="图书编号" prop="bookId">
                <el-input v-model="searchForm.bookId" class="form-common-width"></el-input>
            </el-form-item>
            <el-form-item label="图书名称" prop="bookName">
                <el-input v-model="searchForm.bookName" class="form-common-width"></el-input>
            </el-form-item>
            <el-form-item label="借阅状态" prop="status" class="form-common-width">
                <el-select
                    v-model="searchForm.status"
                    class="form-common-width"
                    placeholder="请选择"
                >
                    <el-option label="已归还" value="shanghai"></el-option>
                    <el-option label="未归还" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="归还日期" prop="time">
                <el-date-picker
                    v-model="searchForm.time"
                    class="form-common-width"
                    type="date"
                    placeholder="请选择"
                ></el-date-picker>
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
    borrower: null,
    schoolId: null,
    bookId: null,
    bookName: null,
    time: null,
    status: null,
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
.form-common-width {
    width: 200px;
}
</style>
