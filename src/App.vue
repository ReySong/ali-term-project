<template>
  <div id="root" />
  <canvas ref="canvas" id="canvas" width="1000" height="1000"></canvas>
  <button class="btn btn-drop">坠落</button>
  <parabolic-ball class="btn btn-parabola" />
  <!-- <button class="btn btn-parabola"> 抛物 </button> -->
  <!-- <button class="btn btn-fade">淡入</button> -->
  <fade-button />
  <button class="btn btn-start">开始游戏！</button>
</template>

<script>
import { FadeIn, FadeOut } from './scripts/fade/fade'
import { KeyCode, KeyCodeMapTable } from './scripts/keycode'
import { GameController, util, Button, buttons } from './scripts/drop/index'
import ParabolicBall from './components/ParabolicBall'
import { Sounds } from './sounds/index'
import GenerateRandomLocElems from './scripts/fade/generate'
import FadeButton from './components/FadeButton.vue'

export default {
  name: 'App',
  components: {
    ParabolicBall,
    FadeButton,
  },
  mounted() {
    let elem
    let sound = new Sounds()
    sound.playBackgroundAudio()
    const dropBtn = document.getElementsByClassName('btn-drop')[0]
    const parabolaBtn = document.getElementsByClassName('btn-parabola')[0]
    const fadeBtn = document.getElementsByClassName('btn-fade')[0]
    const startBtn = document.getElementsByClassName('btn-start')[0]

    dropBtn.addEventListener('click', () => {
      /**
       * drop样例展示
       */
      const canvas = document.querySelector('#canvas')
      const ctx = canvas.getContext('2d')
      // 定义游戏相关的配置项
      const option = {
        // 绘图函数
        draw() {
          util.background(canvas, ctx, 'white')
          buttons.forEach((button) => {
            button.drop(ctx)
            button.update()
          })
        },
        // 监听事件
        events: {
          // 键盘按下事件
          keyPressed(key) {
            //按键按下时触发一次，命中距离底部最近的按键
            let targets = buttons.filter((button) => button.key === key)
            if (targets.length != 0) {
              targets.sort((a, b) => b.position.y - a.position.y)
              targets[0].target()
            }
          },
          // 用点击注册事件模拟按键产生过程
          mousePressed() {
            const position = util.createVector(310, 180)
            if (position.y > 0.8 * window.innerHeight) return
            const button = new Button(
              `${KeyCodeMapTable.get(KeyCode[Math.floor(Math.random() * KeyCode.length)])}`,
              position
            )
            buttons.push(button)
          },
        },
      }
      // 初始化游戏控制器
      let gameController = new GameController(canvas, ctx, option)
      // 游戏装载
      gameController.setup()
    })

    parabolaBtn.addEventListener('click', () => {})

    fadeBtn.addEventListener('click', () => {
      /**
       * fade样例展示
       */
      elem = {
        top: 30,
        right: 22.3,
        width: 120,
        height: 60,
        keycode: KeyCode[Math.floor(Math.random() * KeyCode.length)],
      }
      let dom = document.getElementById('fadeExample')
      if (dom) document.getElementById('root').removeChild(dom)
      FadeIn(elem, 'fadeExample', 0)
      document.addEventListener('keyup', (event) => {
        if (event.keyCode === elem.keycode) {
          FadeOut('fadeExample', 1)
        }
      })
    })

    let id = '1'
    let idList = new Map()
    startBtn.addEventListener('click', () => {
      dropBtn.style.display = 'none'
      parabolaBtn.style.display = 'none'
      fadeBtn.style.display = 'none'
      let si = setInterval(() => {
        // let effect = Math.floor(Math.random() * 3)
        let randomElem = GenerateRandomLocElems()

        // switch (effect) {
        //   case 0:
        //   case 1:
        //   case 2:
        idList.set(randomElem.keycode, id)
        FadeIn(randomElem, id++)
        document.addEventListener('keyup', (event) => {
          let idExist = idList.get(event.keyCode)
          if (idExist) {
            idList.delete(idExist)
            sound.playSuccess()
            FadeOut(idExist, 1)
          }
        })

        // }
      }, 2000)
      let flag = false
      if (/* 音乐播放完 */ flag) {
        clearInterval(si)
        dropBtn.style.display = 'block'
        parabolaBtn.style.display = 'block'
        fadeBtn.style.display = 'block'
      }
    })
  },
}
</script>

<style>
.canvas {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 0;
}

.btn {
  align-self: center;
  background-color: #fff;
  background-image: none;
  background-position: 0 90%;
  background-repeat: repeat no-repeat;
  background-size: 4px 3px;
  border-radius: 15px 225px 255px 15px 15px 255px 225px 15px;
  border-style: solid;
  border-width: 2px;
  box-shadow: rgba(0, 0, 0, 0.2) 15px 28px 25px -18px;
  box-sizing: border-box;
  color: #41403e;
  cursor: pointer;
  display: inline-block;
  font-family: Neucha, sans-serif;
  font-size: 1rem;
  line-height: 23px;
  outline: none;
  padding: 0.75rem;
  text-decoration: none;
  transition: all 235ms ease-in-out;
  border-bottom-left-radius: 15px 255px;
  border-bottom-right-radius: 225px 15px;
  border-top-left-radius: 255px 15px;
  border-top-right-radius: 15px 225px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.btn:hover {
  box-shadow: rgba(0, 0, 0, 0.3) 2px 8px 8px -5px;
  transform: translate3d(0, 2px, 0);
}

.btn:focus {
  box-shadow: rgba(0, 0, 0, 0.3) 2px 8px 4px -6px;
}

.btn-start {
  position: fixed;
  left: 45%;
  bottom: 10%;
  /* transform: translate(-50%); */
}

.btn-drop {
  position: fixed;
  left: 20%;
  bottom: 30%;
}

.btn-parabola {
  position: fixed;
  left: 46.5%;
  bottom: 30%;
}

.btn-fade {
  position: fixed;
  right: 20%;
  bottom: 30%;
}
</style>
