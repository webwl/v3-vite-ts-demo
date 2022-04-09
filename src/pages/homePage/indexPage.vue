<template>
    <el-carousel class="carousel">
        <el-carousel-item v-for="item in 4" :key="item">
            <h3 class="small">{{ item }}</h3>
        </el-carousel-item>
    </el-carousel>
    <div class="content">
        <div class="block-title">图书推荐</div>
        <div class="recommend">
            <table class="recommend-table">
                <tr>
                    <td rowspan="2" colspan="2">
                        <div class="td-block-double">111</div>
                    </td>
                    <td>
                        <div class="td-block">111</div>
                    </td>
                    <td>
                        <div class="td-block">111</div>
                    </td>
                    <td>
                        <div class="td-block">111</div>
                    </td>
                </tr>
                <tr>
                    <td rowspan="2" colspan="2">
                        <div class="td-block-double">111</div>
                    </td>
                    <td>
                        <div class="td-block">111</div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div class="td-block">111</div>
                    </td>
                    <td>
                        <div class="td-block">111</div>
                    </td>
                    <td>
                        <div class="td-block">111</div>
                    </td>
                </tr>
            </table>
        </div>
        <div class="block-title">联系我们</div>
        <div class="contact">
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
        <div class="block-title"></div>
    </div>
</template>
<script lang="ts" setup>
import { Message, Location, PhoneFilled } from '@element-plus/icons-vue'
</script>

<style lang="less" scoped>
.contact {
    height: 300px;
    background-color: red;
    overflow: hidden;
    background: url('@/assets/images/map.png') no-repeat;
    background-position: 10% 50%;
    ul {
        margin-top: 90px;
        margin-left: 50px;
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
.content {
    width: 70vw;
    margin: 0 auto;
    .recommend {
        .recommend-table {
            width: 100%;
            td {
                padding: 5px;
            }
            .td-block {
                background-color: #cdcdcd;
                height: 200px;
            }
            .td-block-double {
                background-color: #cdcdcd;
                height: 414px;
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
