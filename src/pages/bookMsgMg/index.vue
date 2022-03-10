<template>
    <SearchComponent @set-search-form-data="setSearchFormdata" @search="search"></SearchComponent>
    <TableComponent ref="tableRef" :search-form-data="searchFormData"></TableComponent>
</template>
<script lang="ts" setup>
import SearchComponent from './components/book-msg-search.vue'
import TableComponent from './components/book-msg-table.vue'
import { ISearchForm } from './utils/interfaces'
import { reactive, ref, watch } from 'vue'
let searchFormData: ISearchForm = reactive({
    bookId: null,
    bookName: null,
    bookType: null,
    author: null,
    press: null,
})
const setSearchFormdata = (val: ISearchForm) => {
    searchFormData = val
}
const tableRef = ref()
const search = () => {
    tableRef.value.search()
}
</script>
