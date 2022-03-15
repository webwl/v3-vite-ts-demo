<template>
    <Login v-if="type" @login="login"></Login>
    <DefaultLayout v-else></DefaultLayout>
</template>

<script lang="ts" setup>
import DefaultLayout from '@/layouts/default.vue'
import Login from '@/layouts/login.vue'

import { ref } from 'vue'

const type = ref(true)

const login = () => {
    type.value = false
}
</script>
