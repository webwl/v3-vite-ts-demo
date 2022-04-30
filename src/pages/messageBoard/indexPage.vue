<template>
    <div class="message-block">
        <p class="msg-title">留言</p>
        <el-input
            v-model="myMsg"
            :disabled="!isLogin"
            :placeholder="isLogin ? '请输入留言' : '请登陆后再开始留言'"
            class="write-block"
            :rows="5"
            maxlength="500"
            show-word-limit
            type="textarea"
            @keyup.enter="open"
        />
        <div class="write-block-btns">
            <el-button type="primary" :disabled="!isLogin" @click="open">提交</el-button>
        </div>

        <p class="msg-title">全部留言</p>
        <div class="list-block">
            <div v-for="item of messageList" :key="item.id" class="list">
                <div class="list-head">
                    <div class="name">{{ item.userName }}</div>
                    <div class="time">{{ item.createTime }}</div>
                </div>
                <div class="list-info">
                    {{ item.content }}
                </div>
            </div>
        </div>
        <el-pagination
            v-model:currentPage="currentPage"
            v-model:page-size="pageSize"
            class="pagination"
            layout="prev, pager, next"
            :total="total"
            @current-change="handleCurrentChange"
        />
    </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { Action } from 'element-plus'
import { $apiMessageList, $apiMessageSave } from '@/api/index'
import { IMessagListRes } from './utils/interfaces'

const myMsg = ref('')

const open = () => {
    if (!myMsg.value) {
        ElMessage({
            type: 'warning',
            message: '请输入留言',
        })
        return
    }
    ElMessageBox.alert('确认提交留言吗？', '提示', {
        confirmButtonText: '确定',
        callback: async (action: Action) => {
            if (action === 'confirm') {
                try {
                    const res = await $apiMessageSave({
                        title: '111',
                        content: myMsg.value,
                    })
                    ElMessage({
                        type: 'success',
                        message: '保存成功',
                    })
                    myMsg.value = ''
                    getList()
                } catch (error) {
                    console.log('提交留言失败')
                    console.error(error)
                }
            }
        },
    })
}

// 登录状态
const isLogin = !!localStorage.getItem('library_jwt_token')

const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const messageList = ref()
const handleCurrentChange = (val: number) => {
    getList()
}
onMounted(() => {
    getList()
})
const getList = async () => {
    try {
        const res: any = await $apiMessageList({
            page: currentPage.value,
            size: pageSize.value,
        })
        if (res) {
            total.value = res.total
            messageList.value = res.list
        }
    } catch (error) {
        console.log('获取留言列表失败')
        console.error(error)
    }
}
</script>
<style lang="less" scoped>
.message-block {
    overflow: hidden;
}
.msg-title {
    font-size: 18px;
    line-height: 30px;
    font-weight: 600;
    color: #252933;
}

.write-block {
    /deep/.el-textarea__inner {
        resize: none;
    }
}
.write-block-btns {
    text-align: right;
    margin-top: 10px;
}
.message-block {
    width: 70vw;
    min-height: 450px;
    margin: 20px auto;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 5%);
}
.list-block {
    .list {
        padding: 16px 0;
    }
    .list-head {
        overflow: hidden;
        .name {
            float: left;
            width: 80%;
            font-weight: 500;
            font-size: 15px;
            color: #252933;
            max-width: 90px;
            line-height: 26px;
        }
        .time {
            float: right;
            width: 20%;
            text-align: right;
            font-size: 14px;
            color: #8a919f;
            line-height: 22px;
        }
    }
    .list-info {
        font-weight: 400;
        font-size: 14px;
        line-height: 2rem;
        color: #515767;
        margin-top: 8px;
        margin-bottom: 8px;
    }
    .list-msg-operate {
        height: 25px;
        .endorse {
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

.pagination {
    float: right;
}
</style>
