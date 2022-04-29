<template>
    <div class="search-bg">
        <div class="search-block">
            <el-form class="search-form" :model="formValue" label-width="80px">
                <el-form-item label="关键字">
                    <el-input
                        v-model="formValue.keyword"
                        placeholder="请输入搜索关键字"
                        class="keyword"
                    >
                        <template #append>
                            <div class="search-btn" @click="search('init')">搜索</div>
                        </template>
                    </el-input>
                    <el-button type="primary" class="add" @click="showAddDialog">添加</el-button>
                </el-form-item>
                <el-form-item label="搜索类型">
                    <el-radio-group v-model="formValue.field">
                        <el-radio label="">全部</el-radio>
                        <el-radio label="name">书名</el-radio>
                        <el-radio label="author">作者</el-radio>
                        <el-radio label="isbn">ISBN编号</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="书籍标签">
                    <el-radio-group v-model="formValue.type">
                        <el-radio label="">全部</el-radio>
                        <el-radio :label="1">图书</el-radio>
                        <el-radio :label="2">教程</el-radio>
                        <el-radio :label="3">期刊</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
        </div>
    </div>
    <div class="content">
        <div v-for="item of appointmentList" :key="item.id" class="book">
            <div class="book-info">
                <p class="book-title">《{{ item.name }}》</p>
                <p class="author">
                    <span class="author-row">作者：{{ item.author }}</span>
                    <span class="author-row">出版社：{{ item.publish }}</span>
                    <span class="author-row">ISBN: {{ item.isbn }}</span>
                    <span class="author-row">创建时间: {{ item.createTime }}</span>
                </p>
            </div>
        </div>
        <el-pagination
            v-model:currentPage="currentPage"
            v-model:page-size="pageSize"
            class="pagination"
            layout="prev, pager, next"
            :total="total"
            @current-change="handleCurrentChange"
        />
        <Add ref="addRef"></Add>
    </div>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import Add from './components/add.vue'
import { $apiAppointmentList } from '@/api/index'

const formValue = reactive({
    keyword: '',
    type: '',
    field: '',
})

onMounted(() => {
    search()
})
const appointmentList = ref()
const search = async (init?: string) => {
    if (init) {
        currentPage.value = 1
    }
    try {
        const res = await $apiAppointmentList({
            ...formValue,
            page: currentPage.value,
            size: pageSize.value,
        })
        if (res) {
            total.value = res?.total
            appointmentList.value = res?.list
        }

        console.log(res)
    } catch (error) {
        console.log('获取预约列表失败')
        console.error(error)
    }
}

const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

const handleCurrentChange = (val: number) => {
    search()
}

const addRef = ref(null)
const showAddDialog = () => {
    addRef.value?.show()
}
</script>

<style lang="less" scoped>
.search-bg {
    background-color: #fff;
    height: 200px;
    margin-bottom: 20px;
}
.search-block {
    width: 70vw;
    height: 200px;
    margin: 0 auto;
    overflow: hidden;
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 5%);
    .search-form {
        margin-top: 30px;
        .keyword {
            width: 40vw;
        }
        .search-btn {
            cursor: pointer;
        }
    }
    .add {
        margin-left: 10px;
    }
}
.content {
    width: 70vw;
    margin: 0 auto 60px;
    padding: 20px 0;
    overflow: hidden;
    background-color: #fff;
    padding: 10px;
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 5%);
    .pagination {
        float: right;
    }
    .book {
        border-bottom: 1px dashed #cdcdcd;
        margin-bottom: 10px;
        overflow: hidden;
        .book-info {
            margin-top: 10px;
            float: left;
            .author-row {
                margin-right: 10px;
            }
            .book-title {
                font-size: 20px;
                margin: 0 0 10px 0;
            }
            .author,
            .series {
                color: #8a8a8a;
                font-size: 14px;
                margin: 0 0 10px 10px;
            }
        }
    }
}
</style>
