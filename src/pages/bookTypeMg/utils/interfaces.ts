// 图书类型管理-搜索表单
export interface ISearchForm {
    typeName: String | null
}
// 图书类型管理-新增编辑表单
export interface IAddForm extends ISearchForm {
    typeId: String | null
}
