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
                    <el-button type="primary" class="add" @click="showAddDialog">添加</el-button>
                </el-form-item>
                <el-form-item label="搜索类型">
                    <el-radio-group v-model="formValue.type">
                        <el-radio label="all">全部</el-radio>
                        <el-radio label="book">书名</el-radio>
                        <el-radio label="author">作者</el-radio>
                        <el-radio label="ibsn">ISBN</el-radio>
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
            <div class="book-info">
                <p class="book-title">《沉默的羔羊》</p>
                <p class="author">
                    <span class="author-row">作者：托马斯·哈里斯</span>
                    <span class="author-row">出版社：南京</span>
                    <span class="author-row">ISBN: 000001</span>
                </p>
                <div class="list-msg-operate">
                    <div class="endorse">
                        <svg
                            t="1650672914813"
                            class="icon"
                            viewBox="0 0 1024 1024"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            p-id="2187"
                            width="20"
                            height="20"
                        >
                            <path
                                d="M857.28 344.992h-264.832c12.576-44.256 18.944-83.584 18.944-118.208 0-78.56-71.808-153.792-140.544-143.808-60.608 8.8-89.536 59.904-89.536 125.536v59.296c0 76.064-58.208 140.928-132.224 148.064l-117.728-0.192A67.36 67.36 0 0 0 64 483.04V872c0 37.216 30.144 67.36 67.36 67.36h652.192a102.72 102.72 0 0 0 100.928-83.584l73.728-388.96a102.72 102.72 0 0 0-100.928-121.824zM128 872V483.04c0-1.856 1.504-3.36 3.36-3.36H208v395.68H131.36A3.36 3.36 0 0 1 128 872z m767.328-417.088l-73.728 388.96a38.72 38.72 0 0 1-38.048 31.488H272V476.864a213.312 213.312 0 0 0 173.312-209.088V208.512c0-37.568 12.064-58.912 34.72-62.176 27.04-3.936 67.36 38.336 67.36 80.48 0 37.312-9.504 84-28.864 139.712a32 32 0 0 0 30.24 42.496h308.512a38.72 38.72 0 0 1 38.048 45.888z"
                                p-id="2188"
                                fill="#707070"
                            ></path>
                        </svg>
                        <span class="num">11</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="book">
            <div class="book-info">
                <p class="book-title">《沉默的羔羊》</p>
                <p class="author">
                    <span class="author-row">作者：托马斯·哈里斯</span>
                    <span class="author-row">出版社：南京</span>
                    <span class="author-row">ISBN: 000001</span>
                </p>
                <div class="list-msg-operate">
                    <div class="endorse">
                        <svg
                            t="1650672914813"
                            class="icon"
                            viewBox="0 0 1024 1024"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            p-id="2187"
                            width="20"
                            height="20"
                        >
                            <path
                                d="M857.28 344.992h-264.832c12.576-44.256 18.944-83.584 18.944-118.208 0-78.56-71.808-153.792-140.544-143.808-60.608 8.8-89.536 59.904-89.536 125.536v59.296c0 76.064-58.208 140.928-132.224 148.064l-117.728-0.192A67.36 67.36 0 0 0 64 483.04V872c0 37.216 30.144 67.36 67.36 67.36h652.192a102.72 102.72 0 0 0 100.928-83.584l73.728-388.96a102.72 102.72 0 0 0-100.928-121.824zM128 872V483.04c0-1.856 1.504-3.36 3.36-3.36H208v395.68H131.36A3.36 3.36 0 0 1 128 872z m767.328-417.088l-73.728 388.96a38.72 38.72 0 0 1-38.048 31.488H272V476.864a213.312 213.312 0 0 0 173.312-209.088V208.512c0-37.568 12.064-58.912 34.72-62.176 27.04-3.936 67.36 38.336 67.36 80.48 0 37.312-9.504 84-28.864 139.712a32 32 0 0 0 30.24 42.496h308.512a38.72 38.72 0 0 1 38.048 45.888z"
                                p-id="2188"
                                fill="#707070"
                            ></path>
                        </svg>
                        <span class="num">11</span>
                    </div>
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
        <Add ref="addRef"></Add>
    </div>
</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue'
import Add from './components/add.vue'
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
        .list-msg-operate {
            height: 25px;
            .endorse {
                margin-left: 20px;
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
}
</style>
