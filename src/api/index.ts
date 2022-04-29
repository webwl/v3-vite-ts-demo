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
export const $apiHotBookList = (params: ISearchForm) => {
    return $get('/book/hit', params)
}
