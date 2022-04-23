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
                <div class="list-msg-operate">
                    <div class="endorse">
                        <svg
                            t="1650672914813"
                            class="icon"
                            viewBox="0 0 1024 1024"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            p-id="2187"
                            width="20"
                            height="20"
                        >
                            <path
                                d="M857.28 344.992h-264.832c12.576-44.256 18.944-83.584 18.944-118.208 0-78.56-71.808-153.792-140.544-143.808-60.608 8.8-89.536 59.904-89.536 125.536v59.296c0 76.064-58.208 140.928-132.224 148.064l-117.728-0.192A67.36 67.36 0 0 0 64 483.04V872c0 37.216 30.144 67.36 67.36 67.36h652.192a102.72 102.72 0 0 0 100.928-83.584l73.728-388.96a102.72 102.72 0 0 0-100.928-121.824zM128 872V483.04c0-1.856 1.504-3.36 3.36-3.36H208v395.68H131.36A3.36 3.36 0 0 1 128 872z m767.328-417.088l-73.728 388.96a38.72 38.72 0 0 1-38.048 31.488H272V476.864a213.312 213.312 0 0 0 173.312-209.088V208.512c0-37.568 12.064-58.912 34.72-62.176 27.04-3.936 67.36 38.336 67.36 80.48 0 37.312-9.504 84-28.864 139.712a32 32 0 0 0 30.24 42.496h308.512a38.72 38.72 0 0 1 38.048 45.888z"
                                p-id="2188"
                                fill="#707070"
                            ></path>
                        </svg>
                        <span class="num">11</span>
                    </div>
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
        <el-pagination
            v-model:currentPage="currentPage"
            v-model:page-size="pageSize"
            class="pagination"
            layout="prev, pager, next"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        />
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

const currentPage = ref(1)
const pageSize = ref(15)
const total = ref(100)

const handleSizeChange = (val: number) => {
    console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
    console.log(`current page: ${val}`)
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
