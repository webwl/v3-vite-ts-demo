<template>
    <div class="container">
        <div class="detail-block">
            <div class="book-img"><img :src="bookDetail.data.cover" /></div>
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
                    <div class="inventory-item">借出（本）：{{ bookDetail.data.borrowedNum }}</div>
                    <div class="inventory-item">
                        在馆（本）：{{ bookDetail.data.size - bookDetail.data.borrowedNum }}
                    </div>
                    <div class="inventory-item">总馆藏量：{{ bookDetail.data.size }}</div>
                    <div class="inventory-item">馆藏地址：{{ bookDetail.data.location }}</div>
                </div>
            </div>
        </div>
        <p class="msg-title">全部书评</p>
        <div class="list-block">
            <div v-for="(item, ind) of estimateList" :key="item.id" class="list">
                <div class="list-head">
                    <div class="name">{{ item.nickName }}</div>
                    <div class="time">{{ item.createTime }}</div>
                </div>
                <el-rate v-model="item.rate" disabled />
                <div class="list-info">
                    {{ item.content }}
                </div>

                <div class="like">
                    <svg
                        v-show="!item.liked"
                        style="display: inline-block"
                        t="1651473232966"
                        class="icon like-icon"
                        viewBox="0 0 1024 1024"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        p-id="1282"
                        width="20"
                        height="20"
                        @click="like(Number(item.id), ind)"
                    >
                        <path
                            d="M832 364.8h-147.2s19.2-64 32-179.2c6.4-57.6-38.4-115.2-102.4-121.6h-12.8c-51.2 0-83.2 32-102.4 76.8l-38.4 96c-32 64-57.6 102.4-76.8 115.2-25.6 12.8-121.6 12.8-128 12.8H128c-38.4 0-64 25.6-64 57.6v480c0 32 25.6 57.6 64 57.6h646.4c96 0 121.6-64 134.4-153.6l51.2-307.2c6.4-70.4-6.4-134.4-128-134.4z m-576 537.6H128V422.4h128v480z m640-409.6l-51.2 307.2c-12.8 57.6-12.8 102.4-76.8 102.4H320V422.4c44.8 0 70.4-6.4 89.6-19.2 32-12.8 64-64 108.8-147.2 25.6-64 38.4-96 44.8-102.4 6.4-19.2 19.2-32 44.8-32h6.4c32 0 44.8 32 44.8 51.2-12.8 102.4-32 166.4-32 166.4l-25.6 83.2h243.2c19.2 0 32 0 44.8 12.8 12.8 12.8 6.4 38.4 6.4 57.6z"
                            p-id="1283"
                            fill="#283857"
                        ></path>
                    </svg>
                    <svg
                        v-show="item.liked"
                        t="1651473707347"
                        class="icon like-icon"
                        viewBox="0 0 1024 1024"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        p-id="1612"
                        width="20"
                        height="20"
                    >
                        <path
                            d="M832 364.8h-147.2s19.2-64 32-179.2c6.4-57.6-38.4-115.2-102.4-121.6h-12.8c-51.2 0-83.2 32-102.4 76.8l-38.4 96c-32 64-57.6 102.4-76.8 115.2-25.6 12.8-121.6 12.8-128 12.8H128c-38.4 0-64 25.6-64 57.6v480c0 32 25.6 57.6 64 57.6h646.4c96 0 121.6-64 134.4-153.6l51.2-307.2c6.4-70.4-6.4-134.4-128-134.4z m-576 537.6H128V422.4h128v480z m640-409.6l-51.2 307.2c-12.8 57.6-12.8 102.4-76.8 102.4H320V422.4c44.8 0 70.4-6.4 89.6-19.2 32-12.8 64-64 108.8-147.2 25.6-64 38.4-96 44.8-102.4 6.4-19.2 19.2-32 44.8-32h6.4c32 0 44.8 32 44.8 51.2-12.8 102.4-32 166.4-32 166.4l-25.6 83.2h243.2c19.2 0 32 0 44.8 12.8 12.8 12.8 6.4 38.4 6.4 57.6z"
                            p-id="1613"
                            fill="#1296db"
                        ></path>
                    </svg>
                    <span class="like-num">{{ item.likeNum }}</span>
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
    </div>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted, computed, toRaw, inject } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { $apiBookDetail, $apiBookEstimate, $apiBookEstimateLike } from '@/api/index'
import { useRoute } from 'vue-router'
import { IBookDetail, IBookEstimateSave, IBookEstimateList } from './utils/interfaces'
import type { Action } from 'element-plus'

const $route = useRoute()

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
        location: '',
        borrowedNum: 0,
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

const like = async (id: number, ind: number) => {
    const token = localStorage.getItem('library_jwt_token')
    if (!token) {
        ElMessage.warning('请先登录再操作')
        return
    }
    try {
        const res = await $apiBookEstimateLike(id)
        estimateList.value[ind].likeNum += 1
        estimateList.value[ind].liked = true
    } catch (error) {
        console.log('点赞失败')
        console.error(error)
    }
}
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
        :deep(.el-textarea__inner) {
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
    .like {
        overflow: hidden;
        .like-icon {
            float: left;
            cursor: pointer;
        }
        .like-num {
            float: left;
            margin-top: 2px;
            margin-left: 5px;
        }
    }
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
        color: #8a8a8a;
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
