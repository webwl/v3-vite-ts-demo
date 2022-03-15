<template>
    <el-card class="container">
        <el-form ref="ruleFormRef" :inline="true" :model="searchForm" label-width="70px">
            <el-form-item label="姓名" prop="userName">
                <el-select
                    v-model="searchForm.userName"
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
            <el-form-item label="班级" prop="className">
                <el-input v-model="searchForm.className" class="form-common-width"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="searchForm.email" class="form-common-width"></el-input>
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
    userName: null,
    schoolId: null,
    className: null,
    email: null,
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
