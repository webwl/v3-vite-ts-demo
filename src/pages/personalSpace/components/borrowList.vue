<template>
    <div class="content">
        <div v-for="item of list.data" :key="item.id" class="book">
            <div class="book-info">
                <p class="book-title">《{{ item.name }}》</p>
                <p class="author">
                    <span class="author-row">作者：{{ item.author }}</span>
                    <span class="author-row">出版社：{{ item.publish }}</span>
                    <span class="author-row">ISBN: {{ item.isbn }}</span>
                </p>
                <p class="borrow-msg">
                    <span class="interval">借阅时间：{{ item.createTime }}</span>
                    <span class="interval">约定归还时间：{{ item.endTime }}</span>
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
    </div>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import { $apiPersonalBorrowList } from '@/api/index'
import { IBorrowList, IBorrowListData } from '../utils/interfaces'
onMounted(() => {
    getList()
})

const list: IBorrowListData = reactive({
    data: [],
})
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const getList = async () => {
    try {
        const res = await $apiPersonalBorrowList<IBorrowList>({
            page: currentPage.value,
            size: pageSize.value,
        })
        if (res) {
            total.value = res.total
            list.data = res.list
        }
    } catch (error) {
        console.log('获取借阅列表失败')
        console.error(error)
    }
}
const handleCurrentChange = () => {
    getList()
}
</script>

<style lang="less" scoped>
.content {
    margin: 0 auto 60px;
    overflow: hidden;
    background-color: #fff;
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
            .borrow-msg {
                color: #8a8a8a;
                font-size: 14px;
                margin: 0 0 10px 10px;
                .interval {
                    margin-right: 10px;
                }
            }
        }
    }
}
</style>
