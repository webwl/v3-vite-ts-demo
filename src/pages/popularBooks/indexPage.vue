<template>
    <div class="bg">
        <p class="title">
            热<span class="placeholder"></span>读<span class="placeholder"></span>榜
        </p>
        <p class="subhead">
            Mast<span class="placeholder"></span>Read<span class="placeholder"></span>Articles
        </p>
    </div>
    <div class="content-bg">
        <div class="content">
            <el-carousel :interval="4000" type="card" height="350px">
                <el-carousel-item v-for="item in 6" :key="item">
                    <h3>{{ item }}</h3>
                </el-carousel-item>
            </el-carousel>
            <el-row class="lists" :gutter="20">
                <el-col v-for="item in lists" :key="item.type" :span="8">
                    <div class="list">
                        <div class="list-title">{{ item.type }}</div>
                        <div class="list-content">
                            <ul>
                                <li
                                    v-for="listItem in item.list"
                                    :key="listItem.id"
                                    class="list-item"
                                >
                                    <div class="name">{{ listItem.book }}</div>
                                    <div class="author">{{ listItem.author }}</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import { $apiBookRecommend } from '@/api/index'
const lists = reactive([
    {
        type: '图书',
        list: [
            { id: 1, book: '《书名0》', author: '作者1' },
            { id: 2, book: '《书名0》' },
            { id: 3, book: '《书名0》', author: '作者1' },
            { id: 4, book: '《书名0》', author: '作者1' },
            { id: 5, book: '《书名0》', author: '作者1' },
            { id: 6, book: '《书名0》', author: '作者1' },
            { id: 7, book: '《书名0》', author: '作者1' },
            { id: 8, book: '《书名0》', author: '作者1' },
            { id: 9, book: '《书名0》', author: '作者1' },
            { id: 10, book: '《书名0》', author: '作者1' },
        ],
    },
])

onMounted(() => {})
const search = async () => {
    try {
        const res = await $apiBookRecommend()
    } catch (error) {
        console.log('获取热读榜失败')
        console.error(error)
    }
}
</script>

<style lang="less" scoped>
.bg {
    background-color: #f3f4f8;
    height: 140px;
    overflow: hidden;
    text-align: center;
    .title {
        font-size: 24px;
        font-weight: bold;
        color: #20283b;
        margin: 30px 0;
    }
    .placeholder {
        margin-right: 30px;
    }
    .subhead {
        font-size: 18px;
        font-weight: bold;
        color: #87888a;
    }
}
.content-bg {
    background-color: #fff;
    .content {
        width: 70vw;
        margin: 20px auto;
        background-color: #fff;
        border-radius: 10px;
        padding: 20px 0;
    }
}

.lists {
    margin-top: 40px;
    .list {
        border: 1px solid;
        height: 460px;
        margin-bottom: 20px;
        .list-title {
            height: 50px;
            line-height: 50px;
            font-size: 18px;
            color: #fff;
            text-align: center;
            background-color: #20283b;
        }
        .list-content {
            padding: 10px;
            ul {
                padding: 0;
            }
            .list-item {
                display: flex;
                flex-direction: row;
                flex-wrap: nowrap;
                justify-content: space-between;
                margin-bottom: 20px;

                .name {
                    max-width: 65%;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    font-size: 16px;
                }
                .author {
                    max-width: 30%;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    font-size: 16px;
                }
            }
        }
    }
}
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    text-align: center;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}
</style>
