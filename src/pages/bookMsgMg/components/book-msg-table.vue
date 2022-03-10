<template>
    <el-card class="container">
        <div class="btns">
            <el-button type="primary" @click="addFn">新增图书</el-button>
        </div>
        <el-table class="table" :data="tableData" style="width: 100%">
            <el-table-column type="index" width="50" />
            <el-table-column prop="bookId" label="图书编号" width="180" />
            <el-table-column prop="bookName" label="图书名称" width="180" />
            <el-table-column prop="bookType" label="图书类别" />
            <el-table-column prop="author" label="作者" />
            <el-table-column prop="press" label="出版社" />
            <el-table-column prop="inventory" label="库存" />
            <el-table-column prop="createTime" label="入库时间" />
            <el-table-column prop="updateTime" label="更新时间" />
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
    <AddComponent ref="tableComponentRef"></AddComponent>
</template>
<script lang="ts" setup>
import AddComponent from './book-msg-add.vue'
import { ref } from 'vue'
const props = defineProps({
    searchFormData: {
        type: Object,
        default: null,
    },
})
const tableData = ref([])
const tableComponentRef = ref(null)
const addFn = () => {
    tableComponentRef.value?.show()
}
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
