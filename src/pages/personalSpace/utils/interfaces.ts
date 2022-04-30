// 基础响应接口
interface IBaseRes {
    currPage: number
    pageSize: number
    total: number
}
// 借阅图书详情
export interface IBorrowListItem {
    author: string
    categoryName: string
    createTime: string
    createdBy: string
    delayDays: null
    endTime: string
    id: number
    isbn: string
    late: number
    name: string
    postponed: number
    publish: string
    retCondition: null
    retStatus: number
    returnTime: null
    userName: string
}
// 借阅列表
export interface IBorrowListData {
    data: Array<IBorrowListItem>
}
// 借阅列表
export interface IBorrowList extends IBaseRes {
    list: Array<IBorrowListItem>
}

// 书评详情
export interface IEstimateListItem {
    bookId: number
    bookName: string
    borrowId: number
    content: string
    createTime: string
    id: number
    likeNum: number
    liked: false
    rate: number
    title: string
    userId: number
    userName: string
}
// 书评列表
export interface IEstimateListData {
    data: Array<IEstimateListItem>
}
// 书评列表
export interface IEstimateList extends IBaseRes {
    list: Array<IEstimateListItem>
}

// 留言详情
export interface IMessageListItem {
    content: string
    createTime: string
    id: number
    reply: null
    replyBy: null
    replyTime: null
    title: string
    userId: number
    userName: string
}
// 留言列表
export interface IMessageListData {
    data: Array<IMessageListItem>
}
// 留言列表
export interface IMessageList extends IBaseRes {
    list: Array<IMessageListItem>
}
