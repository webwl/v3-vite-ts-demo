<template>
    <div class="content">
        <div class="book">
            <div class="book-info">
                <p class="book-title">《沉默的羔羊333》</p>
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
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
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
