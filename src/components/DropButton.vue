<template>
  <div></div>
</template>

<script>
import { $bus } from "../scripts/eventBus/bus";
import { DropIn, DropOut } from "../scripts/drop/drop";
import GenerateRandomLocElems from "../scripts/fade/generate";
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "DropButton",
  props: ["sound"],
  setup(props) {
    const score = ref(0);
    let id = "1";
    let idList = new Map();
    let si = setInterval(() => {
      let randomElem = GenerateRandomLocElems();
      idList.set(randomElem.keycode, id);
      DropIn(randomElem, id++, props.sound, idList);
      document.addEventListener("keyup", (e) => {
        if (idList.size === 0) return;
        let idExist = idList.get(e.keyCode);
        if (idExist) {
          idList.delete(e.keyCode);
          props.sound.playSuccess();
          score.value++;
          DropOut(idExist);
        }
        e.preventDefault();
      });
    }, 4000);
    document.onvisibilitychange = function () {
      if (document.visibilityState == "visible") {
        si = setInterval(() => {
          let randomElem = GenerateRandomLocElems();
          idList.set(randomElem.keycode, id);
          DropIn(randomElem, id++, props.sound, idList);
          document.addEventListener("keyup", (e) => {
            if (idList.size === 0) return;
            let idExist = idList.get(e.keyCode);
            if (idExist) {
              idList.delete(e.keyCode);
              props.sound.playSuccess();
              score.value++;
              DropOut(idExist);
            }
            e.preventDefault();
          });
        }, 4000);
      } else {
        console.log("can");
        clearInterval(si);
      }
    };
    $bus.on("bgDone", () => {
      clearInterval(si);
    });

    return { score };
  },
});
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