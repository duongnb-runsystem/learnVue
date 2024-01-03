import Home from '../views/Home.vue'
import Game from '../views/Game.vue'
import Result from '../views/Result.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/game', name: 'Game', component: Game },
    { path: '/result', name: 'Result', component: Result }
]
const router = createRouter({
    history: createWebHashHistory(),
    routes,
})
export default router