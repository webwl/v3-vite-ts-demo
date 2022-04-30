<template>
    <el-dialog v-model="dialogVisible" title="评价" width="30%" @close="close">
        <el-rate v-model="rate" />
        <el-input
            v-model="estimateText"
            placeholder="请输入评价"
            class="write-block"
            :rows="5"
            maxlength="500"
            show-word-limit
            type="textarea"
            @keyup.enter="open"
        />
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="open">确定</el-button>
            </span>
        </template>
    </el-dialog>
</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { Action } from 'element-plus'
import { $apiBookEstimateSave } from '@/api/index'
const props = defineProps({
    borrowId: {
        type: String,
        default: '',
    },
})
const dialogVisible = ref(false)
const estimateText = ref('')
const rate = ref(0)

const show = () => {
    dialogVisible.value = true
}
const close = () => {
    estimateText.value = ''
    rate.value = 0
}
const open = () => {
    if (!estimateText.value) {
        ElMessage({
            type: 'warning',
            message: '请输入评价',
        })
        return
    }
    ElMessageBox.alert('确认提交书评吗？', '提示', {
        confirmButtonText: '确定',
        callback: async (action: Action) => {
            if (action === 'confirm') {
                try {
                    await $apiBookEstimateSave({
                        borrowId: Number(props.borrowId),
                        content: estimateText.value,
                        title: '111',
                        rate: rate.value,
                    })
                    ElMessage({
                        type: 'success',
                        message: '保存成功',
                    })
                    dialogVisible.value = false
                } catch (error) {
                    console.log('提交书评失败')
                    console.error(error)
                }
            }
        },
    })
}
defineExpose({
    show,
    close,
})
</script>
