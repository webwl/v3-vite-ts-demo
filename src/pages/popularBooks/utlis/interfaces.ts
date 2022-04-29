// banner数组中的对象
interface IBannerItem {
    id: number
    name: string
    author: string
    intro: string
    cover: string
}
// banner列表
export interface IBannerList {
    arr: Array<IBannerItem>
}

// 热读列表数组对象
interface IHotItem {
    id: number
    name: string
    author: string
}
// 热读列表
export interface IHotList {
    type: string
    name: string
    list: Array<IHotItem>
}
// 热读列表
export interface IHotReactive {
    arr: Array<IHotList>
}
