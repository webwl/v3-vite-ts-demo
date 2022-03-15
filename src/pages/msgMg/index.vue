<template>
    <SearchComponent @set-search-form-data="setSearchFormdata" @search="search"></SearchComponent>
    <TableComponent ref="tableRef" :search-form-data="searchFormData"></TableComponent>
</template>
<script lang="ts" setup>
import SearchComponent from './components/msg-search.vue'
import TableComponent from './components/msg-table.vue'
import { ISearchForm } from './utils/interfaces'
import { reactive, ref } from 'vue'
let searchFormData: ISearchForm = reactive({
    createName: null,
    schoolId: null,
    createTime: null,
})
const setSearchFormdata = (val: ISearchForm) => {
    searchFormData = val
}
const tableRef = ref()
const search = () => {
    tableRef.value.search()
}
</script>
