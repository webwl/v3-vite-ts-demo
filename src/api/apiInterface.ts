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
// 书籍评价列表请求参数
export interface IBookEstimate extends IPage {
    bookId: String
}
// 添加书评
export interface IBookEstimateSave {
    borrowId: number
    content: string
    rate: number
    title: string
}

// 借阅列表
export interface IPersonalBorrowReq extends IPage {
    isReturned: ''
}

// 用户信息
export interface IUserMsg {
    email: string
    nickName: string
    password: string
    prevPassword: string
    tel: string
}
