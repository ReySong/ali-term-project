<template>
  <button>淡入</button>
</template>

<script>
import { FadeIn, FadeOut } from "../scripts/fade/fade";
import { Sounds } from "../sounds/index";
import { KeyCode } from "../scripts/keycode";

export default {
  name: "FadeButton",
  mounted() {
    let sound = new Sounds();
    let elem;
    sound.playBackgroundAudio();
    const fadeBtn = document.getElementsByClassName("btn-fade")[0];
    fadeBtn.addEventListener("click", () => {
      /**
       * fade样例展示
       */
      elem = {
        top: 30,
        right: 22.3,
        width: 120,
        height: 60,
        keycode: KeyCode[Math.floor(Math.random() * KeyCode.length)],
      };
      let dom = document.getElementById("fadeExample");
      if (dom) document.getElementById("root").removeChild(dom);
      FadeIn(elem, "fadeExample", 0);
      document.addEventListener("keyup", (event) => {
        if (event.keyCode === elem.keycode) {
          FadeOut("fadeExample", 1);
        }
      });
    });
  },
};
</script>
