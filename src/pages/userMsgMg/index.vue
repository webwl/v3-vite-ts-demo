<template>
    <SearchComponent @set-search-form-data="setSearchFormdata" @search="search"></SearchComponent>
    <TableComponent ref="tableRef" :search-form-data="searchFormData"></TableComponent>
</template>
<script lang="ts" setup>
import SearchComponent from './components/user-search.vue'
import TableComponent from './components/user-table.vue'
import { ISearchForm } from './utils/interfaces'
import { reactive, ref } from 'vue'
let searchFormData: ISearchForm = reactive({
    userName: null,
    schoolId: null,
    className: null,
    email: null,
})
const setSearchFormdata = (val: ISearchForm) => {
    searchFormData = val
}
const tableRef = ref()
const search = () => {
    tableRef.value.search()
}
</script>
