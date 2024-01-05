import Home from '../views/Home.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/game', name: 'Game', component: () => import('@/views/Game.vue') },
    { path: '/result', name: 'Result', component: () => import('@/views/Result.vue') },
    { path: '/rank', name: 'Ranking', component: () => import('@/views/Ranking.vue') }
]
const router = createRouter({
    history: createWebHashHistory(),
    routes,
})
export default router