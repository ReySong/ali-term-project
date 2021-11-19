<template>
  <button class="btn btn-fade">淡入</button>
</template>

<script>
import { FadeIn, FadeOut } from "../scripts/fade/fade";
import { Sounds } from "../sounds/index";
import GenerateRandomLocElems from "../scripts/fade/generate";

export default {
  name: "FadeButton",
  mounted() {
    let sound = new Sounds();
    sound.playBackgroundAudio();
    const fadeBtn = document.getElementsByClassName("btn-fade")[0];
    let id = "1";
    let idList = new Map();
    fadeBtn.addEventListener("click", () => {
      let si = setInterval(() => {
        // let effect = Math.floor(Math.random() * 3)
        let randomElem = GenerateRandomLocElems();

        // switch (effect) {
        //   case 0:
        //   case 1:
        //   case 2:
        idList.set(randomElem.keycode, id);
        FadeIn(randomElem, id++);
        document.addEventListener("keyup", (event) => {
          let idExist = idList.get(event.keyCode);
          if (idExist) {
            idList.delete(idExist);
            sound.playSuccess();
            FadeOut(idExist, 1);
          }
        });

        // }
      }, 2000);
      let flag = false;
      if (/* 音乐播放完 */ flag) {
        clearInterval(si);
      }
    });
  },
};
</script>

<style scoped>
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

.btn-fade {
  position: fixed;
  right: 20%;
  bottom: 30%;
  /* transform: translate(-50%); */
}
</style>
