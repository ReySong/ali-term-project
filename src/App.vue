<template>
  <canvas ref="canvas" width="1000" height="1000"></canvas>
</template>

<script>

import { FadeIn, FadeOut} from './js/fade';
import { KeyCode } from './js/keycodeTable';
// import { setup, Game } from './js/game';

export default {
  name: 'App',
  components: {},
  data() {
    return {
      elems: [{
        x: Math.floor(Math.random() * 500),
        y: Math.floor(Math.random() * 500),
        width: 120,
        height: 80,
        color: "#9ca8b8",
        textColor: "#ececea",
        keycode: KeyCode[Math.floor(Math.random()) * KeyCode.length],
      }]
    }
  },
  mounted() {
    let canvas = this.$refs.canvas;
    canvas.setAttribute("width", screen.availWidth);
    canvas.setAttribute("height", screen.availHeight);
    canvas.setAttribute("id", "canvas");
    document.body.appendChild(canvas);
    let ctx = canvas.getContext("2d");
    ctx.font = "20px Tahoma";
    ctx.textAlign = "center";

    let r = FadeIn(ctx, this.$data.elems[0], 0);

    document.addEventListener('keyup', (event) => {
      if (event.keyCode === this.$data.elems[0].keycode) {
        cancelAnimationFrame(r);
        FadeOut(ctx, this.$data.elems[0], 1);
      }
    })
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
