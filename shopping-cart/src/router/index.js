import { createRouter, createWebHistory } from 'vue-router'
import checkAuth from './auth'
const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('@/layouts/Login/index.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/layouts/Registration/index.vue'),
  },
  {
    path: '/home',
    name: 'baselayout',
    component: () => import('@/layouts/BaseLayout/index.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/Home/index.vue')
      },
      {
        path: '/about',
        name: 'about',
        component: () => import('@/views/About/index.vue')
      }

    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
  // Always scroll to top
  scrollBehavior() {
    return { top: 0 }
  }
})

/**
 * Handle check authencation
 */
checkAuth(router)

export default router
