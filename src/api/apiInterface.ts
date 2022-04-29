// 登录表单
export interface ILoginForm {
    username: String
    password: String
    rememberMe: Boolean
}
// 查询图书表单
export interface ISearchForm {
    type: String
    keyword?: String
    field: String
}
