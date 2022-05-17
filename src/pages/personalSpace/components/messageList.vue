<template>
    <div class="content">
        <div v-for="item of list.data" :key="item.id" class="list">
            <div class="list-head">
                <div class="name">{{ item.userName }}</div>
                <div class="time">{{ item.createTime }}</div>
            </div>
            <div class="list-info">
                {{ item.content }}
            </div>
            <div v-if="item.reply" class="reply">
                <div class="list-head">
                    <div class="name">{{ item.replyBy }}</div>
                    <div class="time">{{ item.replyTime }}</div>
                </div>
                <div class="list-info">
                    {{ item.reply }}
                </div>
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
import { $apiPersonalMessageList } from '@/api/index'
import { IMessageListData, IMessageList } from '../utils/interfaces'
onMounted(() => {
    getList()
})

const list: IMessageListData = reactive({
    data: [],
})
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const getList = async () => {
    try {
        const res = await $apiPersonalMessageList<IMessageList>({
            page: currentPage.value,
            size: pageSize.value,
        })
        if (res) {
            total.value = res.total
            list.data = res.list
        }
    } catch (error) {
        console.log('获取个人留言列表失败')
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
    .list {
        padding: 16px 0;
        border-bottom: 1px dashed #cdcdcd;
    }
    .list-head {
        overflow: hidden;
        .name {
            float: left;
            width: 80%;
            font-weight: 500;
            font-size: 15px;
            color: #252933;
            max-width: 90px;
            line-height: 26px;
        }
        .time {
            float: right;
            width: 20%;
            text-align: right;
            font-size: 14px;
            color: #8a919f;
            line-height: 22px;
        }
    }
    .list-info {
        font-weight: 400;
        font-size: 14px;
        line-height: 2rem;
        color: #515767;
        margin-top: 8px;
        margin-bottom: 8px;
    }
    .reply {
        border-radius: 7px;
        padding: 5px 10px;
        background-color: #f9fafb;
    }
}
</style>
