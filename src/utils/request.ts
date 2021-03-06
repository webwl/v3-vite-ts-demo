/**
 * request.js
 * 通过promise对axios做二次封装，针对用户端参数，做灵活配置
 */
// import { Message, Loading } from 'element-ui'
import { ElMessage, ElLoading } from 'element-plus'
import instance from './interceptor'

/**
 * 核心函数，可通过它处理一切请求数据，并做横向扩展
 * @param {url} 请求地址
 * @param {params} 请求参数
 * @param {options} 请求配置，针对当前本次请求；
 * @param loading 是否显示loading
 * @param error 本次是否显示错误
 */

interface IOptionForm {
    loading?: Boolean
    error?: Boolean
}
function request<T>(
    method: string,
    url: string,
    params?: any,
    options: IOptionForm = { loading: true, error: false },
): Promise<T> {
    let loadingInstance: any = false
    // 请求前loading
    if (options.loading) {
        loadingInstance = ElLoading.service()
    }
    return new Promise((resolve, reject) => {
        let data = {}
        // get请求使用params字段
        if (method === 'get') {
            data = { params }
        }
        // post,put请求使用data字段
        if (['post', 'put'].includes(method)) {
            data = { data: params }
        }
        instance({
            url,
            method,
            ...data,
        })
            .then((res: any) => {
                // 此处作用很大，可以扩展很多功能。
                // 比如对接多个后台，数据结构不一致，可做接口适配器
                // 也可对返回日期/金额/数字等统一做集中处理
                if (res?.code === 200) {
                    resolve(res.data)
                } else {
                    // 通过配置可关闭错误提示
                    if (options.error) {
                        ElMessage.error(res?.message || res?.error || res?.msg)
                    }
                    reject(res)
                }
            })
            .catch((error) => {
                ElMessage.error(error.message)
            })
            .finally(() => {
                loadingInstance.close()
            })
    })
}
// 封装GET请求
function $get<T>(url: string, params?: any, options?: IOptionForm): Promise<T> {
    return request<T>('get', url, params, options)
}
// 封装POST请求
function $post<T>(url: string, params?: any, options?: IOptionForm): Promise<T> {
    return request<T>('post', url, params, options)
}
// 封装PUT请求
function $put<T>(url: string, params?: any, options?: IOptionForm): Promise<T> {
    return request<T>('put', url, params, options)
}
export { $get, $post, $put }
