// 图书信息管理-搜索表单
export interface ISearchForm {
    bookId: Number | null
    bookName: String | null
    bookType: String | null
    author: String | null
    press: String | null
}
// 图书信息管理-新增编辑表单
export interface IAddForm extends ISearchForm {
    address: String | null
}
