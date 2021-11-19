import { createRouter, createWebHashHistory } from 'vue-router'

const Game = () => import('../components/Game.vue')
const End = () => import('../components/EndPage.vue')

const routes = [
  {
    path: '/',
    name: 'Start',
    redirect: '/game',
  },
  {
    path: '/game',
    name: 'Game',
    component: Game,
  },
  {
    path: '/end',
    name: 'End',
    component: End,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
