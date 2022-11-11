import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      // redirect: 'goods',
      children: [
        {
          path: 'goods',
          name: 'goods',
          meta: {
            isShow: true,  // 是否需要被展示出来
            title: "商品列表"
          },
          component: () => import('../views/goods/GoodsView.vue')
        },
        {
          path: 'user',
          name: 'user',
          meta: {
            isShow: true,  // 是否需要被展示出来
            title: "用户列表"
          },
          component: () => import('../views/user/UserView.vue')
        },
      ]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    }
  ]
})

export default router
