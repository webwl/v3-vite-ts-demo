<template>
    <div class="message-block">
        <p class="msg-title">留言</p>
        <el-input
            v-model="myMsg"
            class="write-block"
            :rows="5"
            maxlength="500"
            show-word-limit
            type="textarea"
            @keyup.enter="open"
        />
        <div class="write-block-btns">
            <el-button type="primary" @click="open">提交</el-button>
        </div>

        <p class="msg-title">全部留言</p>
        <div class="list-block">
            <div class="list">
                <div class="list-head">
                    <div class="name">丑卷</div>
                    <div class="time">9个月前</div>
                </div>
                <div class="list-info">
                    怎么办，都是我没听过的技术，好歹我也是个入行半年的小前端，开眼界了
                </div>
            </div>
            <div class="lst">
                <div class="list-head">
                    <div class="name">丑卷</div>
                    <div class="time">9个月前</div>
                </div>
                <div class="list-info">
                    怎么办，都是我没听过的技术，好歹我也是个入行半年的小前端，开眼界了
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { Action } from 'element-plus'

const myMsg = ref('')

const open = () => {
    ElMessageBox.alert('确认提交留言吗？', '提示', {
        confirmButtonText: '确定',
        callback: (action: Action) => {
            if (action === 'confirm') {
                ElMessage({
                    type: 'success',
                    message: '提交成功',
                })
            }
        },
    })
}
</script>
<style lang="less" scoped>
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
            width: 90%;
            font-weight: 500;
            font-size: 15px;
            color: #252933;
            max-width: 90px;
            line-height: 26px;
        }
        .time {
            float: right;
            width: 10%;
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
    }
}
</style>
