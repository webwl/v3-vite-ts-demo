/**
 * 生成基础axios对象，并对请求和响应做处理
 * 前后端约定接口返回解构规范
 * {
 *    code:0,
 *    data:"成功",
 *    message:""
 * }
 */
import axios from 'axios'
import { ElMessage } from 'element-plus'

// 创建一个独立的axios实例
const service = axios.create({
    // 设置baseUr地址,如果通过proxy跨域可直接填写base地址
    baseURL: 'http://124.220.34.251:5250',
    // 定义统一的请求头部
    headers: {},
    // 配置请求超时时间
    timeout: 10000,
    // 如果用的JSONP，可以配置此参数带上cookie凭证，如果是代理和CORS不用设置
    withCredentials: false,
})
// 请求拦截
service.interceptors.request.use((config) => {
    // 自定义header，可添加项目token
    const TOKEN = localStorage.getItem('library_jwt_token')
    if (TOKEN) {
        config.headers = {
            ...config.headers,
            Authorization: TOKEN,
        }
    }
    return config
})
// 返回拦截
service.interceptors.response.use(
    (response) => {
        // 获取接口返回结果
        const res = response.data
        // code为200，直接把结果返回回去，这样前端代码就不用在获取一次data.
        if (res.code === 200) {
            return res
        }
        ElMessage.error(res.msg || res.error)
        return res
    },
    () => {
        ElMessage.error('网络请求异常，请稍后重试!')
    },
)
export default service
