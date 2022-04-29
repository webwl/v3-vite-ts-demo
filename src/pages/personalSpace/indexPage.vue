<template>
    <div class="container">
        <div class="data">
            <p class="name">qwert</p>
            <p class="motto">
                JavaScript在不断地升级迭代，越来越多的新特性让我们的代码写起来变得简洁有趣，这篇文章会介绍5个新特性，一起研究一下把。
            </p>
            <p class="domain">2019-计算机科学与技术</p>
            <el-button class="edit-btn" type="primary" plain>编辑个人资料</el-button>
        </div>
        <div class="tabs">
            <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
                <el-tab-pane label="我的借阅" name="first">
                    <div class="content">
                        <div class="book">
                            <div class="book-info">
                                <p class="book-title">《沉默的羔羊》</p>
                                <p class="author">
                                    <span class="author-row">作者：托马斯·哈里斯</span>
                                    <span class="author-row">出版社：南京</span>
                                    <span class="author-row">ISBN": 000001</span>
                                </p>
                                <p class="borrow-msg">
                                    <span class="interval">借阅时间：2022年1月1日</span>
                                    <span class="interval">约定归还时间：2022年1月1日</span>
                                    <span class="interval">归还地址: xxxx图书馆</span>
                                </p>
                            </div>
                        </div>
                        <div class="book">
                            <div class="book-info">
                                <p class="book-title">《沉默的羔羊》</p>
                                <p class="author">
                                    <span class="author-row">作者：托马斯·哈里斯</span>
                                    <span class="author-row">出版社：南京</span>
                                    <span class="author-row">ISBN": 000001</span>
                                </p>
                                <p class="borrow-msg">
                                    <span class="interval">借阅时间：2022年1月1日</span>
                                    <span class="interval">约定归还时间：2022年1月1日</span>
                                    <span class="interval">归还地址: xxxx图书馆</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="我的预约" name="third">
                    <div class="content">
                        <div class="book">
                            <div class="book-info">
                                <p class="book-title">《沉默的羔羊》</p>
                                <p class="author">
                                    <span class="author-row">作者：托马斯·哈里斯</span>
                                    <span class="author-row">出版社：南京</span>
                                    <span class="author-row">ISBN": 000001</span>
                                </p>
                            </div>
                        </div>
                        <div class="book">
                            <div class="book-info">
                                <p class="book-title">《沉默的羔羊》</p>
                                <p class="author">
                                    <span class="author-row">作者：托马斯·哈里斯</span>
                                    <span class="author-row">出版社：南京</span>
                                    <span class="author-row">ISBN": 000001</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="我的留言" name="three">
                    <div class="content">
                        <div class="book">
                            <div class="book-info">
                                <p class="book-title">《沉默的羔羊》</p>
                                <p class="author">
                                    <span class="author-row">作者：托马斯·哈里斯</span>
                                    <span class="author-row">出版社：南京</span>
                                    <span class="author-row">ISBN": 000001</span>
                                </p>
                            </div>
                        </div>
                        <div class="book">
                            <div class="book-info">
                                <p class="book-title">《沉默的羔羊》</p>
                                <p class="author">
                                    <span class="author-row">作者：托马斯·哈里斯</span>
                                    <span class="author-row">出版社：南京</span>
                                    <span class="author-row">ISBN": 000001</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'

const activeName = ref('first')

const handleClick = (tab: TabsPaneContext, event: Event) => {
    console.log(tab, event)
}
</script>

<style lang="less" scoped>
.container {
    padding: 20px 0;
    width: 70vw;
    margin: 0 auto;
    .data {
        background-color: #fff;
        padding: 30px;
        overflow: hidden;
        position: relative;
        margin-bottom: 20px;
        .name {
            font-size: 22px;
            font-weight: 600;
            color: #000;
            margin-bottom: 24px;
        }
        .motto {
            font-size: 14px;
            color: #72777b;
            max-width: 70%;
            margin-bottom: 20px;
        }
        .domain {
            font-size: 14px;
            color: #72777b;
            max-width: 70%;
        }
        .edit-btn {
            position: absolute;
            right: 30px;
            bottom: 50px;
        }
    }
    .tabs {
        background-color: #fff;
        padding: 30px;
    }
}
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
