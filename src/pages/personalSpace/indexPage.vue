<template>
    <div class="container">
        <div class="data">
            <p class="name">{{ userMsg.data.nickName }}</p>
            <p class="motto">
                <span class="real-msg">姓名：{{ userMsg.data.realName }}</span>
                <span class="real-msg">班级：{{ userMsg.data.className }}</span>
                <span class="real-msg">电话：{{ userMsg.data.tel }}</span>
                <span class="real-msg">邮箱：{{ userMsg.data.email }}</span>
            </p>
            <p class="domain">角色：{{ userMsg.data.role }}</p>
            <el-button class="edit-btn" type="primary" plain @click="showEdit"
                >编辑个人资料</el-button
            >
        </div>
        <div class="tabs">
            <el-tabs v-model="activeTab" class="demo-tabs" @tab-click="handleClick">
                <el-tab-pane label="我的借阅" name="borrowList"> </el-tab-pane>
                <el-tab-pane label="我的书评" name="estimateList"> </el-tab-pane>
                <el-tab-pane label="我的留言" name="messageList"> </el-tab-pane>
            </el-tabs>
            <component :is="acitveComponent[activeTab]"></component>
        </div>
        <EditDialog ref="editRef" :user-msg="userMsg.data" @refersh="getUserMsg"></EditDialog>
    </div>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import { $apiUserMsg } from '@/api/index'
import BorrowList from './components/borrowList.vue'
import EstimateList from './components/estimateList.vue'
import MessageList from './components/messageList.vue'
import EditDialog from './components/editMsg.vue'
const handleClick = (tab: TabsPaneContext, event: Event) => {
    console.log(tab, event)
}
const activeTab = ref('borrowList')
const acitveComponent = reactive({
    borrowList: BorrowList,
    estimateList: EstimateList,
    messageList: MessageList,
})
onMounted(async () => {
    getUserMsg()
})
interface IUserMsg {
    className: string
    email: string
    id: Number
    idCard: string
    nickName: string
    realName: string
    role: Number
    size: Number
    status: Number
    tel: string
    username: string
}
interface IUserData {
    data: IUserMsg
}
const userMsg: IUserData = reactive({
    data: {
        className: '',
        email: '',
        id: 0,
        idCard: '',
        nickName: '',
        realName: '',
        role: 0,
        size: 0,
        status: 0,
        tel: '',
        username: '',
    },
})
const getUserMsg = async () => {
    const res = await $apiUserMsg<IUserMsg>()
    userMsg.data = res
}
const editRef = ref()
const showEdit = () => {
    editRef.value.show()
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
            .real-msg {
                margin-right: 20px;
            }
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
