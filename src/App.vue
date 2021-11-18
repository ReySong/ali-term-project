<template>
  <div id="root" />
  <!-- <canvas ref="canvas" class="canvas" width="1000" height="1000"></canvas> -->
  <button class="btn btn-drop"> 坠落 </button>
  <button class="btn btn-parabola"> 抛物 </button>
  <button class="btn btn-fade"> 淡入 </button>
  <button class="btn btn-start"> 开始游戏！ </button>
</template>

<script>

import { FadeIn, FadeOut } from './scripts/fade';
import { KeyCode } from './scripts/keycode.js'
// import GenerateRandomLocElems from './scripts/generate';

export default {
  name: 'App',
  components: {},
  mounted() {
    // const canvas = this.$refs.canvas;
    // const ctx = canvas.getContext("2d");
    // ctx.font = "20px Arial";
    // ctx.textAlign = "center";
    const root = document.getElementById("root");
    let timer;
    let elem;
    // let animation;
    // let idCount = 0;

    let dropBtn = document.getElementsByClassName("btn-drop")[0];
    let parabolaBtn = document.getElementsByClassName("btn-parabola")[0];
    let fadeBtn = document.getElementsByClassName("btn-fade")[0];

    dropBtn.addEventListener("click", () => {

    });

    parabolaBtn.addEventListener("click", () => {

    });

    fadeBtn.addEventListener("click", () => {
      if (elem !== undefined) return;
      elem = {
        top: 40,
        left: undefined,
        right: 20,
        width: 160,
        height: 80,
        keycode: KeyCode[Math.floor(Math.random() * KeyCode.length)]
      }
      let id = FadeIn(root, elem, -1);
      const dom = document.getElementById(id);
      dom.addEventListener('keyup', (event) => {
        console.log(event.keyCode, elem.keycode);
        if (event.keyCode === elem.keycode) {
          clearInterval(timer);
          FadeOut(event.target);
        }
      })
    });
    // fadeBtn.addEventListener("click", () => {
    //   elem = GenerateRandomLocElems();
    //   let id = FadeIn(root, elem, idCount++);
    //   timer = setTimeout(() => {
    //     cancelAnimationFrame(animation);
    //     FadeOut(document.getElementById(id));
    //   }, 3000)
      // const dom = document.getElementById(id);
      // dom.addEventListener('keyup', (event) => {
      //   console.log(event.keyCode, elem.keycode);
      //   if (event.keyCode === elem.keycode) {
      //     clearInterval(timer);
      //     FadeOut(event.target);
      //   }
      // })
    // })

    
  }
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
  box-shadow: rgba(0, 0, 0, .2) 15px 28px 25px -18px;
  box-sizing: border-box;
  color: #41403e;
  cursor: pointer;
  display: inline-block;
  font-family: Neucha, sans-serif;
  font-size: 1rem;
  line-height: 23px;
  outline: none;
  padding: .75rem;
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
  box-shadow: rgba(0, 0, 0, .3) 2px 8px 8px -5px;
  transform: translate3d(0, 2px, 0);
}

.btn:focus {
  box-shadow: rgba(0, 0, 0, .3) 2px 8px 4px -6px;
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

