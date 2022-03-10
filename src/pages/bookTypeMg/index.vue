<template>
    <SearchComponent @set-search-form-data="setSearchFormdata" @search="search"></SearchComponent>
    <TableComponent ref="tableRef" :search-form-data="searchFormData"></TableComponent>
</template>
<script lang="ts" setup>
import SearchComponent from './components/book-type-search.vue'
import TableComponent from './components/book-type-table.vue'
import { ISearchForm } from './utils/interfaces'
import { reactive, ref, watch } from 'vue'
let searchFormData: ISearchForm = reactive({
    typeName: null,
})
const setSearchFormdata = (val: ISearchForm) => {
    searchFormData = val
}
const tableRef = ref()
const search = () => {
    tableRef.value.search()
}
</script>
