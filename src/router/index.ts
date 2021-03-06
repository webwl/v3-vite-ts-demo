import { createWebHistory, createRouter } from 'vue-router'
const history = createWebHistory()

const router = createRouter({
    history, // 路由模式
    routes: [
        {
            path: '/',
            redirect: '/home-page',
        },
        {
            path: '/home-page',
            name: 'homePage',
            meta: {
                title: '首页',
            },
            component: () => import('@/pages/homePage/indexPage.vue'),
        },
        {
            path: '/online-library',
            name: 'onlineLibrary',
            meta: {
                title: '图书库',
            },
            component: () => import('@/pages/onlineLibrary/indexPage.vue'),
        },
        {
            path: '/popular-books',
            name: 'popularBooks',
            meta: {
                title: '热读榜',
            },
            component: () => import('@/pages/popularBooks/indexPage.vue'),
        },
        {
            path: '/message-board',
            name: 'messageBoard',
            meta: {
                title: '留言板',
            },
            component: () => import('@/pages/messageBoard/indexPage.vue'),
        },
        {
            path: '/wishing-well',
            name: 'wishingWell',
            meta: {
                title: '预约书籍',
            },
            component: () => import('@/pages/wishingWell/indexPage.vue'),
        },
        {
            path: '/personal-space',
            name: 'personalSpace',
            meta: {
                title: '个人中心',
            },
            component: () => import('@/pages/personalSpace/indexPage.vue'),
        },
        {
            path: '/book-detail',
            name: 'bookDetail',
            meta: {
                title: '书籍详情',
            },
            component: () => import('@/pages/bookDetail/indexPage.vue'),
        },
    ],
})
// router.beforeEach((to, from, next) => {
//     console.log('from:', from)
//     console.log('to:', to)
//     next()
// })
export default router
