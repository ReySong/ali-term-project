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
