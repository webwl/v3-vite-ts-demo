export interface IPage {
    page: Number
    size: Number
}
// 登录表单
export interface ILoginForm {
    username: String
    password: String
    rememberMe: Boolean
}
// 查询图书表单
export interface ISearchForm extends IPage {
    type: String
    keyword?: String
    field: String
}

// 留言
export interface IMessageSave {
    title: String
    content: String
}

// 预约书籍列表
export interface IAppointmentList extends IPage {
    type: String
    keyword?: String
    field: String
}
// 添加预约书籍
export interface IAppointmentAdd {
    author: String
    isbn: String
    name: String
    publish: String
}
