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
                        <el-radio :label="3">教程</el-radio>
                        <el-radio :label="2">期刊</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
        </div>
    </div>
    <div class="content">
        <div v-for="item of bookList" :key="item.id" class="book">
            <div class="book-img" @click="toDetail(item.id)">
                <img class="book-img-src" :src="item.cover" />
            </div>
            <div class="book-info">
                <p class="book-title">《{{ item.name }}》</p>
                <p class="author">
                    <span class="author-row">作者：{{ item.author }}</span>
                    <span class="author-row">页数：{{ item.pages }}</span>
                    <span class="author-row">出版社：{{ item.publish }}</span>
                    <span class="author-row">ISBN编号：{{ item.isbn }}</span>
                    <span class="author-row">出版日期：{{ item.publishTime }}</span>
                    <span v-show="item.translate" class="author-row"
                        >译者：{{ item.translate }}</span
                    >
                </p>
                <!-- <p class="series">丛书名：{{ item.translate }}</p> -->
                <p class="intro" :title="item.intro">简介：{{ item.intro }}</p>
                <div class="inventory">
                    <div class="inventory-item">借出（本）：{{ item.borrowedNum }}</div>
                    <div class="inventory-item">在馆（本）：{{ item.size - item.borrowedNum }}</div>
                    <div class="inventory-item">总馆藏量：{{ item.size }}</div>
                    <div class="inventory-item">馆藏地址：{{ item.location }}</div>
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
import { onMounted, reactive, ref, inject } from 'vue'
import { $apiBookSearch } from '@/api/index'
import { useRouter } from 'vue-router'

const formValue = reactive({
    keyword: '',
    field: '',
    type: '',
})
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
onMounted(() => {
    search()
})

const bookList = ref()
const search = async (init?: string) => {
    if (init) {
        currentPage.value = 1
    }
    try {
        const res: any = await $apiBookSearch({
            ...formValue,
            page: currentPage.value,
            size: pageSize.value,
        })
        if (res) {
            total.value = res?.total
            bookList.value = res?.list
        }
    } catch (error) {
        console.log('获取图书列表失败')
        console.error(error)
    }
}

const handleCurrentChange = (val: number) => {
    search()
}
const $router = useRouter()
const toDetail = (bookId: string | number) => {
    $router.push({
        name: 'bookDetail',
        query: {
            id: bookId,
        },
    })
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
        height: 170px;
        border-bottom: 1px dashed #cdcdcd;
        margin-bottom: 10px;
        padding-bottom: 10px;
        .book-img {
            width: 130px;
            height: 150px;
            float: left;
            margin: 10px 10px 0 10px;
            cursor: pointer;
            .book-img-src {
                width: 100%;
                height: 100%;
            }
        }
        .book-info {
            width: calc(100% - 170px);
            height: 130px;
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
                font-size: 14px;
                margin: 0 0 10px 10px;
            }
            .intro {
                color: #8a8a8a;
                margin: 0 0 10px 10px;
                width: 97%;
                overflow: hidden;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
            }
            .inventory {
                text-align: right;
                .inventory-item {
                    float: right;
                    margin-left: 20px;
                    font-size: 14px;
                    color: #333;
                }
            }
        }
    }
}
</style>
