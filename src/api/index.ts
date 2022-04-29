import { $get, $post } from '../utils/request'

/**
 * 用户模块
 * START
 */

import { ILoginForm } from './apiInterface'

// 登录
export const $apiLogin = (params: ILoginForm) => {
    return $post('/auth/login', params)
}

// 获取用户信息
export const $apiUserMsg = () => {
    return $get('/user')
}

/**
 * 图书模块
 * START
 */

import { ISearchForm } from './apiInterface'
// 首页->图书推荐
export const $apiBookRecommend = () => {
    return $get('/book/recommend')
}
// 图书库->图书查询
export const $apiBookSearch = (params: ISearchForm) => {
    return $get('/book/list', params)
}

// 热读榜->榜单查询
export const $apiHotBookList = () => {
    return $get('/book/hit')
}

/**
 * 留言模块
 * START
 */
import { IPage, IMessageSave } from './apiInterface'
// 获取留言列表
export const $apiMessageList = (params: IPage) => {
    return $get('/message/list', params)
}
// 留言
export const $apiMessageSave = (params: IMessageSave) => {
    return $post('/message/publish', params)
}

/**
 * 预约书籍模块
 * START
 */
import { IAppointmentList, IAppointmentAdd } from './apiInterface'

// 获取预约书籍列表
export const $apiAppointmentList = (params: IAppointmentList) => {
    return $get('/appointment/list', params)
}
// 添加预约书籍
export const $apiAppointmentAdd = (params: IAppointmentAdd) => {
    return $post('/appointment/submit', params)
}
