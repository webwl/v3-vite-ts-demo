// 留言数组中的对象
interface IMessageResListItem {
    id: number
    content: string
    createTime: string
    title: string
    userId: number
    userName: string
}
// 留言数组
export interface IMessagListRes {
    currPage: number
    pageSize: number
    total: number
    list: Array<IMessageResListItem>
}
