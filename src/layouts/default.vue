<template>
    <div class="header">
        <div class="logo-box">
            <div class="img">
                <img class="logo" src="./assets/logo.png" />
            </div>
            <div class="title">图书管理系统</div>
        </div>
        <div class="user-box">
            <el-dropdown class="user-dropdown">
                <span class="el-dropdown-link user-name">
                    污蝌蚪
                    <el-icon class="el-icon--right user-icon">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>退出系统</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
    <div class="content">
        <div class="menu">
            <el-menu default-active="1" class="el-menu-vertical-demo" @select="handleSelect">
                <el-menu-item index="1">
                    <el-icon><collection /></el-icon>
                    <span>图书信息管理</span>
                </el-menu-item>
                <el-menu-item index="2">
                    <el-icon><discount /></el-icon>
                    <span>图书类别管理</span>
                </el-menu-item>
                <el-menu-item index="3">
                    <el-icon><shopping-cart-full /></el-icon>
                    <span>借阅信息管理</span>
                </el-menu-item>
                <el-menu-item index="4">
                    <el-icon><user /></el-icon>
                    <span>用户信息管理</span>
                </el-menu-item>
                <el-menu-item index="5">
                    <el-icon><notebook /></el-icon>
                    <span>留言管理</span>
                </el-menu-item>
            </el-menu>
        </div>
        <div class="info">
            <router-view></router-view>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
    Menu as IconMenu,
    Collection,
    ArrowDown,
    Discount,
    ShoppingCartFull,
    User,
    Notebook,
} from '@element-plus/icons-vue'
interface IRouterMap {
    [key: string]: string
}
const $router = useRouter()
const handleSelect = (key: string, keyPath: string[]) => {
    const routerMap: IRouterMap = {
        '1': 'bookMsgMg',
        '2': 'bookTypeMg',
        '3': 'borrowMsgMg',
        '4': 'userMsgMg',
        '5': 'leaveMsgMg',
    }
    $router.push({
        name: routerMap[key],
    })
}
</script>

<style lang="less" scoped>
@header-height: 50px;
@menu-width: 220px;
.header {
    height: @header-height;
    background-color: rgb(40, 56, 87);
    box-shadow: 0 2px 10px #cdcdcd;
    .logo-box {
        float: left;
        width: 240px;
        height: 50px;
        .img {
            float: left;
            height: 40px;
            width: 40px;
            margin-top: 5px;
            margin-left: 20px;
            .logo {
                height: 40px;
                width: 40px;
            }
        }
        .title {
            height: 50px;
            width: 170px;
            line-height: 50px;
            text-align: center;
            float: left;
            font-size: 22px;
            font-weight: 800;
            color: #fff;
        }
    }
    .user-box {
        height: 50px;
        width: 200px;
        float: right;
        .user-dropdown {
            cursor: pointer;
            float: right;
            margin-top: 16px;
            margin-right: 20px;
            color: #fff;
            text-align: center;
        }
    }
}
.content {
    height: calc(100vh - @header-height);
    .menu {
        border-right: 1px solid #cdcdcd;
        float: left;
        height: calc(100vh - @header-height);
        width: @menu-width;
        .el-menu-vertical-demo {
            border: 0;
        }
    }
    .info {
        overflow: hidden;
        height: calc(100vh - @header-height - 20px);
        width: calc(100vw - @menu-width - 21px);
        background-color: #f2f2f2;
        padding: 10px;
        float: right;
    }
}
</style>
