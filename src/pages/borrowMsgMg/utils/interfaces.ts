// 借阅信息管理-搜索表单
export interface ISearchForm {
    borrower: string | null
    schoolId: number | null
    bookId: number | null
    bookName: string | null
    time: string | null
    status: boolean | null
}
// 借阅信息管理-新增编辑表单
export interface IAddForm {
    schoolId: number | null
    bookId: number | null
}
