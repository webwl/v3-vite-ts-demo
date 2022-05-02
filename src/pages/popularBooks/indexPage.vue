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
                <el-carousel-item v-for="item of bannerList.arr" :key="item.id">
                    <div class="banner">
                        <div class="info-block">
                            <p class="name">《{{ item.name }}》</p>
                            <p class="author">{{ item.author }}</p>
                            <p class="intro">{{ item.intro }}</p>
                        </div>
                        <div class="img-block" @click="toDetail(item.id)">
                            <img class="img" :src="item.cover" />
                        </div>
                    </div>
                </el-carousel-item>
            </el-carousel>
            <el-row class="lists" :gutter="20">
                <el-col v-for="item of lists.arr" :key="item.type" :span="8">
                    <div class="list">
                        <div class="list-title">{{ item.name }}</div>
                        <div class="list-content">
                            <ul>
                                <li
                                    v-for="listItem of item.list"
                                    :key="listItem.id"
                                    class="list-item"
                                >
                                    <div class="name" @click="toDetail(listItem.id)">
                                        《{{ listItem.name }}》
                                    </div>
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
import { ref, reactive, onMounted, inject, Ref } from 'vue'
import { $apiHotBookList } from '@/api/index'
import { IBannerList, IHotReactive } from './utlis/interfaces'
import { useRouter } from 'vue-router'

const lists: IHotReactive = reactive({
    arr: [
        {
            type: 'BOOK',
            name: '图书',
            list: [],
        },
        {
            type: 'TUTORIAL',
            name: '教程',
            list: [],
        },
        {
            type: 'PERIODICAL',
            name: '期刊',
            list: [],
        },
    ],
})

onMounted(() => {
    search()
})

const bannerList: IBannerList = reactive({
    arr: [],
})
const typeMap = {
    BOOK: '图书',
    TUTORIAL: '教程',
    PERIODICAL: '期刊',
}
const search = async () => {
    try {
        const res: any = await $apiHotBookList()
        if (res) {
            const bannerArr = []
            for (const type in res) {
                const currentArr = lists.arr.find((x) => {
                    return x.type === type
                })
                if (currentArr) {
                    currentArr.list = res[type]
                }
                // 将每种榜单的前两位用做banner
                for (let i = 0; i < 2; i++) {
                    if (res[type][i]) {
                        bannerArr.push(res[type][i])
                    }
                }
            }
            bannerList.arr = bannerArr
        }
    } catch (error) {
        console.log('获取热读榜失败')
        console.error(error)
    }
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
.banner {
    height: 100%;
    background-color: #f3f4f8;
    overflow: hidden;
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 5%);
    .info-block {
        float: left;
        width: 50%;
        height: 100%;
        .name {
            font-size: 20px;
            color: #333;
            margin: 80px 0 10px 30px;
            cursor: pointer;
        }
        .author {
            font-size: 14px;
            color: #333;
            margin: 10px 0 10px 40px;
        }
        .intro {
            font-size: 16px;
            color: rgb(128, 128, 128);
            margin: 10px 0 10px 40px;
            width: 80%;
            overflow: hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 10;
        }
    }
    .img-block {
        float: left;
        width: 50%;
        height: 100%;
        .img {
            width: 80%;
            height: 70%;
            margin-top: 15%;
            float: left;
            cursor: pointer;
        }
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
                    cursor: pointer;
                    &:hover {
                        color: #000;
                    }
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
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 5%);
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
