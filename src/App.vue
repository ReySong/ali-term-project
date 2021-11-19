<template>
  <h1 class="load">
    <span>K</span>
    <span>e</span>
    <span>y</span>
    <span>p</span>
    <span>r</span>
    <span>e</span>
    <span>s</span>
    <span>s</span>
    <span>&nbsp;</span>
    <span>D</span>
    <span>a</span>
    <span>n</span>
    <span>c</span>
    <span>e</span>
  </h1>
  <div id="root" />
  <div id="counter" class="btn btn-score">得分: {{ score }}</div>
  <parabolic-ball class="btn btn-parabola" :sound="sound" />
  <fade-button class="btn btn-fade" :sound="sound" />
  <drop-button class="btn btn-drop" :sound="sound"></drop-button>
  <button class="btn btn-start">开始游戏！</button>
</template>

<script>
import { defineComponent, ref, onMounted, reactive } from "vue";
import ParabolicBall from "./components/ParabolicBall";
import FadeButton from "./components/FadeButton.vue";
import DropButton from "./components/DropButton.vue";
import { Sounds } from "./sounds/index";
import GenerateRandomLocElems from "./scripts/fade/generate";
import { FadeIn, FadeOut } from "./scripts/fade/fade";
import { DropIn, DropOut } from "./scripts/drop/drop";
import { $bus } from "./scripts/eventBus/bus";

export default defineComponent({
  name: "App",
  components: {
    ParabolicBall,
    FadeButton,
    DropButton,
  },
  setup() {
    const sound = reactive(new Sounds());
    const score = ref(0);
    onMounted(() => {
      sound.playBackgroundAudio();
      const dropBtn = document.getElementsByClassName("btn-drop")[0];
      const parabolaBtn = document.getElementsByClassName("btn-parabola")[0];
      const fadeBtn = document.getElementsByClassName("btn-fade")[0];
      const startBtn = document.getElementsByClassName("btn-start")[0];
      const title = document.querySelector(".load");
      const counter = document.querySelector("#counter");
      let id = "1";
      let idList = new Map();
      startBtn.addEventListener("click", () => {
        dropBtn.style.display = "none";
        parabolaBtn.style.display = "none";
        fadeBtn.style.display = "none";
        title.style.display = "none";
        counter.style.display = "block";
        score.value = 0;
        let si = setInterval(() => {
          let effect = Math.floor(Math.random() * 3);
          let randomElem = GenerateRandomLocElems();
          idList.set(randomElem.keycode, id);
          switch (effect) {
            case 0:
              break;
            case 1:
              DropIn(randomElem, id++, sound, idList);
              document.addEventListener("keyup", (e) => {
                if (idList.size === 0) return;
                let idExist = idList.get(e.keyCode);
                if (idExist) {
                  score.value++;
                  idList.delete(e.keyCode);
                  sound.playSuccess();
                  DropOut(idExist);
                }
                event.preventDefault();
              });
              break;
            case 2:
              FadeIn(randomElem, id++, sound, idList);
              document.addEventListener("keyup", (event) => {
                let idExist = idList.get(event.keyCode);
                if (idExist) {
                  score.value++;
                  idList.delete(idExist);
                  sound.playSuccess();
                  FadeOut(idExist, 1);
                }
              });
              break;
            default:
              break;
          }
        }, 2000);
        // 切选项卡停止动画
        document.onvisibilitychange = function () {
          if (document.visibilityState == "visible") {
            si = setInterval(() => {
              let effect = Math.floor(Math.random() * 3);
              let randomElem = GenerateRandomLocElems();
              idList.set(randomElem.keycode, id);
              switch (effect) {
                case 0:
                  break;
                case 1:
                  DropIn(randomElem, id++, sound, idList);
                  document.addEventListener("keyup", (e) => {
                    if (idList.size === 0) return;
                    let idExist = idList.get(e.keyCode);
                    if (idExist) {
                      score.value++;
                      idList.delete(e.keyCode);
                      sound.playSuccess();
                      DropOut(idExist);
                    }
                    event.preventDefault();
                  });
                  break;
                case 2:
                  FadeIn(randomElem, id++);
                  document.addEventListener("keyup", (event) => {
                    let idExist = idList.get(event.keyCode);
                    if (idExist) {
                      score.value++;
                      idList.delete(idExist);
                      sound.playSuccess();
                      FadeOut(idExist, 1);
                    }
                  });
                  break;
                default:
                  break;
              }
            }, 2000);
          } else {
            clearInterval(si);
          }
        };
        /* 音乐播放完 */
        $bus.on("bgDone", () => {
          clearInterval(si);
          dropBtn.style.display = "block";
          parabolaBtn.style.display = "block";
          fadeBtn.style.display = "block";
          title.style.display = "block";
        });
      });
    });
    return {
      score,
      sound,
    };
  },
});
</script>

<style>
.title {
  color: #fafafa;
  letter-spacing: 0;
  text-shadow: 0px 1px 0px #999, 0px 2px 0px #888, 0px 3px 0px #777,
    0px 4px 0px #666, 0px 5px 0px #555, 0px 6px 0px #444, 0px 7px 0px #333,
    0px 8px 7px #001135;
  font-size: 100px;
  line-height: 100px;
}
h1.load {
  font-family: "Nunito", sans-serif;
  text-align: center;
  text-transform: uppercase;
  margin-top: 60px;
  font-size: 80px;
  line-height: 100px;
  color: transparent;
  letter-spacing: 5px;
}
.load span {
  text-shadow: 0 0 2px rgba(181, 185, 189, 0.822),
    0 15px 25px rgba(0, 0, 0, 0.3), 0 -2px 3px rgba(0, 0, 0, 0.1),
    0 -5px 10px rgba(255, 255, 255, 0.5), 0 5px 10px rgba(0, 0, 0, 0.3),
    0 3px 4px rgba(255, 255, 255, 0.2), 0 0 20px rgba(255, 255, 255, 0.45);
  animation: loading 1.2s ease-in-out infinite alternate;
}
@keyframes loading {
  to {
    text-shadow: 0 0 2px rgba(12, 9, 192, 0.2), 0 0 3px rgba(0, 0, 0, 0.02),
      0 0 0 rgba(0, 0, 0, 0), 0 0 0 rgba(255, 255, 255, 0),
      0 0 0 rgba(0, 0, 0, 0), 0 0 0 rgba(255, 255, 255, 0),
      0 0 0 rgba(255, 255, 255, 0);
  }
}
.load span:nth-child(2) {
  animation-delay: 0.15s;
}
.load span:nth-child(3) {
  animation-delay: 0.3s;
}
.load span:nth-child(4) {
  animation-delay: 0.45s;
}
.load span:nth-child(5) {
  animation-delay: 0.6s;
}
.load span:nth-child(6) {
  animation-delay: 0.75s;
}
.load span:nth-child(7) {
  animation-delay: 0.9s;
}
.load span:nth-child(8) {
  animation-delay: 1.05s;
}
.load span:nth-child(9) {
  animation-delay: 1.2s;
}
.load span:nth-child(10) {
  animation-delay: 1.35s;
}
.load span:nth-child(11) {
  animation-delay: 1.5s;
}
.load span:nth-child(12) {
  animation-delay: 1.65s;
}
.load span:nth-child(13) {
  animation-delay: 1.8s;
}
.counter {
  position: fixed;
  top: 2%;
  left: 5%;
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
.btn-score {
  position: fixed;
  right: 49%;
  top: 5%;
  display: none;
  /* position: fixed;
  left: 65%;
  bottom: 10%; */
}
.show {
  display: block;
}
@keyframes shake-slow {
  0% {
    transform: translate(0px, 0px) rotate(0deg);
  }
  2% {
    transform: translate(-6px, -8px) rotate(2.5deg);
  }
  4% {
    transform: translate(3px, -9px) rotate(-0.5deg);
  }
  6% {
    transform: translate(3px, -8px) rotate(2.5deg);
  }
  8% {
    transform: translate(0px, 5px) rotate(0.5deg);
  }
  10% {
    transform: translate(3px, 2px) rotate(0.5deg);
  }
  12% {
    transform: translate(8px, 0px) rotate(0.5deg);
  }
  14% {
    transform: translate(4px, 7px) rotate(-3.5deg);
  }
  16% {
    transform: translate(-4px, 0px) rotate(-0.5deg);
  }
  18% {
    transform: translate(1px, 3px) rotate(-1.5deg);
  }
  20% {
    transform: translate(-8px, -1px) rotate(-3.5deg);
  }
  22% {
    transform: translate(5px, 9px) rotate(2.5deg);
  }
  24% {
    transform: translate(-9px, -10px) rotate(-2.5deg);
  }
  26% {
    transform: translate(0px, 7px) rotate(-1.5deg);
  }
  28% {
    transform: translate(-10px, 7px) rotate(2.5deg);
  }
  30% {
    transform: translate(8px, -7px) rotate(-1.5deg);
  }
  32% {
    transform: translate(0px, -8px) rotate(-0.5deg);
  }
  34% {
    transform: translate(9px, 7px) rotate(-0.5deg);
  }
  36% {
    transform: translate(-7px, 6px) rotate(0.5deg);
  }
  38% {
    transform: translate(8px, -10px) rotate(-0.5deg);
  }
  40% {
    transform: translate(8px, 0px) rotate(0.5deg);
  }
  42% {
    transform: translate(0px, -2px) rotate(1.5deg);
  }
  44% {
    transform: translate(5px, -2px) rotate(-0.5deg);
  }
  46% {
    transform: translate(1px, -10px) rotate(-2.5deg);
  }
  48% {
    transform: translate(4px, -1px) rotate(2.5deg);
  }
  50% {
    transform: translate(-5px, -4px) rotate(2.5deg);
  }
  52% {
    transform: translate(3px, 2px) rotate(-3.5deg);
  }
  54% {
    transform: translate(1px, -6px) rotate(-0.5deg);
  }
  56% {
    transform: translate(-3px, -4px) rotate(-0.5deg);
  }
  58% {
    transform: translate(-10px, -10px) rotate(2.5deg);
  }
  60% {
    transform: translate(8px, 7px) rotate(-3.5deg);
  }
  62% {
    transform: translate(9px, -6px) rotate(-3.5deg);
  }
  64% {
    transform: translate(-5px, 8px) rotate(-0.5deg);
  }
  66% {
    transform: translate(1px, -3px) rotate(0.5deg);
  }
  68% {
    transform: translate(-6px, 9px) rotate(1.5deg);
  }
  70% {
    transform: translate(-5px, 8px) rotate(-1.5deg);
  }
  72% {
    transform: translate(-10px, -2px) rotate(2.5deg);
  }
  74% {
    transform: translate(0px, -4px) rotate(1.5deg);
  }
  76% {
    transform: translate(-2px, -5px) rotate(0.5deg);
  }
  78% {
    transform: translate(-2px, 9px) rotate(-3.5deg);
  }
  80% {
    transform: translate(7px, 4px) rotate(-3.5deg);
  }
  82% {
    transform: translate(-1px, -4px) rotate(-1.5deg);
  }
  84% {
    transform: translate(3px, -6px) rotate(0.5deg);
  }
  86% {
    transform: translate(7px, -8px) rotate(-1.5deg);
  }
  88% {
    transform: translate(4px, -9px) rotate(1.5deg);
  }
  90% {
    transform: translate(1px, -6px) rotate(2.5deg);
  }
  92% {
    transform: translate(-8px, -1px) rotate(-1.5deg);
  }
  94% {
    transform: translate(-4px, -1px) rotate(0.5deg);
  }
  96% {
    transform: translate(-6px, 9px) rotate(1.5deg);
  }
  98% {
    transform: translate(7px, 4px) rotate(-0.5deg);
  }
}
</style>
