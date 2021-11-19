import { KeyCode } from '../keycode'

function GenerateRandomLocElems() {
  /**
   * 用来生成随机坐标的虚拟按键
   */
  return {
    top: Math.floor(Math.random() * 90),
    left: Math.floor(Math.random() * 90) + 5,
    width: 120,
    height: 80,
    keycode: KeyCode[Math.floor(Math.random() * KeyCode.length)],
  }
}

export default GenerateRandomLocElems
