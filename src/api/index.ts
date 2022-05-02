import { $get, $post, $put } from '../utils/request'

/**
 * 用户模块
 */

import { ILoginForm, IResetSend, IResetPwd } from './apiInterface'

// 登录
export const $apiLogin = (params: ILoginForm) => {
    return $post('/auth/login', params)
}
// 获取图形验证码
export const $apiLoginSecurityCode = () => {
    return $get('/auth/captcha')
}
// 获取重置验证码
export const $apiResetSend = (params: IResetSend) => {
    return $post(`/auth/sendCaptcha?email=${params.email}&username=${params.username}`, params)
}
// 修改密码
export const $apiResetPwd = (params: IResetPwd) => {
    return $post(`/auth/resetPass`, params)
}

// 获取用户信息
export const $apiUserMsg = <T>(): Promise<T> => {
    return $get<T>('/user')
}
// 修改用户信息
import { IUserMsg } from './apiInterface'
export const $apiUserMsgEdit = <T>(params: IUserMsg): Promise<T> => {
    return $put<T>('/user', params)
}
/**
 * 图书模块
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

/**
 * 书籍详情模块
 */
import { IBookEstimate, IBookEstimateSave } from './apiInterface'
// 获取书籍详情
export const $apiBookDetail = <T>(id: string): Promise<T> => {
    return $get<T>(`/book/detail/${JSON.parse(id)}`)
}
// 获取书评列表
export const $apiBookEstimate = <T>(params: IBookEstimate): Promise<T> => {
    return $get<T>('/comment/list', params)
}
// 添加书评
export const $apiBookEstimateSave = <T>(params: IBookEstimateSave): Promise<T> => {
    return $post<T>('/comment/publish', params)
}
// 点赞书评
export const $apiBookEstimateLike = <T>(id: number): Promise<T> => {
    return $post<T>(`/comment/like?id=${id}`)
}

/**
 * 个人中心
 */
// 获取借阅列表
export const $apiPersonalBorrowList = <T>(params: IPage): Promise<T> => {
    return $get<T>('/borrow/list', params)
}
// 获取书评列表
export const $apiPersonalEstimateList = <T>(params: IPage): Promise<T> => {
    return $get<T>('/comment/mine', params)
}
// 获取留言列表
export const $apiPersonalMessageList = <T>(params: IPage): Promise<T> => {
    return $get<T>('/message/mine', params)
}
