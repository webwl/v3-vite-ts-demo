<template>
    <div class="container">
        <div class="detail-block">
            <div class="book-img"><img :src="baseUrl + bookDetail.data.cover" /></div>
            <div class="book-msg">
                <p class="name">《{{ bookDetail.data.name }}》</p>
                <p class="author">作者：{{ bookDetail.data.author }}</p>
                <p class="intro" :title="bookDetail.data.intro">
                    简介：{{ bookDetail.data.intro }}
                </p>
                <div class="inventory">
                    <div class="inventory-item">页数：{{ bookDetail.data.size }}</div>
                    <div class="inventory-item">出版社：{{ bookDetail.data.publish }}</div>
                    <div class="inventory-item">ISBN编号：{{ bookDetail.data.isbn }}</div>
                    <div class="inventory-item">出版日期：{{ bookDetail.data.publishTime }}</div>
                </div>
                <div class="inventory">
                    <div class="inventory-item">借出（本）：1</div>
                    <div class="inventory-item">在馆（本）：8</div>
                    <div class="inventory-item">总馆藏量：xx</div>
                    <div class="inventory-item">馆藏地址：xxx图书馆</div>
                </div>
            </div>
        </div>

        <!-- <div class="estimate-block">
            <p class="msg-title">书评</p>
            <el-input
                v-model="myEstimate"
                :disabled="!isLogin"
                :placeholder="isLogin ? '请输入留言' : '请登陆后再填写书评'"
                class="write-block"
                :rows="5"
                maxlength="500"
                show-word-limit
                type="textarea"
                @keyup.enter="open"
            />
            <div class="write-block-btns">
                <el-button type="primary" :disabled="!isLogin" @click="open">提交</el-button>
            </div>
        </div> -->

        <p class="msg-title">全部书评</p>
        <!--  v-if="estimateList.length"  -->
        <div class="list-block">
            <div v-for="item of estimateList" :key="item.id" class="list">
                <div class="list-head">
                    <div class="name">{{ item.userName }}</div>
                    <div class="time">{{ item.createTime }}</div>
                </div>
                <div class="list-info">
                    {{ item.content }}
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
        <!-- <div v-else class="no-estimate">暂无书评</div> -->
    </div>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted, computed, toRaw, inject } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { $apiBookDetail, $apiBookEstimate, $apiBookEstimateSave } from '@/api/index'
import { useRoute } from 'vue-router'
import { IBookDetail, IBookEstimateSave, IBookEstimateList } from './utils/interfaces'
import type { Action } from 'element-plus'

const $route = useRoute()
const baseUrl = inject('baseUrl')

// 登录状态
// const isLogin = localStorage.getItem('library_jwt_token')
const { id: bookId } = toRaw($route.query)

onMounted(() => {
    getDetail()
})
const bookDetail = reactive({
    data: {
        cover: '',
        name: '',
        author: '',
        intro: '',
        size: 0,
        publish: '',
        isbn: '',
        publishTime: '',
    },
})

const getDetail = async () => {
    try {
        const res = await $apiBookDetail<IBookDetail>(bookId as string)
        bookDetail.data = res
    } catch (error) {
        console.log('获取图书详情失败')
        console.error(error)
    }
}

onMounted(() => {
    getList()
})
const myEstimate = ref('')
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const estimateList = ref()
const handleCurrentChange = (val: number) => {
    getList()
}
const getList = async () => {
    try {
        const res = await $apiBookEstimate<IBookEstimateList>({
            bookId: bookId as string,
            page: currentPage.value,
            size: pageSize.value,
        })
        if (res) {
            total.value = res.total
            estimateList.value = res.list
        }
    } catch (error) {
        console.log('获取书评列表失败')
        console.error(error)
    }
}
// const open = () => {
//     if (!myEstimate.value) {
//         ElMessage({
//             type: 'warning',
//             message: '请输入书评',
//         })
//         return
//     }
//     ElMessageBox.alert('确认提交书评吗？', '提示', {
//         confirmButtonText: '确定',
//         callback: async (action: Action) => {
//             if (action === 'confirm') {
//                 try {
//                     const res = await $apiBookEstimateSave<IBookEstimateSave>({
//                         title: '111',
//                         content: myEstimate.value,
//                         rate: 0,
//                         borrowId: 0,
//                     })
//                     console.log(res)
//                     ElMessage({
//                         type: 'success',
//                         message: '保存成功',
//                     })
//                     myEstimate.value = ''
//                     getList()
//                 } catch (error) {
//                     console.log('提交留言失败')
//                     console.error(error)
//                 }
//             }
//         },
//     })
// }
</script>
<style lang="less" scoped>
.container {
    overflow: hidden;
    width: 70vw;
    margin: 20px auto;
    background-color: #fff;
    min-height: 450px;
    padding: 20px;
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 5%);
}
.estimate-block {
    overflow: hidden;
    margin: 20px 0;
    .msg-title {
        margin-bottom: 10px;
    }
    .write-block {
        /deep/.el-textarea__inner {
            resize: none;
        }
        margin-bottom: 10px;
    }
    .write-block-btns {
        text-align: right;
    }
}
.no-estimate {
    padding: 50px 0;
    text-align: center;
    font-weight: 600;
    font-size: 24px;
    color: #cdcdcd;
}
.detail-block {
    height: 200px;
    overflow: hidden;
    margin-bottom: 20px;
    .book-img {
        height: 100%;
        width: 170px;
        box-shadow: 0 1px 2px 0 rgb(0 0 0 / 5%);
        float: left;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .book-msg {
        float: right;
        width: calc(100% - 210px);
        height: 100%;
        padding: 0 20px;
        .name {
            font-size: 24px;
            font-weight: 600;
            margin-bottom: 10px;
        }
        .author {
            font-size: 14px;
            color: #515767;
            margin-bottom: 10px;
            .author-row {
                margin-right: 10px;
            }
        }
        .intro {
            color: #8a8a8a;
            width: 97%;
            margin-bottom: 20px;
            overflow: hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
        }
        .inventory {
            overflow: hidden;
            margin-bottom: 5px;
            .inventory-item {
                float: left;
                margin-right: 20px;
                font-size: 14px;
                color: #333;
            }
        }
    }
}
.msg-title {
    font-size: 18px;
    line-height: 30px;
    font-weight: 600;
    color: #252933;
}
.list-block {
    .list {
        padding: 16px 0;
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
    .list-msg-operate {
        height: 25px;
        .endorse {
            .icon {
                float: left;
                margin-top: 2px;
                margin-right: 2px;
                cursor: pointer;
            }

            .num {
                font-size: 14px;
                line-height: 25px;
                color: #8a919f;
            }
        }
    }
}

.pagination {
    float: right;
}
</style>
