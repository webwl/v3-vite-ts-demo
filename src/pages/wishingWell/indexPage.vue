<template>
    <div class="content">
        <div class="btn-block">
            <el-button type="primary" @click="showAddDialog">添加预约</el-button>
        </div>
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
        <Add ref="addRef" @refresh="search"></Add>
    </div>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import Add from './components/add.vue'
import { $apiAppointmentList } from '@/api/index'
import { ElMessage } from 'element-plus'
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
        const res: any = await $apiAppointmentList({
            ...formValue,
            page: currentPage.value,
            size: pageSize.value,
        })
        if (res) {
            total.value = res?.total
            appointmentList.value = res?.list
        }
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

const addRef = ref()
const showAddDialog = () => {
    const loginToken = localStorage.getItem('library_jwt_token')
    if (loginToken) {
        addRef.value?.show()
    } else {
        ElMessage.warning('请先登录再预约')
    }
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
.btn-block {
    margin-bottom: 20px;
    text-align: right;
}
.content {
    width: 70vw;
    margin: 20px auto 60px;
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
