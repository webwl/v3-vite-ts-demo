<template>
    <el-carousel class="carousel">
        <el-carousel-item> <img class="banner" :src="banner1" /> </el-carousel-item>
        <el-carousel-item> <img class="banner" :src="banner2" /> </el-carousel-item>
        <el-carousel-item> <img class="banner" :src="banner3" /> </el-carousel-item>
        <el-carousel-item> <img class="banner" :src="banner4" /> </el-carousel-item>
        <el-carousel-item> <img class="banner" :src="banner5" /> </el-carousel-item>
    </el-carousel>
    <div class="content">
        <div class="block-title">图书推荐</div>
        <div class="recommend">
            <table class="recommend-table">
                <tr>
                    <td rowspan="2" colspan="2">
                        <div class="td-block-double">
                            <div class="info-block">
                                <p class="name">{{ highlyRrecommended[0]?.name }}</p>
                                <p class="author">{{ highlyRrecommended[0]?.author }}</p>
                                <p class="intro">{{ highlyRrecommended[0]?.intro }}</p>
                            </div>
                            <div class="img-block">
                                <img
                                    class="img"
                                    :src="highlyRrecommended[0]?.cover"
                                    @click="toDetail(highlyRrecommended[0]?.id)"
                                />
                            </div>
                        </div>
                    </td>
                    <td>
                        <div class="td-block">
                            <img
                                class="img"
                                :src="generalRrecommended[0]?.cover"
                                :alt="generalRrecommended[0]?.name || '推荐图书'"
                                @click="toDetail(generalRrecommended[0]?.id)"
                            />
                        </div>
                    </td>
                    <td>
                        <div class="td-block">
                            <img
                                class="img"
                                :src="generalRrecommended[1]?.cover"
                                :alt="generalRrecommended[1]?.name || '推荐图书'"
                                @click="toDetail(generalRrecommended[1]?.id)"
                            />
                        </div>
                    </td>
                    <td>
                        <div class="td-block">
                            <img
                                class="img"
                                :src="generalRrecommended[2]?.cover"
                                :alt="generalRrecommended[2]?.name || '推荐图书'"
                                @click="toDetail(generalRrecommended[2]?.id)"
                            />
                        </div>
                    </td>
                </tr>
                <tr>
                    <td rowspan="2" colspan="2">
                        <div class="td-block-double">
                            <div class="info-block">
                                <p class="name">{{ highlyRrecommended[1]?.name }}</p>
                                <p class="author">{{ highlyRrecommended[1]?.author }}</p>
                                <p class="intro">{{ highlyRrecommended[1]?.intro }}</p>
                            </div>
                            <div class="img-block">
                                <img
                                    class="img"
                                    :src="highlyRrecommended[1]?.cover"
                                    @click="toDetail(highlyRrecommended[1]?.id)"
                                />
                            </div>
                        </div>
                    </td>
                    <td>
                        <div class="td-block">
                            <img
                                class="img"
                                :src="generalRrecommended[3]?.cover"
                                :alt="generalRrecommended[3]?.name"
                                @click="toDetail(generalRrecommended[3]?.id)"
                            />
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div class="td-block">
                            <img
                                class="img"
                                :src="generalRrecommended[4]?.cover"
                                :alt="generalRrecommended[4]?.name || '推荐图书'"
                                @click="toDetail(generalRrecommended[4]?.id)"
                            />
                        </div>
                    </td>
                    <td>
                        <div class="td-block">
                            <img
                                class="img"
                                :src="generalRrecommended[5]?.cover"
                                :alt="generalRrecommended[5]?.name || '推荐图书'"
                                @click="toDetail(generalRrecommended[5]?.id)"
                            />
                        </div>
                    </td>
                    <td>
                        <div class="td-block">
                            <img
                                class="img"
                                :src="generalRrecommended[6]?.cover"
                                :alt="generalRrecommended[6]?.name || '推荐图书'"
                                @click="toDetail(generalRrecommended[6]?.id)"
                            />
                        </div>
                    </td>
                </tr>
            </table>
        </div>
        <div class="block-title">联系我们</div>
        <div class="contact">
            <div class="lucency-bg">
                <ul>
                    <li>
                        <el-icon class="contact-icon" size="20"><Location /></el-icon>
                        <span class="contact-text">四川省攀枝花市机场路东区10号</span>
                    </li>
                    <li>
                        <el-icon class="contact-icon" :size="20"><phone-filled /></el-icon>
                        <span class="contact-text">0812-3371118</span>
                    </li>
                    <li>
                        <el-icon class="contact-icon" :size="20"><Message /></el-icon>
                        <span class="contact-text">6170000</span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="block-title"></div>
    </div>
</template>
<script lang="ts" setup>
import { Message, Location, PhoneFilled } from '@element-plus/icons-vue'
import { onMounted, reactive, ref } from 'vue'
import { $apiBookRecommend } from '@/api/index'
import { useRouter, useRoute } from 'vue-router'
import banner1 from '@/assets/images/banner1.png'
import banner2 from '@/assets/images/banner2.png'
import banner3 from '@/assets/images/banner3.png'
import banner4 from '@/assets/images/banner4.png'
import banner5 from '@/assets/images/banner5.png'

onMounted(() => {
    getRecommend()
})

// 重点推荐位
const highlyRrecommended: any[] = reactive([])
// 普通推荐位
const generalRrecommended: any[] = reactive([])
const getRecommend = async () => {
    try {
        const res = await $apiBookRecommend()
        if (res && Array.isArray(res)) {
            for (let i = 0; i < res.length; i++) {
                if (i < 2) {
                    highlyRrecommended.push(res[i])
                } else {
                    generalRrecommended.push(res[i])
                }
            }
        }
    } catch (error) {
        console.log('获取推荐书籍失败')
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
.contact {
    height: 300px;
    overflow: hidden;
    background: url('@/assets/images/map.png') no-repeat;
    background-position: 10% 50%;
    .lucency-bg {
        height: 300px;
        background-color: #000;
        opacity: 0.4;
        overflow: hidden;
    }
    ul {
        margin-top: 90px;
        margin-left: 50px;
        color: #fff;
        li {
            height: 20px;
            line-height: 20px;

            list-style: none;
            margin-bottom: 10px;
            .contact-icon {
                float: left;
            }
            .contact-text {
                float: left;
                font-size: 18px;
                margin-left: 10px;
            }
        }
    }
}
.banner {
    width: 100%;
    height: 300px;
}
.content {
    width: 70vw;
    margin: 0 auto;
    .recommend {
        .recommend-table {
            width: 100%;
            td {
                padding: 5px;
                width: 20vh;
                height: 200px;
                overflow: hidden;
            }
            .td-block {
                height: 200px;
                background-color: #fff;
                box-shadow: 0 1px 2px 0 rgb(0 0 0 / 5%);
                .img {
                    width: 70%;
                    height: 80%;
                    float: left;
                    margin-left: 15%;
                    margin-top: 10%;
                    cursor: pointer;
                }
            }
            .td-block-double {
                height: 414px;
                background-color: #fff;
                box-shadow: 0 1px 2px 0 rgb(0 0 0 / 5%);
                overflow: hidden;
                .info-block {
                    float: left;
                    width: 50%;
                    height: 100%;
                    .name {
                        font-size: 20px;
                        color: #333;
                        margin: 80px 0 10px 30px;
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
                        width: 85%;
                        height: 50%;
                        float: left;
                        margin-top: 35%;
                        cursor: pointer;
                    }
                }
            }
        }
    }
}

.block-title {
    padding: 40px 0;
    text-align: center;
    font-size: 20px;
    font-weight: 800;
    color: rgb(124, 124, 124);
}
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
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
