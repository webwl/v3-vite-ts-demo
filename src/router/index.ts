import { createWebHistory, createRouter } from 'vue-router'
const history = createWebHistory()

const router = createRouter({
    history, // 路由模式
    routes: [
        {
            path: '/',
            redirect: '/book-msg-mg',
        },
        {
            path: '/book-msg-mg',
            name: 'bookMsgMg',
            meta: {
                title: '图书信息管理',
            },
            component: () => import('@/pages/bookMsgMg/index.vue'),
        },
        {
            path: '/book-type-mg',
            name: 'bookTypeMg',
            meta: {
                title: '图书类别管理',
            },
            component: () => import('@/pages/bookTypeMg/index.vue'),
        },
        {
            path: '/borrow-msg-mg',
            name: 'borrowMsgMg',
            meta: {
                title: '借阅信息管理',
            },
            component: () => import('@/pages/borrowMsgMg/index.vue'),
        },
        {
            path: '/user-msg-mg',
            name: 'userMsgMg',
            meta: {
                title: '用户信息管理',
            },
            component: () => import('@/pages/userMsgMg/index.vue'),
        },
        {
            path: '/leave-msg-mg',
            name: 'leaveMsgMg',
            meta: {
                title: '留言管理',
            },
            component: () => import('@/pages/msgMg/index.vue'),
        },
    ],
})
// router.beforeEach((to, from, next) => {
//     console.log('from:', from)
//     console.log('to:', to)
//     next()
// })
export default router
