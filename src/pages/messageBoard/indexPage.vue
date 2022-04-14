<template>
    <div class="message-block">
        <p class="msg-title">留言</p>
        <div class="write-block">留言板</div>
        <p class="msg-title">全部留言</p>
        <div class="all-block">留言板</div>
    </div>
</template>
<script lang="ts" setup></script>
<style lang="less" scoped>
.msg-title {
    font-size: 18px;
    line-height: 30px;
    font-weight: 600;
    color: #252933;
}

.write-block {
    width: 90%;
    margin: 0 auto;
    height: 150px;
    background-color: #f2f3f5;
    padding: 8px 12px;
    border-radius: 10px;
}
.message-block {
    width: 70vw;
    min-height: 450px;
    margin: 20px auto;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 5%);
}
</style>
