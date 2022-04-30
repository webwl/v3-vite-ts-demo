<template>
    <div class="content">
        <div v-for="item of list.data" :key="item.id" class="book">
            <div class="book-info">
                <div class="book-title">
                    <div class="name">{{ item.bookName }}</div>
                    <div class="time">{{ item.createTime }}</div>
                </div>
                <p class="msg">
                    {{ item.content }}
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
import { $apiPersonalEstimateList } from '@/api/index'
import { IEstimateListData, IEstimateList } from '../utils/interfaces'
onMounted(() => {
    getList()
})

const list: IEstimateListData = reactive({
    data: [],
})
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const getList = async () => {
    try {
        const res = await $apiPersonalEstimateList<IEstimateList>({
            page: currentPage.value,
            size: pageSize.value,
        })
        if (res) {
            total.value = res.total
            list.data = res.list
        }
    } catch (error) {
        console.log('获取个人书评列表失败')
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
            .book-title {
                margin-bottom: 10px;
                overflow: hidden;
                .name {
                    float: left;
                    font-size: 20px;
                }
                .time {
                    float: right;
                    font-size: 14px;
                }
            }
            .msg {
                padding: 20px 0;
                word-break: break-all;
            }
        }
    }
}
</style>
