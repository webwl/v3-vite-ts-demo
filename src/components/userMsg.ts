// mouse.js
import { ref, reactive, onMounted, nextTick } from 'vue'
import { $apiUserMsg } from '@/api/index'

interface IUser {
    className: string
    email: string
    id: number
    idCard: string
    nickName: string
    realName: string
    role: number
    size: number
    status: number
    tel: string
    username: string
}
export function useUserMsg() {
    const user: IUser = reactive({
        className: '',
        email: '',
        id: 0,
        idCard: '',
        nickName: '',
        realName: '',
        role: 0,
        size: 0,
        status: 0,
        tel: '',
        username: '',
    })
    const getUserMsg = async () => {
        console.log('更新user')
        const res = await $apiUserMsg<IUser>()
        nextTick(() => {
            user.className = res.className
            user.email = res.email
            user.id = res.id
            user.nickName = res.nickName
            user.realName = res.realName
            user.className = res.className
            user.role = res.role
            user.size = res.size
            user.status = res.status
            user.tel = res.tel
            user.username = res.username
        })
    }
    onMounted(() => {
        const localToken = localStorage.getItem('library_jwt_token')
        if (localToken) {
            getUserMsg()
        }
    })
    return {
        user,
        getUserMsg,
    }
}
