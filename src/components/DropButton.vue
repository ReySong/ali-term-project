<template>
  <button>坠落</button>
</template>

<script>
import { defineComponent, onMounted } from 'vue'
import { DropIn, DropOut } from '../scripts/drop/drop'
import { KeyCode } from '../scripts/keycode'
import { Sounds } from '../sounds/index'

export default defineComponent({
  name: 'DropButton',
  props: ['sound'],
  setup(props) {
    let sound = new Sounds()
    onMounted(() => {
      sound.playBackgroundAudio()
      const dropBtn = document.getElementsByClassName('btn-drop')[0]

      /**
       * drop样例展示
       */
      dropBtn.addEventListener('click', () => {
        let dropElem = {
          top: 30,
          right: 78,
          width: 120,
          height: 60,
          keycode: KeyCode[Math.floor(Math.random() * KeyCode.length)],
        }
        let dom = document.getElementById('dropExample')
        if (dom) document.getElementById('root').removeChild(dom)
        DropIn(dropElem, 'dropExample', props.sound, undefined)
        document.addEventListener('keyup', (event) => {
          if (event.keyCode === dropElem.keycode) {
            DropOut('dropExample')
          }
        })
      })
    })
  },
})
</script>
