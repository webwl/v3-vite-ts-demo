<template>
    <el-card class="container">
        <el-form ref="ruleFormRef" :inline="true" :model="searchForm" label-width="70px">
            <el-form-item label="图书类型" prop="type">
                <el-input v-model="searchForm.type"></el-input>
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
    typeName: null,
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
