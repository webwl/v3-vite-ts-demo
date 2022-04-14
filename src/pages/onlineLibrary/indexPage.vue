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
                            <div class="search-btn" @click="search">搜索</div>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item label="搜索类型">
                    <el-radio-group v-model="formValue.type">
                        <el-radio label="all">全部</el-radio>
                        <el-radio label="book">书名</el-radio>
                        <el-radio label="author">作者</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="书籍标签">
                    <el-radio-group v-model="formValue.tag">
                        <el-radio label="all">全部</el-radio>
                        <el-radio label="book">图书</el-radio>
                        <el-radio label="course">教程</el-radio>
                        <el-radio label="periodicals">期刊</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
        </div>
    </div>
    <div class="content">
        <div class="book">
            <div class="book-img">
                <img class="book-img-src" src="###" />
            </div>
            <div class="book-info">
                <p class="book-title">《沉默的羔羊》</p>
                <p class="author">
                    <span class="author-row">作者：托马斯·哈里斯</span>
                    <span class="author-row">页数：369</span>
                    <span class="author-row">出版社：南京</span>
                    <span class="author-row">出版日期：2013-01</span>
                </p>
                <p class="series">丛书名称：沉默的羔羊系列</p>
                <p class="intro" title="sadfasdf">
                    简介：沉默的羔羊系列沉默的羔羊系列沉默的羔羊系列沉默的羔羊系列沉默的羔羊系列沉默的羔羊系列沉默的羔
                    羊系列沉默的羔羊系列沉默的羔羊系列沉默的羔羊系列羊系列沉默的羔羊系列沉默的羔羊系列沉默的羔羊系列
                    羊系列沉默的羔羊系列沉默的羔羊系列沉默的羔羊系列羊系列沉默的羔羊系列沉默的羔羊系列沉默的羔羊系列
                    羊系列沉默的羔羊系列沉默的羔羊系列沉默的羔羊系列羊系列沉默的羔羊系列沉默的羔羊系列沉默的羔羊系列
                    羊系列沉默的羔羊系列沉默的羔羊系列沉默的羔羊系列
                </p>
                <div class="inventory">
                    <div class="inventory-item">借出（本）：1</div>
                    <div class="inventory-item">在馆（本）：8</div>
                    <div class="inventory-item">总馆藏量：9</div>
                    <div class="inventory-item">馆藏地址：xxx图书馆</div>
                </div>
            </div>
        </div>
        <div class="book">
            <div class="book-img">
                <img class="book-img-src" src="###" />
            </div>
            <div class="book-info">
                <p class="book-title">《沉默的羔羊》</p>
                <p class="author">
                    <span class="author-row">作者：托马斯·哈里斯</span>
                    <span class="author-row">页数：369</span>
                    <span class="author-row">出版社：南京</span>
                    <span class="author-row">出版日期：2013-01</span>
                </p>
                <p class="series">丛书名称：沉默的羔羊系列</p>
                <p class="intro" title="sadfasdf">
                    简介：沉默的羔羊系列沉默的羔羊系列沉默的羔羊系列沉默的羔羊系列沉默的羔羊系列沉默的羔羊系列沉默的羔
                    羊系列沉默的羔羊系列沉默的羔羊系列沉默的羔羊系列羊系列沉默的羔羊系列沉默的羔羊系列沉默的羔羊系列
                    羊系列沉默的羔羊系列沉默的羔羊系列沉默的羔羊系列羊系列沉默的羔羊系列沉默的羔羊系列沉默的羔羊系列
                    羊系列沉默的羔羊系列沉默的羔羊系列沉默的羔羊系列羊系列沉默的羔羊系列沉默的羔羊系列沉默的羔羊系列
                    羊系列沉默的羔羊系列沉默的羔羊系列沉默的羔羊系列
                </p>
                <div class="inventory">
                    <div class="inventory-item">借出（本）：1</div>
                    <div class="inventory-item">在馆（本）：8</div>
                    <div class="inventory-item">总馆藏量：9</div>
                    <div class="inventory-item">馆藏地址：xxx图书馆</div>
                </div>
            </div>
        </div>
        <div class="book">
            <div class="book-img">
                <img class="book-img-src" src="###" />
            </div>
            <div class="book-info">
                <p class="book-title">《沉默的羔羊》</p>
                <p class="author">
                    <span class="author-row">作者：托马斯·哈里斯</span>
                    <span class="author-row">页数：369</span>
                    <span class="author-row">出版社：南京</span>
                    <span class="author-row">出版日期：2013-01</span>
                </p>
                <p class="series">丛书名称：沉默的羔羊系列</p>
                <p class="intro" title="sadfasdf">
                    简介：沉默的羔羊系列沉默的羔羊系列沉默的羔羊系列沉默的羔羊系列沉默的羔羊系列沉默的羔羊系列沉默的羔
                    羊系列沉默的羔羊系列沉默的羔羊系列沉默的羔羊系列羊系列沉默的羔羊系列沉默的羔羊系列沉默的羔羊系列
                    羊系列沉默的羔羊系列沉默的羔羊系列沉默的羔羊系列羊系列沉默的羔羊系列沉默的羔羊系列沉默的羔羊系列
                    羊系列沉默的羔羊系列沉默的羔羊系列沉默的羔羊系列羊系列沉默的羔羊系列沉默的羔羊系列沉默的羔羊系列
                    羊系列沉默的羔羊系列沉默的羔羊系列沉默的羔羊系列
                </p>
                <div class="inventory">
                    <div class="inventory-item">借出（本）：1</div>
                    <div class="inventory-item">在馆（本）：8</div>
                    <div class="inventory-item">总馆藏量：9</div>
                    <div class="inventory-item">馆藏地址：xxx图书馆</div>
                </div>
            </div>
        </div>
        <div class="book">
            <div class="book-img">
                <img class="book-img-src" src="###" />
            </div>
            <div class="book-info">
                <p class="book-title">《沉默的羔羊》</p>
                <p class="author">
                    <span class="author-row">作者：托马斯·哈里斯</span>
                    <span class="author-row">页数：369</span>
                    <span class="author-row">出版社：南京</span>
                    <span class="author-row">出版日期：2013-01</span>
                </p>
                <p class="series">丛书名称：沉默的羔羊系列</p>
                <p class="intro" title="sadfasdf">
                    简介：沉默的羔羊系列沉默的羔羊系列沉默的羔羊系列沉默的羔羊系列沉默的羔羊系列沉默的羔羊系列沉默的羔
                    羊系列沉默的羔羊系列沉默的羔羊系列沉默的羔羊系列羊系列沉默的羔羊系列沉默的羔羊系列沉默的羔羊系列
                    羊系列沉默的羔羊系列沉默的羔羊系列沉默的羔羊系列羊系列沉默的羔羊系列沉默的羔羊系列沉默的羔羊系列
                    羊系列沉默的羔羊系列沉默的羔羊系列沉默的羔羊系列羊系列沉默的羔羊系列沉默的羔羊系列沉默的羔羊系列
                    羊系列沉默的羔羊系列沉默的羔羊系列沉默的羔羊系列
                </p>
                <div class="inventory">
                    <div class="inventory-item">借出（本）：1</div>
                    <div class="inventory-item">在馆（本）：8</div>
                    <div class="inventory-item">总馆藏量：9</div>
                    <div class="inventory-item">馆藏地址：xxx图书馆</div>
                </div>
            </div>
        </div>
        <el-pagination
            v-model:currentPage="currentPage"
            v-model:page-size="pageSize"
            class="pagination"
            layout="prev, pager, next"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        />
    </div>
</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue'

const formValue = reactive({
    keyword: '',
    type: 'all',
    tag: 'all',
})
const search = () => {
    console.log(111)
}

const currentPage = ref(1)
const pageSize = ref(15)
const total = ref(100)

const handleSizeChange = (val: number) => {
    console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
    console.log(`current page: ${val}`)
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
        .book-img {
            width: 100px;
            height: 130px;
            float: left;
            margin: 10px 10px 0 10px;
            .book-img-src {
                width: 100px;
                height: 130px;
            }
        }
        .book-info {
            width: calc(100% - 140px);
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
