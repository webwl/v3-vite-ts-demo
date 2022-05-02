<template>
    <div class="header">
        <div class="logo-block">
            <div class="img">
                <img class="logo" src="../assets/images/logo.png" />
            </div>
            <div class="title">图书管理系统</div>
        </div>
        <div class="menu-block">
            <el-menu
                :default-active="activeName"
                class="el-menu-demo"
                mode="horizontal"
                background-color="#283857"
                text-color="#fff"
                @select="handleSelect"
            >
                <el-menu-item index="homePage">首页</el-menu-item>
                <el-menu-item index="onlineLibrary">图书库</el-menu-item>
                <el-menu-item index="popularBooks">热读榜</el-menu-item>
                <el-menu-item index="messageBoard">留言板</el-menu-item>
                <el-menu-item index="wishingWell">预约书籍</el-menu-item>
            </el-menu>
        </div>
        <div class="user-block">
            <el-button v-if="!token" class="login-btn" type="text" @click="login"
                >点击登录</el-button
            >
            <el-dropdown v-else class="user-dropdown">
                <span class="el-dropdown-link user-name">
                    {{ user.nickName }}
                    <el-icon class="el-icon--right user-icon">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="toPage('personalSpace')"
                            >个人空间</el-dropdown-item
                        >
                        <el-dropdown-item @click="logOut">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
    <div class="content">
        <router-view v-if="reloadRouter"></router-view>
    </div>
    <LoginDialog ref="loginRef" @set-token="setToken" @show-forget="showForget"></LoginDialog>
    <ForgetDialog ref="forgetRef" @show-login="showLogin"></ForgetDialog>
</template>

<script lang="ts" setup>
import { ref, reactive, toRaw, onMounted, computed, provide, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Menu as IconMenu, ArrowDown } from '@element-plus/icons-vue'
import LoginDialog from '@/components/login/indexPage.vue'
import ForgetDialog from '@/components/forget/indexPage.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useUserMsg } from '@/components/userMsg'

const reloadRouter = ref(true)
const reloadRouterFn = () => {
    reloadRouter.value = false
    nextTick(() => {
        reloadRouter.value = true
    })
}

const token = ref('')
const localToken = localStorage.getItem('library_jwt_token')
if (localToken) {
    token.value = localToken
}

const $router = useRouter()
const $route = useRoute()

interface IPath {
    [key: string]: string
}
const menuMap: IPath = {
    '/': 'homePage',
    '/home-page': 'homePage',
    '/online-library': 'onlineLibrary',
    '/popular-books': 'popularBooks',
    '/message-board': 'messageBoard',
    '/wishing-well': 'wishingWell',
}
const activeName = ref('')
const { user, getUserMsg } = useUserMsg()

onMounted(async () => {
    activeName.value = menuMap[location.pathname]
})

const handleSelect = (key: string, keyPath: string[]) => {
    $router.push({ name: key })
}
const loginRef = ref()
const login = () => {
    loginRef.value?.show()
}
const logOut = () => {
    ElMessageBox.confirm('确认要退出登录吗？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
    })
        .then(() => {
            localStorage.removeItem('library_jwt_token')
            // nickName.value = ''
            token.value = ''
            if (toRaw($route.name) === 'personalSpace') {
                toPage('homePage')
            }
            ElMessage({
                type: 'success',
                message: '退出登录成功',
            })
            reloadRouterFn()
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '取消操作',
            })
        })
}
const toPage = (pathName: string) => {
    activeName.value = pathName
    $router.push({ name: pathName })
}
const setToken = (val: string) => {
    token.value = val
    getUserMsg()
    reloadRouterFn()
}

const forgetRef = ref()
const showForget = () => {
    forgetRef.value.show()
}
const showLogin = () => {
    loginRef.value.show()
}
</script>

<style lang="less" scoped>
@header-height: 50px;
@menu-width: 220px;
.header {
    height: @header-height;
    background-color: rgb(40, 56, 87);
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 5%);
    .logo-block {
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
    .menu-block {
        width: 70vw;
        height: @header-height;
        line-height: @header-height;
        float: left;
        .el-button--text {
            color: #fff;
        }
        .el-menu-demo {
            margin-left: 100px;
        }
        .el-menu-item {
            max-height: 50px;
        }
    }
    .user-block {
        height: @header-height;
        line-height: @header-height;
        text-align: right;
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
        .login-btn {
            color: #fff;
            margin-right: 20px;
        }
    }
}
.content {
    background-color: #f4f5f5;
    height: calc(100vh - @header-height);
    overflow-y: auto;
}
</style>
