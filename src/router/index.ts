import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      redirect: 'goods',
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
        {
          path: 'role',
          name: 'role',
          meta: {
            isShow: true,  // 是否需要被展示出来
            title: "角色列表"
          },
          component: () => import('../views/role/RoleView.vue')
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    }
  ]
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const token: string | null = localStorage.getItem("token")
  if(!token && to.path !== "/login"){
    next("/login")
  }
  else{
    next()
  }
})

export default router
