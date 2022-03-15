<template>
    <el-card class="container">
        <el-table class="table" :data="tableData" style="width: 100%">
            <el-table-column type="index" width="50" />
            <el-table-column prop="userName" label="姓名" />
            <el-table-column prop="schoolId" label="学号" />
            <el-table-column prop="className" label="班级" />
            <el-table-column prop="email" label="邮箱" />
            <el-table-column prop="action" label="操作" />
        </el-table>
        <el-pagination
            class="pagination"
            :page-size="15"
            :pager-count="11"
            layout="prev, pager, next"
            :total="1000"
        >
        </el-pagination>
    </el-card>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const props = defineProps({
    searchFormData: {
        type: Object,
        default: null,
    },
})
const tableData = ref([])
const search = () => {
    console.log('search:', props.searchFormData)
}
defineExpose({
    search,
})
</script>
<style lang="less" scoped>
.btns {
    text-align: right;
    margin-bottom: 10px;
}
.table {
    margin-bottom: 10px;
}
.pagination {
    float: right;
    margin-bottom: 10px;
}
</style>
