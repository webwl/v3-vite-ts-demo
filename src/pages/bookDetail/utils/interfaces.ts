// 图书详情
export interface IBookDetail {
    cover: string
    name: string
    author: string
    intro: string
    size: number
    publish: string
    isbn: string
    publishTime: string
}

// 书评列表
export interface IBookEstimateList {
    currPage: number
    list: Array<IBookEstimateListItem>
    pageSize: number
    total: number
}
// 书评列表对象
export interface IBookEstimateListItem {
    currPage: number
    list: []
    pageSize: number
    total: number
}
// 添加书评
export interface IBookEstimateSave {
    borrowId: number
    content: string
    rate: number
    title: string
}
