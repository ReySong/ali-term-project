import { createRouter,createWebHashHistory} from "vue-router";

import App from "../App.vue";
import ParabolicBall from '../components/ParabolicBall'
import EndPage from '../components/EndPage'
import PlayGame from '../components/PlayGame'

const routes = [
  { path: "/", redirect: "/playgame" },
  {
    path: "/",
    // name: "home",
    component: App
  },
  { 
    path: "/playgame",
    component: PlayGame
  },
  {
    path: "/end",
    // name: "end",
    component: EndPage
  },
  {
    path: "/parbolicBall",
    // name: "parbolicBall",
    component: ParabolicBall
  }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
  })

export default router;